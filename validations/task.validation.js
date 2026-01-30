import { body } from "express-validator";

export const createTaskValidation = [
  body("title").notEmpty().withMessage("Task title required"),
  body("projectId").isMongoId().withMessage("Invalid project id"),
];
