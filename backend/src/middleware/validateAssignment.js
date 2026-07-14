export function validateAssignment(req, res, next) {
    const { title, course, priority, dueDate } = req.body;
    if (!title || !course || !priority || !dueDate) {
        return res.status(400).json({
            message: "Title, course, priority, and due date are required.",
        });
    }
    if (!["Low", "Medium", "High"].includes(priority)) {
        return res.status(400).json({
            message: "Priority must be Low, Medium, or High.",
        });
    }
    next();
}
//# sourceMappingURL=validateAssignment.js.map