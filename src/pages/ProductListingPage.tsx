import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchProducts,
  fetchCategories,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  clearFilters,
} from '../store/slices/productsSlice';
import {
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  selectCategories,
  selectSearchTerm,
  selectSelectedCategory,
  selectSortBy,
  selectProductsCount,
} from '../store/selectors';
import ProductGrid from '../components/products/ProductGrid';
import SearchFilters from '../components/products/SearchFilters';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';

const ProductListingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectFilteredProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  const categories = useAppSelector(selectCategories);
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedCategory = useAppSelector(selectSelectedCategory);
  const sortBy = useAppSelector(selectSortBy);
  const productsCount = useAppSelector(selectProductsCount);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearchChange = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSortBy(sort as any));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleRetry = () => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  };

  if (error && products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Discover our wide range of quality products at great prices.
        </p>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        categories={categories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onSortChange={handleSortChange}
        onClearFilters={handleClearFilters}
        productsCount={productsCount}
      />

      {loading && products.length === 0 && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      <ProductGrid products={products} loading={loading && products.length === 0} />

      {loading && products.length > 0 && (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      )}
    </div>
  );
};

export default ProductListingPage;
