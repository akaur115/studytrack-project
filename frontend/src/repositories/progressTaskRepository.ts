import type { ProgressTask } from "../types/ProgressTask";

const API_URL = "/api/progress-tasks";

function getAuthHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

function getJsonAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const progressTaskRepository = {
  async getAll(token: string): Promise<ProgressTask[]> {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(
        `Unable to load progress tasks. Status: ${response.status}`
      );
    }

    return response.json();
  },

  async create(
    progressTask: Omit<ProgressTask, "id">,
    token: string
  ): Promise<ProgressTask> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getJsonAuthHeaders(token),
      body: JSON.stringify(progressTask),
    });

    if (!response.ok) {
      throw new Error(
        `Unable to create the progress task. Status: ${response.status}`
      );
    }

    return response.json();
  },

  async markDone(
    id: number,
    token: string
  ): Promise<ProgressTask> {
    const response = await fetch(`${API_URL}/${id}/done`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(
        `Unable to mark the progress task as done. Status: ${response.status}`
      );
    }

    return response.json();
  },

  async delete(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(
        `Unable to delete the progress task. Status: ${response.status}`
      );
    }
  },
};