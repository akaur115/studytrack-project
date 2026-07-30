import type { Assignment } from "../types/Assignment";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const assignmentRepository = {
  async getAll(): Promise<Assignment[]> {
    const response = await fetch(`${API_URL}/assignments`);

    if (!response.ok) {
      throw new Error("Failed to load assignments");
    }
    return response.json();
  },

  async create(
    assignment: Omit<Assignment, "id">,
  ): Promise<Assignment> {
    const response = await fetch(`${API_URL}/assignments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    });

    if (!response.ok) {
      throw new Error("Failed to create assignment");
    }
    return response.json();
  },

  async update(
    id: number,
    changes: Partial<Assignment>,
  ): Promise<Assignment> {
    const response = await fetch(`${API_URL}/assignments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    if (!response.ok) {
      throw new Error("Failed to update assignment");
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/assignments/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete assignment");
    }
  },
};
 