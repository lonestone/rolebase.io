CREATE TABLE "public"."skill" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text NOT NULL, "categoryId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("categoryId") REFERENCES "public"."skill_category"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
