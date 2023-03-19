
CREATE  INDEX "circle_orgId_key" on
  "public"."circle" using btree ("orgId");

CREATE  INDEX "circle_archived_key" on
  "public"."circle" using btree ("archived");

DROP INDEX IF EXISTS "public"."circle_orgId_archived_key";

CREATE  INDEX "circle_member_archived_key" on
  "public"."circle_member" using btree ("archived");

CREATE  INDEX "circle_circleId_key" on
  "public"."circle_member" using btree ("circleId");

DROP INDEX IF EXISTS "public"."circle_member_circleId_archived";

DROP INDEX IF EXISTS "public"."circle_circleId_key";

CREATE  INDEX "circle_member_circleId_key" on
  "public"."circle_member" using btree ("circleId");

CREATE  INDEX "circle_member_memberId_key" on
  "public"."circle_member" using btree ("memberId");

CREATE  INDEX "decision_circleId_key" on
  "public"."decision" using btree ("circleId");

CREATE  INDEX "decision_archived_key" on
  "public"."decision" using btree ("archived");

DROP INDEX IF EXISTS "public"."decision_circleId_archived_key";

CREATE  INDEX "decision_orgId_key" on
  "public"."decision" using btree ("orgId");

CREATE  INDEX "meeting_orgId_startDate_key" on
  "public"."meeting" using btree ("startDate");

CREATE  INDEX "meeting_orgId_archived_key" on
  "public"."meeting" using btree ("archived");

DROP INDEX IF EXISTS "public"."meeting_orgId_archived_key";

DROP INDEX IF EXISTS "public"."meeting_orgId_startDate_key";

CREATE  INDEX "meeting_orgId_key" on
  "public"."meeting" using btree ("orgId");

CREATE  INDEX "meeting_startDate_key" on
  "public"."meeting" using btree ("startDate");

CREATE  INDEX "meeting_archived_key" on
  "public"."meeting" using btree ("archived");

DROP INDEX IF EXISTS "public"."meeting_orgId_startDate_archived_key";

CREATE  INDEX "meeting_recurringId_key" on
  "public"."meeting" using btree ("recurringId");

DROP INDEX IF EXISTS "public"."meeting_recurringId_recurringDate_key";

CREATE  INDEX "member_orgId_key" on
  "public"."member" using btree ("orgId");

DROP INDEX IF EXISTS "public"."member_orgId_archived_key";

CREATE  INDEX "member_role_key" on
  "public"."member" using btree ("role");

DROP INDEX IF EXISTS "public"."member_orgId_role_key";

CREATE  INDEX "member_userId_key" on
  "public"."member" using btree ("userId");

DROP INDEX IF EXISTS "public"."member_userId_archived_key";

DROP INDEX IF EXISTS "public"."role_orgId_archived_key";

CREATE  INDEX "role_orgId_key" on
  "public"."role" using btree ("orgId");

CREATE  INDEX "role_base_key" on
  "public"."role" using btree ("base");

CREATE  INDEX "task_archived_key" on
  "public"."task" using btree ("archived");

CREATE  INDEX "task_status_key" on
  "public"."task" using btree ("status");

DROP INDEX IF EXISTS "public"."task_archived_status_key";

CREATE  INDEX "thread_orgId_key" on
  "public"."thread" using btree ("orgId");

CREATE  INDEX "thread_archived_key" on
  "public"."thread" using btree ("archived");

DROP INDEX IF EXISTS "public"."thread_orgId_archived_key";
