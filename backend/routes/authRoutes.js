// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authControllers.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// public routes
router.post("/register", register);
router.post("/login", login);

// protected route (only logged in user)
router.get("/me", verifyToken, (req, res) => {
  res.json({ msg: "Your profile", user: req.user });
});

export default router;