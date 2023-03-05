alter table "public"."thread" alter column "lastActivityDate" drop not null;
alter table "public"."thread" add column "lastActivityDate" timestamptz;
