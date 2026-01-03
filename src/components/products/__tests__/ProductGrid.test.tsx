import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import ProductGrid from '../ProductGrid';
import { renderWithProviders, mockProducts } from '../../../test/utils';

describe('ProductGrid', () => {
  it('renders products in a grid', () => {
    renderWithProviders(<ProductGrid products={mockProducts} />);

    mockProducts.forEach(product => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it('shows loading skeleton when loading', () => {
    renderWithProviders(<ProductGrid products={[]} loading={true} />);

    // Should show skeleton cards
    const skeletonCards = document.querySelectorAll('.animate-pulse');
    expect(skeletonCards.length).toBeGreaterThan(0);
  });

  it('shows empty state when no products', () => {
    renderWithProviders(<ProductGrid products={[]} loading={false} />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
  });

  it('renders correct number of products', () => {
    renderWithProviders(<ProductGrid products={mockProducts} />);

    const productCards = screen.getAllByRole('link');
    expect(productCards).toHaveLength(mockProducts.length);
  });

  it('applies correct grid classes', () => {
    const { container } = renderWithProviders(<ProductGrid products={mockProducts} />);

    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4');
  });
});
