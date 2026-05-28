import { createElement, type ChangeEvent } from "react";

type AssignmentFormProps = {
  newAssignment: string;
  setNewAssignment: (value: string) => void;
  addAssignment: () => void;
};

function AssignmentForm({
  newAssignment,
  setNewAssignment,
  addAssignment,
}: AssignmentFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewAssignment(event.currentTarget.value);
  }

  return createElement(
    "div",
    { className: "form-row" },
    createElement("input", {
      type: "text",
      value: newAssignment,
      onChange: handleChange,
      placeholder: "Enter assignment name",
      "aria-label": "Assignment name",
    }),
    createElement(
      "button",
      {
        type: "button",
        onClick: addAssignment,
      },
      "Add Assignment"
    )
  );
}

export default AssignmentForm;