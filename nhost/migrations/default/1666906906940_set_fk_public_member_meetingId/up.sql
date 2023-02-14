alter table "public"."member"
  add constraint "member_meetingId_fkey"
  foreign key ("meetingId")
  references "public"."meeting"
  ("id") on update restrict on delete set null;
