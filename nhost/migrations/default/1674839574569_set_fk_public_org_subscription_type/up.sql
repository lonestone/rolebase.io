alter table "public"."org_subscription"
  add constraint "org_subscription_type_fkey"
  foreign key ("type")
  references "public"."subscription_plan_type"
  ("value") on update restrict on delete restrict;
