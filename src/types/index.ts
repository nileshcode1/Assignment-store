// Product types from Fake Store API
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Application state types
export interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'name';
}

export interface FavoritesState {
  items: Product[];
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Component prop types
export interface ProductCardProps {
  product: Product;
  onAddToFavorites: (product: Product) => void;
  isFavorite: boolean;
}

export interface SearchFiltersProps {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
  categories: string[];
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

// Utility types
export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
