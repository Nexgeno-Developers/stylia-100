// API service layer
import { API_ENDPOINTS } from '@/lib/constants'
import { Product, User, Order } from '@/lib/types'

class ApiService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || ''

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return this.request<Product[]>(API_ENDPOINTS.PRODUCTS.LIST)
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id))
  }

  async searchProducts(query: string): Promise<Product[]> {
    return this.request<Product[]>(
      `${API_ENDPOINTS.PRODUCTS.SEARCH}?q=${query}`
    )
  }

  // Auth methods
  async login(
    email: string,
    password: string
  ): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    )
  }

  async register(
    userData: Partial<User> & { password: string }
  ): Promise<{ user: User; token: string }> {
    return this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify(userData),
      }
    )
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>(API_ENDPOINTS.ORDERS.LIST)
  }

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    return this.request<Order>(API_ENDPOINTS.ORDERS.CREATE, {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }
}

export const apiService = new ApiService()
