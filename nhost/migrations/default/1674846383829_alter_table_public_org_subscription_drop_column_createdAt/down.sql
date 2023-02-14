comment on column "public"."org_subscription"."createdAt" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "createdAt" set default now();
alter table "public"."org_subscription" alter column "createdAt" drop not null;
alter table "public"."org_subscription" add column "createdAt" timestamptz;
