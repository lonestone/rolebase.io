alter table "public"."org_subscription" alter column "status" set default 'incomplete';
alter table "public"."org_subscription" alter column "status" set not null;
