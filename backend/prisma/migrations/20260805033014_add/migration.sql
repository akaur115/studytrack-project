/*
  Warnings:

  - Added the required column `course` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "description" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Assignment" ("completed", "createdAt", "description", "id", "title", "updatedAt", "userId") SELECT "completed", "createdAt", "description", "id", "title", "updatedAt", "userId" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE INDEX "Assignment_userId_idx" ON "Assignment"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
