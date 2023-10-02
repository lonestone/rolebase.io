alter table "public"."user_app"
  add constraint "user_app_userId_fkey"
  foreign key ("userId")
  references "auth"."users"
  ("id") on update restrict on delete cascade;
