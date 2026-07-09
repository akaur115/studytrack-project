import { useEffect, useState } from "react";
import { resourceRepository } from "../repositories/resourceRepository";
import { resourceService } from "../services/resourceService";
import type {
  ResourceCategory,
  StudyResource,
} from "../types/StudyResource";

export function useResources() {
  const [resources, setResources] = useState<StudyResource[]>([]);

  const [categoryFilter, setCategoryFilter] =
    useState<ResourceCategory | "All">("All");

  // Load resources from backend when page opens
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

    const newResource = await resourceRepository.create({
      name,
      category,
      source,
    });

    setResources((current) => [...current, newResource]);

    return true;
  }

  async function removeResource(id: number) {
    await resourceRepository.delete(id);

    setResources((current) =>
      current.filter((resource) => resource.id !== id)
    );
  }

  async function toggleSavedResource(id: number) {
    const selectedResource = resources.find(
      (resource) => resource.id === id
    );

    if (!selectedResource) {
      return;
    }

    const updatedResource = resourceService.toggleSaved(selectedResource);

    const savedResource = await resourceRepository.update(
      id,
      updatedResource
    );

    setResources((current) =>
      current.map((resource) =>
        resource.id === id ? savedResource : resource
      )
    );
  }

  /*
  useResources manages the resource data used by the Resources page.

  Purpose:
  - Loads resources from the repository, which communicates with the backend API.
  - Handles adding, deleting, and updating resources.
  - Keeps filtering and dashboard calculations in the frontend.

  Architecture:
  ResourcesPage
      ↓
  useResources hook
      ↓
  resourceRepository
      ↓
  Backend API
      ↓
  Prisma database

  Returned values:
  - resources: complete resource list from database
  - visibleResources: resources after applying category filter
  - categoryFilter/setCategoryFilter: controls filtering
  - savedCount/videoCount: dashboard statistics
  - addResource/removeResource/toggleSavedResource: resource actions
*/

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