CREATE TABLE "public"."meeting_template" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "orgId" uuid NOT NULL, "title" text NOT NULL, "stepsConfig" json NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
