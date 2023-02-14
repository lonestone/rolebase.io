alter table "public"."log"
  add constraint "log_cancelMemberId_fkey"
  foreign key ("cancelMemberId")
  references "public"."member"
  ("id") on update restrict on delete cascade;
