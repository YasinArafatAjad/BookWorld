import express from 'express'
import Book from '../models/Book.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/books
// @desc    Get all books with pagination and filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      sort = 'createdAt', 
      order = 'desc',
      search,
      minPrice,
      maxPrice,
      featured,
      newRelease,
      bestseller
    } = req.query

    // Build query
    const query = {}
    
    // Add filters to query
    if (category) {
      query.categories = { $in: [category] }
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }
    
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (newRelease === 'true') {
      query.newRelease = true
    }
    
    if (bestseller === 'true') {
      query.bestseller = true
    }
    
    // Set sort options
    const sortOptions = {}
    sortOptions[sort] = order === 'desc' ? -1 : 1
    
    // Execute query with pagination
    const books = await Book.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()
    
    // Get total count for pagination
    const count = await Book.countDocuments(query)
    
    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalBooks: count,
    })
  } catch (error) {
    console.error('Get books error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/books/:id
// @desc    Get a single book by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    
    res.json(book)
  } catch (error) {
    console.error('Get book error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/books
// @desc    Create a new book
// @access  Private/Admin
router.post('/', auth, admin, async (req, res) => {
  try {
    const newBook = new Book(req.body)
    const savedBook = await newBook.save()
    
    res.status(201).json(savedBook)
  } catch (error) {
    console.error('Create book error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/books/:id
// @desc    Update a book
// @access  Private/Admin
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' })
    }
    
    res.json(updatedBook)
  } catch (error) {
    console.error('Update book error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   DELETE /api/books/:id
// @desc    Delete a book
// @access  Private/Admin
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    
    await book.remove()
    
    res.json({ message: 'Book removed' })
  } catch (error) {
    console.error('Delete book error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   POST /api/books/:id/reviews
// @desc    Create a new review
// @access  Private
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body
    
    const book = await Book.findById(req.params.id)
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }
    
    // Check if user already reviewed
    const alreadyReviewed = book.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    )
    
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You already reviewed this book' })
    }
    
    // Create new review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    }
    
    // Add to reviews array
    book.reviews.push(review)
    
    // Calculate new rating
    book.calculateRating()
    
    // Save book with new review
    await book.save()
    
    res.status(201).json({ message: 'Review added' })
  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/books/featured
// @desc    Get featured books
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredBooks = await Book.find({ featured: true })
      .limit(8)
      .sort({ createdAt: -1 })
    
    res.json(featuredBooks)
  } catch (error) {
    console.error('Get featured books error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/books/new-releases
// @desc    Get new releases
// @access  Public
router.get('/new-releases', async (req, res) => {
  try {
    const newReleases = await Book.find({ newRelease: true })
      .limit(8)
      .sort({ createdAt: -1 })
    
    res.json(newReleases)
  } catch (error) {
    console.error('Get new releases error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/books/bestsellers
// @desc    Get bestsellers
// @access  Public
router.get('/bestsellers', async (req, res) => {
  try {
    const bestsellers = await Book.find({ bestseller: true })
      .limit(8)
      .sort({ createdAt: -1 })
    
    res.json(bestsellers)
  } catch (error) {
    console.error('Get bestsellers error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router