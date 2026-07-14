import express from "express";
import { createAssignment, deleteAssignment, getAssignments, updateAssignment, } from "../controllers/assignmentController.js";
import { validateAssignment } from "../middleware/validateAssignment.js";
const router = express.Router();
router.get("/", getAssignments);
router.post("/", validateAssignment, createAssignment);
router.patch("/:id", updateAssignment);
router.delete("/:id", deleteAssignment);
export default router;
//# sourceMappingURL=assignmentRoutes.js.map