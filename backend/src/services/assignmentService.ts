import {
  assignmentRepository,
  type CreateAssignmentData,
  type UpdateAssignmentData,
} from "../repositories/assignmentRepository";
import { userRepository } from "../repositories/userRepository";

async function getApplicationUser(clerkUserId: string) {
  return userRepository.findOrCreateByClerkId(clerkUserId);
}

export const assignmentService = {
  async getAll(clerkUserId: string) {
    const user = await getApplicationUser(clerkUserId);
    return assignmentRepository.getAllForUser(user.id);
  },

  async create(
    clerkUserId: string,
    data: CreateAssignmentData
  ) {
    const user = await getApplicationUser(clerkUserId);
    return assignmentRepository.createForUser(user.id, data);
  },

  async update(
    id: number,
    clerkUserId: string,
    data: UpdateAssignmentData
  ) {

    const user = await getApplicationUser(clerkUserId);
    return assignmentRepository.updateForUser(
      id,
    user.id,
      data
    );
  },

  async remove(
    id: number,
    clerkUserId: string
  ) {

    const user = await getApplicationUser(clerkUserId);
    return assignmentRepository.deleteForUser(
      id,
user.id
    );
  },
};
 