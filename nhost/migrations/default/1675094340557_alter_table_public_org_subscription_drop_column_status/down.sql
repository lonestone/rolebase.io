comment on column "public"."org_subscription"."status" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "status" set default ''incomplete'::text';
alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key (status)
  references "public"."subscription_payment_status"
  (value) on update restrict on delete restrict;
alter table "public"."org_subscription" alter column "status" drop not null;
alter table "public"."org_subscription" add column "status" text;
