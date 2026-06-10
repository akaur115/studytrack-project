export type ResourceCategory = "Notes" | "Video" | "Practice" | "Documentation";
 
export type StudyResource = {
  id: number;
  name: string;
  category: ResourceCategory;
  source: string;
  saved: boolean;
};