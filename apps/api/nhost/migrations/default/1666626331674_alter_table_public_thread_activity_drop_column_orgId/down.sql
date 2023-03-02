alter table "public"."thread_activity"
  add constraint "thread_activity_orgId_fkey"
  foreign key (orgId)
  references "public"."org"
  (id) on update restrict on delete cascade;
alter table "public"."thread_activity" alter column "orgId" drop not null;
alter table "public"."thread_activity" add column "orgId" uuid;
