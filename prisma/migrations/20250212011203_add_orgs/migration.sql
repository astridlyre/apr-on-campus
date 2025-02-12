-- CreateTable
CREATE TABLE "IncidentOrgs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "incidentId" TEXT,
    CONSTRAINT "IncidentOrgs_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
