let assignments = [];
let nextId = 1;
export const assignmentService = {
    getAll() {
        return assignments;
    },
    create(data) {
        const newAssignment = {
            id: nextId,
            ...data,
        };
        nextId++;
        assignments.push(newAssignment);
        return newAssignment;
    },
    update(id, data) {
        assignments = assignments.map((assignment) => assignment.id === id ? { ...assignment, ...data } : assignment);
        return assignments.find((assignment) => assignment.id === id);
    },
    remove(id) {
        assignments = assignments.filter((assignment) => assignment.id !== id);
    },
};
//# sourceMappingURL=assignmentService.js.map