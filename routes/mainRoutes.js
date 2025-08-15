const express = require('express');
const router = express.Router();
const mainControllers = require('../controllers/mainControllers');
const isAdmin = require('../middleware/isAdmin');
const User =require("../models/userModel");


// USER
router.post('/users', mainControllers.createUser);
router.get('/users', mainControllers.getUsers);

//artisan
router.get('/artisans',mainControllers.getArtisans);


// CATEGORY
router.post('/categories', mainControllers.createCategory);
router.get('/categories', mainControllers.getCategories);

// PRODUCT
router.post('/products', mainControllers.createProduct);
router.get('/products', mainControllers.getProducts);

//Admin
router.put('/admin/approve/artisan/:id',isAdmin,mainControllers.approveArtisan);
router.put('/admin/approve/product/:id',isAdmin,mainControllers.approveProduct);

module.exports = router;