import prisma from "../src/prisma/prismaClient";

const sprint4Tasks = [
  { task: "Initialize Express Backend", owner: "Jaspreet", status: "Done", percent: 100 },
  { task: "Configure Prisma ORM", owner: "Jaspreet", status: "Done", percent: 100 },
  { task: "Create Progress Database Model", owner: "Jaspreet", status: "Done", percent: 100 },
  { task: "Build Progress API Routes", owner: "Jaspreet", status: "In Progress", percent: 75 },
  { task: "Connect Repository to Backend API", owner: "Jaspreet", status: "In Progress", percent: 80 },
  { task: "Enable CORS for Frontend", owner: "Jaspreet", status: "Done", percent: 100 },
  { task: "Store Progress Tasks in SQLite", owner: "Jaspreet", status: "In Progress", percent: 70 },
  { task: "Test CRUD API Endpoints", owner: "Jaspreet", status: "Planned", percent: 35 },
  { task: "Validate Progress Requests", owner: "Jaspreet", status: "Planned", percent: 20 },
  { task: "Verify Data Persistence After Refresh", owner: "Jaspreet", status: "Blocked", percent: 10 },
];

async function main() {
  await prisma.progressTask.deleteMany();
  await prisma.progressTask.createMany({
    data: sprint4Tasks,
  });

  console.log("Sprint 4 progress tasks added to database.");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });