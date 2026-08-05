import { getAuth } from "@clerk/express";
import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";

import { resourceController } from "../controllers/resourceController";
import { validateResource } from "../middleware/validateResource";

const router = Router();

function requireSignedInUser(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    res.status(401).json({
      message: "User is not authenticated",
    });
    return;
  }

  next();
}

// Guests can view resources.
router.get("/", resourceController.getResources);

// Only logged-in users can add, update, or delete resources.
router.post(
  "/",
  requireSignedInUser,
  validateResource,
  resourceController.createResource
);

router.put(
  "/:id",
  requireSignedInUser,
  validateResource,
  resourceController.updateResource
);

router.delete(
  "/:id",
  requireSignedInUser,
  resourceController.deleteResource
);

export default router;