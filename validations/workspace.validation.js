import { body, param } from "express-validator";

export const createWorkspaceValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Workspace name is required")
    .isLength({ min: 3 })
    .withMessage("Workspace name must be at least 3 characters"),
];

export const workspaceIdParamValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid workspace id"),
];

export const addMemberValidation = [
  param("id").isMongoId().withMessage("Invalid workspace id"),
  body("userId").isMongoId().withMessage("Invalid user id"),
];