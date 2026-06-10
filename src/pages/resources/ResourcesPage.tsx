import {
 createElement,
 useState,
 type ChangeEvent,
 type Dispatch,
 type SetStateAction,
} from "react";

import ResourceForm from "../../components/forms/ResourceForm";
import { useResourceCategories } from "../../hooks/useResourceCategories";
import { useResources } from "../../hooks/useResources";
import type { ResourceCategory } from "../../types/StudyResource";

type ResourcesPageProps = {
 teamPoints?: number;
 setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function ResourcesPage({ teamPoints, setTeamPoints }: ResourcesPageProps) {
 const [draftName, setDraftName] = useState("");
 const [draftCategory, setDraftCategory] =
   useState<ResourceCategory>("Notes");
 const [draftSource, setDraftSource] = useState("");
 const {
   resources,
   visibleResources,
   categoryFilter,
   setCategoryFilter,
   savedCount,
   videoCount,
   addResource,
   removeResource,
   toggleSavedResource,
 } = useResources();
 const { filterCategoryOptions, getCategoryLabel } = useResourceCategories();
 /*
   Sprint 3 architecture use:
   This component uses the useResources custom hook instead of keeping
   resource logic directly inside the page. The hook connects the page
   to the resource service and resource repository. This keeps the page
   focused on displaying the Study Resources UI.
 */
 function handleAddResource() {
   const resourceWasAdded = addResource(
     draftName,
     draftCategory,
     draftSource
   );
   if (!resourceWasAdded) {
     return;
   }
   setDraftName("");
   setDraftCategory("Notes");
   setDraftSource("");
   setTeamPoints?.((points) => points + 1);
 }
 function handleRemoveResource(id: number) {
   removeResource(id);
   setTeamPoints?.((points) => points + 1);
 }
 function handleToggleSaved(id: number) {
   toggleSavedResource(id);
   setTeamPoints?.((points) => points + 1);
 }
 return createElement(
   "section",
   { className: "page-card resource-page" },
   createElement("h2", null, "Study Resource Library"),
   createElement(
     "p",
     { className: "page-description" },
     "This page helps students organize study resources by category and saved status."
   ),
   createElement(
     "div",
     { className: "resource-dashboard" },
     createElement(
       "article",
       null,
       createElement("strong", null, resources.length),
       createElement("span", null, "Total resources")
     ),
     createElement(
       "article",
       null,
       createElement("strong", null, savedCount),
       createElement("span", null, "Saved resources")
     ),
     createElement(
       "article",
       null,
       createElement("strong", null, videoCount),
       createElement("span", null, "Video resources")
     )
   ),
   teamPoints !== undefined
     ? createElement(
         "div",
         { className: "shared-box" },
         createElement("strong", null, "Team activity points:"),
         createElement("span", null, teamPoints),
         createElement(
           "button",
           {
             type: "button",
             onClick: () => setTeamPoints?.((points) => points + 1),
           },
           "Add Point"
         )
       )
     : null,
   createElement(ResourceForm, {
     draftName,
     setDraftName,
     draftCategory,
     setDraftCategory,
     draftSource,
     setDraftSource,
     addResource: handleAddResource,
   }),
   createElement(
     "div",
     { className: "resource-preview" },
     createElement("h3", null, "Resource Preview"),
     createElement("p", null, draftName || "No resource name typed yet"),
     createElement(
       "small",
       null,
       `${getCategoryLabel(draftCategory)} • ${
         draftSource || "No source added"
       }`
     )
   ),
   createElement(
     "div",
     { className: "resource-filter" },
     createElement("label", null, "Filter by category"),
     createElement(
       "select",
       {
         value: categoryFilter,
         onChange: (event: ChangeEvent<HTMLSelectElement>) =>
           setCategoryFilter(
             event.currentTarget.value as ResourceCategory | "All"
           ),
       },
       filterCategoryOptions.map((option) =>
         createElement(
           "option",
           { key: option.value, value: option.value },
           option.label
         )
       )
     )
   ),
   createElement(
     "ul",
     { className: "resource-card-list" },
     visibleResources.map((resource) =>
       createElement(
         "li",
         {
           key: resource.id,
           className: resource.saved
             ? "resource-card resource-card-saved"
             : "resource-card",
         },
         createElement(
           "div",
           { className: "resource-card-main" },
           createElement("h3", null, resource.name),
           createElement(
             "p",
             null,
             `${getCategoryLabel(resource.category)} • ${resource.source}`
           ),
           createElement(
             "small",
             null,
             resource.saved ? "Saved resource" : "Not saved yet"
           )
         ),
         createElement(
           "div",
           { className: "resource-actions" },
           createElement(
             "button",
             {
               type: "button",
               onClick: () => handleToggleSaved(resource.id),
             },
             resource.saved ? "Unsave" : "Save"
           ),
           createElement(
             "button",
             {
               type: "button",
               className: "remove-button",
               onClick: () => handleRemoveResource(resource.id),
             },
             "Remove"
           )
         )
       )
     )
   )
 );
}
export default ResourcesPage;