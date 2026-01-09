import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
  },

  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    select: false
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },

  mobileno: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]{10}$/, "Please enter a valid mobile number"]
  },
  refreshToken: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, { timestamps: true });


// Hash password  
// Tum async function (next) use kar rahe ho.
// 👉 Mongoose rule:
// Agar function async hai → next automatically pass nahi hota
// Agar next chahiye → function async nahi honi chahiye

// Hash password (FIXED)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 12);
// });
// userSchema.pre("save", function (next) {
//   console.log("pre mein hoon")
//   if (!this.isModified("password")) return next();

//   bcrypt.hash(this.password, 12)
//     .then(hash => {
//       this.password = hash;
//       next();
//     })
//     .catch(err => next(err));

// });


// Compare password
userSchema.methods.comparePass = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

  return resetToken; // plain token (email me jayega)
};


const User = mongoose.model("User", userSchema);
export default User;
