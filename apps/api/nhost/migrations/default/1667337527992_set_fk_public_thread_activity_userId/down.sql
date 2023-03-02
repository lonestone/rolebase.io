alter table "public"."thread_activity" drop constraint "thread_activity_userId_fkey",
  add constraint "thread_activity_userId_fkey"
  foreign key ("userId")
  references "auth"."users"
  ("id") on update restrict on delete restrict;
