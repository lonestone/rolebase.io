comment on column "public"."org_subscription"."nextRenewal" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "nextRenewal" drop not null;
alter table "public"."org_subscription" add column "nextRenewal" timestamptz;
