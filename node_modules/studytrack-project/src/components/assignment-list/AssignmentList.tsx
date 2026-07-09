import "./AssignmentList.css";

function AssignmentList() {
  const assignments = [
    { id: 1, title: "Set up GitHub repository", status: "Done" },
    { id: 2, title: "Create React TypeScript project", status: "Done" },
    { id: 3, title: "Build Sprint 1 component", status: "In progress" },
    { id: 4, title: "Prepare Vercel deployment", status: "To do" },
  ];

  return (
    <section className="assignment-list">
      <h2>Assignment List</h2>
      <p>
        This section shows school and project tasks that students can track in
        StudyTrack.
      </p>

      <ul>
        {assignments.map((assignment) => (
          <li key={assignment.id}>
            <span>{assignment.title}</span>
            <strong>{assignment.status}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AssignmentList;