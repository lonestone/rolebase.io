CREATE TABLE "public"."org_file" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "orgId" uuid NOT NULL, "fileId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("fileId") REFERENCES "storage"."files"("id") ON UPDATE restrict ON DELETE restrict);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
