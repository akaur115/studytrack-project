import prisma from "../prisma/prismaClient";

export async function getOrCreateApplicationUser(
  clerkUserId: string
) {
  return prisma.user.upsert({
    where: {
      clerkUserId,
    },
    update: {},
    create: {
      clerkUserId,
    },
  });
}