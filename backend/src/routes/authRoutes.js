import express from "express";
import validate from '../middlewares/validateMiddleware.js';
import {getMe, loginUser, logoutUser, registerUser,refreshAccessToken,forgotPassword,resetPassword} from '../controllers/authController.js'
import { protect } from "../middlewares/authMiddleware.js";
import { changePassword } from "../controllers/authController.js";
const router = express.Router();

router.post('/register',validate.registerInput, registerUser);
router.post('/login',validate.loginInput,loginUser);
router.post('/logout',logoutUser);

router.post("/refresh-token", refreshAccessToken);
router.get("/me",protect,getMe);
router.patch("/update-password", protect, changePassword);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.delete('/delet-account',(req,res)=>{
	res.send("Delete Account Route")
})


export default router;
