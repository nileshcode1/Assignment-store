import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { formatCurrency, truncateText, generateStarRating } from '../../utils';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onAddToFavorites: (product: Product) => void;
  isFavorite: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToFavorites,
  isFavorite,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToFavorites(product);
  };

  return (
    <div className="card group animate-fade-in">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-400 hover:text-red-500'
            } shadow-md hover:shadow-lg`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg
              className="w-5 h-5"
              fill={isFavorite ? 'currentColor' : 'none'}
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
          </button>
        </div>

        <div className="p-4">
          <span className="inline-block px-2 py-1 text-xs font-medium text-primary-600 bg-primary-50 rounded-full mb-2">
            {product.category}
          </span>

          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {truncateText(product.title, 60)}
          </h3>

          <div className="flex items-center mb-2">
            <span className="text-yellow-400 text-sm mr-1">
              {generateStarRating(product.rating.rate)}
            </span>
            <span className="text-sm text-gray-600">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {truncateText(product.description, 100)}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
