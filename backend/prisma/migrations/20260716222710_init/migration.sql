/*
  Warnings:

  - You are about to drop the column `createdAt` on the `ProgressTask` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `ProgressTask` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ProgressTask` table. All the data in the column will be lost.
  - Added the required column `title` to the `ProgressTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProgressTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "percent" INTEGER NOT NULL
);
INSERT INTO "new_ProgressTask" ("id", "owner", "percent", "status") SELECT "id", "owner", "percent", "status" FROM "ProgressTask";
DROP TABLE "ProgressTask";
ALTER TABLE "new_ProgressTask" RENAME TO "ProgressTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
