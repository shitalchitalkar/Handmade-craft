
import express from "express";
import * as mainControllers from "../controllers/mainControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import {isAdmin} from"../middleware/isAdmin.js";

const router = express.Router();

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

//ORDER
router.post('/orders',verifyToken,mainControllers.createOrder);//new order create
router.get('/orders',verifyToken,mainControllers.getMyOrders);
router.get('/orders',verifyToken,mainControllers.getArtisanOrders); 
router.get('/orders',verifyToken,mainControllers.getAllOrders);
router.put('/orders/:id',verifyToken,mainControllers.updateOrderStatus);//update order
router.delete('/orders/:id',verifyToken,mainControllers.deleteOrder);
//Admin
router.put('/admin/approve/artisan/:id',verifyToken,isAdmin,mainControllers.approveArtisan);
router.put('/admin/approve/product/:id',verifyToken,isAdmin,mainControllers.approveProduct);

//module.exports = router;
export default router;