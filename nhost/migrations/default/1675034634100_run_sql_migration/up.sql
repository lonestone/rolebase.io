comment on column "public"."log"."userId" is E'User and member who made the change';
comment on column "public"."log"."memberName" is E'Keep name for display, in case of deleted member';
comment on column "public"."log"."meetingId" is E'Meeting during which this log was created (optional)';
comment on column "public"."log"."display" is E'Type of log and data to display';
comment on column "public"."log"."changes" is E'Log of changes to entities, useful to cancel';
comment on column "public"."log"."cancelLogId" is E'Id of canceled log, if it\'s a cancellation';
comment on column "public"."log"."cancelMemberId" is E'Member that did the action that\'s canceled';