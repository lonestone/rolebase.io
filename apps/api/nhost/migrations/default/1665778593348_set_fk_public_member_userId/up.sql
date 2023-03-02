alter table "public"."member"
  add constraint "member_userId_fkey"
  foreign key ("userId")
  references "auth"."users"
  ("id") on update restrict on delete set null;
