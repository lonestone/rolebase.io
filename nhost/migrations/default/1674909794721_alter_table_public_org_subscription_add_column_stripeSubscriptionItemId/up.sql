alter table "public"."org_subscription" add column "stripeSubscriptionItemId" text
 not null unique;
