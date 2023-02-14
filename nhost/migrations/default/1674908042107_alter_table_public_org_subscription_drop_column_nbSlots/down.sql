comment on column "public"."org_subscription"."nbSlots" is E'Abonnement lié à une organisation';
alter table "public"."org_subscription" alter column "nbSlots" drop not null;
alter table "public"."org_subscription" add column "nbSlots" int4;
