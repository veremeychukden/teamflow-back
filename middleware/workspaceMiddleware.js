import Workspace from "../models/workspace.js";
import { ROLES } from "../constants/roles.js";
import asyncHandler from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const hasWorkspaceAccess = asyncHandler(async (req, res, next) => {
  const { workspaceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
    res.status(400);
    throw new Error("Invalid workspace id");
  }

  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    res.status(404);
    throw new Error("Workspace not found");
  }

  const userId = req.user._id.toString();

  const isMember =
    workspace.owner.toString() === userId ||
    workspace.members.some(m => m.toString() === userId);

  if (!isMember) {
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

