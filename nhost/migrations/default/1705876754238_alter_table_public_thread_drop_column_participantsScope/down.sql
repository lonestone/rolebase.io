alter table "public"."thread"
  add constraint "thread_participantsScope_fkey"
  foreign key (participantsScope)
  references "public"."member_scope"
  (value) on update restrict on delete restrict;
alter table "public"."thread" alter column "participantsScope" drop not null;
alter table "public"."thread" add column "participantsScope" text;
