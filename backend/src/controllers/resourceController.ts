import { Request, Response } from "express";
import { resourceService } from "../services/resourceService";

export const resourceController = {
  async getResources(req: Request, res: Response) {
    try {
      const resources = await resourceService.getAllResources();

      res.json(resources);
    } catch (error) {
      console.error("GET resources error:", error);

      res.status(500).json({
        message: "Failed to get resources",
      });
    }
  },

  async createResource(req: Request, res: Response) {
    try {
      const { name, category, source } = req.body;

      const resource = await resourceService.createResource(
        name,
        category,
        source
      );

      res.status(201).json(resource);
    } catch (error) {
      console.error("CREATE resource error:", error);

      res.status(500).json({
        message: "Failed to create resource",
      });
    }
  },

  async updateResource(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, category, source, saved } = req.body;

      const resource = await resourceService.updateResource(
        id,
        name,
        category,
        source,
        saved
      );

      res.json(resource);
    } catch (error) {
      console.error("UPDATE resource error:", error);

      res.status(500).json({
        message: "Failed to update resource",
      });
    }
  },

  async deleteResource(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await resourceService.deleteResource(id);

      res.json({
        message: "Resource deleted",
      });
    } catch (error) {
      console.error("DELETE resource error:", error);

      res.status(500).json({
        message: "Failed to delete resource",
      });
    }
  },
};