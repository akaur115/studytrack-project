import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import { progressTaskRoutes } from "./routes/progressTaskRoutes";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

// Clerk must be registered before routes.
app.use(clerkMiddleware());

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("StudyTrack backend is running");
});

app.use("/api/progress-tasks", progressTaskRoutes);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});