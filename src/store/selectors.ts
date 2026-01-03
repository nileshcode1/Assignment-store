import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './index';

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectCategories = (state: RootState) => state.products.categories;
export const selectSearchTerm = (state: RootState) => state.products.searchTerm;
export const selectSelectedCategory = (state: RootState) => state.products.selectedCategory;
export const selectSortBy = (state: RootState) => state.products.sortBy;

export const selectFavorites = (state: RootState) => state.favorites.items;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm, selectSelectedCategory, selectSortBy],
  (products, searchTerm, selectedCategory, sortBy) => {
    let filteredProducts = [...products];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCategory && selectedCategory !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.category === selectedCategory
      );
    }

    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filteredProducts;
  }
);

export const selectFavoriteIds = createSelector(
  [selectFavorites],
  (favorites) => new Set(favorites.map(product => product.id))
);

export const selectIsFavorite = createSelector(
  [selectFavoriteIds, (_, productId: number) => productId],
  (favoriteIds, productId) => favoriteIds.has(productId)
);

export const selectProductById = createSelector(
  [selectProducts, (_, productId: number) => productId],
  (products, productId) => products.find(product => product.id === productId)
);

export const selectFavoritesCount = createSelector(
  [selectFavorites],
  (favorites) => favorites.length
);

export const selectProductsCount = createSelector(
  [selectFilteredProducts],
  (products) => products.length
);
