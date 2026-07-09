import { useState } from "react";
import { progressTaskRepository } from "../repositories/progressTaskRepository";
import { progressTaskService } from "../services/progressTaskService";
import type {
  ProgressStatus,
  ProgressTask,
} from "../types/ProgressTask";

export function useProgressTasks() {
  const [progressTasks, setProgressTasks] = useState<ProgressTask[]>(
    progressTaskRepository.getAll()
  );

  const [statusFilter, setStatusFilter] =
    useState<ProgressStatus | "All">("All");

  const visibleProgressTasks = progressTaskService.filterByStatus(
    progressTasks,
    statusFilter
  );

  const completedCount = progressTaskService.countCompleted(progressTasks);

  const blockedCount = progressTaskService.countBlocked(progressTasks);

  const averageProgress =
    progressTaskService.calculateAverageProgress(progressTasks);
  function addProgressTask(
    task: string,
    owner: string,
    status: ProgressStatus,
    percent: number
  ): boolean {
    if (!progressTaskService.isValidProgressTask(task, owner)) {
      return false;
    }

    const newProgressTask = progressTaskService.createProgressTask(
      task,
      owner,
      status,
      percent
    );

    progressTaskRepository.create(newProgressTask);
    setProgressTasks(progressTaskRepository.getAll());
    return true;
  }

  function removeProgressTask(id: number) {
    progressTaskRepository.delete(id);
    setProgressTasks(progressTaskRepository.getAll());
  }

  function markProgressTaskDone(id: number) {

    const selectedProgressTask = progressTasks.find(
      (progressTask) => progressTask.id === id
    );

    if (!selectedProgressTask) {
      return;
    }
    const updatedProgressTask =
      progressTaskService.markDone(selectedProgressTask);
    progressTaskRepository.update(updatedProgressTask);
    setProgressTasks(progressTaskRepository.getAll());
  }

  /*

    Returned values:

    - progressTasks: full list of progress tasks from the repository

    - visibleProgressTasks: progress tasks after status filtering

    - statusFilter: current selected status filter

    - setStatusFilter: updates the selected filter

    - completedCount: number of completed tasks

    - blockedCount: number of blocked tasks

    - averageProgress: average progress percentage

    - addProgressTask: adds a task using the service and repository

    - removeProgressTask: removes a task using the repository

    - markProgressTaskDone: updates a task to Done using service and repository

  */

  return {
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
  };

}
 