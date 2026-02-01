import Task from "../models/task.js";

export const hasTaskAccess = async (req, res, next) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (task.project.toString() !== req.params.projectId) {
    res.status(403);
    throw new Error("Task does not belong to project");
  }

  req.task = task;
  next();
};
