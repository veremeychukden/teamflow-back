import Workspace from "../models/workspace.js";
import User from "../models/user.js";

export const createWorkspaceService = async ({ name, userId }) => {
  return Workspace.create({
    name,
    owner: userId,
    members: [userId],
  });
};

export const getUserWorkspacesService = async (userId) => {
  return Workspace.find({
    members: userId,
  }).populate("owner", "name email");
};

export const getWorkspaceByIdService = async (id) => {
  return Workspace.findById(id);
};

export const addMemberToWorkspaceService = async ({ workspace, userId }) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const alreadyMember = workspace.members.some(
    (id) => id.toString() === userId
  );
  if (alreadyMember) throw new Error("User already in workspace");

  workspace.members.push(userId);
  await workspace.save();

  return workspace;
};

export const deleteWorkspaceService = async (workspace) => {
  await workspace.deleteOne();
};
