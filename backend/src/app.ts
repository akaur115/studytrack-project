import cors from "cors";
import express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.js";

export const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/assignments", assignmentRoutes);