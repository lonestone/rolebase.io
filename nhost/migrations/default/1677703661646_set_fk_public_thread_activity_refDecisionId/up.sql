alter table "public"."thread_activity"
  add constraint "thread_activity_refDecisionId_fkey"
  foreign key ("refDecisionId")
  references "public"."decision"
  ("id") on update restrict on delete restrict;
