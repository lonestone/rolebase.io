
alter table "public"."thread" drop constraint "thread_status_fkey";

alter table "public"."thread" alter column "status" drop not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."thread" add column "status" text
--  null default 'Preparation';

DELETE FROM "public"."thread_status" WHERE "value" = 'Active';

DELETE FROM "public"."thread_status" WHERE "value" = 'Closed';

DELETE FROM "public"."thread_status" WHERE "value" = 'Blocked';

DELETE FROM "public"."thread_status" WHERE "value" = 'Preparation';

alter table "public"."thread_status" alter column "comment" set not null;

DROP TABLE "public"."thread_status";
