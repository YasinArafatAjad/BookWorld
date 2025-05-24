import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import BookCard from '../components/ui/BookCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import SectionTitle from '../components/ui/SectionTitle'

const Category = () => {
  const { category } = useParams()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        // Mock data for demonstration
        const mockBooks = [
          {
            _id: '1',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            price: 24.99,
            coverImage: 'https://images.pexels.com/photos/1765033/pexels-photo-1765033.jpeg?auto=compress&cs=tinysrgb&w=800',
            rating: 4.5,
            reviewCount: 1289,
            stock: 15,
            description: 'Between life and death there is a library.',
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
            description: 'Transform your life with tiny changes.',
          },
        ]
        setBooks(mockBooks)
      } catch (err) {
        console.error('Error fetching books:', err)
        setError('Failed to fetch books. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [category])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 dark:text-gray-300">{error}</p>
      </div>
    )
  }

  const categoryTitle = category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <>
      <Helmet>
        <title>{categoryTitle} Books | BookWorld</title>
        <meta name="description" content={`Browse our collection of ${categoryTitle.toLowerCase()} books at BookWorld.`} />
      </Helmet>

      <div className="container mx-auto py-16 px-4">
        <SectionTitle 
          title={categoryTitle} 
          subtitle={`Browse our collection of ${categoryTitle.toLowerCase()} books`}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {books.map(book => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Category