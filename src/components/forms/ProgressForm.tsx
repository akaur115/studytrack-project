import { createElement, type ChangeEvent } from "react";

type ProgressFormProps = {
  newProgress: string;
  setNewProgress: (value: string) => void;
  addProgress: () => void;
};

function ProgressForm({
  newProgress,
  setNewProgress,
  addProgress,
}: ProgressFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewProgress(event.currentTarget.value);
  }

  return createElement(
    "div",
    { className: "form-row" },
    createElement("input", {
      type: "text",
      value: newProgress,
      onChange: handleChange,
      placeholder: "Enter team progress task",
      "aria-label": "Team progress task",
    }),
    createElement(
      "button",
      {
        type: "button",
        onClick: addProgress,
      },
      "Add Progress"
    )
  );
}

export default ProgressForm;