alter table "public"."meeting_recurring" add column "invitedReadonly" boolean
 not null default 'false';
