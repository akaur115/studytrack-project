import {
  createElement,
  type ChangeEvent,
  type FormEvent,
} from "react";

type AssignmentPriority = "Low" | "Medium" | "High";

type AssignmentFormProps = {
  draftTitle: string;
  setDraftTitle: (value: string) => void;
  draftCourse: string;
  setDraftCourse: (value: string) => void;
  draftPriority: AssignmentPriority;
  setDraftPriority: (value: AssignmentPriority) => void;
  draftDueDate: string;
  setDraftDueDate: (value: string) => void;
  addAssignment: () => void;
};

function AssignmentForm({
  draftTitle,
  setDraftTitle,
  draftCourse,
  setDraftCourse,
  draftPriority,
  setDraftPriority,
  draftDueDate,
  setDraftDueDate,
  addAssignment,
}: AssignmentFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addAssignment();
  }

  return createElement(
    "form",
    { className: "assignment-form-panel", onSubmit: handleSubmit },
    createElement("h3", null, "Create a New Assignment"),
    createElement(
      "div",
      { className: "assignment-form-grid" },
      createElement(
        "label",
        null,
        "Assignment title",
        createElement("input", {
          type: "text",
          value: draftTitle,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftTitle(event.currentTarget.value),
          placeholder: "Example: React Router practice",
        })
      ),
      createElement(
        "label",
        null,
        "Course",
        createElement("input", {
          type: "text",
          value: draftCourse,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftCourse(event.currentTarget.value),
          placeholder: "Example: Full Stack",
        })
      ),
      createElement(
        "label",
        null,
        "Priority",
        createElement(
          "select",
          {
            value: draftPriority,
            onChange: (event: ChangeEvent<HTMLSelectElement>) =>
              setDraftPriority(event.currentTarget.value as AssignmentPriority),
          },
          createElement("option", { value: "Low" }, "Low"),
          createElement("option", { value: "Medium" }, "Medium"),
          createElement("option", { value: "High" }, "High")
        )
      ),
      createElement(
        "label",
        null,
        "Due date",
        createElement("input", {
          type: "date",
          value: draftDueDate,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftDueDate(event.currentTarget.value),
        })
      )
    ),
    createElement(
      "button",
      { type: "submit", className: "primary-action" },
      "Save Assignment"
    )
  );
}

export default AssignmentForm;