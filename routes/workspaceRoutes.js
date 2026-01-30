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

const router = express.Router();

router.post(
  "/",
  protect,
  createWorkspaceValidation,
  validate,
  createWorkspace
);

router.get("/", protect, getMyWorkspaces);

router.get(
  "/:id",
  protect,
  workspaceIdParamValidation,
  validate,
  hasWorkspaceAccess,
  getWorkspaceById
);

router.post(
  "/:id/members",
  protect,
  addMemberValidation,
  validate,
  hasWorkspaceAccess,
  isWorkspaceOwner,
  addMemberToWorkspace
);

router.delete(
  "/:id",
  protect,
  workspaceIdParamValidation,
  validate,
  hasWorkspaceAccess,
  isWorkspaceOwner,
  deleteWorkspace
);

export default router;
