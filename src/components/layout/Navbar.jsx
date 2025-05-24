import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart, FiSun, FiMoon, FiMenu, FiX, FiUser } from 'react-icons/fi'
import { useTheme } from '../../contexts/ThemeContext'
import { useCart } from '../../contexts/CartContext'

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme()
  const { itemCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navbarClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled
      ? 'bg-white dark:bg-gray-900 shadow-md py-3 ' 
      : 'bg-transparent py-5 text-gray-700 dark:text-gray-100'
  }`

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fiction', path: '/category/fiction' },
    { name: 'Non-Fiction', path: '/category/non-fiction' },
    { name: 'New Releases', path: '/category/new-releases' },
    { name: 'Bestsellers', path: '/category/bestsellers' },
  ]

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-heading font-bold text-primary-500"
          >
            BookWorld
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-primary-500 hover:dark:text-primary-500 ${
                  location.pathname === link.path 
                    ? 'text-primary-500' 
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section (Cart, Theme, Admin) */}
          <div className="flex items-center space-x-4">
            {/* Admin Dashboard Link */}
            <Link
              to="/admin"
              className={`p-2 rounded-full  text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200`}
              aria-label="Admin Dashboard"
            >
              <FiUser size={20} />
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full outline-none text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className={`p-2 relative rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200`}
            >
              <FiShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="container mx-auto container-padding py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium transition-colors duration-200 hover:text-primary-500 ${
                    location.pathname === link.path 
                      ? 'text-primary-500' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/admin"
                className="block py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors duration-200"
              >
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar