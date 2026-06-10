import type {
  Assignment,
  AssignmentPriority,
} from "../types/Assignment";

export const assignmentService = {
  createAssignment(
    title: string,
    course: string,
    priority: AssignmentPriority,
    dueDate: string
  ): Assignment {
    return {
      id: Date.now(),
      title,
      course,
      priority,
      dueDate,
      completed: false,
    };
  },

  isValidAssignment(title: string, course: string): boolean {
    return title.trim() !== "" && course.trim() !== "";
  },

  countCompleted(assignments: Assignment[]): number {
    return assignments.filter((assignment) => assignment.completed).length;
  },

  countRemaining(assignments: Assignment[]): number {
    return assignments.filter((assignment) => !assignment.completed).length;
  },

  filterByPriority(
    assignments: Assignment[],
    priority: AssignmentPriority | "All"
  ): Assignment[] {
    if (priority === "All") {
      return assignments;
    }

    return assignments.filter((assignment) => assignment.priority === priority);
  },

  toggleCompleted(assignment: Assignment): Assignment {
    return {
      ...assignment,
      completed: !assignment.completed,
    };
  },
};