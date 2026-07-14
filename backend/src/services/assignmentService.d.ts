type Assignment = {
    id: number;
    title: string;
    course: string;
    priority: string;
    dueDate: string;
    completed: boolean;
};
export declare const assignmentService: {
    getAll(): Assignment[];
    create(data: Omit<Assignment, "id">): Assignment;
    update(id: number, data: Partial<Assignment>): Assignment | undefined;
    remove(id: number): void;
};
export {};
//# sourceMappingURL=assignmentService.d.ts.map