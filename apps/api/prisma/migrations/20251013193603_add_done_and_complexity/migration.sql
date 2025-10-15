-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "description" TEXT,
    "required" BOOLEAN NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "complexity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Goal_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Goal" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "Roadmap" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("createdAt", "description", "id", "parentId", "required", "roadmapId", "title", "updatedAt") SELECT "createdAt", "description", "id", "parentId", "required", "roadmapId", "title", "updatedAt" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'TODO',
    "dueDate" DATETIME,
    "description" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "complexity" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("description", "dueDate", "goalId", "id", "status", "title") SELECT "description", "dueDate", "goalId", "id", "status", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
