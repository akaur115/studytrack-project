import type { Request, Response } from "express";
import { assignmentService } from "../services/assignmentService.js";
export async function getAssignments(_req: Request, res: Response) {
 const assignments = await assignmentService.getAll();
 res.json(assignments);
}

export async function createAssignment(req: Request, res: Response) {
 const assignment = await assignmentService.create({
   title: req.body.title,
   course: req.body.course,
   priority: req.body.priority,
   dueDate: req.body.dueDate,
   completed: false,
 });
 res.status(201).json(assignment);
}
export async function updateAssignment(req: Request, res: Response) {
  const id = Number(req.params.id);
  const assignment = await assignmentService.update(id, req.body);
 
  res.json(assignment);
}

export async function deleteAssignment(req: Request, res: Response) {
  const id = Number(req.params.id);
  await assignmentService.remove(id);
 
  res.status(204).send();
}