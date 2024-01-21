alter table "public"."meeting_recurring" alter column "participantsMembersIds" drop not null;
alter table "public"."meeting_recurring" add column "participantsMembersIds" json;
