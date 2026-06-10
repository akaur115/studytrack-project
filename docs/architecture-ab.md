# Architecture Document - Arshpreet

## Assignment Type

### What does it do?

The Assignment type defines the shape of assignment data in the app. Each assignment has an id, title, course, priority, due date, and completed status.

### Why is this logic here?

The type is kept separate so the repository, service, hook, and page all use the same assignment structure.

### Where is it used?

It is used in the assignment test data, repository, service, and useAssignments hook.

---

## Assignment Test Data

### What does it do?

The assignment test data provides ten sample assignment objects for the front-end app.

### Why is this logic here?

The test data is separated because Sprint 3 does not use a back-end yet. This makes it easier to replace with database data later.

### Where is it used?

It is imported by the assignment repository.

---

## Assignment Repository

### What does it do?

The assignment repository manages assignment data using CRUD methods: getAll, create, update, and delete.

### Why is this logic here?

The repository handles data access logic. The page does not directly control the data source.

### Where is it used?

It is used by the useAssignments hook to get, add, update, and delete assignments.

---

## Assignment Service

### What does it do?

The assignment service handles business logic such as validation, filtering by priority, counting completed assignments, counting remaining assignments, and toggling completion status.

### Why is this logic here?

This logic is not UI code and not data access code. It belongs in the service because it controls how assignment data should behave.

### Where is it used?

It is used by the useAssignments hook.

---

## useAssignments Hook

### What does it do?

The useAssignments hook connects the Assignments page to the repository and service. It gives the page the assignment list, filter, summary counts, and functions for add, remove, and toggle actions.

### Why is this logic here?

The hook keeps presentation logic out of the page component. The page can focus on displaying the assignment planner.

### Where is it used?

It is used in the Assignments page.