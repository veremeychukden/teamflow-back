import asyncHandler from "../utils/asyncHandler.js";
import {
  createWorkspaceService,
  getUserWorkspacesService,
  deleteWorkspaceService,
  addMemberToWorkspaceService
} from "../services/workspaceService.js";

export const createWorkspace = asyncHandler(async (req, res) => {
  const workspace = await createWorkspaceService({
    name: req.body.name,
    userId: req.user._id,
  });

  res.status(201).json(workspace);
});

export const getMyWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await getUserWorkspacesService(req.user._id);
  res.json(workspaces);
});

export const getWorkspaceById = asyncHandler(async (req, res) => {
  res.json(req.workspace);
});

export const addMemberToWorkspace = asyncHandler(async (req, res) => {
  const workspace = await addMemberToWorkspaceService({
    workspace: req.workspace,
    userId: req.body.userId,
  });

  res.json(workspace);
});

export const deleteWorkspace = asyncHandler(async (req, res) => {
  await deleteWorkspaceService(req.workspace);
  res.status(204).send();
});
