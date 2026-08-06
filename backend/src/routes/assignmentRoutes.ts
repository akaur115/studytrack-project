import { Router } from "express";

import {
  createAssignment,
  deleteAssignment,
  getAssignments,
  updateAssignment,
} from "../controllers/assignmentController";

export const assignmentRoutes = Router();

assignmentRoutes.get("/", getAssignments);
assignmentRoutes.post("/", createAssignment);
assignmentRoutes.patch("/:id", updateAssignment);
assignmentRoutes.delete("/:id", deleteAssignment);