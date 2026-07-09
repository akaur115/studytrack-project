import { assignmentTestData } from "../data/assignmentTestData";
import type { Assignment } from "../types/Assignment";

let assignments: Assignment[] = [...assignmentTestData];

export const assignmentRepository = {
  getAll(): Assignment[] {
    return [...assignments];
  },

  create(assignment: Assignment): Assignment {
    assignments = [...assignments, assignment];
    return assignment;
  },

  update(updatedAssignment: Assignment): Assignment {
    assignments = assignments.map((assignment) =>
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment
    );

    return updatedAssignment;
  },

  delete(id: number): void {
    assignments = assignments.filter((assignment) => assignment.id !== id);
  },
};