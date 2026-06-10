import type { ResourceCategory } from "../types/StudyResource";
 
type ResourceCategoryOption = {
  value: ResourceCategory;
  label: string;
};
 
type ResourceFilterOption = {
  value: ResourceCategory | "All";
  label: string;
};
 
export function useResourceCategories() {

  const resourceCategoryOptions: ResourceCategoryOption[] = [
    { value: "Notes", label: "Notes" },
    { value: "Video", label: "Video" },
    { value: "Practice", label: "Practice" },
    { value: "Documentation", label: "Documentation" },
  ];
 
  const filterCategoryOptions: ResourceFilterOption[] = [
    { value: "All", label: "All Resources" },
    ...resourceCategoryOptions,
  ];
 
  function getCategoryLabel(category: ResourceCategory | "All"): string {
    const selectedOption = filterCategoryOptions.find(
      (option) => option.value === category
    );
 
    return selectedOption ? selectedOption.label : category;
  }

  return {
    resourceCategoryOptions,
    filterCategoryOptions,
    getCategoryLabel,
  };
}
 