import type { StudyResource } from "../types/StudyResource";

const API_URL = "http://localhost:3000/api/resources";

export const resourceRepository = {
  async getAll(): Promise<StudyResource[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch resources");
    }

    return response.json();
  },

  async create(
    resource: {
      name: string;
      category: string;
      source: string;
    },
    token: string
  ): Promise<StudyResource> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
    resource: StudyResource,
    token: string
  ): Promise<StudyResource> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resource),
    });

    if (!response.ok) {
      throw new Error("Failed to update resource");
    }

    return response.json();
  },

  async delete(id: number, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete resource");
    }
  },
};