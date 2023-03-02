alter table "public"."log" drop constraint "log_id_fkey",
  add constraint "log_memberId_fkey"
  foreign key ("memberId")
  references "public"."member"
  ("id") on update restrict on delete cascade;
