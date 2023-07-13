alter table "public"."role" alter column "autoCreate" set default false;
alter table "public"."role" alter column "autoCreate" drop not null;
alter table "public"."role" add column "autoCreate" bool;
