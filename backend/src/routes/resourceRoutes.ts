import { Router } from "express";
import { resourceController } from "../controllers/resourceController";
import { validateResource } from "../middleware/validateResource";

const router = Router();

router.get("/", resourceController.getResources);

router.post("/", validateResource, resourceController.createResource);

router.put("/:id", validateResource, resourceController.updateResource);

router.delete("/:id", resourceController.deleteResource);

export default router;