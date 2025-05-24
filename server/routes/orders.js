import express from 'express'
import Order from '../models/Order.js'
import Book from '../models/Book.js'
import { auth, admin } from '../middleware/auth.js'

const router = express.Router()

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      total,
      notes,
    } = req.body
    
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }
    
    // Create order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      total,
      notes,
    })
    
    // Save order
    const createdOrder = await order.save()
    
    // Update book stock
    for (const item of orderItems) {
      const book = await Book.findById(item.book)
      
      if (book) {
        book.stock -= item.quantity
        await book.save()
      }
    }
    
    // Add order to user's orders array
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { orders: createdOrder._id } }
    )
    
    res.status(201).json(createdOrder)
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/orders
// @desc    Get all orders (admin)
// @access  Private/Admin
router.get('/', auth, admin, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status,
      sort = 'createdAt', 
      order = 'desc' 
    } = req.query
    
    // Build query
    const query = {}
    
    if (status) {
      query.status = status
    }
    
    // Set sort options
    const sortOptions = {}
    sortOptions[sort] = order === 'desc' ? -1 : 1
    
    // Execute query with pagination
    const orders = await Order.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'name email')
      .exec()
    
    // Get total count for pagination
    const count = await Order.countDocuments(query)
    
    res.json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalOrders: count,
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/orders/myorders
// @desc    Get logged in user's orders
// @access  Private
router.get('/myorders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
    
    res.json(orders)
  } catch (error) {
    console.error('Get my orders error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order' })
    }
    
    res.json(order)
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/orders/:id/pay
// @desc    Update order to paid
// @access  Private
router.put('/:id/pay', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    // Update order
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    }
    
    const updatedOrder = await order.save()
    
    res.json(updatedOrder)
  } catch (error) {
    console.error('Update order pay error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// @route   PUT /api/orders/:id/status
// @desc    Update order status (admin)
// @access  Private/Admin
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status, trackingNumber } = req.body
    
    const order = await Order.findById(req.params.id)
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    // Update order status
    order.status = status
    
    // Add tracking number if provided
    if (trackingNumber) {
      order.trackingNumber = trackingNumber
    }
    
    // Set delivered date if status is 'delivered'
    if (status === 'delivered') {
      order.deliveredAt = Date.now()
    }
    
    const updatedOrder = await order.save()
    
    res.json(updatedOrder)
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router