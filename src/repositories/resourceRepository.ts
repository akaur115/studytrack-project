import { resourceTestData } from "../data/resourceTestData";
import type { StudyResource } from "../types/StudyResource";
 
let resources: StudyResource[] = [...resourceTestData];
 
export const resourceRepository = {
  getAll(): StudyResource[] {
    return [...resources];
  },
 
  create(resource: StudyResource): StudyResource {
    resources = [...resources, resource];
    return resource;
  },
 
  update(updatedResource: StudyResource): StudyResource {
    resources = resources.map((resource) =>
      resource.id === updatedResource.id ? updatedResource : resource
    );
    return updatedResource;
  },
 
  delete(id: number): void {
    resources = resources.filter((resource) => resource.id !== id);
  },
};