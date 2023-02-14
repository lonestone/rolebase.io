alter table "public"."meeting"
  add constraint "meeting_circleId_fkey"
  foreign key ("circleId")
  references "public"."circle"
  ("id") on update restrict on delete cascade;
