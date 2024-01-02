alter table "public"."thread_extra_member" add constraint "thread_extra_member_threadId_memberId_key" unique ("threadId", "memberId");
