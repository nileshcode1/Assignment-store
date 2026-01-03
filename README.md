# NeuraStore - Product Dashboard

A modern, scalable product dashboard built with React, Redux Toolkit, and TypeScript. This application demonstrates best practices in frontend development with comprehensive testing, responsive design, and clean architecture.

## 🚀 Features

- **Product Listing**: Browse products in a responsive grid layout
- **Advanced Search & Filtering**:
  - Debounced search by product name/description
  - Filter by category
  - Sort by price (ascending/descending), rating, or name
- **Product Details**: Detailed product view with full information
- **Favorites Management**: Add/remove products from favorites with persistent state
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Error Handling**: Graceful error states with retry functionality
- **Loading States**: Skeleton screens and loading indicators
- **State Management**: Redux Toolkit with proper async handling
- **Testing**: Comprehensive unit and integration tests

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit with RTK Query patterns
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with custom components
- **API Integration**: Axios with interceptors
- **Testing**: Vitest + React Testing Library
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript strict mode

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, etc.)
│   ├── layout/          # Layout components (Header, Footer)
│   └── products/        # Product-specific components
├── pages/               # Page components
├── store/               # Redux store configuration
│   ├── slices/          # Redux slices
│   └── selectors.ts     # Memoized selectors
├── services/            # API services
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
└── test/                # Test utilities and setup
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd neura-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## 🧪 Testing

The application includes comprehensive testing coverage:

### Unit Tests

- Redux slices and actions
- Individual components
- Utility functions
- Custom hooks

### Integration Tests

- Complete user workflows
- API integration
- State management across components
- Navigation and routing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

## 🎨 Design System

The application uses a consistent design system built with Tailwind CSS:

### Color Palette

- **Primary**: Blue shades for main actions and branding
- **Gray**: Various shades for text and backgrounds
- **Red**: For favorites and error states
- **Yellow**: For ratings and warnings

### Components

- **Cards**: Consistent shadow and border radius
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Inputs**: Focused states with proper accessibility
- **Loading States**: Skeleton screens and spinners

## 🔧 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com):

- **Products**: Fetch all products, single product, by category
- **Categories**: Get all available categories
- **Error Handling**: Retry mechanisms and user feedback
- **Loading States**: Proper loading indicators

### API Service Features

- Axios interceptors for request/response logging
- Centralized error handling
- TypeScript interfaces for all responses
- Timeout configuration

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: 320px and up
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

### Grid System

- Products: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop) → 4 columns (large)
- Flexible layouts that adapt to screen size
- Touch-friendly interactions on mobile

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🔄 State Management

Redux Toolkit implementation with:

### Slices

- **Products**: Manages product data, filters, and search
- **Favorites**: Handles favorite products with persistence

### Selectors

- Memoized selectors for performance
- Filtered and sorted product lists
- Derived state calculations

### Async Actions

- Thunks for API calls
- Proper error handling
- Loading state management

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Memoization**: React.memo and useMemo where appropriate
- **Debounced Search**: Reduces API calls during typing
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Analysis**: Optimized build output

## 🔒 Error Handling

Comprehensive error handling strategy:

- **API Errors**: User-friendly error messages with retry options
- **Network Issues**: Offline detection and recovery
- **Invalid Routes**: 404 handling
- **Component Errors**: Error boundaries (can be added)

## 🚢 Deployment

The application is optimized for deployment on:

- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Render**: Full-stack hosting

### Build Process

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Assignment Requirements Checklist

- ✅ React with functional components and hooks
- ✅ Redux Toolkit for state management
- ✅ Fake Store API integration
- ✅ Product listing page with responsive grid
- ✅ Search & filter functionality (debounced search)
- ✅ Product detail page with favorites
- ✅ Favorites page with management
- ✅ Redux thunks and selectors
- ✅ Unit tests for Redux slices and components
- ✅ Integration tests for user workflows
- ✅ Responsive and accessible design
- ✅ Clean, modular code structure
- ✅ Modern frontend best practices

