import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
  }
};

const authorizeStaff = (req, res, next) => {
  if (req.user && req.user.isStaff) {
    next();
  } else {
    res.status(401).send("Not authorized as an staff.");
  }
};

const authorizeManager = (req, res, next) => {
  if (req.user && req.user.isManager) {
    next();
  } else {
    res.status(401).send("Not authorized as an manager.");
  }
};

const authorizeForManage = (req, res, next) => {
  if (req.user && (req.user.isManager || req.user.isStaff || req.user.isAdmin)) {
    next();
  } else {
    res.status(403).send("Access denied. Only manager or staff can perform this action.");
  }
}

export { authenticate, authorizeAdmin, authorizeStaff, authorizeManager, authorizeForManage };