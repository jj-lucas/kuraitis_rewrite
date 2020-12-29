# Migration `20201128221136-change-image-field-of-report`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 11/28/2020, 11:11:36 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Report" (
    "id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" DATETIME,
    "imageUrl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Report" ("id", "createdAt", "resolvedAt", "description", "url") SELECT "id", "createdAt", "resolvedAt", "description", "url" FROM "Report";
DROP TABLE "Report";
ALTER TABLE "new_Report" RENAME TO "Report";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201128172852-changed-name-of-field..20201128221136-change-image-field-of-report
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -32,9 +32,8 @@
     product    Product?  @relation(fields: [productId], references: [id])
     Sku        Sku[]
     categoryId String?
     productId  String?
-    Report     Report[]
 }
 model Category {
     id             String    @id @default(cuid())
@@ -53,12 +52,11 @@
 model Report {
     id          String    @id @default(cuid())
     createdAt   DateTime  @default(now())
     resolvedAt  DateTime?
-    image       Image     @relation(fields: [imageId], references: [id])
+    imageUrl    String
     url         String
     description String
-    imageId     String
 }
 model Product {
     id                 String     @id @default(cuid())
```

