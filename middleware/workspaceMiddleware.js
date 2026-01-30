import Workspace from "../models/workspace.js";
import { ROLES } from "../constants/roles.js";
import asyncHandler from "../utils/asyncHandler.js";

export const hasWorkspaceAccess = asyncHandler( async(req, res, next) => {
  const workspace = await Workspace.findById(req.params.id);

  if (!workspace) {
    res.status(404);
    throw new Error("Workspace not found");
  }

  const isMember = workspace.members.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!isMember && req.user.role !== ROLES.ADMIN) {
    res.status(403);
    throw new Error("Access denied");
  }

  req.workspace = workspace;
  next();
});

export const isWorkspaceOwner = asyncHandler( async(req, res, next) => {
  if (
    req.workspace.owner.toString() !== req.user._id.toString() &&
    req.user.role !== ROLES.ADMIN
  ) {
    res.status(403);
    throw new Error("Only workspace owner allowed");
  }
  next();
});

