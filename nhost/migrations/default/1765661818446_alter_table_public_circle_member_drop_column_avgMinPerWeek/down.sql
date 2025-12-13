alter table "public"."circle_member" alter column "avgMinPerWeek" drop not null;
alter table "public"."circle_member" add column "avgMinPerWeek" int4;
