import { useState, type Dispatch, type SetStateAction } from "react";
import ProgressForm from "../../components/forms/ProgressForm";
import { useProgressStatuses } from "../../hooks/useProgressStatuses";
import { useProgressTasks } from "../../hooks/useProgressTasks";
import type { ProgressStatus } from "../../types/ProgressTask";

type ProgressPageProps = {
  teamPoints?: number;
  setTeamPoints?: Dispatch<SetStateAction<number>>;
};

function ProgressPage({ teamPoints, setTeamPoints }: ProgressPageProps) {
  const [draftTask, setDraftTask] = useState("");
  const [draftOwner, setDraftOwner] = useState("");
  const [draftStatus, setDraftStatus] = useState<ProgressStatus>("Planned");
  const [draftPercent, setDraftPercent] = useState(0);

  const {
    progressTasks,
    visibleProgressTasks,
    statusFilter,
    setStatusFilter,
    completedCount,
    blockedCount,
    averageProgress,
    addProgressTask,
    removeProgressTask,
    markProgressTaskDone,
  } = useProgressTasks();

  const { progressFilterOptions, getStatusLabel } = useProgressStatuses();

  async function handleAddProgressTask() {
    const wasAdded = await addProgressTask(
      draftTask,
      draftOwner,
      draftStatus,
      draftPercent
    );

    if (!wasAdded) return;

    setDraftTask("");
    setDraftOwner("");
    setDraftStatus("Planned");
    setDraftPercent(0);
    setTeamPoints?.((points) => points + 1);
  }

  async function handleRemoveProgressTask(id: number) {
    await removeProgressTask(id);
    setTeamPoints?.((points) => points + 1);
  }

  async function handleMarkDone(id: number) {
    await markProgressTaskDone(id);
    setTeamPoints?.((points) => points + 1);
  }

  return (
    <section className="page-card progress-page">
      <h2>Sprint Progress Tracker</h2>

      <p className="page-description">
        This page helps the team track Sprint 4 tasks by owner, status, and
        progress percentage.
      </p>

      <div className="progress-dashboard">
        <article>
          <strong>{progressTasks.length}</strong>
          <span>Total tasks</span>
        </article>

        <article>
          <strong>{completedCount}</strong>
          <span>Completed</span>
        </article>

        <article>
          <strong>{blockedCount}</strong>
          <span>Blocked</span>
        </article>

        <article>
          <strong>{averageProgress}%</strong>
          <span>Average progress</span>
        </article>
      </div>

      {teamPoints !== undefined && (
        <div className="shared-box">
          <strong>Team activity points:</strong>
          <span>{teamPoints}</span>
          <button
            type="button"
            onClick={() => setTeamPoints?.((points) => points + 1)}
          >
            Add Point
          </button>
        </div>
      )}

      <ProgressForm
        draftTask={draftTask}
        setDraftTask={setDraftTask}
        draftOwner={draftOwner}
        setDraftOwner={setDraftOwner}
        draftStatus={draftStatus}
        setDraftStatus={setDraftStatus}
        draftPercent={draftPercent}
        setDraftPercent={setDraftPercent}
        addProgressItem={handleAddProgressTask}
      />

      <div className="progress-preview">
        <h3>Progress Preview</h3>
        <p>{draftTask || "No task typed yet"}</p>
        <small>
          {draftOwner || "No owner"} • {getStatusLabel(draftStatus)} •{" "}
          {draftPercent}%
        </small>
      </div>

      <div className="progress-filter">
        <label htmlFor="progress-status-filter">Filter by status</label>
        <select
          id="progress-status-filter"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.currentTarget.value as ProgressStatus | "All")
          }
        >
          {progressFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="progress-card-list">
        {visibleProgressTasks.map((progressTask) => (
          <li key={progressTask.id} className="progress-task-card">
            <div className="progress-task-main">
              <h3>{progressTask.task}</h3>
              <p>Owner: {progressTask.owner}</p>
              <small>Status: {getStatusLabel(progressTask.status)}</small>

              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progressTask.percent}%` }}
                />
              </div>

              <small>{progressTask.percent}% complete</small>
            </div>

            <div className="progress-task-actions">
              <button
                type="button"
                onClick={() => handleMarkDone(progressTask.id)}
              >
                Mark Done
              </button>

              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveProgressTask(progressTask.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProgressPage;