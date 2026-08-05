# StudyTrack

StudyTrack is a full-stack student planning application. It helps users organize assignments, study resources, and project progress. Clerk authentication is used for registration and login. Each signed-in user can create and manage their own assignments.

## Local Setup

### Requirements

Install the following before running the application:

- Node.js
- npm
- Git
- A Clerk account and Clerk application
- Visual Studio Code or another code editor

## 1. Clone the Repository

git clone YOUR_REPOSITORY_URL
cd studytrack-project


Replace `YOUR_REPOSITORY_URL` with the GitHub repository URL.

## 2. Install Frontend Packages

Open a terminal from the project folder:

cd frontend
npm install

## 3. Configure Frontend Environment Variables

Create this file:

frontend/.env

Add:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3000/api

The Clerk publishable key is available from the Clerk dashboard.
Do not place the `.env` file inside the `src` folder.

## 4. Install Backend Packages

From the frontend folder, move to the backend:

cd ../backend
npm install

## 5. Configure Backend Environment Variables

Create this file:

backend/.env

Add:
```env
DATABASE_URL="file:./dev.db"
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
PORT=3000
FRONTEND_URL=http://localhost:5173


Replace the placeholder Clerk values with the keys from the Clerk dashboard.
Never commit the `.env` files or Clerk secret key to GitHub.

## 6. Apply Database Migrations

Run this command inside the backend folder:

npx prisma migrate dev


Generate the Prisma client:

npx prisma generate


## 7. Start the Backend

Inside the backend folder, run:
npm run dev

The backend normally runs at:

http://localhost:3000

The health endpoint can be tested at:
http://localhost:3000/api/health

Keep this terminal open.

## 8. Start the Frontend

Open a second terminal from the main project folder:

cd frontend
npm run dev

The frontend normally runs at:

http://localhost:5173

## 9. Authentication Testing

1. Open the frontend in the browser.
2. Select **Register**.
3. Create an account using an email address.
4. Confirm that the user avatar appears.
5. Open the Assignments page.
6. Create and save an assignment.
7. Log out using the user avatar.
8. Confirm that assignment controls are hidden.
9. Create or log in with a different account.
10. Confirm that the second user cannot see the first user's assignments.
11. Log back into the first account.
12. Confirm that the first user's assignment is still available.

## Production Build

### Frontend

cd frontend
npm run build

A successful frontend build creates the `frontend/dist` folder.

### Backend

cd backend
npm run build

Both commands should finish without TypeScript or build errors.

## Project Structure

studytrack-project/
├── backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   └── package.json
└── README.md

## Team Members

- Dilraj
- Arshpreet
- Jaspreet
