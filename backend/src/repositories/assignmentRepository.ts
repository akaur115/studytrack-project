import { prisma } from "../prisma";

export interface CreateAssignmentData {
  title: string;
  description?: string;
  dueDate?: Date;
}

export async function findAssignmentsByUserId(userId: number) {
  return prisma.assignment.findMany({
    where: {
      userId,
    },
    orderBy: {
      id: "desc",
    },
  });
}

export async function createAssignmentForUser(
  userId: number,
  data: CreateAssignmentData
) {
  return prisma.assignment.create({
    data: {
      ...data,
      userId,
    },
  });
}

export async function updateAssignmentForUser(
  assignmentId: number,
  userId: number,
  data: Partial<CreateAssignmentData>
) {
  return prisma.assignment.updateMany({
    where: {
      id: assignmentId,
      userId,
    },
    data,
  });
}

export async function deleteAssignmentForUser(
  assignmentId: number,
  userId: number
) {
  return prisma.assignment.deleteMany({
    where: {
      id: assignmentId,
      userId,
    },
  });
}