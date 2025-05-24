import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  loading: false,
  error: null,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item._id === action.payload._id
      )

      let updatedItems

      if (existingItemIndex !== -1) {
        // Item already exists, increase quantity
        updatedItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      } else {
        // Add new item
        updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      // Calculate new total and count
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: updatedItems,
        total,
        itemCount
      }))

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(
        item => item._id !== action.payload
      )

      // Calculate new total and count
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: updatedItems,
        total,
        itemCount
      }))

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      }
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item => {
        if (item._id === action.payload.id) {
          return { ...item, quantity: action.payload.quantity }
        }
        return item
      })

      // Calculate new total and count
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      
      const itemCount = updatedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      )

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({
        items: updatedItems,
        total,
        itemCount
      }))

      return {
        ...state,
        items: updatedItems,
        total,
        itemCount,
      }
    }

    case 'CLEAR_CART':
      // Clear localStorage
      localStorage.removeItem('cart')
      
      return initialState

    case 'HYDRATE_CART':
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'HYDRATE_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error parsing saved cart', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{
      ...state,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContext