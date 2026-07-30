import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/react-router";

import { progressTaskRepository } from "../repositories/progressTaskRepository";
import { progressTaskService } from "../services/progressTaskService";
import type {
  ProgressStatus,
  ProgressTask,
} from "../types/ProgressTask";

export function useProgressTasks() {
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const [progressTasks, setProgressTasks] = useState<ProgressTask[]>([]);
  const [statusFilter, setStatusFilter] =
    useState<ProgressStatus | "All">("All");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getSessionToken = useCallback(async (): Promise<string> => {
    const token = await getToken();

    if (!token) {
      throw new Error("You must be logged in to manage progress tasks.");
    }

    return token;
  }, [getToken]);

  const loadProgressTasks = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      setProgressTasks([]);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = await getSessionToken();
      const tasks = await progressTaskRepository.getAll(token);

      setProgressTasks(tasks);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load progress tasks."
      );
    } finally {
      setIsLoading(false);
    }
  }, [getSessionToken, isLoaded, isSignedIn]);

  useEffect(() => {
    void loadProgressTasks();
  }, [loadProgressTasks]);

  const visibleProgressTasks = progressTaskService.filterByStatus(
    progressTasks,
    statusFilter
  );

  const completedCount =
    progressTaskService.countCompleted(progressTasks);

  const blockedCount =
    progressTaskService.countBlocked(progressTasks);

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

    setError("");

    try {
      const token = await getSessionToken();

      await progressTaskRepository.create(
        {
          task,
          owner,
          status,
          percent: status === "Done" ? 100 : percent,
        },
        token
      );

      await loadProgressTasks();
      return true;
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to add the progress task."
      );

      return false;
    }
  }

  async function removeProgressTask(id: number): Promise<void> {
    setError("");

    try {
      const token = await getSessionToken();

      await progressTaskRepository.delete(id, token);
      await loadProgressTasks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete the progress task."
      );
    }
  }

  async function markProgressTaskDone(id: number): Promise<void> {
    setError("");

    try {
      const token = await getSessionToken();

      await progressTaskRepository.markDone(id, token);
      await loadProgressTasks();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update the progress task."
      );
    }
  }

  return {
    progressTasks,
    visibleProgressTasks,
    statusFilter,
    setStatusFilter,
    completedCount,
    blockedCount,
    averageProgress,
    isLoading,
    error,
    loadProgressTasks,
    addProgressTask,
    removeProgressTask,
    markProgressTaskDone,
  };
}