import type { Request, Response } from "express";
import { getAuth } from "@clerk/express";

import prisma from "../prisma/prismaClient";
import { getOrCreateApplicationUser } from "../services/userService";

function getTaskId(req: Request): number | null {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export async function getProgressTasks(
  req: Request,
  res: Response
) {
  try {
    const { isAuthenticated, userId: clerkUserId } =
      getAuth(req);

    if (!isAuthenticated || !clerkUserId) {
      res.status(401).json({
        message: "You must be logged in.",
      });
      return;
    }

    const user =
      await getOrCreateApplicationUser(clerkUserId);

    const tasks = await prisma.progressTask.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Unable to load progress tasks:", error);

    res.status(500).json({
      message: "Unable to load progress tasks.",
    });
  }
}

export async function addProgressTask(
  req: Request,
  res: Response
) {
  try {
    const { isAuthenticated, userId: clerkUserId } =
      getAuth(req);

    if (!isAuthenticated || !clerkUserId) {
      res.status(401).json({
        message: "You must be logged in.",
      });
      return;
    }

    const { task, owner, status, percent } = req.body;

    if (
      typeof task !== "string" ||
      task.trim() === "" ||
      typeof owner !== "string" ||
      owner.trim() === "" ||
      typeof status !== "string" ||
      typeof percent !== "number" ||
      percent < 0 ||
      percent > 100
    ) {
      res.status(400).json({
        message: "Progress task data is not valid.",
      });
      return;
    }

    const user =
      await getOrCreateApplicationUser(clerkUserId);

    const createdTask = await prisma.progressTask.create({
      data: {
        task: task.trim(),
        owner: owner.trim(),
        status,
        percent: status === "Done" ? 100 : percent,
        userId: user.id,
      },
    });

    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Unable to create progress task:", error);

    res.status(500).json({
      message: "Unable to create progress task.",
    });
  }
}

export async function markProgressTaskDone(
  req: Request,
  res: Response
) {
  try {
    const { isAuthenticated, userId: clerkUserId } =
      getAuth(req);

    if (!isAuthenticated || !clerkUserId) {
      res.status(401).json({
        message: "You must be logged in.",
      });
      return;
    }

    const id = getTaskId(req);

    if (!id) {
      res.status(400).json({
        message: "Invalid progress task ID.",
      });
      return;
    }

    const user =
      await getOrCreateApplicationUser(clerkUserId);

    const existingTask =
      await prisma.progressTask.findFirst({
        where: {
          id,
          userId: user.id,
        },
      });

    if (!existingTask) {
      res.status(404).json({
        message: "Progress task was not found.",
      });
      return;
    }

    const updatedTask =
      await prisma.progressTask.update({
        where: {
          id,
        },
        data: {
          status: "Done",
          percent: 100,
        },
      });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Unable to update progress task:", error);

    res.status(500).json({
      message: "Unable to update progress task.",
    });
  }
}

export async function deleteProgressTask(
  req: Request,
  res: Response
) {
  try {
    const { isAuthenticated, userId: clerkUserId } =
      getAuth(req);

    if (!isAuthenticated || !clerkUserId) {
      res.status(401).json({
        message: "You must be logged in.",
      });
      return;
    }

    const id = getTaskId(req);

    if (!id) {
      res.status(400).json({
        message: "Invalid progress task ID.",
      });
      return;
    }

    const user =
      await getOrCreateApplicationUser(clerkUserId);

    const result = await prisma.progressTask.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });

    if (result.count === 0) {
      res.status(404).json({
        message: "Progress task was not found.",
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error("Unable to delete progress task:", error);

    res.status(500).json({
      message: "Unable to delete progress task.",
    });
  }
}