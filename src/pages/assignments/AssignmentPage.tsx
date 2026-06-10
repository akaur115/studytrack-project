import {
  createElement,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import AssignmentForm from "../../components/forms/AssignmentForm";

type AssignmentPriority = "Low" | "Medium" | "High";

type Assignment = {
  id: number;
  title: string;
  course: string;
  priority: AssignmentPriority;
  dueDate: string;
  completed: boolean;
};

type AssignmentPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function AssignmentPage({ teamPoints, setTeamPoints }: AssignmentPageProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCourse, setDraftCourse] = useState("");
  const [draftPriority, setDraftPriority] =
    useState<AssignmentPriority>("Medium");
  const [draftDueDate, setDraftDueDate] = useState("");

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Finish Sprint 2 routing",
      course: "Full Stack Development",
      priority: "High",
      dueDate: "2026-05-20",
      completed: false,
    },
    {
      id: 2,
      title: "Update Kanban board",
      course: "Project Work",
      priority: "Medium",
      dueDate: "2026-05-21",
      completed: true,
    },
  ]);

  const completedCount = assignments.filter(
    (assignment) => assignment.completed
  ).length;

  const remainingCount = assignments.length - completedCount;

  function addAssignment() {
    if (draftTitle.trim() === "" || draftCourse.trim() === "") {
      return;
    }

    const nextAssignment: Assignment = {
      id: Date.now(),
      title: draftTitle,
      course: draftCourse,
      priority: draftPriority,
      dueDate: draftDueDate,
      completed: false,
    };

    setAssignments([...assignments, nextAssignment]);
    setDraftTitle("");
    setDraftCourse("");
    setDraftPriority("Medium");
    setDraftDueDate("");
    setTeamPoints((points) => points + 1);
  }

  function removeAssignment(id: number) {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    setTeamPoints((points) => points + 1);
  }

  function toggleAssignment(id: number) {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );

    setTeamPoints((points) => points + 1);
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

    createElement(
      "div",
      { className: "shared-box" },
      createElement("strong", null, "Team activity points:"),
      createElement("span", null, teamPoints),
      createElement(
        "button",
        {
          type: "button",
          onClick: () => setTeamPoints((points) => points + 1),
        },
        "Add Point"
      )
    ),

    createElement(AssignmentForm, {
      draftTitle,
      setDraftTitle,
      draftCourse,
      setDraftCourse,
      draftPriority,
      setDraftPriority,
      draftDueDate,
      setDraftDueDate,
      addAssignment,
    }),

    createElement(
      "div",
      { className: "assignment-preview" },
      createElement("h3", null, "Live Preview"),
      createElement(
        "p",
        null,
        draftTitle || "No assignment title typed yet"
      ),
      createElement(
        "small",
        null,
        `${draftCourse || "No course"} • ${draftPriority} priority • ${
          draftDueDate || "No due date"
        }`
      )
    ),

    createElement(
      "ul",
      { className: "assignment-card-list" },
      assignments.map((assignment) =>
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
                onClick: () => toggleAssignment(assignment.id),
              },
              assignment.completed ? "Undo" : "Complete"
            ),
            createElement(
              "button",
              {
                type: "button",
                className: "remove-button",
                onClick: () => removeAssignment(assignment.id),
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