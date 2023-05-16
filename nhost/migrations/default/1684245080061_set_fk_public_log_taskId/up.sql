alter table "public"."log"
  add constraint "log_taskId_fkey"
  foreign key ("taskId")
  references "public"."task"
  ("id") on update restrict on delete restrict;
