import { useEffect, useState } from "react";
import { progressTaskRepository } from "../repositories/progressTaskRepository";
import { progressTaskService } from "../services/progressTaskService";
import type { ProgressStatus, ProgressTask } from "../types/ProgressTask";

export function useProgressTasks() {
  const [progressTasks, setProgressTasks] = useState<ProgressTask[]>([]);
  const [statusFilter, setStatusFilter] =
    useState<ProgressStatus | "All">("All");

  async function loadProgressTasks() {
    const tasks = await progressTaskRepository.getAll();
    setProgressTasks(tasks);
  }

  useEffect(() => {
    loadProgressTasks();
  }, []);

  const visibleProgressTasks = progressTaskService.filterByStatus(
    progressTasks,
    statusFilter
  );

  const completedCount = progressTaskService.countCompleted(progressTasks);
  const blockedCount = progressTaskService.countBlocked(progressTasks);
  const averageProgress =
    progressTaskService.calculateAverageProgress(progressTasks);

  async function addProgressTask(
    task: string,
    owner: string,
    status: ProgressStatus,
    percent: number
  ): Promise<boolean> {
    if (!progressTaskService.isValidProgressTask(task, owner)) {
      return false;
    }

    await progressTaskRepository.create({
      task,
      owner,
      status,
      percent: status === "Done" ? 100 : percent,
    });

    await loadProgressTasks();
    return true;
  }

  async function removeProgressTask(id: number) {
    await progressTaskRepository.delete(id);
    await loadProgressTasks();
  }

  async function markProgressTaskDone(id: number) {
    await progressTaskRepository.markDone(id);
    await loadProgressTasks();
  }

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