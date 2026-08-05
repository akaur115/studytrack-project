import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { assignmentRepository } from "../repositories/assignmentRepository";
import { assignmentService } from "../services/assignmentService";
import type {
  Assignment,
  AssignmentPriority,
} from "../types/Assignment";

export function useAssignments() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [priorityFilter, setPriorityFilter] =
    useState<AssignmentPriority | "All">("All");
  const [isLoading, setIsLoading] = useState(true);

  async function requireToken(): Promise<string> {
    const token = await getToken();
    if (!token) {
      throw new Error("You must be logged in.");
    }

    return token;
  }
  useEffect(() => {

    async function loadAssignments() {
      if (!isLoaded) {
        return;
      }

      if (!isSignedIn) {
        setAssignments([]);
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const token = await getToken();
        if (!token) {
          setAssignments([]);
          return;
        }
        const data = await assignmentRepository.getAll(token);
        setAssignments(data);
      } catch (error) {
        console.error("Failed to load assignments:", error);
        setAssignments([]);
      } finally {
        setIsLoading(false);
      }
    }

    void loadAssignments();
  }, [getToken, isLoaded, isSignedIn]);

  const visibleAssignments = assignmentService.filterByPriority(
    assignments,
    priorityFilter
  );

  const completedCount =
    assignmentService.countCompleted(assignments);
  const remainingCount =
    assignmentService.countRemaining(assignments);
  async function addAssignment(
    title: string,
    course: string,
    priority: AssignmentPriority,
    dueDate: string
  ) {

    if (!assignmentService.isValidAssignment(title, course)) {
      return;
    }

    try {
      const token = await requireToken();
      const newAssignment = await assignmentRepository.create(
        {
          title,
          course,
          priority,
          dueDate,
          completed: false,
        },

        token
      );

      setAssignments((currentAssignments) => [
        ...currentAssignments,
        newAssignment,
      ]);

    } catch (error) {
      console.error("Failed to create assignment:", error);
    }
  }

  async function removeAssignment(id: number) {
    try {
      const token = await requireToken();
      await assignmentRepository.delete(id, token);
      setAssignments((currentAssignments) =>
        currentAssignments.filter(
          (assignment) => assignment.id !== id
        )
      );
    } catch (error) {
      console.error("Failed to remove assignment:", error);
    }
  }

  async function toggleAssignment(id: number) {
    const selectedAssignment = assignments.find(
      (assignment) => assignment.id === id
    );

    if (!selectedAssignment) {
      return;
    }

    try {
      const token = await requireToken();
      const updatedAssignment =
        await assignmentRepository.update(
          id,
          {
            completed: !selectedAssignment.completed,
          },
          token
        );

      setAssignments((currentAssignments) =>
        currentAssignments.map((assignment) =>
          assignment.id === id
            ? updatedAssignment
            : assignment
        )
      );
    } catch (error) {
      console.error("Failed to update assignment:", error);
    }
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