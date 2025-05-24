import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart } from 'react-icons/fi'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { useCart } from '../../contexts/CartContext'

const BookCard = ({ book }) => {
  const { addItem } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(book)
  }

  // Format price with 2 decimal places
  const formattedPrice = book.price.toFixed(2)

  return (
    <motion.div 
      className="group card h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${book._id}`} className="block h-full">
        <div className="relative overflow-hidden h-56 sm:h-64 md:h-72">
          <LazyLoadImage
            src={book.coverImage}
            alt={book.title}
            effect="blur"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            wrapperClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-opacity duration-300" />
          
          <motion.button
            className="absolute bottom-4 right-4 p-2 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Add to cart"
          >
            <FiShoppingCart size={18} />
          </motion.button>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg line-clamp-1 text-gray-900 dark:text-gray-100 group-hover:text-primary-500 transition-colors duration-200">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {book.author}
              </p>
            </div>
            <span className="text-lg font-semibold text-primary-500">
              ৳{formattedPrice}
            </span>
          </div>
          
          {book.rating && (
            <div className="flex items-center mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(book.rating)
                        ? 'text-accent-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                ({book.reviewCount})
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default BookCard