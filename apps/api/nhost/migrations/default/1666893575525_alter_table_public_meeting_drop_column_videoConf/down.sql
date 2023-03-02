alter table "public"."meeting" alter column "videoConf" drop not null;
alter table "public"."meeting" add column "videoConf" text;
