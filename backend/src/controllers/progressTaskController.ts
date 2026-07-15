import type { Request, Response } from "express";
import { progressTaskService } from "../services/progressTaskService.js";
import { progressTaskValidation } from "../validation/progressValidation.js";

export async function getProgressTasks(req: Request, res: Response) {
  const tasks = await progressTaskService.getAll();
  res.json(tasks);
}

export async function addProgressTask(req: Request, res: Response) {
  const result = progressTaskValidation.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Progress task is not valid",
    });
  }

  const task = await progressTaskService.create(result.data);
  res.status(201).json(task);
}

export async function markProgressTaskDone(req: Request, res: Response) {
  const id = Number(req.params.id);
  const task = await progressTaskService.markDone(id);
  res.json(task);
}

export async function deleteProgressTask(req: Request, res: Response) {
  const id = Number(req.params.id);
  await progressTaskService.remove(id);
  res.status(204).send();
}