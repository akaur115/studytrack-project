import { prisma } from "../prisma";

export const userRepository = {
 async findOrCreateByClerkId(clerkUserId: string) {
   const existingUser = await prisma.user.findUnique({
     where: {
       clerkUserId,
     },
   });
   if (existingUser) {
     return existingUser;
   }
   return prisma.user.create({
     data: {
       clerkUserId,
     },
   });
 },
};