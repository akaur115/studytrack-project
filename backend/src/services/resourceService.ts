import { prisma } from "../database/prisma";

export const resourceService = {
  async getAllResources() {
    return prisma.resource.findMany();
  },

  async getResourceById(id: number) {
    return prisma.resource.findUnique({
      where: {
        id,
      },
    });
  },

  async createResource(
    name: string,
    category: string,
    source: string
  ) {
    return prisma.resource.create({
      data: {
        name,
        category,
        source,
      },
    });
  },

  async updateResource(
    id: number,
    name: string,
    category: string,
    source: string,
    saved: boolean
  ) {
    return prisma.resource.update({
      where: {
        id,
      },
      data: {
        name,
        category,
        source,
        saved,
      },
    });
  },

  async deleteResource(id: number) {
    return prisma.resource.delete({
      where: {
        id,
      },
    });
  },
};