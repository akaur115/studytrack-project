import { Request, Response, NextFunction } from "express";

const validCategories = ["Notes", "Video", "Practice", "Documentation"];

export function validateResource(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, category, source } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "Resource name is required",
    });
  }

  if (!source || typeof source !== "string" || source.trim() === "") {
    return res.status(400).json({
      message: "Resource source is required",
    });
  }

  if (!validCategories.includes(category)) {
    return res.status(400).json({
      message: "Invalid resource category",
    });
  }

  next();
}