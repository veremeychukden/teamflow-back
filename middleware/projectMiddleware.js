import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.js";
import Workspace from "../models/workspace.js";

export const hasProjectAccess = asyncHandler(async (req, res, next) => {
  const { projectId, workspaceId } = req.params;

  const project = await Project.findById(projectId);
  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (project.workspace.toString() !== workspaceId.toString()) {
    res.status(403);
    throw new Error("Project does not belong to workspace");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    res.status(404);
    throw new Error("Workspace not found");
  }

  const isMember = workspace.members.some(
    id => id.toString() === req.user._id.toString()
  );

  if (!isMember) {
    res.status(403);
    throw new Error("Access denied");
  }

  req.project = project;
  next();
});
