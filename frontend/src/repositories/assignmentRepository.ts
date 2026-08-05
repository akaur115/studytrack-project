import type { 
  Assignment,
  AssignmentPriority } from "../types/Assignment";

const API_URL =
 import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export interface CreateAssignmentData {
  title: string;
  course: string;
  priority: AssignmentPriority;
  dueDate: string;
  description?: string;
  completed?: boolean;
}

export interface UpdateAssignmentData {
 title?: string;
 course?: string;
 priority?: AssignmentPriority;
 dueDate?: string;
 description?: string;
 completed?: boolean;
}

function getAuthHeaders(token: string): HeadersInit {
 return {
   "Content-Type": "application/json",
   Authorization: `Bearer ${token}`,
 };
}

export const assignmentRepository = {
 async getAll(token: string): Promise<Assignment[]> {
   const response = await fetch(`${API_URL}/assignments`, {
     method: "GET",
     headers: getAuthHeaders(token),
   });
   if (!response.ok) {
     throw new Error("Failed to load assignments");
   }

   return (await response.json()) as Assignment[];
  },
  
  async create(
   assignment: CreateAssignmentData,
   token: string
 ): Promise<Assignment> {
   const response = await fetch(`${API_URL}/assignments`, {
     method: "POST",
     headers: getAuthHeaders(token),
     body: JSON.stringify(assignment),
   });

   if (!response.ok) {
     throw new Error("Failed to create assignment");
   }

   return (await response.json()) as Assignment;
  },
  
  async update(
   id: number,
   changes: UpdateAssignmentData,
   token: string
 ): Promise<Assignment> {
   const response = await fetch(`${API_URL}/assignments/${id}`, {
     method: "PATCH",
     headers: getAuthHeaders(token),
     body: JSON.stringify(changes),
   });

   if (!response.ok) {
     throw new Error("Failed to update assignment");
   }

   return (await response.json()) as Assignment;
 },

  async delete(id: number, token: string): Promise<void> {
   const response = await fetch(`${API_URL}/assignments/${id}`, {
     method: "DELETE",
     headers: getAuthHeaders(token),
   });

   if (!response.ok) {
     throw new Error("Failed to delete assignment");
   }
 },
};
