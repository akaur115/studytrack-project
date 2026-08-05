import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { prisma } from "../prisma";

async function getClerkProfile(userId: string) {
  const clerkUser = await clerkClient.users.getUser(userId);

  const email =
    clerkUser.emailAddresses.find(
      (item) => item.id === clerkUser.primaryEmailAddressId
    )?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress ??
    null;

  const fullName = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ");

  const displayName = fullName || clerkUser.username || null;

  return { email, displayName };
}

export async function syncCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      res.status(401).json({
        message: "User is not authenticated",
      });
      return;
    }

    const appUser = await prisma.user.upsert({
      where: {
        clerkUserId: userId,
      },
      update: {
        clerkUserId: userId,
      },
      create: {
        clerkUserId: userId,
      },
    });

    const profile = await getClerkProfile(userId);

    res.status(200).json({
      ...appUser,
      ...profile,
    });
  } catch (error) {
    console.error("Unable to synchronize user:", error);

    res.status(500).json({
      message: "Unable to synchronize user",
    });
  }
}

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { isAuthenticated, userId } = getAuth(req);

    if (!isAuthenticated || !userId) {
      res.status(401).json({
        message: "User is not authenticated",
      });
      return;
    }

    const appUser = await prisma.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!appUser) {
      res.status(404).json({
        message: "Application user was not found",
      });
      return;
    }

    const profile = await getClerkProfile(userId);

    res.status(200).json({
      ...appUser,
      ...profile,
    });
  } catch (error) {
    console.error("Unable to retrieve user:", error);

    res.status(500).json({
      message: "Unable to retrieve user",
    });
  }
}
