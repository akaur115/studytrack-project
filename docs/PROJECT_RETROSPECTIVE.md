# StudyTrack Project Retrospective

## When was the team most effective or efficient?

Our team was most effective when the project work was divided into clear features and each member worked on a separate branch. This reduced conflicts and allowed us to focus on one part of the application at a time.

A good example was the work on assignments, resources, progress tracking, and user authentication. Each feature had its own frontend and backend responsibilities. We were also more efficient when we tested the frontend and backend separately before combining them.

During Sprint 5, using Clerk-provided components such as ClerkProvider, SignInButton, SignOutButton, SignedIn, and SignedOut helped us implement authentication without creating our own password system. Clerk middleware also made it easier to validate session tokens on the backend.

Regular communication and checking Git status before committing also helped prevent files such as environment variables and node_modules from being added to the repository.

## When was the team least effective or efficient?

The team was least efficient when configuration and database problems were discovered late in development. The project originally had SQLite migration files while the current Prisma schema was configured for PostgreSQL. This created migration conflicts and required us to reorganize the migration history.

We also had duplicate Prisma client files and some imports used file extensions that did not work correctly with the backend TypeScript configuration. These problems caused extra debugging because the error was not always located in the feature being developed.

Another issue was installing a backend dependency from the project root instead of the backend workspace. The application worked locally, but the dependency was originally listed in the wrong package.json file. This had to be corrected before completing the branch.

These problems could have been reduced by confirming the database provider, workspace structure, environment variables, and package versions at the beginning of the sprint.

## What can be learned for future projects?

One important lesson is to keep database migrations small and focused. A new database model should normally have its own migration instead of being combined with unrelated changes. The team should also avoid changing the database provider after several migrations have already been created.

For future projects, I would create the local setup instructions earlier. This would make it easier for every team member to use the same database ports, environment-variable names, Clerk application, and startup commands.

I also learned that authentication and application user data are different responsibilities. Clerk manages registration, login, logout, and session authentication, while the application database stores user-related information using the Clerk user ID.

I want to continue using feature branches, testing builds before commits, and protecting secret environment files with .gitignore. I also want to improve code reviews and check package placement, database migrations, and API authorization before features are merged.

One practice I would avoid is using destructive database reset commands without first checking whether important development data exists. In future work, I would create a backup before changing migration history or resetting a database.
