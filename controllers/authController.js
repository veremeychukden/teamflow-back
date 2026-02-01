import User from "../models/user.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import asyncHandler from "../utils/asyncHandler.js";
import RefreshToken from "../models/refreshToken.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    email: user.email,
    role: user.role,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      accessToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401);
    throw new Error("No refresh token");
  }

  const storedToken = await RefreshToken.findOne({ token });
  if (!storedToken) {
    res.status(403);
    throw new Error("Invalid refresh token");
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const accessToken = generateAccessToken(decoded.id);

  res.json({ accessToken });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await RefreshToken.deleteOne({ token });
  }

  res.clearCookie("refreshToken").json({ message: "Logged out" });
});
