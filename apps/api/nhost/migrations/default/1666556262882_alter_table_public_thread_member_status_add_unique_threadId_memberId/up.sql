alter table "public"."thread_member_status" add constraint "thread_member_status_threadId_memberId_key" unique ("threadId", "memberId");
