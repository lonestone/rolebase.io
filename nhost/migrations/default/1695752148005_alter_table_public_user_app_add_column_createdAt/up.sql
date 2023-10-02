alter table "public"."user_app" add column "createdAt" date
 not null default now();
