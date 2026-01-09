import express from "express";
import upload from "../middlewares/multer.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { createBhakta,getAllBhaktas, getSingleBhakta,updateBhakta,deleteBhakta } from "../controllers/bhaktaController.js";
const router = express.Router();


router.post(
  "/create",
  protect,
  restrictTo("admin"),
  createBhakta
);

router.get("/", getAllBhaktas);        // public
router.get("/:id", getSingleBhakta);   // public

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  updateBhakta
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  deleteBhakta
);


export default router;