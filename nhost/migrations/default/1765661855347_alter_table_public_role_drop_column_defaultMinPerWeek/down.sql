alter table "public"."role" alter column "defaultMinPerWeek" drop not null;
alter table "public"."role" add column "defaultMinPerWeek" int4;
