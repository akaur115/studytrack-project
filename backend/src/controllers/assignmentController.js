import { assignmentService } from "../services/assignmentService.js";
export function getAssignments(_req, res) {
    res.json(assignmentService.getAll());
}
export function createAssignment(req, res) {
    const assignment = assignmentService.create({
        title: req.body.title,
        course: req.body.course,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        completed: false,
    });
    res.status(201).json(assignment);
}
export function updateAssignment(req, res) {
    const id = Number(req.params.id);
    const assignment = assignmentService.update(id, req.body);
    res.json(assignment);
}
export function deleteAssignment(req, res) {
    const id = Number(req.params.id);
    assignmentService.remove(id);
    res.status(204).send();
}
//# sourceMappingURL=assignmentController.js.map