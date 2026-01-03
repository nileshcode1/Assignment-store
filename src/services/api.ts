import axios from 'axios';
import type { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
  },

  getLimitedProducts: async (limit: number): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products?limit=${limit}`);
    return response.data;
  },

  getSortedProducts: async (sort: 'asc' | 'desc'): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`/products?sort=${sort}`);
    return response.data;
  },
};

export default apiClient;
