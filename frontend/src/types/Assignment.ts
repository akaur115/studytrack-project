export type AssignmentPriority = "Low" | "Medium" | "High";

export type Assignment = {
  id: number;
  title: string;
  description?: string | null;
  course: string;
  priority: AssignmentPriority;
  dueDate: string;
  completed: boolean;
};