
CREATE  INDEX "decision_circleId_archived_key" on
  "public"."decision" using btree ("circleId", "archived");

CREATE  INDEX "log_orgId_key" on
  "public"."log" using btree ("orgId");

CREATE  INDEX "log_createdAt_key" on
  "public"."log" using btree ("createdAt");

CREATE  INDEX "log_meetingId_key" on
  "public"."log" using btree ("meetingId");

CREATE  INDEX "meeting_recurring_orgId_key" on
  "public"."meeting_recurring" using btree ("orgId");

CREATE  INDEX "meeting_recurring_circleId_key" on
  "public"."meeting_recurring" using btree ("circleId");

CREATE  INDEX "meeting_step_meetingId_key" on
  "public"."meeting_step" using btree ("meetingId");

CREATE  INDEX "meeting_template_orgId_key" on
  "public"."meeting_template" using btree ("orgId");

DROP INDEX IF EXISTS "public"."meeting_archived";

DROP INDEX IF EXISTS "public"."meeting_startDate";

DROP INDEX IF EXISTS "public"."meeting_recurringDate";

CREATE  INDEX "meeting_orgId_startDate_archived_key" on
  "public"."meeting" using btree ("orgId", "startDate", "archived");

CREATE  INDEX "meeting_recurringId_recurringDate_key" on
  "public"."meeting" using btree ("recurringId", "recurringDate");

CREATE  INDEX "org_archived_key" on
  "public"."org" using btree ("archived");

DROP INDEX IF EXISTS "public"."task_archived";

DROP INDEX IF EXISTS "public"."task_status_index";

CREATE  INDEX "task_archived_status_key" on
  "public"."task" using btree ("archived", "status");

CREATE  INDEX "task_circleId_key" on
  "public"."task" using btree ("circleId");

CREATE  INDEX "task_memberId_key" on
  "public"."task" using btree ("memberId");

DROP INDEX IF EXISTS "public"."createdAt";

CREATE  INDEX "thread_activity_createdAt_key" on
  "public"."thread_activity" using btree ("createdAt");

CREATE  INDEX "thread_activity_threadId_key" on
  "public"."thread_activity" using btree ("threadId");

DROP INDEX IF EXISTS "public"."thread_archived";

CREATE  INDEX "thread_orgId_archived_key" on
  "public"."thread" using btree ("orgId", "archived");

CREATE  INDEX "thread_circleId_key" on
  "public"."thread" using btree ("circleId");

CREATE  INDEX "member_orgId_role_key" on
  "public"."member" using btree ("orgId", "role");
