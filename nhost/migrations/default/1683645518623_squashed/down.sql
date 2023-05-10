
alter table "public"."log" drop constraint "log_threadId_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."log" add column "threadId" uuid
--  null;

DELETE FROM "public"."thread_activity_type" WHERE "value" = 'ChangeStatus';
