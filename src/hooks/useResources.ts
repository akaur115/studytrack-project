import { useState } from "react";
import { resourceRepository } from "../repositories/resourceRepository";
import { resourceService } from "../services/resourceService";
import type {
  ResourceCategory,
  StudyResource,
} from "../types/StudyResource";

export function useResources() {
  const [resources, setResources] = useState<StudyResource[]>(
    resourceRepository.getAll()
  );

  const [categoryFilter, setCategoryFilter] =
    useState<ResourceCategory | "All">("All");

  const visibleResources = resourceService.filterByCategory(
    resources,
    categoryFilter
  );

  const savedCount = resourceService.countSaved(resources);
  const videoCount = resourceService.countVideos(resources);

  function refreshResources() {
    setResources(resourceRepository.getAll());
  }

  function addResource(
    name: string,
    category: ResourceCategory,
    source: string
  ): boolean {
    if (!resourceService.isValidResource(name, source)) {
      return false;
    }

    const newResource = resourceService.createResource(name, category, source);
    resourceRepository.create(newResource);
    refreshResources();

    return true;
  }

  function removeResource(id: number) {
    resourceRepository.delete(id);
    refreshResources();
  }

  function toggleSavedResource(id: number) {
    const selectedResource = resources.find((resource) => resource.id === id);

    if (!selectedResource) {
      return;
    }

    const updatedResource = resourceService.toggleSaved(selectedResource);
    resourceRepository.update(updatedResource);
    refreshResources();
  }

  /*
    useResources connects the Resources page to the repository and service.

    Returned values:
    - resources: complete resource list
    - visibleResources: filtered resources shown on the page
    - categoryFilter/setCategoryFilter: selected category filter
    - savedCount/videoCount: dashboard totals
    - addResource/removeResource/toggleSavedResource: page actions
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