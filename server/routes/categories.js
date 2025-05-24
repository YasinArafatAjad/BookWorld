import express from 'express'
import Book from '../models/Book.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

// @route   GET /api/categories
// @desc    Get all unique categories
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Find all unique categories from books
    const categories = await Book.distinct('categories')
    
    res.json(categories)
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/categories/:category/books
// @desc    Get books by category
// @access  Public
router.get('/:category/books', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10,
      sort = 'createdAt', 
      order = 'desc' 
    } = req.query
    
    const category = req.params.category
    
    // Build query
    const query = { categories: { $in: [category] } }
    
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
      category,
    })
  } catch (error) {
    console.error('Get books by category error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router