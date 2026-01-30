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

const router = express.Router();

router.post(
  "/",
  protect,
  createProjectValidation,
  validate,
  createProject
);

router.get(
  "/workspace/:workspaceId",
  protect,
  getWorkspaceProjects
);

export default router;
