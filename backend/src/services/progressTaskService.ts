import prisma from "../prisma/prismaClient";

export const progressTaskService = {
  getAll() {
    return prisma.progressTask.findMany({
      orderBy: { id: "asc" },
    });
  },

  create(data: {
    task: string;
    owner: string;
    status: string;
    percent: number;
  }) {
    return prisma.progressTask.create({
      data: {
        task: data.task,
        owner: data.owner,
        status: data.status,
        percent: data.status === "Done" ? 100 : data.percent,
      },
    });
  },

  markDone(id: number) {
    return prisma.progressTask.update({
      where: { id },
      data: {
        status: "Done",
        percent: 100,
      },
    });
  },

  remove(id: number) {
    return prisma.progressTask.delete({
      where: { id },
    });
  },
};