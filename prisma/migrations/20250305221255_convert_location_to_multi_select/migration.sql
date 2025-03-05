/*
  Warnings:

  - You are about to drop the column `location` on the `Incident` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "IncidentLocation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "IncidentLocation_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Incident" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userFirstName" TEXT NOT NULL,
    "userLastName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userAffiliation" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "wantsContact" BOOLEAN NOT NULL DEFAULT false,
    "allowsSocialShare" BOOLEAN NOT NULL DEFAULT false,
    "didReport" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "impactDescription" TEXT NOT NULL,
    "wasFirstExperience" TEXT NOT NULL,
    "wasSystemic" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "disability" TEXT NOT NULL,
    "identityDescription" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Incident" ("additionalInformation", "allowsSocialShare", "campus", "createdAt", "date", "description", "didReport", "disability", "gender", "id", "identityDescription", "impactDescription", "isActive", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "version", "wantsContact", "wasFirstExperience", "wasSystemic") SELECT "additionalInformation", "allowsSocialShare", "campus", "createdAt", "date", "description", "didReport", "disability", "gender", "id", "identityDescription", "impactDescription", "isActive", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "version", "wantsContact", "wasFirstExperience", "wasSystemic" FROM "Incident";
DROP TABLE "Incident";
ALTER TABLE "new_Incident" RENAME TO "Incident";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
