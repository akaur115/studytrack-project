import {
  createElement,
  type ChangeEvent,
  type FormEvent,
} from "react";

type ProgressStatus = "Planned" | "In Progress" | "Blocked" | "Done";

type ProgressFormProps = {
  draftTask: string;
  setDraftTask: (value: string) => void;
  draftOwner: string;
  setDraftOwner: (value: string) => void;
  draftStatus: ProgressStatus;
  setDraftStatus: (value: ProgressStatus) => void;
  draftPercent: number;
  setDraftPercent: (value: number) => void;
  addProgressItem: () => void;
};

function ProgressForm({
  draftTask,
  setDraftTask,
  draftOwner,
  setDraftOwner,
  draftStatus,
  setDraftStatus,
  draftPercent,
  setDraftPercent,
  addProgressItem,
}: ProgressFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addProgressItem();
  }

  return createElement(
    "form",
    { className: "progress-form-panel", onSubmit: handleSubmit },
    createElement("h3", null, "Add Sprint Progress Item"),

    createElement(
      "div",
      { className: "progress-form-grid" },

      createElement(
        "label",
        null,
        "Task name",
        createElement("input", {
          type: "text",
          value: draftTask,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftTask(event.currentTarget.value),
          placeholder: "Example: Finish progress page",
        })
      ),

      createElement(
        "label",
        null,
        "Owner",
        createElement("input", {
          type: "text",
          value: draftOwner,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftOwner(event.currentTarget.value),
          placeholder: "Example: Jaspreet",
        })
      ),

      createElement(
        "label",
        null,
        "Status",
        createElement(
          "select",
          {
            value: draftStatus,
            onChange: (event: ChangeEvent<HTMLSelectElement>) =>
              setDraftStatus(event.currentTarget.value as ProgressStatus),
          },
          createElement("option", { value: "Planned" }, "Planned"),
          createElement("option", { value: "In Progress" }, "In Progress"),
          createElement("option", { value: "Blocked" }, "Blocked"),
          createElement("option", { value: "Done" }, "Done")
        )
      ),

      createElement(
        "label",
        null,
        `Progress: ${draftPercent}%`,
        createElement("input", {
          type: "range",
          min: 0,
          max: 100,
          step: 10,
          value: draftPercent,
          onChange: (event: ChangeEvent<HTMLInputElement>) =>
            setDraftPercent(Number(event.currentTarget.value)),
        })
      )
    ),

    createElement(
      "button",
      { type: "submit", className: "primary-action" },
      "Add Progress Item"
    )
  );
}

export default ProgressForm;