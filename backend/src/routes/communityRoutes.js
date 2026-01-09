import express from "express";
import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
} from "../controllers/communityController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getAllPosts);

// Protected
router.post("/create", protect, createPost);
router.post("/:id/like", protect, toggleLike);
router.post("/:id/comment", protect, addComment);

export default router;
