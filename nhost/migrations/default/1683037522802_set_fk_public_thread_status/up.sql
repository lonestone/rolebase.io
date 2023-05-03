alter table "public"."thread"
  add constraint "thread_status_fkey"
  foreign key ("status")
  references "public"."thread_status"
  ("value") on update restrict on delete restrict;
