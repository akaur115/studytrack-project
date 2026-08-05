# StudyTrack

## Project Team

**Team Name:** Stack Sisters

**Team Members:**

- Dilraj
- Arshpreet
- Jaspreet

## Project Description

StudyTrack is a full-stack student planning application that helps students organize assignments, save study resources, and track group-project progress.

The application uses:

- React and TypeScript for the frontend
- Express and TypeScript for the backend
- PostgreSQL and Prisma for data storage
- Clerk for user authentication and session management
- Docker for the local PostgreSQL database

## Main Features

- View and manage assignments
- Save and filter study resources
- Track team progress
- Register and sign in using Clerk
- Store application users using their Clerk user ID
- Allow guests to view resources
- Restrict resource creation, updates, and deletion to signed-in users
- Save data persistently in PostgreSQL

# Local Setup

## Prerequisites

Install the following:

- Node.js and npm
- Docker Desktop
- Git
- A Clerk development application

## Install Dependencies

From the main project folder, run:

```bash
npm install

## 1. Clone the repository

```bash
git clone <repository-url>
cd studytrack-project

## Backend Environment Variables

Create a file named `backend/.env` and add:

```env
DATABASE_URL="postgresql://studytrack_user:studytrack_password@localhost:5433/studytrack_db"
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key
CLERK_SECRET_KEY=sk_test_your_secret_key
PORT=3000