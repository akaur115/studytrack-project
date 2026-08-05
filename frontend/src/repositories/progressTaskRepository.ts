import type { ProgressTask } from "../types/ProgressTask";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "";

const API_URL =
  `${API_BASE_URL}/api/progress-tasks`;

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

async function getErrorMessage(
  response: Response
): Promise<string> {
  try {
    const data = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data
    ) {
      return String(data.message);
    }
  } catch {
    // Response did not contain JSON.
  }

  return `Request failed with status ${response.status}.`;
}

export const progressTaskRepository = {
  async getAll(token: string): Promise<ProgressTask[]> {
    const response = await fetch(API_URL, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
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
      throw new Error(await getErrorMessage(response));
    }

    return response.json();
  },

  async markDone(
    id: number,
    token: string
  ): Promise<ProgressTask> {
    const response = await fetch(
      `${API_URL}/${id}/done`,
      {
        method: "PATCH",
        headers: getAuthHeaders(token),
      }
    );

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return response.json();
  },

  async delete(
    id: number,
    token: string
  ): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }
  },
};