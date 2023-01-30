comment on column "public"."org_subscription"."stripeSubscriptionItemId" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" add constraint "org_subscription_stripeSubscriptionItemId_key" unique (stripeSubscriptionItemId);
alter table "public"."org_subscription" alter column "stripeSubscriptionItemId" drop not null;
alter table "public"."org_subscription" add column "stripeSubscriptionItemId" text;
