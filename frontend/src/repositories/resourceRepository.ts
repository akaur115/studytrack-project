import type { StudyResource } from "../types/StudyResource";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const API_URL = `${API_BASE_URL}/api/resources`;

export const resourceRepository = {
  async getAll(): Promise<StudyResource[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }

    return response.json();
  },

  async create(resource: {
    name: string;
    category: string;
    source: string;
  }): Promise<StudyResource> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    if (!response.ok) {
      throw new Error("Failed to create resource");
    }

    return response.json();
  },

  async update(
    id: number,
    resource: StudyResource
  ): Promise<StudyResource> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });

    if (!response.ok) {
      throw new Error("Failed to update resource");
    }

    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete resource");
    }
  },
};