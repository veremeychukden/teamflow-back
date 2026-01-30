import mongoose from "mongoose";
import {
  TASK_STATUS,
  TASK_STATUS_VALUES,
} from "../constants/taskStatuses.js";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: TASK_STATUS_VALUES,
      default: TASK_STATUS.TODO,
    },
  },
  { collection: "tasks" }
);

export default mongoose.model("Task", taskSchema);
