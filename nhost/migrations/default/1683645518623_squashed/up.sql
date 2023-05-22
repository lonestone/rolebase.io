
INSERT INTO "public"."thread_activity_type"("value", "comment") VALUES (E'ChangeStatus', null);

alter table "public"."log" add column "threadId" uuid
 null;

alter table "public"."log"
  add constraint "log_threadId_fkey"
  foreign key ("threadId")
  references "public"."thread"
  ("id") on update restrict on delete restrict;
