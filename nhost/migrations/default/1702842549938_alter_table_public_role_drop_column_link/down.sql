alter table "public"."role" alter column "link" set default ''No'::text';
alter table "public"."role" alter column "link" drop not null;
alter table "public"."role" add column "link" text;
