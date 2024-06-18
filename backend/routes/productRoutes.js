// import express from "express";
// import formidable from "express-formidable";
const express = require("express");
//const formidable = require("express-formidable");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
// controllers
// import {
//   addProduct,
//   updateProductDetails,
//   removeProduct,
//   fetchProducts,
//   fetchProductById,
//   fetchAllProducts,
//   addProductReview,
//   fetchTopProducts,
//   fetchNewProducts,
//   filterProducts,
// } from "../controllers/productController.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
// import checkId from "../middlewares/checkId.js";
// import productController from "../controllers/productController.js";
const checkId = require("../middlewares/checkId");
const productController = require("../controllers/productController");

router
  .route("/")
  //.get(fetchProducts)
  .post(auth.authenticate, auth.authorizeAdmin, productController.addNewProduct)
  .get(productController.getAllProduct)
  .post(productController.addNewProduct)

// router.route("/allproducts").get(fetchAllProducts);
// router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

// router.get("/top", fetchTopProducts);
// router.get("/new", fetchNewProducts);

// router
//   .route("/:id")
//   .get(fetchProductById)
//   .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
//   .delete(authenticate, authorizeAdmin, removeProduct);

// router.route("/filtered-products").post(filterProducts);

// export default router;
module.exports = router;
