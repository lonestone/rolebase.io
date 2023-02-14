comment on column "public"."org_subscription"."type" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "type" drop not null;
alter table "public"."org_subscription" add column "type" text;
