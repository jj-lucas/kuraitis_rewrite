# Migration `20201128134903-product-code-not-required`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 11/28/2020, 2:49:03 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL,
    "code" TEXT,
    "customizable" BOOLEAN NOT NULL DEFAULT true,
    "hasMultiplePrices" BOOLEAN NOT NULL DEFAULT false,
    "sorting" INTEGER,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "selectedAttributes" TEXT,
    "slug_da" TEXT,
    "slug_en" TEXT,
    "name_da" TEXT,
    "name_en" TEXT,
    "description_da" TEXT,
    "description_en" TEXT,
    "priceId" TEXT,

    FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Product" ("id", "code", "customizable", "hasMultiplePrices", "sorting", "published", "slug_da", "slug_en", "name_da", "name_en", "description_da", "description_en", "priceId", "selectedAttributes") SELECT "id", "code", "customizable", "hasMultiplePrices", "sorting", "published", "slug_da", "slug_en", "name_da", "name_en", "description_da", "description_en", "priceId", "selectedAttributes" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product.code_unique" ON "Product"("code");
CREATE UNIQUE INDEX "Product.slug_da_unique" ON "Product"("slug_da");
CREATE UNIQUE INDEX "Product.slug_en_unique" ON "Product"("slug_en");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201128133747-rename-fields..20201128134903-product-code-not-required
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
@@ -61,9 +61,9 @@
 }
 model Product {
     id                 String     @id @default(cuid())
-    code               String     @unique
+    code               String?    @unique
     customizable       Boolean    @default(true)
     price              Price?     @relation(fields: [priceId], references: [id])
     hasMultiplePrices  Boolean    @default(false)
     sorting            Int?
```

