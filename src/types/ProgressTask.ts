export type ProgressStatus = "Planned" | "In Progress" | "Blocked" | "Done";
export type ProgressTask = {
 id: number;
 task: string;
 owner: string;
 status: ProgressStatus;
 percent: number;
};