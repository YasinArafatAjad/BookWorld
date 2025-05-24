import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiLock } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  })

  // Calculate shipping based on total
  const shippingFee = total >= 35 ? 0 : 5.99
  const orderTotal = total + shippingFee

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // TODO: Implement actual payment processing
      // For now, just simulate a successful order
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Clear cart and redirect to success page
      clearCart()
      navigate('/order-success')
    } catch (error) {
      console.error('Checkout error:', error)
      // Handle error appropriately
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto container-padding py-16 text-center">
        <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
          Your cart is empty
        </h2>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Checkout | BookWorld</title>
        <meta name="description" content="Complete your book purchase securely at BookWorld. Fast shipping and secure payment options available." />
      </Helmet>

      <div className="container mx-auto container-padding py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <FiLock className="text-primary-500 mr-2" />
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
              Secure Checkout
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Shipping Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="label">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="address" className="label">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="label">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="label">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="zipCode" className="label">ZIP Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="label">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
                    Payment Method
                  </h2>
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="label">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="1234 5678 9012 3456"
                            required={paymentMethod === 'card'}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiryDate" className="label">Expiry Date</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="input"
                              placeholder="MM/YY"
                              required={paymentMethod === 'card'}
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="label">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              className="input"
                              placeholder="123"
                              required={paymentMethod === 'card'}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'cod' && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Pay with cash upon delivery. Additional fee of $2.00 applies for COD orders.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Processing...' : `Place Order - $${(orderTotal + (paymentMethod === 'cod' ? 2 : 0)).toFixed(2)}`}
                </motion.button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center">
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {shippingFee === 0 ? (
                        <span className="text-green-500">Free</span>
                      ) : (
                        `$${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">COD Fee</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        $2.00
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-medium pt-2">
                    <span className="text-gray-900 dark:text-white">Total</span>
                    <span className="text-primary-500">
                      ${(orderTotal + (paymentMethod === 'cod' ? 2 : 0)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-400">
                  By completing your purchase you agree to our{' '}
                  <a href="/terms" className="text-primary-500 hover:text-primary-600">
                    Terms of Service
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Checkout