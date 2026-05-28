import { useState, type Dispatch, type SetStateAction } from "react";
import ProgressForm from "../../components/forms/ProgressForm";

type ProgressPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function ProgressPage({ teamPoints, setTeamPoints }: ProgressPageProps) {
  const [newProgress, setNewProgress] = useState("");
  const [progressItems, setProgressItems] = useState([
    { id: 1, task: "Finish routing setup" },
    { id: 2, task: "Check pull requests" },
  ]);

  function addProgress() {
    if (newProgress.trim() === "") {
      return;
    }

    const nextProgress = {
      id: Date.now(),
      task: newProgress,
    };

    setProgressItems([...progressItems, nextProgress]);
    setNewProgress("");
    setTeamPoints((points) => points + 1);
  }

  function removeProgress(id: number) {
    setProgressItems(progressItems.filter((item) => item.id !== id));
    setTeamPoints((points) => points + 1);
  }

  return (
    <section className="page-card">
      <h2>Team Progress</h2>

      <p className="page-description">
        This page lets the team add and remove project progress tasks.
      </p>

      <div className="shared-box">
        <strong>Team activity points:</strong>
        <span>{teamPoints}</span>
        <button type="button" onClick={() => setTeamPoints((points) => points + 1)}>
          Add Point
        </button>
      </div>

      <ProgressForm
        newProgress={newProgress}
        setNewProgress={setNewProgress}
        addProgress={addProgress}
      />

      <p className="preview-text">
        Draft progress task: {newProgress || "Nothing typed yet"}
      </p>

      <ul className="item-list">
        {progressItems.map((item) => (
          <li key={item.id}>
            <span>{item.task}</span>
            <button
              type="button"
              className="remove-button"
              onClick={() => removeProgress(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProgressPage;