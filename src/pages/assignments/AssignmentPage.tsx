import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { useAssignments } from "../../hooks/useAssignments";
import type { AssignmentPriority } from "../../types/Assignment";

type AssignmentPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function AssignmentPage({ teamPoints, setTeamPoints }: AssignmentPageProps) {
  const {
    visibleAssignments,
    priorityFilter,
    setPriorityFilter,
    completedCount,
    remainingCount,
    isLoading,
    addAssignment,
    removeAssignment,
    toggleAssignment,
  } = useAssignments();

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [priority, setPriority] = useState<AssignmentPriority>("Medium");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    addAssignment(title, course, priority, dueDate);

    setTitle("");
    setCourse("");
    setPriority("Medium");
    setDueDate("");
  }

  if (isLoading) {
    return <p>Loading assignments...</p>;
  }

  return (
    <main className="assignment-page">
      <h1>Assignment Planner</h1>

      <section className="assignment-summary">
        <p>Total assignments: {visibleAssignments.length}</p>
        <p>Remaining: {remainingCount}</p>
        <p>Completed: {completedCount}</p>
      </section>

      <section className="team-points">
        <p>Team activity points: {teamPoints ?? 0}</p>
        <button type="button" onClick={() => setTeamPoints?.((points) => points + 1)}>
          Add Point
        </button>
      </section>

      <form className="assignment-form" onSubmit={handleSubmit}>
        <h2>Create a New Assignment</h2>

        <label>Assignment title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          placeholder="Example: Sprint 4 planning"
        />

        <label>Course</label>
        <input
          value={course}
          onChange={(event) => setCourse(event.currentTarget.value)}
          placeholder="Example: Full Stack"
        />

        <label>Priority</label>
        <select
          value={priority}
          onChange={(event) =>
            setPriority(event.currentTarget.value as AssignmentPriority)
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Due date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.currentTarget.value)}
        />

        <button type="submit">Save Assignment</button>
      </form>

      <section className="assignment-filter">
        <label>Filter by priority</label>
        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(event.currentTarget.value as AssignmentPriority | "All")
          }
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </section>

      <section className="assignment-list">
        <h2>Assignment Table</h2>

        <table className="assignment-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleAssignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.course}</td>
                <td>{assignment.priority} priority</td>
                <td>{assignment.dueDate}</td>
                <td>{assignment.completed ? "completed" : "remaining"}</td>
                <td>
                  <button type="button" onClick={() => toggleAssignment(assignment.id)}>
                    {assignment.completed ? "Undo" : "Complete"}
                  </button>
                  <button type="button" onClick={() => removeAssignment(assignment.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AssignmentPage;
            