import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectFavorites } from '../store/selectors';
import { clearFavorites } from '../store/slices/favoritesSlice';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/common/Button';

const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600">
            {favorites.length} product{favorites.length !== 1 ? 's' : ''} in your favorites
          </p>
        </div>
        {favorites.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClearFavorites}
          >
            Clear All
          </Button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No favorites yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start browsing products and add them to your favorites.
          </p>
          <div className="mt-6">
            <Button
              variant="primary"
              onClick={() => window.location.href = '/'}
            >
              Browse Products
            </Button>
          </div>
        </div>
      ) : (
        <ProductGrid products={favorites} />
      )}
    </div>
  );
};

export default FavoritesPage;
