alter table "public"."org"
  add constraint "org_subscriptionId_fkey"
  foreign key ("subscriptionId")
  references "public"."org_subscription"
  ("id") on update restrict on delete restrict;
