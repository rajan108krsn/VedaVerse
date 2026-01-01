import catchAsync from "../middlewares/catchAsync.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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
    secure: true, // true in production (HTTPS)
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
    maxAge: 7 * 24 * 60 * 60 * 1000,
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

export const refreshAccessToken = catchAsync(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

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
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json(
    new ApiResponse(200, "Access token refreshed", {
      accessToken: newAccessToken,
    })
  );
});
