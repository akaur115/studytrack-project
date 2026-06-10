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
    setResources(resourceRepository.getAll()); 
    return true;
  }
 
  function removeResource(id: number) {
    resourceRepository.delete(id);
    setResources(resourceRepository.getAll());
  }

  function toggleSavedResource(id: number) {
    const selectedResource = resources.find((resource) => resource.id === id);
    if (!selectedResource) {
      return;
    }
 
    const updatedResource = resourceService.toggleSaved(selectedResource);
    resourceRepository.update(updatedResource);
    setResources(resourceRepository.getAll());
  }
 
  /*

    Returned values:
    - resources: full list of study resources from the repository
    - visibleResources: resources after category filtering
    - categoryFilter: current selected filter
    - setCategoryFilter: updates the selected filter
    - savedCount: number of saved resources
    - videoCount: number of video resources
    - addResource: adds a resource using the service and repository
    - removeResource: removes a resource using the repository
    - toggleSavedResource: updates saved status using service and repository
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
 