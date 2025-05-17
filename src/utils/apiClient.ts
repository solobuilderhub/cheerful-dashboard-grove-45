
// Mock API client utility for handling API requests
// In a real app, this would connect to actual API endpoints

/**
 * Mock API response delay to simulate network requests
 */
export const mockApiDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Error class for API errors
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Generic type for API response
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Mock API client methods to simulate API calls
 */
export const apiClient = {
  /**
   * Mock GET request
   */
  async get<T>(endpoint: string, mockData: T, errorChance: number = 0): Promise<ApiResponse<T>> {
    await mockApiDelay();
    
    // Simulate random errors with errorChance probability
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to fetch data', 500);
    }
    
    return {
      data: mockData,
      success: true,
    };
  },
  
  /**
   * Mock POST request
   */
  async post<T, R>(endpoint: string, data: T, mockResponse: R, errorChance: number = 0): Promise<ApiResponse<R>> {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to create data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  },
  
  /**
   * Mock PUT request
   */
  async put<T, R>(endpoint: string, data: T, mockResponse: R, errorChance: number = 0): Promise<ApiResponse<R>> {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to update data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  },
  
  /**
   * Mock DELETE request
   */
  async delete<T>(endpoint: string, mockResponse: T, errorChance: number = 0): Promise<ApiResponse<T>> {
    await mockApiDelay();
    
    if (Math.random() < errorChance) {
      throw new ApiError('Failed to delete data', 500);
    }
    
    return {
      data: mockResponse,
      success: true,
    };
  }
};
