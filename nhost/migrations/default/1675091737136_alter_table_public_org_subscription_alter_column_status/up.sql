ALTER TABLE "public"."org_subscription" ALTER COLUMN "status" drop default;
alter table "public"."org_subscription" alter column "status" drop not null;