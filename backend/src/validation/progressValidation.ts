import { z } from "zod";

export const progressTaskValidation = z.object({
  task: z.string().min(1),
  owner: z.string().min(1),
  status: z.enum(["Planned", "In Progress", "Blocked", "Done"]),
  percent: z.number().min(0).max(100),
});