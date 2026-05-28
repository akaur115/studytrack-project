import { useState, type Dispatch, type SetStateAction } from "react";
import AssignmentForm from "../../components/forms/AssignmentForm";

type AssignmentsPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function AssignmentsPage({ teamPoints, setTeamPoints }: AssignmentsPageProps) {
  const [newAssignment, setNewAssignment] = useState("");
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Finish routing setup" },
    { id: 2, title: "Review Sprint 2 Kanban items" },
  ]);

  function addAssignment() {
    if (newAssignment.trim() === "") {
      return;
    }

    const nextAssignment = {
      id: Date.now(),
      title: newAssignment,
    };

    setAssignments([...assignments, nextAssignment]);
    setNewAssignment("");
    setTeamPoints((points) => points + 1);
  }

  function removeAssignment(id: number) {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    setTeamPoints((points) => points + 1);
  }

  return (
    <section className="page-card">
      <h2>Assignments</h2>

      <p className="page-description">
        This page lets students add and remove assignment tasks for StudyTrack.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
        <button type="button" onClick={() => setTeamPoints((points) => points + 1)}>
          Add Point
        </button>
      </div>

      <AssignmentForm
        newAssignment={newAssignment}
        setNewAssignment={setNewAssignment}
        addAssignment={addAssignment}
      />

      <p className="preview-text">
        Draft assignment: {newAssignment || "Nothing typed yet"}
      </p>

      <ul className="item-list">
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <span>{assignment.title}</span>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeAssignment(assignment.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AssignmentsPage;