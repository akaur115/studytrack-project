import { Router } from "express";
import {
  getCurrentUser,
  syncCurrentUser,
} from "../controllers/userController";

const router = Router();

// Create or update the logged-in user in the application database.
router.post("/me", syncCurrentUser);

// Return the logged-in user's application data.
router.get("/me", getCurrentUser);

export default router;