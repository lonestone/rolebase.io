alter table "public"."thread" alter column "participantsMembersIds" drop not null;
alter table "public"."thread" add column "participantsMembersIds" json;
