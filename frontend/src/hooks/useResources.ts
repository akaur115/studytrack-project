import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

import { resourceRepository } from "../repositories/resourceRepository";
import { resourceService } from "../services/resourceService";
import type {
  ResourceCategory,
  StudyResource,
} from "../types/StudyResource";

export function useResources() {
  const { getToken } = useAuth();

  const [resources, setResources] = useState<StudyResource[]>([]);

  const [categoryFilter, setCategoryFilter] =
    useState<ResourceCategory | "All">("All");

  // Guests and logged-in users can view resources.
  useEffect(() => {
    async function loadResources() {
      const data = await resourceRepository.getAll();
      setResources(data);
    }

    loadResources();
  }, []);

  const visibleResources = resourceService.filterByCategory(
    resources,
    categoryFilter
  );

  const savedCount = resourceService.countSaved(resources);
  const videoCount = resourceService.countVideos(resources);

  async function addResource(
    name: string,
    category: ResourceCategory,
    source: string
  ): Promise<boolean> {
    if (!resourceService.isValidResource(name, source)) {
      return false;
    }

    const token = await getToken();

    if (!token) {
      return false;
    }

    const newResource = await resourceRepository.create(
      {
        name,
        category,
        source,
      },
      token
    );

    setResources((current) => [...current, newResource]);

    return true;
  }

  async function removeResource(id: number): Promise<void> {
    const token = await getToken();

    if (!token) {
      return;
    }

    await resourceRepository.delete(id, token);

    setResources((current) =>
      current.filter((resource) => resource.id !== id)
    );
  }

  async function toggleSavedResource(id: number): Promise<void> {
    const selectedResource = resources.find(
      (resource) => resource.id === id
    );

    if (!selectedResource) {
      return;
    }

    const token = await getToken();

    if (!token) {
      return;
    }

    const updatedResource =
      resourceService.toggleSaved(selectedResource);

    const savedResource = await resourceRepository.update(
      id,
      updatedResource,
      token
    );

    setResources((current) =>
      current.map((resource) =>
        resource.id === id ? savedResource : resource
      )
    );
  }

  return {
    resources,
    visibleResources,
    categoryFilter,
    setCategoryFilter,
    savedCount,
    videoCount,
    addResource,
    removeResource,
    toggleSavedResource,
  };
}