
CREATE TABLE "public"."org_subscription" ("orgId" uuid NOT NULL, "id" uuid NOT NULL DEFAULT gen_random_uuid(), "stripeSubscriptionId" uuid NOT NULL, "stripeCustomerId" uuid NOT NULL, "nbSlots" integer NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("orgId"));COMMENT ON TABLE "public"."org_subscription" IS E'Abonnement lié à une organisation';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."org" add column "subscription" uuid
 null;

alter table "public"."org" rename column "subscription" to "subscriptionId";

alter table "public"."org"
  add constraint "org_subscriptionId_fkey"
  foreign key ("subscriptionId")
  references "public"."org_subscription"
  ("id") on update restrict on delete restrict;

CREATE TABLE "public"."subscription_plan_type" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));COMMENT ON TABLE "public"."subscription_plan_type" IS E'Type d\'abonnement dispobnible';

alter table "public"."org_subscription" add column "type" text
 null;

alter table "public"."org_subscription"
  add constraint "org_subscription_type_fkey"
  foreign key ("type")
  references "public"."subscription_plan_type"
  ("value") on update restrict on delete restrict;

alter table "public"."org_subscription" add constraint "org_subscription_stripeCustomerId_key" unique ("stripeCustomerId");

alter table "public"."org_subscription" add constraint "org_subscription_stripeSubscriptionId_key" unique ("stripeSubscriptionId");

ALTER TABLE "public"."org_subscription" ALTER COLUMN "stripeSubscriptionId" TYPE text;

ALTER TABLE "public"."org_subscription" ALTER COLUMN "stripeCustomerId" TYPE text;

alter table "public"."org_subscription" alter column "stripeSubscriptionId" drop not null;

CREATE TABLE "public"."org_subscription_status" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));COMMENT ON TABLE "public"."org_subscription_status" IS E'Status d\'un abonnement';

alter table "public"."org_subscription" add column "status" text
 not null;

alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key ("status")
  references "public"."org_subscription_status"
  ("value") on update restrict on delete restrict;

alter table "public"."org_subscription" add column "createdAt" timestamptz
 not null default now();

alter table "public"."org_subscription" drop column "createdAt" cascade;

alter table "public"."org_subscription" add column "expiresAt" timestamptz
 null;

alter table "public"."org_subscription" rename column "expiresAt" to "renewalAt";

alter table "public"."org_subscription" rename column "renewalAt" to "nextRenewal";

alter table "public"."org_subscription" drop column "nbSlots" cascade;

alter table "public"."org_subscription" add column "stripeSubscriptionItemId" text
 not null unique;

alter table "public"."org_subscription" alter column "stripeSubscriptionItemId" drop not null;

alter table "public"."org_subscription" drop column "nextRenewal" cascade;
