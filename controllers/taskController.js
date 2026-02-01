import asyncHandler from "../utils/asyncHandler.js";
import {
  createTaskService,
  getProjectTasksService,
} from "../services/taskService.js";

export const createTask = asyncHandler(async (req, res) => {
  const task = await createTaskService({
    projectId: req.params.projectId,
    title: req.body.title,
    assignee: req.body.assignee,
    userId: req.user._id,
  });

  res.status(201).json(task);
});

export const getProjectTasks = asyncHandler(async (req, res) => {
  const tasks = await getProjectTasksService(
    req.params.projectId,
    req.query
  );

  res.json(tasks);
});

export const getTaskById = asyncHandler(async (req, res) => {
  res.json(req.task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = req.task;

  task.title = req.body.title ?? task.title;
  task.status = req.body.status ?? task.status;
  task.assignee = req.body.assignee ?? task.assignee;

  await task.save();
  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  await req.task.deleteOne();
  res.json({ message: "Task deleted" });
});