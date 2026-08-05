# Project Retrospective

## When Our Team Was Most Effective

Our team was most effective when we divided the project into separate pages and responsibilities. For example, 
I worked mainly on the Assignments page while other members worked on Resources and Progress.This reduced the 
chance of multiple people changing the same file.
Using GitHub branches and pull requests also helped us work efficiently. Each member could complete and test 
their work before merging it into the develop branch. Reviewing changes before merging helped us find problems 
earlier and kept the main project more stable.

## When Our Team Was Least Effective

Our team was least effective when shared project setup was not completed before individual work began. 
Authentication is one example because the frontend, backend, environment variables, and database all 
depend on the same Clerk setup. When that shared setup had errors, it prevented other members from completing 
their own authenticated features.
We also had some merge and deployment problems when branches were not fully updated before new work started. 
Similar files were sometimes changed by different members, which caused confusion and required additional fixes.

## Lessons for Future Projects

I learned that high-priority shared requirements should be completed and merged before individual features are 
started. In future projects, I would create smaller issues, use one branch for each issue, pull the
latest develop branch before beginning, and test each change before opening a pull request.

I also learned the importance of keeping environment variables out of GitHub and documenting setup instructions 
clearly. I want to continue improving my understanding of authentication, API session tokens, database migrations,
and deployment. I would avoid making large changes in one commit because smaller commits are easier to test, review, 
and fix.