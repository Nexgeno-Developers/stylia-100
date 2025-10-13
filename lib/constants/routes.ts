// App routes constants
export const ROUTES = {
  HOME: '/',
  NEW_ARRIVALS: '/new-arrivals',
  WOMEN: '/women',
  COLLECTIONS: '/collections',
  SALE: '/sale',
  CONTACT: '/contact',
  MAGAZINE: '/magazine',
  PRODUCTS: '/products',
  PRODUCT: (slug: string) => `/product/${slug}`,
  CART: '/cart',
  WISHLIST: '/wishlist',
  SEARCH: '/search',
  SEARCH_RESULTS: '/search-results',
  SEARCH_RESULTS_PRODUCT: (slug: string) => `/search-results/${slug}`,
  SEARCH_RESULTS_PRODUCT_DETAIL: (slug: string) => `/search-results/${slug}`,
  SEARCH_RESULTS_PRODUCT_DETAIL_DETAIL: (slug: string) =>
    `/search-results/${slug}`,
  CHECKOUT: '/checkout',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ORDERS: '/orders',
  ABOUT: '/about',
  // CONTACT: '/contact',
  // MAGAZINE: '/magazine',
} as const

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  PRODUCTS: {
    LIST: '/api/products',
    DETAIL: (id: string) => `/api/products/${id}`,
    SEARCH: '/api/products/search',
    CATEGORIES: '/api/products/categories',
  },
  ORDERS: {
    LIST: '/api/orders',
    CREATE: '/api/orders',
    DETAIL: (id: string) => `/api/orders/${id}`,
  },
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    REMOVE: '/api/cart/remove',
    UPDATE: '/api/cart/update',
    CLEAR: '/api/cart/clear',
  },
} as const
