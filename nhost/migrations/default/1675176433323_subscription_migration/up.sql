
alter table "public"."org_subscription" drop column "stripeSubscriptionItemId" cascade;

alter table "public"."org_subscription" drop constraint "org_subscription_status_fkey";

alter table "public"."org_subscription" drop constraint "org_subscription_type_fkey";

DROP table "public"."org_subscription_status";

DROP table "public"."subscription_plan_type";

alter table "public"."org_subscription" drop column "type" cascade;

alter table "public"."org_subscription" drop column "status" cascade;

CREATE TABLE "public"."subscription_payment_status" ("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));COMMENT ON TABLE "public"."subscription_payment_status" IS E'Status des paiements des abonnements';

alter table "public"."org_subscription" add column "status" text
 not null default 'incomplete';

ALTER TABLE "public"."org_subscription" ALTER COLUMN "status" drop default;
alter table "public"."org_subscription" alter column "status" drop not null;

alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key ("status")
  references "public"."subscription_payment_status"
  ("value") on update restrict on delete restrict;

alter table "public"."org_subscription" alter column "status" set not null;

alter table "public"."org_subscription" alter column "status" set default 'incomplete';

alter table "public"."org_subscription" drop column "status" cascade;

DROP table "public"."subscription_payment_status";

CREATE TABLE "public"."subscription_payment_status" ("value" text NOT NULL, PRIMARY KEY ("value") );

alter table "public"."org_subscription" add column "status" text
 null;

alter table "public"."org_subscription"
  add constraint "org_subscription_status_fkey"
  foreign key ("status")
  references "public"."subscription_payment_status"
  ("value") on update restrict on delete restrict;

alter table "public"."org_subscription" alter column "status" set default 'incomplete';
alter table "public"."org_subscription" alter column "status" set not null;

INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('trialing');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('active');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('incomplete');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('incomplete_expired');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('past_due');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('canceled');
INSERT INTO  "public"."subscription_payment_status" (value) VALUES ('unpaid');

CREATE TABLE "public"."subscription_plan_type" ("value" Text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

INSERT INTO  "public"."subscription_plan_type" (value) VALUES ('Startup');
INSERT INTO  "public"."subscription_plan_type" (value) VALUES ('Business');

alter table "public"."org_subscription" add column "type" text
 not null;

alter table "public"."org_subscription"
  add constraint "org_subscription_type_fkey"
  foreign key ("type")
  references "public"."subscription_plan_type"
  ("value") on update restrict on delete restrict;
