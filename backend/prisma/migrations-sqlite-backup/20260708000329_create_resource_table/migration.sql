-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "saved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);
