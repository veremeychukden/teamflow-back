import Task from "../models/task.js";
import Project from "../models/project.js";
import APIFeatures from "../utils/apiFeatures.js";

export const createTaskService = async ({
  projectId,
  title,
  assignee,
  userId,
}) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  // ❗ ACCESS CHECK

  return Task.create({
    title,
    project: projectId,
    assignee,
  });
};

export const getProjectTasksService = async (projectId, query) => {
  const features = new APIFeatures(
    Task.find({ project: projectId }),
    query
  )
    .filter()
    .sort()
    .paginate();

  return await features.query;
};
