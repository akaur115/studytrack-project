import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAuth } from "@clerk/react-router";

import { progressTaskRepository } from "../repositories/progressTaskRepository";
import { progressTaskService } from "../services/progressTaskService";
import type {
  ProgressStatus,
  ProgressTask,
} from "../types/ProgressTask";

export function useProgressTasks() {
  const {
    isLoaded,
    isSignedIn,
    getToken,
  } = useAuth();

  const [progressTasks, setProgressTasks] =
    useState<ProgressTask[]>([]);

  const [statusFilter, setStatusFilter] =
    useState<ProgressStatus | "All">("All");

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  const getSessionToken =
    useCallback(async (): Promise<string> => {
      const token = await getToken();

      if (!token) {
        throw new Error(
          "Your login session is unavailable."
        );
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

      const tasks =
        await progressTaskRepository.getAll(token);

      setProgressTasks(tasks);
    } catch (error) {
      console.error("Unable to load tasks:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load progress tasks."
      );
    } finally {
      setIsLoading(false);
    }
  }, [
    getSessionToken,
    isLoaded,
    isSignedIn,
  ]);

  useEffect(() => {
    void loadProgressTasks();
  }, [loadProgressTasks]);

  const visibleProgressTasks =
    progressTaskService.filterByStatus(
      progressTasks,
      statusFilter
    );

  const completedCount =
    progressTaskService.countCompleted(
      progressTasks
    );

  const blockedCount =
    progressTaskService.countBlocked(
      progressTasks
    );

  const averageProgress =
    progressTaskService.calculateAverageProgress(
      progressTasks
    );

  async function addProgressTask(
    task: string,
    owner: string,
    status: ProgressStatus,
    percent: number
  ): Promise<boolean> {
    if (
      !progressTaskService.isValidProgressTask(
        task,
        owner
      )
    ) {
      setError(
        "Enter a task name and owner."
      );
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
          percent:
            status === "Done" ? 100 : percent,
        },
        token
      );

      await loadProgressTasks();
      return true;
    } catch (error) {
      console.error("Unable to add task:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to add progress task."
      );

      return false;
    }
  }

  async function removeProgressTask(
    id: number
  ): Promise<void> {
    setError("");

    try {
      const token = await getSessionToken();

      await progressTaskRepository.delete(
        id,
        token
      );

      await loadProgressTasks();
    } catch (error) {
      console.error("Unable to delete task:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete progress task."
      );
    }
  }

  async function markProgressTaskDone(
    id: number
  ): Promise<void> {
    setError("");

    try {
      const token = await getSessionToken();

      await progressTaskRepository.markDone(
        id,
        token
      );

      await loadProgressTasks();
    } catch (error) {
      console.error("Unable to update task:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to update progress task."
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