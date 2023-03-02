alter table "public"."thread"
  add constraint "thread_lastActivityId_fkey"
  foreign key ("lastActivityId")
  references "public"."thread_activity"
  ("id") on update restrict on delete set null;
