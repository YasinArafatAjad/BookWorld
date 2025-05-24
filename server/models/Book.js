import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
    required: true,
  }],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  coverImage: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 1,
  },
  publisher: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  newRelease: {
    type: Boolean,
    default: false,
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  reviewCount: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Virtual for formatted price
bookSchema.virtual('formattedPrice').get(function() {
  return `$${this.price.toFixed(2)}`
})

// Update timestamps on document update
bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Calculate average rating when a review is added or updated
bookSchema.methods.calculateRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0
    this.reviewCount = 0
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating = totalRating / this.reviews.length
    this.reviewCount = this.reviews.length
  }
}

const Book = mongoose.model('Book', bookSchema)

export default Book