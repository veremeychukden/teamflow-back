import { body, param } from "express-validator";

export const createProjectValidation = [
  body("name").notEmpty().withMessage("Project name is required")
];

export const projectIdValidation = [
  param("id").isMongoId().withMessage("Invalid project id"),
];
