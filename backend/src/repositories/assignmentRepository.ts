import { prisma } from "../prisma";

export interface CreateAssignmentData {
  title: string;
  course: string;
  priority: string;
  dueDate: string;
  completed?: boolean;
}

export interface UpdateAssignmentData {
  title?: string;
  course?: string;
  priority?: string;
  dueDate?: string;
  completed?: boolean;
}

export const assignmentRepository = {
  async getAllForUser(userId: number) {
    return prisma.assignment.findMany({
      where: {
        userId,
      },
      orderBy: {
        id: "desc",
      },
    });
  },

  async createForUser(userId: number, data: CreateAssignmentData) {
    return prisma.assignment.create({
      data: {
        title: data.title,
        course: data.course,
        priority: data.priority,
        dueDate: data.dueDate,
        completed: data.completed ?? false,
        userId,
      },
    });
  },

  async updateForUser(
    id: number,
    userId: number,
    data: UpdateAssignmentData
  ) {

    const assignment = await prisma.assignment.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!assignment) {
      return null;
    }

    return prisma.assignment.update({
      where: {
        id,
      },
      data,
    });
  },

  async deleteForUser(id: number, userId: number) {
    const assignment = await prisma.assignment.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!assignment) {
      return false;
    }

    await prisma.assignment.delete({
      where: {
        id,
      },
    });
    return true;
  },
};
 