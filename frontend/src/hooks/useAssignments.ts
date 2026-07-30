import { useEffect, useState } from "react";
import { assignmentRepository } from "../repositories/assignmentRepository";
import { assignmentService } from "../services/assignmentService";
import type {
  Assignment,
  AssignmentPriority,
} from "../types/Assignment";

export function useAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [priorityFilter, setPriorityFilter] =
    useState<AssignmentPriority | "All">("All");
  const [isLoading, setIsLoading] = useState(true);

  async function loadAssignments() {
    try {
      const data = await assignmentRepository.getAll();
      setAssignments(data);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    loadAssignments();
  }, []);

  const visibleAssignments = assignmentService.filterByPriority(
    assignments,
    priorityFilter
  );

  const completedCount = assignmentService.countCompleted(assignments);
  const remainingCount = assignmentService.countRemaining(assignments);

  async function addAssignment(
    title: string,
    course: string,
    priority: AssignmentPriority,
    dueDate: string
  ) {
    if (!assignmentService.isValidAssignment(title, course)) {
      return;
    }

    const newAssignment = await assignmentRepository.create({
      title,
      course,
      priority,
      dueDate,
      completed: false,
    });

    setAssignments([...assignments, newAssignment]);
  }

  async function removeAssignment(id: number) {
    await assignmentRepository.delete(id);
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  }

  async function toggleAssignment(id: number) {
    const selectedAssignment = assignments.find(
      (assignment) => assignment.id === id
    );

    if (!selectedAssignment) {
      return;
    }

    const updatedAssignment = await assignmentRepository.update(id, {
      completed: !selectedAssignment.completed,
    });

    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id ? updatedAssignment : assignment
      )
    );
  }

  return {
    assignments,
    visibleAssignments,
    priorityFilter,
    setPriorityFilter,
    completedCount,
    remainingCount,
    isLoading,
    addAssignment,
    removeAssignment,
    toggleAssignment,
  };
}