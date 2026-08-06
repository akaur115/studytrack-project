import { Router } from "express";
import { resourceController } from "../controllers/resourceController";
import { validateResource } from "../middleware/validateResource";

export const resourceRoutes = Router();

resourceRoutes.get("/", resourceController.getResources);
resourceRoutes.post("/", validateResource, resourceController.createResource);
resourceRoutes.put("/:id", validateResource, resourceController.updateResource);
resourceRoutes.delete("/:id", resourceController.deleteResource);

export default resourceRoutes;