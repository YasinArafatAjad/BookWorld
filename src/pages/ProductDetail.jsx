import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiMinus, FiPlus, FiShoppingCart, FiStar, FiClock } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../utils/api'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  
  const [book, setBook] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setLoading(true)

        // For demo purposes, we'll simulate API responses with mock data
        // In a real app, you would use:
        // const response = await api.get(`/books/${id}`)
        // setBook(response.data)

        // Mock data
        const mockBooks = {
          '1': {
            _id: '1',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 24.99,
            coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.5,
            reviewCount: 1289,
            stock: 15,
            description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
            categories: ['Fiction', 'Fantasy', 'Contemporary'],
            pages: 304,
            publisher: 'Viking',
            publishedDate: 'August 13, 2020',
            language: 'English',
            isbn: '9780525559474',
            reviews: [
              { id: 1, user: 'James Wilson', rating: 5, date: '2023-05-15', comment: 'One of the most beautiful and thought-provoking books I have read in a long time.' },
              { id: 2, user: 'Sarah Parker', rating: 4, date: '2023-04-22', comment: 'A fascinating concept executed wonderfully. It made me reflect on my own life choices.' },
              { id: 3, user: 'Michael Brown', rating: 5, date: '2023-03-10', comment: 'Haig has a way with words that captivates you from the first page to the last.' },
            ],
          },
          '2': {
            _id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            price: 19.99,
            coverImage: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.8,
            reviewCount: 3452,
            stock: 28,
            description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
            categories: ['Self-Help', 'Personal Development', 'Psychology'],
            pages: 320,
            publisher: 'Avery',
            publishedDate: 'October 16, 2018',
            language: 'English',
            isbn: '9780735211292',
            reviews: [
              { id: 1, user: 'Rebecca Thompson', rating: 5, date: '2023-06-10', comment: 'This book has completely changed how I approach personal development. Practical and insightful.' },
              { id: 2, user: 'Daniel Lee', rating: 4, date: '2023-05-30', comment: 'Clear explains complex concepts in such a simple way. Highly recommended.' },
              { id: 3, user: 'Emily Johnson', rating: 5, date: '2023-04-15', comment: 'If you read one self-improvement book this year, make it this one.' },
            ],
          },
          '3': {
            _id: '3',
            title: 'Dune',
            author: 'Frank Herbert',
            price: 18.99,
            coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.7,
            reviewCount: 2890,
            stock: 20,
            description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for.',
            categories: ['Science Fiction', 'Fantasy', 'Classic'],
            pages: 688,
            publisher: 'Ace',
            publishedDate: 'September 1, 1965',
            language: 'English',
            isbn: '9780441172719',
            reviews: [
              { id: 1, user: 'Thomas Moore', rating: 5, date: '2023-06-22', comment: 'A masterpiece of science fiction that remains relevant and powerful decades after publication.' },
              { id: 2, user: 'Olivia Davis', rating: 4, date: '2023-05-18', comment: 'Complex world-building and characters that stay with you long after reading.' },
              { id: 3, user: 'Ryan Smith', rating: 5, date: '2023-04-05', comment: 'One of the greatest sci-fi novels ever written. Herbert created a universe that feels alive.' },
            ],
          },
        }

        // Simulate network delay
        setTimeout(() => {
          if (mockBooks[id]) {
            setBook(mockBooks[id])
            setLoading(false)
          } else {
            setError('Book not found')
            setLoading(false)
          }
        }, 500)

      } catch (err) {
        console.error('Error fetching book details:', err)
        setError('Failed to fetch book details. Please try again later.')
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [id])

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= (book?.stock || 10)) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (book) {
      // Add the book with the selected quantity
      for (let i = 0; i < quantity; i++) {
        addItem(book)
      }
      
      // Navigate to cart
      navigate('/cart')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !book) {
    return (
      <div className="container mx-auto container-padding py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error || 'Book not found'}</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{`${book.title} by ${book.author} | BookWorld`}</title>
        <meta name="description" content={`${book.description.substring(0, 155)}...`} />
        <meta property="og:title" content={`${book.title} by ${book.author} | BookWorld`} />
        <meta property="og:description" content={`${book.description.substring(0, 155)}...`} />
        <meta property="og:image" content={book.coverImage} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="container mx-auto container-padding py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Left Column - Book Image */}
          <motion.div 
            className="relative overflow-hidden rounded-lg shadow-lg h-[500px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Column - Book Details */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {book.categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-xs font-medium bg-primary-100 text-primary-800 px-2 py-1 rounded dark:bg-primary-900 dark:text-primary-200"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              {book.title}
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              by <span className="font-medium text-primary-500">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`${i < Math.round(book.rating) ? 'fill-current' : ''} mr-1`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                {book.rating} ({book.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${book.price.toFixed(2)}
              </p>
              {book.stock > 0 ? (
                <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  In Stock ({book.stock} available)
                </p>
              ) : (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                  <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  Out of Stock
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4 text-sm font-medium text-gray-700 dark:text-gray-300">Quantity:</span>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= book.stock}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              disabled={book.stock <= 0}
              className="btn-primary flex items-center justify-center mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiShoppingCart className="mr-2" />
              Add to Cart
            </motion.button>

            {/* Delivery Info */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6">
              <div className="flex items-start mb-3">
                <FiClock className="mt-1 mr-3 text-primary-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Fast Delivery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Orders ship within 1-2 business days</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Free shipping on orders over $35
              </p>
            </div>

            {/* Book Details Table */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">Book Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600 dark:text-gray-400">Pages:</p>
                <p className="text-gray-900 dark:text-white">{book.pages}</p>
                
                <p className="text-gray-600 dark:text-gray-400">Publisher:</p>
                <p className="text-gray-900 dark:text-white">{book.publisher}</p>
                
                <p className="text-gray-600 dark:text-gray-400">Publication Date:</p>
                <p className="text-gray-900 dark:text-white">{book.publishedDate}</p>
                
                <p className="text-gray-600 dark:text-gray-400">Language:</p>
                <p className="text-gray-900 dark:text-white">{book.language}</p>
                
                <p className="text-gray-600 dark:text-gray-400">ISBN:</p>
                <p className="text-gray-900 dark:text-white">{book.isbn}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs Section */}
        <div className="mt-16">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex space-x-8">
              <button
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({book.reviews.length})
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  {book.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{review.user}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                      </div>
                      <div className="flex text-accent-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`${i < review.rating ? 'fill-current' : ''} mr-1`}
                            size={16}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail