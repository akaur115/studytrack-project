import {
  createElement,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import AssignmentForm from "../../components/forms/AssignmentForm";
import { useAssignments } from "../../hooks/useAssignments";
import type { AssignmentPriority } from "../../types/Assignment";

type AssignmentPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function AssignmentPage({ teamPoints, setTeamPoints }: AssignmentPageProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCourse, setDraftCourse] = useState("");
  const [draftPriority, setDraftPriority] =
    useState<AssignmentPriority>("Medium");
  const [draftDueDate, setDraftDueDate] = useState("");

  const {
    assignments,
    visibleAssignments,
    priorityFilter,
    setPriorityFilter,
    completedCount,
    remainingCount,
    addAssignment,
    removeAssignment,
    toggleAssignment,
  } = useAssignments();

  /*
    Sprint 3 architecture use:
    This component uses the useAssignments custom hook instead of keeping
    assignment logic directly inside the page. The hook connects the page
    to the assignment service and assignment repository. This keeps the page
    focused on displaying the Assignments UI.
  */

  function handleAddAssignment() {
    addAssignment(draftTitle, draftCourse, draftPriority, draftDueDate);

    if (draftTitle.trim() === "" || draftCourse.trim() === "") {
      return;
    }

    setDraftTitle("");
    setDraftCourse("");
    setDraftPriority("Medium");
    setDraftDueDate("");
    setTeamPoints?.((points) => points + 1);
  }

  function handleRemoveAssignment(id: number) {
    removeAssignment(id);
    setTeamPoints?.((points) => points + 1);
  }

  function handleToggleAssignment(id: number) {
    toggleAssignment(id);
    setTeamPoints?.((points) => points + 1);
  }

  return createElement(
    "section",
    { className: "page-card assignment-page" },
    createElement("h2", null, "Assignment Planner"),
    createElement(
      "p",
      { className: "page-description" },
      "This page helps students plan assignments by course, priority, and due date."
    ),
    createElement(
      "div",
      { className: "assignment-dashboard" },
      createElement(
        "article",
        null,
        createElement("strong", null, assignments.length),
        createElement("span", null, "Total assignments")
      ),
      createElement(
        "article",
        null,
        createElement("strong", null, remainingCount),
        createElement("span", null, "Still remaining")
      ),
      createElement(
        "article",
        null,
        createElement("strong", null, completedCount),
        createElement("span", null, "Completed")
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
    createElement(AssignmentForm, {
      draftTitle,
      setDraftTitle,
      draftCourse,
      setDraftCourse,
      draftPriority,
      setDraftPriority,
      draftDueDate,
      setDraftDueDate,
      addAssignment: handleAddAssignment,
    }),
    createElement(
      "div",
      { className: "assignment-preview" },
      createElement("h3", null, "Live Preview"),
      createElement("p", null, draftTitle || "No assignment title typed yet"),
      createElement(
        "small",
        null,
        `${draftCourse || "No course"} • ${draftPriority} priority • ${
          draftDueDate || "No due date"
        }`
      )
    ),
    createElement(
      "div",
      { className: "assignment-filter" },
      createElement("label", null, "Filter by priority"),
      createElement(
        "select",
        {
          value: priorityFilter,
          onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
            setPriorityFilter(
              event.currentTarget.value as AssignmentPriority | "All"
            ),
        },
        createElement("option", { value: "All" }, "All"),
        createElement("option", { value: "Low" }, "Low"),
        createElement("option", { value: "Medium" }, "Medium"),
        createElement("option", { value: "High" }, "High")
      )
    ),
    createElement(
      "ul",
      { className: "assignment-card-list" },
      visibleAssignments.map((assignment) =>
        createElement(
          "li",
          {
            key: assignment.id,
            className: assignment.completed
              ? "assignment-card assignment-card-complete"
              : "assignment-card",
          },
          createElement(
            "div",
            null,
            createElement("h3", null, assignment.title),
            createElement(
              "p",
              null,
              `${assignment.course} • ${assignment.priority} priority`
            ),
            createElement(
              "small",
              null,
              assignment.dueDate
                ? `Due: ${assignment.dueDate}`
                : "No due date selected"
            )
          ),
          createElement(
            "div",
            { className: "assignment-actions" },
            createElement(
              "button",
              {
                type: "button",
                onClick: () => handleToggleAssignment(assignment.id),
              },
              assignment.completed ? "Undo" : "Complete"
            ),
            createElement(
              "button",
              {
                type: "button",
                className: "remove-button",
                onClick: () => handleRemoveAssignment(assignment.id),
              },
              "Remove"
            )
          )
        )
      )
    )
  );
}

export default AssignmentPage;