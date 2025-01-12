-- CreateTable
CREATE TABLE "IncidentFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "href" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "incidentId" TEXT NOT NULL,
    CONSTRAINT "IncidentFile_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
