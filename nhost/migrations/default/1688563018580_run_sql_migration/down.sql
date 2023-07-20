-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- CREATE VIEW news AS
-- ((SELECT id, "orgId", id AS "threadId", CAST(null AS uuid) AS "decisionId", CAST(null AS uuid) AS "meetingId"
-- FROM thread
-- WHERE ("archived" = false) AND (("status" = 'Active') OR ("status" = 'Preparation')))
-- UNION
-- (SELECT id, "orgId", CAST(null AS uuid) AS "threadId", id AS "decisionId", CAST(null AS uuid) AS "meetingId"
-- FROM decision
-- WHERE ("archived" = false))
-- UNION
-- (SELECT id, "orgId", CAST(null AS uuid) AS "threadId", CAST(null AS uuid) AS "decisionId", id AS "meetingId"
-- FROM meeting
-- WHERE ("archived" = false) AND ("ended" = true)));