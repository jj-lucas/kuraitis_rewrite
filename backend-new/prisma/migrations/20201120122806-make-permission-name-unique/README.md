# Migration `20201120122806-make-permission-name-unique`

This migration has been generated by Lucas Gabriel Salina D'Ovidio at 11/20/2020, 1:28:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE UNIQUE INDEX "Permission.name_unique" ON "Permission"("name")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201120121328-added-user-and-permission..20201120122806-make-permission-name-unique
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
@@ -21,9 +21,9 @@
 }
 model Permission {
     id    String @id @default(cuid())
-    name  String
+    name  String @unique
     users User[]
 }
 model User {
```

