# Architecture Document - Dilraj
 
## StudyResource Type
 
### What does it do?
 
The StudyResource type defines the shape of resource data in the app. Each resource has an id, name, category, source, and saved status.
 
### Why is this logic here?
 
The type is kept separate so the test data, repository, service, hook, and page all use the same data structure.
 
### Where is it used?
 
It is used in the resource test data, resource repository, resource service, and useResources hook.
 
## Resource Test Data
 
### What does it do?
 
The resource test data provides ten sample study resource objects for the front-end app.
 
### Why is this logic here?
 
Sprint 3 does not use a back-end yet, so test data is used as a temporary data source. This can later be replaced with database data.
 
### Where is it used?
 
It is imported by the resource repository.
 
## Resource Repository
 
### What does it do?
 
The resource repository manages resource data using CRUD methods: getAll, create, update, and delete.
 
### Why is this logic here?
 
The repository handles data access logic. This keeps the page from directly controlling the data source.
 
### Where is it used?
 
It is used by the useResources hook to get, add, update, and delete study resources.
 
## Resource Service
 
### What does it do?
 
The resource service handles business logic such as validation, filtering by category, counting saved resources, counting videos, and toggling saved status.
 
### Why is this logic here?
 
This logic is not UI code and not data access code. It belongs in the service because it controls how resource data should behave.
 
### Where is it used?
 
It is used by the useResources hook.
  
## useResources Hook
 
### What does it do?
 
The useResources hook connects the Resources page to the resource service and resource repository. It gives the page the resource list, filter, summary counts, and functions for add, remove, and save actions.
 
### Why is this logic here?
 
The hook keeps the Resources page cleaner. The page can focus on displaying the UI instead of holding all the resource logic.
 
### Where is it used?
 
It is used in the Resources page.

## useResourceCategories Hook
 
### What does it do?
 
The useResourceCategories hook provides category options and readable category labels for the Resources feature.
 
### Why is this logic here?
 
This is presentation logic because it helps display dropdown options and labels. It is separated so the same category options can be reused.
 
### Where is it used?
 
It is used in ResourceForm and ResourcesPage.
 