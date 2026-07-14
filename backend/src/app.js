import express from "express";
import assignmentRoutes from "./routes/assignmentRoutes.js";
export const app = express();
app.use(express.json());
app.get("/api/health", (_req, res) => {
    res.json({ message: "Backend is running" });
});
app.use("/api/assignments", assignmentRoutes);
//# sourceMappingURL=app.js.map