const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

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
