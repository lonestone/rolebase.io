comment on column "public"."org_subscription"."status" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "status" drop not null;
alter table "public"."org_subscription" add column "status" text;
