/*
  Warnings:

  - You are about to drop the column `type` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `userCity` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `userProvince` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `wantsForwarded` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `wasReported` on the `Incident` table. All the data in the column will be lost.
  - Added the required column `additionalInformation` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campus` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impactDescription` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAffiliation` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wasFirstExperience` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "IncidentIdentification" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT,
    CONSTRAINT "IncidentIdentification_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IncidentImpact" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT,
    CONSTRAINT "IncidentImpact_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IncidentType" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT,
    CONSTRAINT "IncidentType_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DidNotReportReason" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "incidentId" TEXT,
    CONSTRAINT "DidNotReportReason_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "userPhoneNumber" TEXT NOT NULL,
    "userAffiliation" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "impactDescription" TEXT NOT NULL,
    "wasFirstExperience" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "wantsContact" BOOLEAN NOT NULL DEFAULT false,
    "wantsSharedWithOrgs" BOOLEAN NOT NULL DEFAULT false,
    "didReport" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Incident" ("createdAt", "date", "description", "id", "isActive", "location", "province", "updatedAt", "userEmail", "userFirstName", "userLastName", "userPhoneNumber", "version") SELECT "createdAt", "date", "description", "id", "isActive", "location", "province", "updatedAt", "userEmail", "userFirstName", "userLastName", "userPhoneNumber", "version" FROM "Incident";
DROP TABLE "Incident";
ALTER TABLE "new_Incident" RENAME TO "Incident";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
