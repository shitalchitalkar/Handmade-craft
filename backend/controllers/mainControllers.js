const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Order=require('../models/orderModel');

// ==================== USER ====================

// Create User
exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


///artisan only 

// Get All Artisans
exports.getArtisans = async (req, res) => {
    try {
        const artisans = await User.find({ role: 'artisan' });
        res.status(200).json(artisans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== CATEGORY ====================

// Create Category
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ==================== PRODUCT ====================

// Create Product
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('category')  // Category details
            .populate('artisan'); // Artisan (User) details
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve artisan
exports.approveArtisan = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.isApproved = true;
        await user.save();

        res.json({ message: "Artisan approved successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Approve product
exports.approveProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        product.isApproved = true;
        await product.save();

        res.json({ message: "Product approved successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// 1. Create Order (Customer)


exports.createOrder = async (req, res) => {
  try {
    const { product, quantity, artisan } = req.body;

    // Product fetch
    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Artisan check
    const artisanData = await User.findById(artisan);
    if (!artisanData) {
      return res.status(404).json({ message: "Artisan not found" });
    }

    // Token मधून customer id घ्या
    const customerId = req.user.id;

    const totalPrice = productData.price * quantity;

    const newOrder = new Order({
      customer: customerId,
      product,
      artisan,
      quantity,
      totalPrice,
      status: "pending",
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    console.error(err); // console मध्ये error पाहा
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




/*
exports.createOrder = async (req, res) => {
    try {
        const { product, quantity, artisan } = req.body;

        const productData = await Product.findById(product);
        if (!productData) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const totalPrice = productData.price * quantity;

        const newOrder = new Order({
            customer: req.user._id,
            product,
            artisan,
            quantity,
            totalPrice,
            status: 'pending'
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};*/

// 2. Get My Orders (Customer)
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user._id })
            .populate('product')
            .populate('artisan', 'name email');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 3. Get Orders for Artisan (Seller)
exports.getArtisanOrders = async (req, res) => {
    try {
        const orders = await Order.find({ artisan: req.user._id })
            .populate('product')
            .populate('customer', 'name email');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 4. Get All Orders (Admin)
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('product')
            .populate('customer', 'name email')
            .populate('artisan', 'name email');

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 5. Update Order Status (Admin / Artisan)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// 6. Delete Order (Admin / Customer cancel)
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        await order.deleteOne();
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

