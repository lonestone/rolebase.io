alter table "public"."member" alter column "preferences" drop not null;
alter table "public"."member" add column "preferences" json;
