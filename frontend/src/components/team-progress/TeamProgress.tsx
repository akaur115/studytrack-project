type TeamProgressItem = {
  id: number;
  task: string;
  progress: string;
};

function TeamProgress() {
  const progressItems: TeamProgressItem[] = [
    { id: 1, task: "Choose project theme", progress: "Complete" },
    { id: 2, task: "Create first components", progress: "In progress" },
    { id: 3, task: "Review pull requests", progress: "Next" },
    { id: 4, task: "Deploy project to Vercel", progress: "Not started" },
  ];

  return (
    <>
      <section className="team-progress">
        <h2>Team Progress</h2>

        <p>
          This section shows the main project tasks and the current progress for
          each task.
        </p>

        <ul>
          {progressItems.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.task}</span>
                <strong>{item.progress}</strong>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default TeamProgress;