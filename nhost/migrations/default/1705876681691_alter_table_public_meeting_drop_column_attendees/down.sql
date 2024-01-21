alter table "public"."meeting" alter column "attendees" drop not null;
alter table "public"."meeting" add column "attendees" json;
