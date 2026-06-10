import type {
  ProgressStatus,
  ProgressTask,
} from "../types/ProgressTask";

export const progressTaskService = {
  createProgressTask(
    task: string,
    owner: string,
    status: ProgressStatus,
    percent: number
  ): ProgressTask {
    return {
      id: Date.now(),
      task,
      owner,
      status,
      percent: status === "Done" ? 100 : percent,
    };
  },

  isValidProgressTask(task: string, owner: string): boolean {
    return task.trim() !== "" && owner.trim() !== "";
  },

  countCompleted(progressTasks: ProgressTask[]): number {
    return progressTasks.filter((progressTask) => progressTask.status === "Done")
      .length;
  },
  
  countBlocked(progressTasks: ProgressTask[]): number {
    return progressTasks.filter(
      (progressTask) => progressTask.status === "Blocked"
    ).length;
  },
  calculateAverageProgress(progressTasks: ProgressTask[]): number {
    if (progressTasks.length === 0) {
      return 0;
    }
    const totalProgress = progressTasks.reduce(
      (total, progressTask) => total + progressTask.percent,
      0
    );
    return Math.round(totalProgress / progressTasks.length);
  },
  filterByStatus(
    progressTasks: ProgressTask[],
    status: ProgressStatus | "All"
  ): ProgressTask[] {
    if (status === "All") {
      return progressTasks;
    }

    return progressTasks.filter((progressTask) => progressTask.status === status);
  },

  markDone(progressTask: ProgressTask): ProgressTask {
    return {
      ...progressTask,
      status: "Done",
      percent: 100,
    };

  },

};
 