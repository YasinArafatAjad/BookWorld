import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/ui/SectionTitle'
import BookCard from '../components/ui/BookCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import api from '../utils/api'

const categories = [
  { id: 'fiction', name: 'Fiction', image: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'non-fiction', name: 'Non-Fiction', image: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'fantasy', name: 'Fantasy', image: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'biography', name: 'Biography', image: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=800' },
]

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [newReleases, setNewReleases] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        
        // For demo purposes, we'll simulate API responses with mock data
        // In a real app, you would use:
        // const featuredResponse = await api.get('/books/featured')
        // const newReleasesResponse = await api.get('/books/new-releases')

        // Mock data
        const mockFeaturedBooks = [
          {
            _id: '1',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 24.99,
            coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.5,
            reviewCount: 1289,
            stock: 15,
            description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
          },
          {
            _id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            price: 19.99,
            coverImage: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.8,
            reviewCount: 3452,
            stock: 28,
            description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day.',
          },
          {
            _id: '3',
            title: 'Dune',
            author: 'Frank Herbert',
            price: 18.99,
            coverImage: 'https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.7,
            reviewCount: 2890,
            stock: 20,
            description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
          },
          {
            _id: '4',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            price: 12.99,
            coverImage: 'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.4,
            reviewCount: 1856,
            stock: 12,
            description: 'The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession for the beautiful Daisy Buchanan.',
          },
        ]

        const mockNewReleases = [
          {
            _id: '5',
            title: 'The Silent Patient',
            author: 'Alex Michaelides',
            price: 22.99,
            coverImage: 'https://images.pexels.com/photos/4170629/pexels-photo-4170629.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.6,
            reviewCount: 987,
            stock: 18,
            description: 'The Silent Patient is a shocking psychological thriller of a woman\'s act of violence against her husband—and of the therapist obsessed with uncovering her motive.',
          },
          {
            _id: '6',
            title: 'The Vanishing Half',
            author: 'Brit Bennett',
            price: 25.99,
            coverImage: 'https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.3,
            reviewCount: 754,
            stock: 9,
            description: 'The Vignes twin sisters will always be identical. But after growing up together in a small, southern black community and running away at age sixteen, it\'s not just the shape of their daily lives that is different as adults, it\'s everything.',
          },
          {
            _id: '7',
            title: 'Where the Crawdads Sing',
            author: 'Delia Owens',
            price: 23.99,
            coverImage: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.7,
            reviewCount: 1328,
            stock: 22,
            description: 'Perfect for fans of Barbara Kingsolver and Karen Russell, Where the Crawdads Sing is at once an exquisite ode to the natural world, a heartbreaking coming-of-age story, and a surprising tale of possible murder.',
          },
          {
            _id: '8',
            title: 'Educated',
            author: 'Tara Westover',
            price: 21.99,
            coverImage: 'https://images.pexels.com/photos/762687/pexels-photo-762687.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.5,
            reviewCount: 1128,
            stock: 15,
            description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
          },
        ]

        setFeaturedBooks(mockFeaturedBooks)
        setNewReleases(mockNewReleases)
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Failed to fetch books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="container mx-auto container-padding py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>BookWorld | Your Premier Online Bookstore</title>
        <meta name="description" content="Discover the best books at BookWorld - fiction, non-fiction, bestsellers, and new releases. Free shipping on orders over $35." />
        <meta name="keywords" content="bookworld, book world, books, bookstore, fiction, non-fiction, bestsellers, reading" />
        <meta property="og:title" content="BookWorld | Your Premier Online Bookstore" />
        <meta property="og:description" content="Discover the best books at BookWorld - fiction, non-fiction, bestsellers, and new releases. Free shipping on orders over $35." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://BookWorld.com" />
        <meta property="og:image" content="https://BookWorld.com/og-image.jpg" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
        ></div>
        
        <div className="container mx-auto container-padding relative z-20">
          <motion.div
            className="max-w-lg text-white"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-heading font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover Your Next Great Read
            </motion.h1>
            <motion.p 
              className="text-lg mb-8 text-gray-200 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              From bestsellers to hidden gems, find the perfect book for every moment in your life.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/category/new-releases" className="btn-primary">
                Explore New Releases
              </Link>
              <Link to="/category/bestsellers" className="btn-secondary bg-white/20 hover:bg-white/30 text-white">
                View Bestsellers
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto container-padding">
          <SectionTitle 
            title="Featured Books" 
            subtitle="Handpicked recommendations from our editors"
          />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredBooks.map(book => (
              <motion.div key={book._id} variants={fadeInUp}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/category/featured" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
              View All Featured Books <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto container-padding">
          <SectionTitle 
            title="Browse by Category" 
            subtitle="Find your next read by exploring our collections"
          />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div key={category.id} variants={fadeInUp}>
                <Link 
                  to={`/category/${category.id}`}
                  className="block group relative h-64 rounded-lg overflow-hidden shadow-md"
                >
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                    <h3 className="text-white text-xl font-medium">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto container-padding">
          <SectionTitle 
            title="New Releases" 
            subtitle="The latest additions to our collection"
          />
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {newReleases.map(book => (
              <motion.div key={book._id} variants={fadeInUp}>
                <BookCard book={book} />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/category/new-releases" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium">
              View All New Releases <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-500 text-white">
        <div className="container mx-auto container-padding">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-lg mb-8 text-primary-100">
              Sign up for our newsletter to receive book recommendations, author interviews, and special offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent-400"
                required
              />
              <button
                type="submit"
                className="btn-accent"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home