
comment on column "public"."org_subscription"."nextRenewal" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "nextRenewal" drop not null;
alter table "public"."org_subscription" add column "nextRenewal" timestamptz;

alter table "public"."org_subscription" alter column "stripeSubscriptionItemId" set not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "stripeSubscriptionItemId" text
--  not null unique;

comment on column "public"."org_subscription"."nbSlots" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "nbSlots" drop not null;
alter table "public"."org_subscription" add column "nbSlots" int4;

alter table "public"."org_subscription" rename column "nextRenewal" to "renewalAt";

alter table "public"."org_subscription" rename column "renewalAt" to "expiresAt";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "expiresAt" timestamptz
--  null;

comment on column "public"."org_subscription"."createdAt" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "createdAt" set default now();
alter table "public"."org_subscription" alter column "createdAt" drop not null;
alter table "public"."org_subscription" add column "createdAt" timestamptz;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "createdAt" timestamptz
--  not null default now();

alter table "public"."org_subscription" drop constraint "org_subscription_status_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "status" text
--  not null;

DROP TABLE "public"."org_subscription_status";

alter table "public"."org_subscription" alter column "stripeSubscriptionId" set not null;

ALTER TABLE "public"."org_subscription" ALTER COLUMN "stripeCustomerId" TYPE uuid;

ALTER TABLE "public"."org_subscription" ALTER COLUMN "stripeSubscriptionId" TYPE uuid;

alter table "public"."org_subscription" drop constraint "org_subscription_stripeSubscriptionId_key";

alter table "public"."org_subscription" drop constraint "org_subscription_stripeCustomerId_key";

alter table "public"."org_subscription" drop constraint "org_subscription_type_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "type" text
--  null;

DROP TABLE "public"."subscription_plan_type";

alter table "public"."org" drop constraint "org_subscriptionId_fkey";

alter table "public"."org" rename column "subscriptionId" to "subscription";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org" add column "subscription" uuid
--  null;

DROP TABLE "public"."org_subscription";
