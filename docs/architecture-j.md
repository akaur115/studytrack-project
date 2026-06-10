# Architecture Document - Jaspreet

## ProgressTask Type

### What does it do?

The ProgressTask type defines the shape of progress task data in the app. Each task has an id, task name, owner, status, and progress percentage.

### Why is this logic here?

The type is kept separate so the test data, repository, service, hook, and page all use the same progress task structure.

### Where is it used?

It is used in the progress task test data, repository, service, and useProgressTasks hook.


## Progress Task Test Data

### What does it do?

The progress task test data provides ten sample progress task objects for the front-end app.

### Why is this logic here?

Sprint 3 does not use a back-end yet, so test data is used as a temporary data source. This can later be replaced with database data.

### Where is it used?

It is imported by the progress task repository.


## Progress Task Repository

### What does it do?

The progress task repository manages progress task data using CRUD methods: getAll, create, update, and delete.

### Why is this logic here?

The repository handles data access logic. This keeps the page from directly controlling the data source.

### Where is it used?

It is used by the useProgressTasks hook to get, add, update, and delete progress tasks.


## Progress Task Service

### What does it do?

The progress task service handles business logic such as validation, filtering by status, counting completed tasks, counting blocked tasks, calculating average progress, and marking tasks as done.

### Why is this logic here?

This logic is not UI code and not data access code. It belongs in the service because it controls how progress task data should behave.

### Where is it used?

It is used by the useProgressTasks hook.


## useProgressTasks Hook

### What does it do?

The useProgressTasks hook connects the Progress page to the progress task service and progress task repository. It gives the page the task list, filter, summary counts, average progress, and functions for add, remove, and mark done actions.

### Why is this logic here?

The hook keeps the Progress page cleaner. The page can focus on displaying the UI instead of holding all the progress task logic.

### Where is it used?

It is used in the Progress page.

## useProgressStatuses Hook

### What does it do?

The useProgressStatuses hook provides status options and readable status labels for the Progress feature.

### Why is this logic here?

This is presentation logic because it helps display dropdown options and labels. It is separated so the same status options can be reused.

### Where is it used?

It is used in ProgressForm and ProgressPage.
 