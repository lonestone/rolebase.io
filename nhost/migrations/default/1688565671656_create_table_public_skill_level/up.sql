CREATE TABLE "public"."skill_level" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "description" text NOT NULL, "degree" integer NOT NULL, "skillId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("skillId") REFERENCES "public"."skill"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
