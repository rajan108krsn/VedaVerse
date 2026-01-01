import express from "express";
import validate from '../middlewares/validateMiddleware.js';
import {loginUser, registerUser} from '../controllers/authController.js'
const router = express.Router();

router.post('/register',validate.registerInput, registerUser);
router.post('/login',validate.loginInput,loginUser);

router.post("/refresh-token", refreshAccessToken);


router.post('/logout',(req,res)=>{
	res.send("Log Out Route")
});
router.post('/forget-password',(req,res)=>{
	res.send("Forget Password Route")
})
router.post('/reset-password',(req,res)=>{
	res.send("Reset Password Route")
})
router.patch('/update-password',(req,res)=>{
	res.send("Update Password Route")
})
router.delete('/delet-account',(req,res)=>{
	res.send("Delete Account Route")
})
router.get("/me",(req,res) =>{
	res.send("Me Route")
})

export default router;
