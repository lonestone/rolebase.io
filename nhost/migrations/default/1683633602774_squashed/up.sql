
CREATE TABLE "public"."thread_status" ("value" text NOT NULL, "comment" text NOT NULL, PRIMARY KEY ("value") );

alter table "public"."thread_status" alter column "comment" drop not null;

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Preparation', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Blocked', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Closed', null);

INSERT INTO "public"."thread_status"("value", "comment") VALUES (E'Done', null);

alter table "public"."thread" add column "status" text
 null default 'Preparation';

alter table "public"."thread" alter column "status" set not null;

alter table "public"."thread"
  add constraint "thread_status_fkey"
  foreign key ("status")
  references "public"."thread_status"
  ("value") on update restrict on delete restrict;
