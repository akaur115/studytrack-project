import {
  createElement,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import ProgressForm from "../../components/forms/ProgressForm";

type ProgressStatus = "Planned" | "In Progress" | "Blocked" | "Done";

type ProgressItem = {
  id: number;
  task: string;
  owner: string;
  status: ProgressStatus;
  percent: number;
};

type ProgressPageProps = {
  teamPoints: number;
  setTeamPoints: Dispatch<SetStateAction<number>>;
};

function ProgressPage({ teamPoints, setTeamPoints }: ProgressPageProps) {
  const [draftTask, setDraftTask] = useState("");
  const [draftOwner, setDraftOwner] = useState("");
  const [draftStatus, setDraftStatus] = useState<ProgressStatus>("Planned");
  const [draftPercent, setDraftPercent] = useState(0);
  const [filterStatus, setFilterStatus] = useState<"All" | ProgressStatus>("All");

  const [progressItems, setProgressItems] = useState<ProgressItem[]>([
    {
      id: 1,
      task: "Complete Sprint 2 routing",
      owner: "Arshpreet",
      status: "Done",
      percent: 100,
    },
    {
      id: 2,
      task: "Review Resources page",
      owner: "Dilraj",
      status: "In Progress",
      percent: 60,
    },
    {
      id: 3,
      task: "Prepare final Sprint 2 review",
      owner: "Jaspreet",
      status: "Planned",
      percent: 20,
    },
  ]);

  const completedCount = progressItems.filter(
    (item) => item.status === "Done"
  ).length;

  const blockedCount = progressItems.filter(
    (item) => item.status === "Blocked"
  ).length;

  const averageProgress =
    progressItems.length === 0
      ? 0
      : Math.round(
          progressItems.reduce((total, item) => total + item.percent, 0) /
            progressItems.length
        );

  const visibleItems =
    filterStatus === "All"
      ? progressItems
      : progressItems.filter((item) => item.status === filterStatus);

  function addProgressItem() {
    if (draftTask.trim() === "" || draftOwner.trim() === "") {
      return;
    }

    const nextItem: ProgressItem = {
      id: Date.now(),
      task: draftTask,
      owner: draftOwner,
      status: draftStatus,
      percent: draftStatus === "Done" ? 100 : draftPercent,
    };

    setProgressItems([...progressItems, nextItem]);
    setDraftTask("");
    setDraftOwner("");
    setDraftStatus("Planned");
    setDraftPercent(0);
    setTeamPoints((points) => points + 1);
  }

  function removeProgressItem(id: number) {
    setProgressItems(progressItems.filter((item) => item.id !== id));
    setTeamPoints((points) => points + 1);
  }

  function markItemDone(id: number) {
    setProgressItems(
      progressItems.map((item) =>
        item.id === id
          ? { ...item, status: "Done", percent: 100 }
          : item
      )
    );

    setTeamPoints((points) => points + 1);
  }

  return createElement(
    "section",
    { className: "page-card progress-page" },

    createElement("h2", null, "Sprint Progress Tracker"),

    createElement(
      "p",
      { className: "page-description" },
      "This page helps the team track sprint tasks by owner, status, and progress percentage."
    ),

    createElement(
      "div",
      { className: "progress-dashboard" },

      createElement(
        "article",
        null,
        createElement("strong", null, progressItems.length),
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

    createElement(ProgressForm, {
      draftTask,
      setDraftTask,
      draftOwner,
      setDraftOwner,
      draftStatus,
      setDraftStatus,
      draftPercent,
      setDraftPercent,
      addProgressItem,
    }),

    createElement(
      "div",
      { className: "progress-preview" },
      createElement("h3", null, "Live Progress Preview"),
      createElement(
        "p",
        null,
        draftTask || "No task typed yet"
      ),
      createElement(
        "small",
        null,
        `${draftOwner || "No owner"} • ${draftStatus} • ${draftPercent}%`
      )
    ),

    createElement(
      "div",
      { className: "progress-filter" },
      createElement("label", null, "Filter by status"),
      createElement(
        "select",
        {
          value: filterStatus,
          onChange: (event: ChangeEvent<HTMLSelectElement>) =>
            setFilterStatus(event.currentTarget.value as "All" | ProgressStatus),
        },
        createElement("option", { value: "All" }, "All"),
        createElement("option", { value: "Planned" }, "Planned"),
        createElement("option", { value: "In Progress" }, "In Progress"),
        createElement("option", { value: "Blocked" }, "Blocked"),
        createElement("option", { value: "Done" }, "Done")
      )
    ),

    createElement(
      "ul",
      { className: "progress-card-list" },
      visibleItems.map((item) =>
        createElement(
          "li",
          { key: item.id, className: "progress-task-card" },

          createElement(
            "div",
            { className: "progress-task-main" },
            createElement("h3", null, item.task),
            createElement("p", null, `Owner: ${item.owner}`),
            createElement("small", null, `Status: ${item.status}`),

            createElement(
              "div",
              { className: "progress-bar" },
              createElement("div", {
                className: "progress-bar-fill",
                style: { width: `${item.percent}%` },
              })
            ),

            createElement("small", null, `${item.percent}% complete`)
          ),

          createElement(
            "div",
            { className: "progress-task-actions" },
            createElement(
              "button",
              {
                type: "button",
                onClick: () => markItemDone(item.id),
              },
              "Mark Done"
            ),
            createElement(
              "button",
              {
                type: "button",
                className: "remove-button",
                onClick: () => removeProgressItem(item.id),
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