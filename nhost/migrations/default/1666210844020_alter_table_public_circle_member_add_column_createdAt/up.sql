alter table "public"."circle_member" add column "createdAt" timestamptz
 not null default now();
