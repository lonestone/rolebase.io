CREATE TABLE member_scope (
  value text PRIMARY KEY,
  comment text
);

INSERT INTO member_scope (value, comment) VALUES
('Organization', 'All members of the organization'),
('CircleLeaders', 'All Leaders of Roles and sub-Circles in Circle'),
('CircleMembers', 'All members in Circle and sub-Circles'),
('None', 'None (select members manually)');

alter table "public"."meeting"
  add constraint "meeting_participantsScope_fkey"
  foreign key ("participantsScope")
  references "public"."member_scope"
  ("value") on update restrict on delete restrict;

alter table "public"."meeting_recurring"
  add constraint "meeting_recurring_participantsScope_fkey"
  foreign key ("participantsScope")
  references "public"."member_scope"
  ("value") on update restrict on delete restrict;

alter table "public"."thread"
  add constraint "thread_participantsScope_fkey"
  foreign key ("participantsScope")
  references "public"."member_scope"
  ("value") on update restrict on delete restrict;
