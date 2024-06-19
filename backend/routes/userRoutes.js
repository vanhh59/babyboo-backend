// import express from "express";
const express = require("express");
// import {
//   registerUser,
//   createUser,
//   loginUser,
//   logoutCurrentUser,
//   getAllUsers,
//   getCurrentUserProfile,
//   updateCurrentUserProfile,
//   deleteUserById,
//   getUserById,
//   updateUserById,
// } from "../controllers/userController.js";
const userController = require('../controllers/userController');
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router
  .post("/register", userController.registerUser);

router
  .route("/")
  .post(userController.createUser)
  .get(auth.authenticate, auth.authorizeAdmin, userController.getAllUsers);

router.post("/auth", userController.loginUser);
router.post("/logout", userController.logoutCurrentUser);

// router
//   .route("/profile")
//   .get(authenticate, getCurrentUserProfile)
//   .put(authenticate, updateCurrentUserProfile);

// // ADMIN ROUTES 👇
// router
//   .route("/:id")
//   .delete(authenticate, authorizeAdmin, deleteUserById)
//   .get(authenticate, authorizeAdmin, getUserById)
//   .put(authenticate, authorizeAdmin, updateUserById);

// export default router;
module.exports = router;
