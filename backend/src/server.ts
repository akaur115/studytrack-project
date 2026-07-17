import "dotenv/config";
import express from "express";
import cors from "cors";
import resourceRoutes from "./routes/resourceRoutes";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin(origin, callback) {
      // Allow direct browser/API testing where no Origin header is sent
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("StudyTrack Backend Running");
});

app.get("/api/health", (_req, res) => {
  res.json({
    message: "StudyTrack backend is running",
  });
});

app.use("/api/resources", resourceRoutes);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});