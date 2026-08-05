import { getAuth } from "@clerk/express";
import type { Request } from "express";

export function getAuthenticatedClerkUserId(
  request: Request
): string | null {
  const auth = getAuth(request);

  if (!auth.userId) {
    return null;
  }

  return auth.userId;
}