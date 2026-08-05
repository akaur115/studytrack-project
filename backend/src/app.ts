import"dotenv/config";
import cors from "cors";
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import { progressTaskRoutes } from "./routes/progressTaskRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js"

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