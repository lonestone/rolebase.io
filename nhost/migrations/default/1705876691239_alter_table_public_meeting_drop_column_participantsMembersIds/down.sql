alter table "public"."meeting" alter column "participantsMembersIds" drop not null;
alter table "public"."meeting" add column "participantsMembersIds" json;
