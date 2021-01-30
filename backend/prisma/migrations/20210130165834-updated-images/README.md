# Migration `20210130165834-updated-images`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 1/30/2021, 5:58:35 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CategoryImage" (
    "id" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "adminUrl" TEXT NOT NULL,
    "sorting" INTEGER,
    "categoryId" TEXT,

    FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_CategoryImage" ("id", "sorting", "categoryId", "thumbUrl") SELECT "id", "sorting", "categoryId", "thumbUrl" FROM "CategoryImage";
DROP TABLE "CategoryImage";
ALTER TABLE "new_CategoryImage" RENAME TO "CategoryImage";
CREATE TABLE "new_ProductImage" (
    "id" TEXT NOT NULL,
    "mainUrl" TEXT NOT NULL,
    "adminUrl" TEXT NOT NULL,
    "galleryUrl" TEXT NOT NULL,
    "cartUrl" TEXT NOT NULL,
    "thumbUrl" TEXT NOT NULL,
    "sorting" INTEGER,
    "productId" TEXT,

    FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY ("id")
);
INSERT INTO "new_ProductImage" ("id", "sorting", "productId", "thumbUrl", "cartUrl") SELECT "id", "sorting", "productId", "thumbUrl", "cartUrl" FROM "ProductImage";
DROP TABLE "ProductImage";
ALTER TABLE "new_ProductImage" RENAME TO "ProductImage";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210130164425-category-images-has-no-products-and-vice-versa..20210130165834-updated-images
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
@@ -23,21 +23,24 @@
     permissions      Permission[]
 }
 model ProductImage {
-    id        String   @id @default(cuid())
-    largeUrl  String
-    thumbUrl  String
-    cartUrl   String
-    sorting   Int?
-    product   Product? @relation(fields: [productId], references: [id])
-    productId String?
-    sku       Sku[]
+    id         String   @id @default(cuid())
+    mainUrl    String
+    adminUrl   String
+    galleryUrl String
+    cartUrl    String
+    thumbUrl   String
+    sorting    Int?
+    product    Product? @relation(fields: [productId], references: [id])
+    productId  String?
+    sku        Sku[]
 }
 model CategoryImage {
     id         String    @id @default(cuid())
     thumbUrl   String
+    adminUrl   String
     sorting    Int?
     category   Category? @relation(fields: [categoryId], references: [id])
     categoryId String?
 }
```

