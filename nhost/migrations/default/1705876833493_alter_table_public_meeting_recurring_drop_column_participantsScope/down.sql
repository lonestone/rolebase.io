alter table "public"."meeting_recurring"
  add constraint "meeting_recurring_participantsScope_fkey"
  foreign key (participantsScope)
  references "public"."member_scope"
  (value) on update restrict on delete restrict;
alter table "public"."meeting_recurring" alter column "participantsScope" drop not null;
alter table "public"."meeting_recurring" add column "participantsScope" text;
