CREATE TABLE meeting_step_type (
  value text PRIMARY KEY,
  comment text
);

INSERT INTO meeting_step_type (value, comment) VALUES
('Tour', ''),
('Threads', ''),
('Checklist', ''),
('Indicators', ''),
('Tasks', '');

alter table "public"."meeting_step"
  add constraint "meeting_step_type_fkey"
  foreign key ("type")
  references "public"."meeting_step_type"
  ("value") on update restrict on delete restrict;
