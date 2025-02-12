/*
  Warnings:

  - Added the required column `disability` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityDescription` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `religion` to the `Incident` table without a default value. This is not possible if the table is not empty.

*/
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
    "gender" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "disability" TEXT NOT NULL,
    "identityDescription" TEXT NOT NULL,
    "wantsContact" BOOLEAN NOT NULL DEFAULT false,
    "didReport" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Incident" ("additionalInformation", "campus", "createdAt", "date", "description", "didReport", "id", "impactDescription", "isActive", "location", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "userPhoneNumber", "version", "wantsContact", "wasFirstExperience") SELECT "additionalInformation", "campus", "createdAt", "date", "description", "didReport", "id", "impactDescription", "isActive", "location", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "userPhoneNumber", "version", "wantsContact", "wasFirstExperience" FROM "Incident";
DROP TABLE "Incident";
ALTER TABLE "new_Incident" RENAME TO "Incident";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
