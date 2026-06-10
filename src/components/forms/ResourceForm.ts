import {
  createElement,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { useResourceCategories } from "../../hooks/useResourceCategories";
import type { ResourceCategory } from "../../types/StudyResource";
type ResourceFormProps = {

  draftName: string;
  setDraftName: (value: string) => void;
  draftCategory: ResourceCategory;
  setDraftCategory: (value: ResourceCategory) => void;
  draftSource: string;
  setDraftSource: (value: string) => void;
  addResource: () => void;
};
 
function ResourceForm({
  draftName,
  setDraftName,
  draftCategory,
  setDraftCategory,
  draftSource,
  setDraftSource,
  addResource,
}: ResourceFormProps) {

  const { resourceCategoryOptions } = useResourceCategories(); 
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addResource();
  }
 
  return createElement(
    "form",
    { className: "resource-form-panel", onSubmit: handleSubmit },
    createElement("h3", null, "Add Study Resource"),
    createElement(
      "div",
      { className: "resource-form-grid" },
      createElement(
        "label",
        null,
        "Resource name",
        createElement("input", {
          type: "text",
          value: draftName,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftName(event.currentTarget.value),
          placeholder: "Example: TypeScript notes",
        })

      ),

      createElement(
        "label",
        null,
        "Category",
        createElement(
          "select",
          {
            value: draftCategory,
            onChange: (event: ChangeEvent<HTMLSelectElement>) =>
              setDraftCategory(event.currentTarget.value as ResourceCategory),
          },

          resourceCategoryOptions.map((option) =>
            createElement(
              "option",
              { key: option.value, value: option.value },
              option.label
            )

          )

        )

      ),

      createElement(
        "label",
        null,
        "Source",
        createElement("input", {
          type: "text",
          value: draftSource,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftSource(event.currentTarget.value),
          placeholder: "Example: Class notes, YouTube, React Docs",
        })

      )

    ),

    createElement(
      "button",
      { type: "submit", className: "primary-action" },
      "Add Resource"
    )

  );

}
 
export default ResourceForm;
 