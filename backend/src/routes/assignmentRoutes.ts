import express, {
 type NextFunction,
 type Request,
 type Response,
} from "express";
import { getAuth } from "@clerk/express";

import {
 createAssignment,
 deleteAssignment,
 getAssignments,
 updateAssignment,
} from "../controllers/assignmentController";

import { validateAssignment } from "../middleware/validateAssignment";

const router = express.Router();

function requireAuthentication(
 req: Request,
 res: Response,
 next: NextFunction
) {
  const { userId } = getAuth(req);
  
  if (!userId) {
   res.status(401).json({
     message: "You must be logged in to manage assignments.",
   });
   return;
  }
  next();
}

router.use(requireAuthentication);
router.get("/", getAssignments);
router.post("/", validateAssignment, createAssignment);
router.patch("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);

export default router;