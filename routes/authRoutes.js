import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import validate from "../middleware/validationMiddleware.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

export default router;
