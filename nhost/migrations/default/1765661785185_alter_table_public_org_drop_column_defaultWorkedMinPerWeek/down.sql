alter table "public"."org" alter column "defaultWorkedMinPerWeek" drop not null;
alter table "public"."org" add column "defaultWorkedMinPerWeek" int4;
