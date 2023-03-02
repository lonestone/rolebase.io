CREATE TABLE "public"."task_view" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "orgId" uuid NOT NULL, "key" text NOT NULL, "tasksIds" UUID[] NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("orgId", "key"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
