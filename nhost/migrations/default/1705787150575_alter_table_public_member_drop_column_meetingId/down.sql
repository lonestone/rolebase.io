alter table "public"."member"
  add constraint "member_meetingId_fkey"
  foreign key (meetingId)
  references "public"."meeting"
  (id) on update restrict on delete set null;
alter table "public"."member" alter column "meetingId" drop not null;
alter table "public"."member" add column "meetingId" uuid;
