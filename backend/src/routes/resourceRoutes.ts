import { Router } from "express";
import { resourceController } from "../controllers/resourceController";

const router = Router();

router.get("/", resourceController.getResources);

router.post("/", resourceController.createResource);

router.put("/:id", resourceController.updateResource);

router.delete("/:id", resourceController.deleteResource);

export default router;