import type { ProgressTask } from "../types/ProgressTask";

const API_URL = "/api/progress-tasks";

export const progressTaskRepository = {
  async getAll(): Promise<ProgressTask[]> {
    const response = await fetch(API_URL);
    return response.json();
  },

  async create(progressTask: Omit<ProgressTask, "id">): Promise<ProgressTask> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressTask),
    });

    return response.json();
  },

  async markDone(id: number): Promise<ProgressTask> {
    const response = await fetch(`${API_URL}/${id}/done`, {
      method: "PATCH",
    });

    return response.json();
  },

  async delete(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};