import { progressTaskTestData } from "../data/progressTaskTestData";

import type { ProgressTask } from "../types/ProgressTask";

let progressTasks: ProgressTask[] = [...progressTaskTestData];

export const progressTaskRepository = {

  getAll(): ProgressTask[] {

    return [...progressTasks];

  },

  create(progressTask: ProgressTask): ProgressTask {

    progressTasks = [...progressTasks, progressTask];

    return progressTask;

  },

  update(updatedProgressTask: ProgressTask): ProgressTask {

    progressTasks = progressTasks.map((progressTask) =>
progressTask.id === updatedProgressTask.id

        ? updatedProgressTask

        : progressTask

    );

    return updatedProgressTask;

  },

  delete(id: number): void {

    progressTasks = progressTasks.filter((progressTask) => progressTask.id !== id);

  },

};
 