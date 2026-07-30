import type { Assignment } from "../types/Assignment";

const API_URL = "http://localhost:3001/api/assignments";

export const assignmentRepository = {
  async getAll(): Promise<Assignment[]> {
    const response = await fetch(API_URL);
    return response.json();
  },

  async create(assignment: Omit<Assignment, "id">): Promise<Assignment> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    });

    return response.json();
  },

  async update(id: number, changes: Partial<Assignment>): Promise<Assignment> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(changes),
    });

    return response.json();
  },

  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};