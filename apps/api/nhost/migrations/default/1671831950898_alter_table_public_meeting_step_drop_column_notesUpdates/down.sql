alter table "public"."meeting_step" alter column "notesUpdates" drop not null;
alter table "public"."meeting_step" add column "notesUpdates" bytea;
