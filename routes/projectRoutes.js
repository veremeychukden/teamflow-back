import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProject,
  getWorkspaceProjects,
} from "../controllers/projectController.js";
import {
  createProjectValidation,
} from "../validations/project.validation.js";
import validate  from "../middleware/validationMiddleware.js";
import taskRoutes from "./taskRoutes.js";
import { hasProjectAccess } from "../middleware/projectMiddleware.js";

const router = express.Router({ mergeParams: true });
router.use("/:projectId/tasks", protect, hasProjectAccess, taskRoutes);

router.post(
  "/",
  protect,
  createProjectValidation,
  validate,
  createProject
);

router.get(
  "/",
  protect,
  getWorkspaceProjects
);

export default router;
