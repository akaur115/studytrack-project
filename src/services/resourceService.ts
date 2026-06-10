import type {
  ResourceCategory,
  StudyResource,
} from "../types/StudyResource";
 
export const resourceService = {
  createResource(
    name: string,
    category: ResourceCategory,
    source: string
  ): StudyResource {
    return {

      id: Date.now(),
      name,
      category,
      source,
      saved: false,
    };
  },
 
  isValidResource(name: string, source: string): boolean {
    return name.trim() !== "" && source.trim() !== "";
  },
 
  countSaved(resources: StudyResource[]): number {
    return resources.filter((resource) => resource.saved).length;
  },
 
  countVideos(resources: StudyResource[]): number {
    return resources.filter((resource) => resource.category === "Video").length;
  },
 
  filterByCategory(
    resources: StudyResource[],
    category: ResourceCategory | "All"
  ): StudyResource[] {
    if (category === "All") {
      return resources;
    }
 
    return resources.filter((resource) => resource.category === category);
  },
 
  toggleSaved(resource: StudyResource): StudyResource {
    return {
      ...resource,
      saved: !resource.saved,
    };
  },
};