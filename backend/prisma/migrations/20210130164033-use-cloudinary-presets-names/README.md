# Migration `20210130164033-use-cloudinary-presets-names`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 1/30/2021, 5:40:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "largeUrl" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "cartUrl" TEXT NOT NULL,
    "sorting" INTEGER,
    "categoryId" TEXT,
    "productId" TEXT,

    FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
)

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "sorting" INTEGER,
    "categoryId" TEXT,
    "productId" TEXT,

    FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Image" ("id", "sorting", "categoryId", "productId") SELECT "id", "sorting", "categoryId", "productId" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
CREATE TABLE "new_Sku" (
    "id" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "priceId" TEXT,
    "imageId" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "categoryImageId" TEXT,

    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("priceId") REFERENCES "Price"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("imageId") REFERENCES "ProductImage"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY ("categoryImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_Sku" ("id", "sku", "productId", "priceId", "imageId", "stock") SELECT "id", "sku", "productId", "priceId", "imageId", "stock" FROM "Sku";
DROP TABLE "Sku";
ALTER TABLE "new_Sku" RENAME TO "Sku";
CREATE UNIQUE INDEX "Sku.sku_unique" ON "Sku"("sku");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210130163810..20210130164033-use-cloudinary-presets-names
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
@@ -24,10 +24,11 @@
 }
 model ProductImage {
     id         String    @id @default(cuid())
-    url        String
     largeUrl   String
+    thumbUrl   String
+    cartUrl    String
     sorting    Int?
     category   Category? @relation(fields: [categoryId], references: [id])
     product    Product?  @relation(fields: [productId], references: [id])
     categoryId String?
@@ -36,10 +37,9 @@
 }
 model CategoryImage {
     id         String    @id @default(cuid())
-    url        String
-    largeUrl   String
+    thumbUrl   String
     sorting    Int?
     category   Category? @relation(fields: [categoryId], references: [id])
     product    Product?  @relation(fields: [productId], references: [id])
     categoryId String?
```

