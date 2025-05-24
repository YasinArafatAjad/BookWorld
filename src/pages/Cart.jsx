import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'

const Cart = () => {
  const { items, total, removeItem, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderNote, setOrderNote] = useState('')

  // Calculate shipping fee based on total
  const shippingFee = total >= 35 ? 0 : 5.99
  
  // Calculate order total
  const orderTotal = total + shippingFee

  const handleCheckout = () => {
    // Save order note to local storage if needed
    if (orderNote.trim()) {
      localStorage.setItem('orderNote', orderNote)
    }
    
    // Navigate to checkout
    navigate('/checkout')
  }

  return (
    <>
      <Helmet>
        <title>Your Cart | BookWorld</title>
        <meta name="description" content="Review your shopping cart and proceed to checkout. Free shipping on orders over $35." />
      </Helmet>

      <div className="container mx-auto container-padding py-12">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-8">
          Your Shopping Cart
        </h1>

        {items.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any books to your cart yet.
            </p>
            <Link to="/" className="btn-primary">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                      Cart Items ({items.length})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Clear Cart
                    </button>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div 
                          key={item._id}
                          className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Product Image */}
                          <div className="w-full sm:w-24 h-32 flex-shrink-0">
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-md"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-grow">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {item.author}
                            </p>
                            <p className="text-primary-500 font-medium mb-3">
                              ${item.price.toFixed(2)}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                                  aria-label="Decrease quantity"
                                >
                                  <FiMinus size={16} />
                                </button>
                                <span className="w-8 text-center text-gray-700 dark:text-gray-300">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                  aria-label="Increase quantity"
                                >
                                  <FiPlus size={16} />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-red-500 hover:text-red-600 transition-colors duration-200"
                                aria-label="Remove item"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right font-medium text-gray-900 dark:text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Order Notes (Optional)
                </h3>
                <textarea
                  value={orderNote}
                  onChange={(e) => setOrderNote(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                  placeholder="Add any special instructions or requests for your order"
                  rows={3}
                />
              </div>

              {/* Back to Shopping */}
              <div className="mt-8">
                <Link 
                  to="/"
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
                >
                  <FiArrowLeft className="mr-2" /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {total < 35 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                      Add ${(35 - total).toFixed(2)} more to qualify for free shipping
                    </div>
                  )}
                </div>

                <div className="flex justify-between mb-8">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-primary-500">
                    ${orderTotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout <FiArrowRight className="ml-2" />
                </motion.button>

                <div className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart