import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer, {
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
  fetchProducts,
} from '../productsSlice';
import { productApi } from '../../../services/api';
import { mockProducts } from '../../../test/utils';

// Mock the API
vi.mock('../../../services/api');
const mockedProductApi = vi.mocked(productApi);

describe('productsSlice', () => {
  let store: ReturnType<typeof configureStore<{ products: ReturnType<typeof productsReducer> }>>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });
  });

  describe('reducers', () => {
    it('should set search term', () => {
      const searchTerm = 'test search';
      store.dispatch(setSearchTerm(searchTerm));
      
      const state = store.getState().products;
      expect(state.searchTerm).toBe(searchTerm);
    });

    it('should set selected category', () => {
      const category = 'electronics';
      store.dispatch(setSelectedCategory(category));
      
      const state = store.getState().products;
      expect(state.selectedCategory).toBe(category);
    });

    it('should set sort by', () => {
      const sortBy = 'price-asc';
      store.dispatch(setSortBy(sortBy));
      
      const state = store.getState().products;
      expect(state.sortBy).toBe(sortBy);
    });

    it('should clear filters', () => {
      // Set some filters first
      store.dispatch(setSearchTerm('test'));
      store.dispatch(setSelectedCategory('electronics'));
      store.dispatch(setSortBy('price-desc'));
      
      // Clear filters
      store.dispatch(clearFilters());
      
      const state = store.getState().products;
      expect(state.searchTerm).toBe('');
      expect(state.selectedCategory).toBe('');
      expect(state.sortBy).toBe('name');
    });
  });

  describe('async thunks', () => {
    it('should fetch products successfully', async () => {
      mockedProductApi.getAllProducts.mockResolvedValue(mockProducts);
      
      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockProducts);
      expect(state.error).toBe(null);
    });

    it('should handle fetch products error', async () => {
      const errorMessage = 'Failed to fetch products';
      mockedProductApi.getAllProducts.mockRejectedValue(new Error(errorMessage));
      
      await store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(false);
      expect(state.items).toEqual([]);
      expect(state.error).toBe(errorMessage);
    });

    it('should set loading state during fetch', () => {
      mockedProductApi.getAllProducts.mockImplementation(
        () => new Promise(() => {}) // Never resolves
      );
      
      store.dispatch(fetchProducts());
      
      const state = store.getState().products;
      expect(state.loading).toBe(true);
    });
  });
});
