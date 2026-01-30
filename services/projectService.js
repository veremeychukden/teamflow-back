import Project from "../models/project.js";
import Workspace from "../models/workspace.js";

export const createProjectService = async ({ name, workspaceId, user }) => {
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new Error("Workspace not found");

  const isMember = workspace.members.some(
    (id) => id.toString() === user._id.toString()
  );
  if (!isMember) throw new Error("Access denied");

  return Project.create({
    name,
    workspace: workspaceId,
    owner: user._id,
  });
};

export const getWorkspaceProjectsService = async (workspaceId) => {
  return Project.find({ workspace: workspaceId });
};
