alter table "public"."thread_member_status"
  add constraint "thread_member_status_lastReadActivityId_fkey"
  foreign key ("lastReadActivityId")
  references "public"."thread_activity"
  ("id") on update restrict on delete cascade;
