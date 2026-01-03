import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { renderWithProviders, mockProducts, mockApiResponse } from '../../test/utils';
import { productApi } from '../../services/api';

// Mock the API
vi.mock('../../services/api');
const mockedProductApi = vi.mocked(productApi);

describe('Product Workflow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedProductApi.getAllProducts.mockResolvedValue(mockProducts);
    mockedProductApi.getCategories.mockResolvedValue(['electronics', 'clothing']);
    mockedProductApi.getProductById.mockImplementation((id) =>
      mockApiResponse(mockProducts.find(p => p.id === id)!)
    );
  });

  it('should complete the full product browsing workflow', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search products/i);
    await user.type(searchInput, 'Test Product 1');

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    });

    // Clear search
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);

    await waitFor(() => {
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    // Test category filter
    const categorySelect = screen.getByDisplayValue('All Categories');
    await user.selectOptions(categorySelect, 'electronics');

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    });

    // Test sort functionality
    const sortSelect = screen.getByDisplayValue('Sort by Name');
    await user.selectOptions(sortSelect, 'price-desc');

    // Products should still be visible but potentially reordered
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
  });

  it('should handle favorites workflow', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Add product to favorites
    const favoriteButtons = screen.getAllByLabelText('Add to favorites');
    await user.click(favoriteButtons[0]);

    // Navigate to favorites page
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    await user.click(favoritesLink);

    // Check if product appears in favorites
    await waitFor(() => {
      expect(screen.getByText('My Favorites')).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Remove from favorites
    const removeFromFavoritesButton = screen.getByLabelText('Remove from favorites');
    await user.click(removeFromFavoritesButton);

    // Check empty state
    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeInTheDocument();
    });
  });

  it('should navigate to product detail page', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Click on product card
    const productLink = screen.getAllByRole('link')[1]; // Skip header links
    await user.click(productLink);

    // Wait for product detail page to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
    });

    // Test back navigation
    const backButton = screen.getByText('Back to Products');
    await user.click(backButton);

    // Should return to product listing
    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
  });

  it('should handle error states gracefully', async () => {
    mockedProductApi.getAllProducts.mockRejectedValue(new Error('API Error'));
    
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });

    // Test retry functionality
    const retryButton = screen.getByText('Try Again');
    expect(retryButton).toBeInTheDocument();
  });

  it('should maintain state across navigation', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Add to favorites
    const favoriteButton = screen.getAllByLabelText('Add to favorites')[0];
    await user.click(favoriteButton);

    // Navigate to favorites
    const favoritesLink = screen.getByRole('link', { name: /favorites/i });
    await user.click(favoritesLink);

    // Verify favorites count in header
    expect(screen.getByText('1')).toBeInTheDocument();

    // Navigate back to products
    const productsLink = screen.getByRole('link', { name: /products/i });
    await user.click(productsLink);

    // Verify favorite state is maintained
    await waitFor(() => {
      const favoriteButton = screen.getAllByLabelText('Remove from favorites')[0];
      expect(favoriteButton).toBeInTheDocument();
    });
  });
});
