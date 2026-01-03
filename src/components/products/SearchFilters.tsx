import React from 'react';
import { useDebounce } from '../../hooks';
import SearchInput from '../common/SearchInput';
import Button from '../common/Button';

interface SearchFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  categories: string[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  onClearFilters: () => void;
  productsCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onClearFilters,
  productsCount,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = React.useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  // Update local state when prop changes (for clear filters)
  React.useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Call the parent callback when debounced value changes
  React.useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  const hasActiveFilters = localSearchTerm || selectedCategory || sortBy !== 'name';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={localSearchTerm}
            onChange={setLocalSearchTerm}
            placeholder="Search products by name or description..."
            className="w-full"
          />
        </div>

        <div className="lg:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="input-field w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:w-48">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="input-field w-full"
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {hasActiveFilters && (
          <div className="lg:w-auto">
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full lg:w-auto"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <span>
          {productsCount} product{productsCount !== 1 ? 's' : ''} found
        </span>
        {hasActiveFilters && (
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-primary-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            Filters applied
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
