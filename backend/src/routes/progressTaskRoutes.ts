import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { getAuth } from "@clerk/express";

import {
  addProgressTask,
  deleteProgressTask,
  getProgressTasks,
  markProgressTaskDone,
} from "../controllers/progressTaskController";

export const progressTaskRoutes = Router();

function requireSignedInUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    res.status(401).json({
      message: "You must be logged in.",
    });
    return;
  }

  next();
}

progressTaskRoutes.get(
  "/",
  requireSignedInUser,
  getProgressTasks
);

progressTaskRoutes.post(
  "/",
  requireSignedInUser,
  addProgressTask
);

progressTaskRoutes.patch(
  "/:id/done",
  requireSignedInUser,
  markProgressTaskDone
);

progressTaskRoutes.delete(
  "/:id",
  requireSignedInUser,
  deleteProgressTask
);