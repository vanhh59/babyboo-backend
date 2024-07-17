import asyncHandler from "../middlewares/asyncHandler.js";
import userServices from "../services/userService.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userServices.registerUser(username, email, password, res);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.loginUser(email, password, res);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  try {
    await userServices.logoutCurrentUser(res);

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await userServices.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await userServices.getCurrentUserProfile(req, res);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isStaff: updatedUser.isStaff,
      isManager: updatedUser.isManager,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};