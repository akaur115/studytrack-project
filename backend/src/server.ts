import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { progressTaskRoutes } from "./routes/progressTaskRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("StudyTrack backend is running");
});

app.use("/api/progress-tasks", progressTaskRoutes);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});