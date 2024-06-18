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

/**
 *  @swagger
 * /:
 * get:
 *    summary: Check if get method is working
 *    description: Check if get method is working
 *    responses: 
 *        200:
 *            description: to test if get method is working
 * 
 */
router.get("/", (req, res) => {
  res.send("API is running...");
});

router.post("/register", userController.registerUser);

router
  .route("/")
  .post(userController.createUser)
  .get(auth.authenticate, auth.authorizeAdmin, userController.getAllUsers);

router.post("/auth", userController.loginUser);
router.post("/logout", userController.logoutCurrentUser);

router
  .route("/profile")
  .get(auth.authenticate, userController.getCurrentUserProfile)
  .put(auth.authenticate, userController.updateCurrentUserProfile);

// ADMIN ROUTES 👇
router
  .route("/:id")
  .delete(auth.authenticate, auth.authorizeAdmin, userController.deleteUserById)
  // import mongoose from "mongoose";
  .get(auth.authenticate, auth.authorizeAdmin, userController.getUserById)
  .put(auth.authenticate, auth.authorizeAdmin, userController.updateUserById);

module.exports = router;
