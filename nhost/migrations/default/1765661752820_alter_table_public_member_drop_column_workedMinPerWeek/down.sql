alter table "public"."member" alter column "workedMinPerWeek" drop not null;
alter table "public"."member" add column "workedMinPerWeek" int4;
