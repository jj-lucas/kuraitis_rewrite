# Migration `20201219141206-correct-relation-between-skus-and-images`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 12/19/2020, 3:12:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Image" ADD COLUMN     "skuId" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201129141311-remove-auth-field-from-order..20201219141206-correct-relation-between-skus-and-images
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
@@ -29,11 +29,12 @@
     largeUrl   String
     sorting    Int?
     category   Category? @relation(fields: [categoryId], references: [id])
     product    Product?  @relation(fields: [productId], references: [id])
-    Sku        Sku[]
     categoryId String?
     productId  String?
+    skuId      String?
+    Sku        Sku[]
 }
 model Category {
     id             String    @id @default(cuid())
```

