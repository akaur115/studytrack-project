import cors from "cors";
import express from "express";
import { clerkMiddleware } from "@clerk/express";

import { assignmentRoutes } from "./routes/assignmentRoutes";
import { resourceRoutes } from "./routes/resourceRoutes";
import { progressTaskRoutes } from "./routes/progressTaskRoutes";

export const app = express();

app.use(clerkMiddleware());

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("StudyTrack Backend Running");
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

app.use("/api/assignments", assignmentRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/progress-tasks", progressTaskRoutes);