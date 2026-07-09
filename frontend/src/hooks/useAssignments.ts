import { useState } from "react";
import { assignmentRepository } from "../repositories/assignmentRepository";
import { assignmentService } from "../services/assignmentService";
import type {
  Assignment,
  AssignmentPriority,
} from "../types/Assignment";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(
    assignmentRepository.getAll()
  );

  const [priorityFilter, setPriorityFilter] =
    useState<AssignmentPriority | "All">("All");

  const visibleAssignments = assignmentService.filterByPriority(
    assignments,
    priorityFilter
  );

  const completedCount = assignmentService.countCompleted(assignments);
  const remainingCount = assignmentService.countRemaining(assignments);

  function addAssignment(
    title: string,
    course: string,
    priority: AssignmentPriority,
    dueDate: string
  ) {
    if (!assignmentService.isValidAssignment(title, course)) {
      return;
    }

    const newAssignment = assignmentService.createAssignment(
      title,
      course,
      priority,
      dueDate
    );

    assignmentRepository.create(newAssignment);
    setAssignments(assignmentRepository.getAll());
  }

  function removeAssignment(id: number) {
    assignmentRepository.delete(id);
    setAssignments(assignmentRepository.getAll());
  }

  function toggleAssignment(id: number) {
    const selectedAssignment = assignments.find(
      (assignment) => assignment.id === id
    );

    if (!selectedAssignment) {
      return;
    }

    const updatedAssignment =
      assignmentService.toggleCompleted(selectedAssignment);

    assignmentRepository.update(updatedAssignment);
    setAssignments(assignmentRepository.getAll());
  }

  /*
    Returned values:
    - assignments: full assignment list from the repository
    - visibleAssignments: assignment list after priority filter
    - priorityFilter: current selected priority filter
    - setPriorityFilter: updates the selected priority filter
    - completedCount: number of completed assignments
    - remainingCount: number of incomplete assignments
    - addAssignment: adds a new assignment through service and repository
    - removeAssignment: deletes an assignment through repository
    - toggleAssignment: updates completed status through service and repository
  */
  return {
    assignments,
    visibleAssignments,
    priorityFilter,
    setPriorityFilter,
    completedCount,
    remainingCount,
    addAssignment,
    removeAssignment,
    toggleAssignment,
  };
}