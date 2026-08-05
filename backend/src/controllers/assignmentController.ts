import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { assignmentService } from "../services/assignmentService";

function getClerkUserId(req: Request, res: Response): string | null {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({
      message: "You must be signed in.",
    });
    return null;
  }
  return userId;
}

export async function getAssignments(req: Request, res: Response) {
  try {
    const clerkUserId = getClerkUserId(req, res);
    if (!clerkUserId) {
      return;
    }

    const assignments = await assignmentService.getAll(clerkUserId);
    res.json(assignments);
  } catch (error) {
    console.error("Failed to get assignments:", error);
    res.status(500).json({
      message: "Unable to load assignments.",
    });
  }
}

export async function createAssignment(req: Request, res: Response) {
  try {
    const clerkUserId = getClerkUserId(req, res);
    if (!clerkUserId) {
      return;
    }

    const assignment = await assignmentService.create(clerkUserId, {
      title: req.body.title,
      course: req.body.course,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      completed: false,
    });
    res.status(201).json(assignment);
  } catch (error) {
    console.error("Failed to create assignment:", error);
    res.status(500).json({
      message: "Unable to create assignment.",
    });
  }
}

export async function updateAssignment(req: Request, res: Response) {
  try {
    const clerkUserId = getClerkUserId(req, res);
    if (!clerkUserId) {
      return;
    }

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "Invalid assignment ID.",
      });
      return;
    }
    const assignment = await assignmentService.update(
      id,
      clerkUserId,
      req.body
    );

    if (!assignment) {
      res.status(404).json({
        message: "Assignment not found.",
      });
      return;
    }

    res.json(assignment);
  } catch (error) {
    console.error("Failed to update assignment:", error);
    res.status(500).json({
      message: "Unable to update assignment.",
    });
  }
}

export async function deleteAssignment(req: Request, res: Response) {
  try {
    const clerkUserId = getClerkUserId(req, res);
    if (!clerkUserId) {
      return;
    }
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      res.status(400).json({
        message: "Invalid assignment ID.",
      });
      return;
    }

    const deleted = await assignmentService.remove(id, clerkUserId);
    if (!deleted) {
      res.status(404).json({
        message: "Assignment not found.",
      });
      return;
    }
    res.status(204).send();
  } catch (error) {
    console.error("Failed to delete assignment:", error);
    res.status(500).json({
      message: "Unable to delete assignment.",
    });
  }
}
 