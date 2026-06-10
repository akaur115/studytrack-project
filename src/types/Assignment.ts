export type AssignmentPriority = "Low" | "Medium" | "High";

export type Assignment = {
  id: number;
  title: string;
  course: string;
  priority: AssignmentPriority;
  dueDate: string;
  completed: boolean;
};