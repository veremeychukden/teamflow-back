import asyncHandler from "../utils/asyncHandler.js";
import {
  createProjectService,
  getWorkspaceProjectsService,
} from "../services/projectService.js";

export const createProject = asyncHandler(async (req, res) => {
  const project = await createProjectService({
    name: req.body.name,
    workspaceId: req.body.workspaceId,
    user: req.user,
  });

  res.status(201).json(project);
});

export const getWorkspaceProjects = asyncHandler(async (req, res) => {
  const projects = await getWorkspaceProjectsService(req.params.workspaceId);
  res.json(projects);
});
