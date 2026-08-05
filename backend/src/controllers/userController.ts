import { clerkClient, getAuth } from "@clerk/express";
import type { Request, Response } from "express";
import { prisma } from "../prisma";

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

    const clerkUser = await clerkClient.users.getUser(userId);

    const primaryEmail =
      clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId
      )?.emailAddress ??
      clerkUser.emailAddresses[0]?.emailAddress ??
      null;

    const fullName = [clerkUser.firstName, clerkUser.lastName]
      .filter(Boolean)
      .join(" ");

    const displayName = fullName || clerkUser.username || null;

    const appUser = await prisma.appUser.upsert({
      where: {
        clerkUserId: userId,
      },
      update: {
        email: primaryEmail,
        displayName,
      },
      create: {
        clerkUserId: userId,
        email: primaryEmail,
        displayName,
      },
    });

    res.status(200).json(appUser);
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

    const appUser = await prisma.appUser.findUnique({
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

    res.status(200).json(appUser);
  } catch (error) {
    console.error("Unable to retrieve user:", error);

    res.status(500).json({
      message: "Unable to retrieve user",
    });
  }
}