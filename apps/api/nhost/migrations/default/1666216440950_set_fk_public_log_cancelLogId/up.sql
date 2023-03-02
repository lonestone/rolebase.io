alter table "public"."log"
  add constraint "log_cancelLogId_fkey"
  foreign key ("cancelLogId")
  references "public"."log"
  ("id") on update restrict on delete set null;
