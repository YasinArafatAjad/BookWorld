import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import api from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('authToken')
        
        if (!token) {
          setLoading(false)
          return
        }

        const response = await api.get('/auth/verify')
        
        if (response.data.user) {
          setUser(response.data.user)
        } else {
          localStorage.removeItem('authToken')
        }
      } catch (error) {
        console.error('Auth verification error:', error)
        localStorage.removeItem('authToken')
        setError('Authentication failed. Please log in again.')
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await api.post('/auth/login', { email, password })
      
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token)
        setUser(response.data.user)
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      setError(error.response?.data?.message || 'Login failed. Please try again.')
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  )
}