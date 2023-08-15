alter table "public"."meeting" add column "summary" text
 not null default ''::text;
