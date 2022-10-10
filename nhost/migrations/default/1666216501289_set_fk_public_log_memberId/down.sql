alter table "public"."log" drop constraint "log_memberId_fkey",
  add constraint "log_id_fkey"
  foreign key ("id")
  references "public"."member"
  ("id") on update restrict on delete cascade;
