import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getProjectTasks } from "../controllers/taskController.js";
import { createTaskValidation } from "../validations/task.validation.js";
import validate from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createTaskValidation,
  validate,
  createTask
);

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

export default router;
