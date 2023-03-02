
alter table "public"."meeting" drop constraint "meeting_recurringId_fkey";
alter table "public"."meeting" add column "facilitatorMemberId" uuid;
alter table "public"."meeting" add column "initiatorMemberId" uuid;
alter table "public"."meeting"
  add constraint "meeting_facilitatorMemberId_fkey"
  foreign key (facilitatorMemberId)
  references "public"."member"
  (id) on update restrict on delete cascade;
alter table "public"."meeting"
  add constraint "meeting_initiatorMemberId_fkey"
  foreign key (initiatorMemberId)
  references "public"."member"
  (id) on update restrict on delete cascade;
DROP TABLE "public"."meeting_recurring";
