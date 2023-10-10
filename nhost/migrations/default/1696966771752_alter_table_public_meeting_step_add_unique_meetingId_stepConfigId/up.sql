alter table "public"."meeting_step" add constraint "meeting_step_meetingId_stepConfigId_key" unique ("meetingId", "stepConfigId");
