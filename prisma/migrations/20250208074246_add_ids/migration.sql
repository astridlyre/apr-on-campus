/*
  Warnings:

  - The primary key for the `DidNotReportReason` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IncidentIdentification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IncidentImpact` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `IncidentType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `DidNotReportReason` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `IncidentIdentification` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `IncidentImpact` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `IncidentType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DidNotReportReason" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "DidNotReportReason_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DidNotReportReason" ("incidentId", "name") SELECT "incidentId", "name" FROM "DidNotReportReason";
DROP TABLE "DidNotReportReason";
ALTER TABLE "new_DidNotReportReason" RENAME TO "DidNotReportReason";
CREATE TABLE "new_IncidentIdentification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "IncidentIdentification_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IncidentIdentification" ("incidentId", "name") SELECT "incidentId", "name" FROM "IncidentIdentification";
DROP TABLE "IncidentIdentification";
ALTER TABLE "new_IncidentIdentification" RENAME TO "IncidentIdentification";
CREATE TABLE "new_IncidentImpact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "IncidentImpact_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IncidentImpact" ("incidentId", "name") SELECT "incidentId", "name" FROM "IncidentImpact";
DROP TABLE "IncidentImpact";
ALTER TABLE "new_IncidentImpact" RENAME TO "IncidentImpact";
CREATE TABLE "new_IncidentType" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "IncidentType_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_IncidentType" ("incidentId", "name") SELECT "incidentId", "name" FROM "IncidentType";
DROP TABLE "IncidentType";
ALTER TABLE "new_IncidentType" RENAME TO "IncidentType";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
