
CREATE TABLE "public"."thread_status" ("value" text NOT NULL, "comment" text, PRIMARY KEY ("value") );

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Active', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Blocked', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Preparation', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Closed', null);

alter table "public"."thread" add column "status" text
 not null default 'Preparation';

alter table "public"."thread"
  add constraint "thread_status_fkey"
  foreign key ("status")
  references "public"."thread_status"
  ("value") on update restrict on delete restrict;
