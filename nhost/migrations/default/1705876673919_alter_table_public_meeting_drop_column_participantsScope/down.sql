alter table "public"."meeting"
  add constraint "meeting_participantsScope_fkey"
  foreign key (participantsScope)
  references "public"."member_scope"
  (value) on update restrict on delete restrict;
alter table "public"."meeting" alter column "participantsScope" drop not null;
alter table "public"."meeting" add column "participantsScope" text;
