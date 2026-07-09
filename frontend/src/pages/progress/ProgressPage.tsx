import {
  createElement,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";

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

  const [draftStatus, setDraftStatus] =
    useState<ProgressStatus>("Planned");
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


  function handleAddProgressTask() {

    const progressTaskWasAdded = addProgressTask(
      draftTask,
      draftOwner,
      draftStatus,
      draftPercent

    );

    if (!progressTaskWasAdded) {
      return;

    }
    setDraftTask("");
    setDraftOwner("");
    setDraftStatus("Planned");
    setDraftPercent(0);
    setTeamPoints?.((points) => points + 1);

  }

  function handleRemoveProgressTask(id: number) {
    removeProgressTask(id);
    setTeamPoints?.((points) => points + 1);
  }
  function handleMarkDone(id: number) {
    markProgressTaskDone(id);
    setTeamPoints?.((points) => points + 1);

  }

  return createElement(
    "section",
    { className: "page-card progress-page" },
    createElement("h2", null, "Sprint Progress Tracker"),
    createElement(
      "p",
      { className: "page-description" },
      "This page helps the team track Sprint 3 tasks by owner, status, and progress percentage."
    ),

    createElement(
      "div",
      { className: "progress-dashboard" },
      createElement(
        "article",
        null,
        createElement("strong", null, progressTasks.length),

        createElement("span", null, "Total tasks")
      ),

      createElement(
        "article",
        null,
        createElement("strong", null, completedCount),

        createElement("span", null, "Completed")

      ),
      createElement(
        "article",
        null,
        createElement("strong", null, blockedCount),

        createElement("span", null, "Blocked")

      ),

      createElement(
        "article",
        null,
        createElement("strong", null, `${averageProgress}%`),

        createElement("span", null, "Average progress")

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

    createElement(ProgressForm, {
      draftTask,
      setDraftTask,
      draftOwner,
      setDraftOwner,
      draftStatus,
      setDraftStatus,
      draftPercent,
      setDraftPercent,
      addProgressItem: handleAddProgressTask,
    }),

    createElement(
      "div",
      { className: "progress-preview" },
      createElement("h3", null, "Progress Preview"),
      createElement("p", null, draftTask || "No task typed yet"),
      createElement(
        "small",
        null,
        `${draftOwner || "No owner"} • ${getStatusLabel(
          draftStatus
        )} • ${draftPercent}%`
      )

    ),

    createElement(
      "div",
      { className: "progress-filter" },
      createElement("label", null, "Filter by status"),
      createElement(
        "select",

        {
          value: statusFilter,
          onChange: (event: ChangeEvent<HTMLSelectElement>) =>
            setStatusFilter(event.currentTarget.value as ProgressStatus | "All"),
        },
        progressFilterOptions.map((option) =>
          createElement(
            "option",
            { key: option.value, value: option.value },
            option.label
          )

        )

      )

    ),

    createElement(
      "ul",
      { className: "progress-card-list" },
      visibleProgressTasks.map((progressTask) =>
        createElement(
          "li",
          { key: progressTask.id, className: "progress-task-card" },
          createElement(
            "div",
            { className: "progress-task-main" },
            createElement("h3", null, progressTask.task),

            createElement("p", null, `Owner: ${progressTask.owner}`),

            createElement(
              "small",
              null,
              `Status: ${getStatusLabel(progressTask.status)}`
            ),

            createElement(
              "div",
              { className: "progress-bar" },
              createElement("div", {
                className: "progress-bar-fill",
                style: { width: `${progressTask.percent}%` },
              })

            ),

            createElement("small", null, `${progressTask.percent}% complete`)

          ),

          createElement(
            "div",
            { className: "progress-task-actions" },

            createElement(
              "button",
              {
                type: "button",
                onClick: () => handleMarkDone(progressTask.id),

              },
              "Mark Done"
            ),

            createElement(
              "button",

              {

                type: "button",
                className: "remove-button",
                onClick: () => handleRemoveProgressTask(progressTask.id),

              },
              "Remove"

            )

          )

        )

      )

    )

  );

}

export default ProgressPage;
 