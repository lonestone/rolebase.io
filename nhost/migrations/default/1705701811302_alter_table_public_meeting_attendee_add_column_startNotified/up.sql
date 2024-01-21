alter table "public"."meeting_attendee" add column "startNotified" boolean
 not null default 'false';
