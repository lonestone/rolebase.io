alter table "public"."thread_activity" add constraint "thread_activity_threadId_refMeetingId_type_key" unique ("threadId", "refMeetingId", "type");
