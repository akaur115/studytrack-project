import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";

import assignmentRoutes from "./routes/assignmentRoutes";
import { progressTaskRoutes } from "./routes/progressTaskRoutes";
import resourceRoutes from "./routes/resourceRoutes";
import userRoutes from "./routes/userRoutes";

export const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(clerkMiddleware());

app.get("/", (_req, res) => {
  res.send("StudyTrack Backend Running");
});

app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/resources", resourceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/progress-tasks", progressTaskRoutes);
app.use("/api/users", userRoutes);
