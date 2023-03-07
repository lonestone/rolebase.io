
DROP INDEX IF EXISTS "public"."member_orgId_role_key";

DROP INDEX IF EXISTS "public"."thread_circleId_key";

DROP INDEX IF EXISTS "public"."thread_orgId_archived_key";

CREATE  INDEX "thread_archived" on
  "public"."thread" using hash ("archived");

DROP INDEX IF EXISTS "public"."thread_activity_threadId_key";

DROP INDEX IF EXISTS "public"."thread_activity_createdAt_key";

CREATE  INDEX "createdAt" on
  "public"."thread_activity" using btree ("createdAt");

DROP INDEX IF EXISTS "public"."task_memberId_key";

DROP INDEX IF EXISTS "public"."task_circleId_key";

DROP INDEX IF EXISTS "public"."task_archived_status_key";

CREATE  INDEX "task_status_index" on
  "public"."task" using hash ("status");

CREATE  INDEX "task_archived" on
  "public"."task" using hash ("archived");

DROP INDEX IF EXISTS "public"."org_archived_key";

DROP INDEX IF EXISTS "public"."meeting_recurringId_recurringDate_key";

DROP INDEX IF EXISTS "public"."meeting_orgId_startDate_archived_key";

CREATE  INDEX "meeting_recurringDate" on
  "public"."meeting" using btree ("recurringDate");

CREATE  INDEX "meeting_startDate" on
  "public"."meeting" using btree ("startDate");

CREATE  INDEX "meeting_archived" on
  "public"."meeting" using hash ("archived");

DROP INDEX IF EXISTS "public"."meeting_template_orgId_key";

DROP INDEX IF EXISTS "public"."meeting_step_meetingId_key";

DROP INDEX IF EXISTS "public"."meeting_recurring_circleId_key";

DROP INDEX IF EXISTS "public"."meeting_recurring_orgId_key";

DROP INDEX IF EXISTS "public"."log_meetingId_key";

DROP INDEX IF EXISTS "public"."log_createdAt_key";

DROP INDEX IF EXISTS "public"."log_orgId_key";

DROP INDEX IF EXISTS "public"."decision_circleId_archived_key";
