alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key ("status")
  references "public"."subscription_payment_status"
  ("value") on update restrict on delete restrict;
