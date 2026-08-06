import { prisma } from "../prisma";

export const assignmentService = {
  getAll() {
    return prisma.assignment.findMany();
  },

  create(data: {
    title: string;
    course: string;
    priority: string;
    dueDate: string;
    completed: boolean;
  }) {

    return prisma.assignment.create({
      data,
    });
  },

  update(id: number, data: {
    title?: string;
    course?: string;
    priority?: string;
    dueDate?: string;
    completed?: boolean;
  }) {

    return prisma.assignment.update({
      where: { id },
      data,
    });
  },

  remove(id: number) {
    return prisma.assignment.delete({
      where: { id },
    });
  },
};
 