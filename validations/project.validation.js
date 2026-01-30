import { body, param } from "express-validator";

export const createProjectValidation = [
  body("name").notEmpty().withMessage("Project name is required"),
  body("workspaceId").isMongoId().withMessage("Invalid workspace id"),
];

export const projectIdValidation = [
  param("id").isMongoId().withMessage("Invalid project id"),
];
