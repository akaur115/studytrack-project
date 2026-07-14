import { Router } from "express";

import {
  addProgressTask,
  deleteProgressTask,
  getProgressTasks,
  markProgressTaskDone,
} from "../controllers/progressTaskController";

export const progressTaskRoutes = Router();

progressTaskRoutes.get("/", getProgressTasks);
progressTaskRoutes.post("/", addProgressTask);
progressTaskRoutes.patch("/:id/done", markProgressTaskDone);
progressTaskRoutes.delete("/:id", deleteProgressTask);