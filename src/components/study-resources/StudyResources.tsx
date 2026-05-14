import "./StudyResources.css";

function StudyResources() {
  const resources = [
    { id: 1, name: "React class notes", category: "Notes" },
    { id: 2, name: "TypeScript practice", category: "Practice" },
    { id: 3, name: "Sprint planning document", category: "Project" },
    { id: 4, name: "GitHub pull request guide", category: "Team work" },
  ];

  const resourceItems = resources.map((resource) => (
    <li key={resource.id}>
      <span>{resource.name}</span>
      <strong>{resource.category}</strong>
    </li>
  ));

  return (
    <section className="study-resources">
      <h2>Study Resources</h2>

      <p>
        This section keeps track of helpful resources students can use while
        studying or working on group assignments.
      </p>

      <ul>{resourceItems}</ul>
    </section>
  );
}

export default StudyResources;