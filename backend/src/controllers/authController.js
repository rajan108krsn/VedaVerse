import catchAsync from "../middlewares/catchAsync.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import ms from 'ms'
import crypto from "crypto";
import sendEmail from "../utils/email.js";
dotenv.config();



export const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role, mobileno } = req.body;

  const existingUser = await User.findOne({
    $or: [{ email }, { mobileno }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    mobileno,
    role,
  });

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // refresh token → httpOnly cookie
  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
  path: "/api/auth",
});


  return res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileno: user.mobileno,
        role: user.role,
        active: user.active,
      },
    })
  );
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await user.comparePass(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // save refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
  });

  return res.status(200).json(
    new ApiResponse(200, "Login successful", {
      accessToken,
    })
  );
});

export const logoutUser = catchAsync(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  // Agar refresh token hi nahi hai
  if (!refreshToken) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Logged out successfully"));
  }

  // DB me refresh token delete karo
  const user = await User.findOne({ refreshToken });
  if (user) {
    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });
  }

  // Cookie clear karo
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,     // production me true
    sameSite: "strict",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

export const getMe = catchAsync(async (req, res) => {
  // protect middleware se aata hai
  const userId = req.user.id;

  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(
    new ApiResponse(200, "User fetched successfully", {
      user,
    })
  );
});

export const refreshAccessToken = catchAsync(async (req, res) => {
  console.log(req.cookies);
  const incomingRefreshToken = req.cookies?.refreshToken;
  console.log(incomingRefreshToken);

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  // verify refresh token
  let decoded;
  try {
    decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(403, "Refresh token mismatch");
  }

  // rotate tokens
  const newAccessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  // set new refresh token cookie
  //   res.cookies() --Server browser ko bol raha hai
  // “Ye cookie rakh lo”

  res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY),
  path: "/api/auth",
});

  // res.cookie("refreshToken", newRefreshToken, {
  //   httpOnly: true, 
  //           // javaScript se access nahi hoga:
  //   secure: true, 
  //           //  Cookie sirf HTTPS pe hi jayegi
  //   sameSite: "strict", 
  //            // Cookie dusri websites ke request pe nahi jayegi
  //   maxAge: ms(process.env.REFRESH_TOKEN_EXPIRY)
  // });

  return res.status(200).json(
    new ApiResponse(200, "Access token refreshed", {
      accessToken: newAccessToken,
    })
  );
});

export const changePassword = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePass(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  user.refreshToken = null;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});


export const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(200)
      .json(new ApiResponse(200, "If email exists, reset link sent"));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;
  console.log(resetUrl);

  const message = `
You requested a password reset.

Click the link below to reset your password:
${resetUrl}

This link will expire in 10 minutes.

If you did not request this, please ignore this email.
`;
// sendEmail(...) temporarily skipped

console.log("RESET LINK:", resetUrl);

return res
  .status(200)
  .json(
    new ApiResponse(200, "Password reset link generated")
  );


//   try {
//     await sendEmail({
//       email: user.email,
//       subject: "Password Reset Request - VedaVerse",
//       message,
//     });

//     return res
//       .status(200)
//       .json(new ApiResponse(200, "Password reset link sent to email"));
//   } catch (error) {
//   console.error("EMAIL ERROR 👉", error); // 👈 ADD THIS

//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;
//   await user.save({ validateBeforeSave: false });

//   throw new ApiError(500, "Email could not be sent");
// }

});



export const resetPassword = catchAsync(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  // password update
  user.password = newPassword;

  // cleanup
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // 🔥 revoke all sessions
  user.refreshToken = null;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successful"));
});

