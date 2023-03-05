alter table "public"."thread"
  add constraint "thread_lastActivityId_fkey"
  foreign key (lastActivityId)
  references "public"."thread_activity"
  (id) on update restrict on delete set null;
alter table "public"."thread" alter column "lastActivityId" drop not null;
alter table "public"."thread" add column "lastActivityId" uuid;
