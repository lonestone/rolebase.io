CREATE TABLE "public"."meeting_step" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "meetingId" uuid NOT NULL, "notes" text NOT NULL, "notesUpdates" bytea, "type" text NOT NULL, "data" json NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("meetingId") REFERENCES "public"."meeting"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;
