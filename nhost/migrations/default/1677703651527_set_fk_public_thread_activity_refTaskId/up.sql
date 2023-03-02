alter table "public"."thread_activity"
  add constraint "thread_activity_refTaskId_fkey"
  foreign key ("refTaskId")
  references "public"."task"
  ("id") on update restrict on delete restrict;
