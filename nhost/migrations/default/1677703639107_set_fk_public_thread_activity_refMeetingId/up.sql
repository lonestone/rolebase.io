alter table "public"."thread_activity"
  add constraint "thread_activity_refMeetingId_fkey"
  foreign key ("refMeetingId")
  references "public"."meeting"
  ("id") on update restrict on delete restrict;
