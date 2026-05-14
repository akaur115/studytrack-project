import "./TeamProgress.css";

function TeamProgress() {
  const progressItems = [
    { id: 1, task: "Choose project theme", progress: "Complete" },
    { id: 2, task: "Create first components", progress: "In progress" },
    { id: 3, task: "Review pull requests", progress: "Next" },
    { id: 4, task: "Deploy project to Vercel", progress: "Not started" },
  ];

  const progressList = progressItems.map((item) => (
    <li key={item.id}>
      <span>{item.task}</span>
      <strong>{item.progress}</strong>
    </li>
  ));

  return (
    <section className="team-progress">
      <h2>Team Progress</h2>

      <p>
        This section shows what the team has completed and what still needs to
        be finished for Sprint 1.
      </p>

      <ul>{progressList}</ul>
    </section>
  );
}

export default TeamProgress;