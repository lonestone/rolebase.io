CREATE OR REPLACE VIEW "public"."news" AS 
 SELECT thread.id,
    thread."orgId",
    thread.id AS "threadId",
    NULL::uuid AS "decisionId",
    NULL::uuid AS "meetingId",
    thread."createdAt",
    thread."circleId"
   FROM thread
  WHERE (thread.archived = false)
UNION
 SELECT decision.id,
    decision."orgId",
    NULL::uuid AS "threadId",
    decision.id AS "decisionId",
    NULL::uuid AS "meetingId",
    decision."createdAt",
    decision."circleId"
   FROM decision
  WHERE (decision.archived = false)
UNION
 SELECT meeting.id,
    meeting."orgId",
    NULL::uuid AS "threadId",
    NULL::uuid AS "decisionId",
    meeting.id AS "meetingId",
    meeting."endDate" AS "createdAt",
    meeting."circleId"
   FROM meeting
  WHERE ((meeting.archived = false) AND (meeting.ended = true));
