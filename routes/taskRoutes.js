import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createTask, getProjectTasks, getTaskById, deleteTask, updateTask } from "../controllers/taskController.js";
import { createTaskValidation } from "../validations/task.validation.js";
import validate from "../middleware/validationMiddleware.js";
import { hasTaskAccess } from "../middleware/taskMiddleware.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  protect,
  createTaskValidation,
  validate,
  createTask
);

router.get(
  "/",
  protect,
  getProjectTasks
);

router.get(
  "/:taskId",
  protect,
  hasTaskAccess,
  getTaskById
);

router.put(
  "/:taskId",
  protect,
  hasTaskAccess,
  updateTask
);

router.delete(
  "/:taskId",
  protect,
  hasTaskAccess,
  deleteTask
);

export default router;
