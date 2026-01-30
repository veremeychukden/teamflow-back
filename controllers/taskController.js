import asyncHandler from "../utils/asyncHandler.js";
import {
  createTaskService,
  getProjectTasksService,
} from "../services/taskService.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskService({
    title: req.body.title,
    projectId: req.body.projectId,
    assignee: req.body.assignee,
  });

  res.status(201).json(task);
});

export const getProjectTasks = asyncHandler(async (req, res) => {
  const tasks = await getProjectTasksService(req.params.projectId);
  res.json(tasks);
});
