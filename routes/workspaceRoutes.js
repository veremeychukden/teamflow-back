import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  addMemberToWorkspace,
  deleteWorkspace
} from "../controllers/workspaceController.js";
import {
  createWorkspaceValidation,
  workspaceIdParamValidation,
  addMemberValidation,
} from "../validations/workspace.validation.js";
import validate from "../middleware/validationMiddleware.js";
import {
  hasWorkspaceAccess,
  isWorkspaceOwner
} from "../middleware/workspaceMiddleware.js";

import projectRoutes from "./projectRoutes.js";

const router = express.Router();
router.use(
  "/:workspaceId",
  protect,
  workspaceIdParamValidation,
  validate,
  hasWorkspaceAccess
);

router.get("/:workspaceId", getWorkspaceById);
router.post(
  "/",
  protect,
  createWorkspaceValidation,
  validate,
  createWorkspace
);

router.get(
  "/",
  protect,
  getMyWorkspaces
);

router.post(
  "/:workspaceId/members",
  isWorkspaceOwner,
  addMemberValidation,
  validate,
  addMemberToWorkspace
);

router.delete(
  "/:workspaceId",
  isWorkspaceOwner,
  deleteWorkspace
);
router.use("/:workspaceId/projects", projectRoutes);


export default router;
