
CREATE  INDEX "thread_orgId_archived_key" on
  "public"."thread" using btree ("archived", "orgId");

DROP INDEX IF EXISTS "public"."thread_archived_key";

DROP INDEX IF EXISTS "public"."thread_orgId_key";

CREATE  INDEX "task_archived_status_key" on
  "public"."task" using btree ("archived", "status");

DROP INDEX IF EXISTS "public"."task_status_key";

DROP INDEX IF EXISTS "public"."task_archived_key";

DROP INDEX IF EXISTS "public"."role_base_key";

DROP INDEX IF EXISTS "public"."role_orgId_key";

CREATE  INDEX "role_orgId_archived_key" on
  "public"."role" using btree ("archived", "orgId");

CREATE  INDEX "member_userId_archived_key" on
  "public"."member" using btree ("archived", "userId");

DROP INDEX IF EXISTS "public"."member_userId_key";

CREATE  INDEX "member_orgId_role_key" on
  "public"."member" using btree ("orgId", "role");

DROP INDEX IF EXISTS "public"."member_role_key";

CREATE  INDEX "member_orgId_archived_key" on
  "public"."member" using btree ("archived", "orgId");

DROP INDEX IF EXISTS "public"."member_orgId_key";

CREATE  INDEX "meeting_recurringId_recurringDate_key" on
  "public"."meeting" using btree ("recurringDate", "recurringId");

DROP INDEX IF EXISTS "public"."meeting_recurringId_key";

CREATE  INDEX "meeting_orgId_startDate_archived_key" on
  "public"."meeting" using btree ("archived", "orgId", "startDate");

DROP INDEX IF EXISTS "public"."meeting_archived_key";

DROP INDEX IF EXISTS "public"."meeting_startDate_key";

DROP INDEX IF EXISTS "public"."meeting_orgId_key";

CREATE  INDEX "meeting_orgId_startDate_key" on
  "public"."meeting" using btree ("startDate");

CREATE  INDEX "meeting_orgId_archived_key" on
  "public"."meeting" using btree ("archived");

DROP INDEX IF EXISTS "public"."meeting_orgId_archived_key";

DROP INDEX IF EXISTS "public"."meeting_orgId_startDate_key";

DROP INDEX IF EXISTS "public"."decision_orgId_key";

CREATE  INDEX "decision_circleId_archived_key" on
  "public"."decision" using btree ("archived", "circleId");

DROP INDEX IF EXISTS "public"."decision_archived_key";

DROP INDEX IF EXISTS "public"."decision_circleId_key";

DROP INDEX IF EXISTS "public"."circle_member_memberId_key";

DROP INDEX IF EXISTS "public"."circle_member_circleId_key";

CREATE  INDEX "circle_circleId_key" on
  "public"."circle_member" using btree ("circleId");

CREATE  INDEX "circle_member_circleId_archived" on
  "public"."circle_member" using btree ("archived", "circleId");

DROP INDEX IF EXISTS "public"."circle_circleId_key";

DROP INDEX IF EXISTS "public"."circle_member_archived_key";

CREATE  INDEX "circle_orgId_archived_key" on
  "public"."circle" using btree ("archived", "orgId");

DROP INDEX IF EXISTS "public"."circle_archived_key";

DROP INDEX IF EXISTS "public"."circle_orgId_key";
