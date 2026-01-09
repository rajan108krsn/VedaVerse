import express from "express";
import upload from "../middlewares/multer.js";
import { protect, restrictTo } from "../middlewares/authMiddleware.js";
import { createTemple,getAllTemples, getMyTemples,getTempleById,updateTemple,deleteTemple,deleteTempleImage } from "../controllers/templeController.js";

const router = express.Router();
router.get("/my-temples", protect, getMyTemples); 

router.post(
  "/create",
  protect,
   upload.array("images", 5),
  createTemple
);

router.patch(
  "/:id",
  protect,
  restrictTo("admin"),
  upload.array("images", 5), // optional new images
  updateTemple
);

router.delete(
  "/:id",
  protect,
  restrictTo("admin"),
  deleteTemple
);

router.delete(
  "/:id/image",
  protect,
  restrictTo("admin"),
  deleteTempleImage
);


router.get("/", getAllTemples);
router.get("/:id", getTempleById);


export default router;
