
alter table "public"."org_subscription" drop constraint "org_subscription_type_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "type" text
--  not null;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- INSERT INTO  "public"."subscription_plan_type" (value) VALUES ('STARTUP');
-- INSERT INTO  "public"."subscription_plan_type" (value) VALUES ('BUSINESS');

DROP TABLE "public"."subscription_plan_type";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('trialing');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('active');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('incomplete');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('incomplete_expired');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('past_due');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('canceled');
-- INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('unpaid');

alter table "public"."org_subscription" alter column "status" drop not null;
ALTER TABLE "public"."org_subscription" ALTER COLUMN "status" drop default;

alter table "public"."org_subscription" drop constraint "org_subscription_status_fkey";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "status" text
--  null;

DROP TABLE "public"."subscription_payment_status";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."subscription_payment_status";

comment on column "public"."org_subscription"."status" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "status" set default ''incomplete'::text';
alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key (status)
  references "public"."subscription_payment_status"
  (value) on update restrict on delete restrict;
alter table "public"."org_subscription" alter column "status" drop not null;
alter table "public"."org_subscription" add column "status" text;

ALTER TABLE "public"."org_subscription" ALTER COLUMN "status" drop default;

alter table "public"."org_subscription" alter column "status" drop not null;

alter table "public"."org_subscription" drop constraint "org_subscription_status_fkey";

alter table "public"."org_subscription" alter column "status" set not null;
alter table "public"."org_subscription" alter column "status" set default 'incomplete'::text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- alter table "public"."org_subscription" add column "status" text
--  not null default 'incomplete';

DROP TABLE "public"."subscription_payment_status";

comment on column "public"."org_subscription"."status" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "status" drop not null;
alter table "public"."org_subscription" add column "status" text;

comment on column "public"."org_subscription"."type" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "type" drop not null;
alter table "public"."org_subscription" add column "type" text;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."subscription_plan_type";

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DROP table "public"."org_subscription_status";

alter table "public"."org_subscription"
  add constraint "org_subscription_type_fkey"
  foreign key ("type")
  references "public"."subscription_plan_type"
  ("value") on update restrict on delete restrict;

alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key ("status")
  references "public"."org_subscription_status"
  ("value") on update restrict on delete restrict;

comment on column "public"."org_subscription"."stripeSubscriptionItemId" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" add constraint "org_subscription_stripeSubscriptionItemId_key" unique (stripeSubscriptionItemId);
alter table "public"."org_subscription" alter column "stripeSubscriptionItemId" drop not null;
alter table "public"."org_subscription" add column "stripeSubscriptionItemId" text;
