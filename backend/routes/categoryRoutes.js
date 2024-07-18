import express from "express";
const router = express.Router();
import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin, authorizeForManage } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, authorizeForManage, createCategory);
router.route("/:categoryId").put(authenticate, authorizeForManage, updateCategory);
router
  .route("/:categoryId")
  .delete(authenticate, authorizeForManage, removeCategory);

router.route("/categories").get(listCategory);
router.route("/:id").get(readCategory);

export default router;
