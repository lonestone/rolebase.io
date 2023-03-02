alter table "public"."thread_activity"
  add constraint "thread_activity_refThreadId_fkey"
  foreign key ("refThreadId")
  references "public"."thread"
  ("id") on update restrict on delete restrict;
