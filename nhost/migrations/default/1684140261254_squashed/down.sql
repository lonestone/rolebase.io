
alter table "public"."thread" drop constraint "thread_status_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."thread" add column "status" text
--  not null default 'Preparation';

DELETE FROM "public"."thread_status" WHERE "value" = 'Closed';

DELETE FROM "public"."thread_status" WHERE "value" = 'Preparation';

DELETE FROM "public"."thread_status" WHERE "value" = 'Blocked';

DELETE FROM "public"."thread_status" WHERE "value" = 'Active';

DROP TABLE "public"."thread_status";
