import { prisma } from "../prisma";

export async function findOrCreateUser(clerkUserId: string) {
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