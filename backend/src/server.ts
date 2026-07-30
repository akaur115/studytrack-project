import "dotenv/config";
import express from "express";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes";
import assignmentRoutes from "./routes/assignmentRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("StudyTrack Backend Running");
});

app.use("/api/resources", resourceRoutes);
app.use("/api/assignments", assignmentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});