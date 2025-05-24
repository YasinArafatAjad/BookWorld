import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to attach the auth token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error('Network error:', error)
      return Promise.reject(new Error('Network error. Please check your connection and try again.'))
    }

    const originalRequest = error.config
    
    // If the error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Clear the invalid token and redirect to login
      localStorage.removeItem('authToken')
      
      // Only redirect if we're in the browser environment
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api