import Task from "../models/task.js";
import Project from "../models/project.js";

export const createTaskService = async ({ title, projectId, assignee }) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  return Task.create({
    title,
    project: projectId,
    assignee,
  });
};

export const getProjectTasksService = async (projectId) => {
  return Task.find({ project: projectId }).populate("assignee", "name email");
};
