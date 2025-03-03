/*
  Warnings:

  - You are about to drop the `DidNotReportReason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncidentFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncidentIdentification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `religion` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoneNumber` on the `Incident` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DidNotReportReason";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IncidentFile";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "IncidentIdentification";
PRAGMA foreign_keys=on;

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
    "location" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "wantsContact" BOOLEAN NOT NULL DEFAULT false,
    "allowsSocialShare" BOOLEAN NOT NULL DEFAULT false,
    "didReport" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT NOT NULL,
    "impactDescription" TEXT NOT NULL,
    "wasFirstExperience" TEXT NOT NULL,
    "wasSystemic" BOOLEAN NOT NULL DEFAULT false,
    "gender" TEXT NOT NULL,
    "disability" TEXT NOT NULL,
    "identityDescription" TEXT NOT NULL,
    "additionalInformation" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 1
);
INSERT INTO "new_Incident" ("additionalInformation", "campus", "createdAt", "date", "description", "didReport", "disability", "gender", "id", "identityDescription", "impactDescription", "isActive", "location", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "version", "wantsContact", "wasFirstExperience") SELECT "additionalInformation", "campus", "createdAt", "date", "description", "didReport", "disability", "gender", "id", "identityDescription", "impactDescription", "isActive", "location", "province", "subject", "updatedAt", "userAffiliation", "userEmail", "userFirstName", "userLastName", "version", "wantsContact", "wasFirstExperience" FROM "Incident";
DROP TABLE "Incident";
ALTER TABLE "new_Incident" RENAME TO "Incident";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
