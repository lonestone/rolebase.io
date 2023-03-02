CREATE TABLE thread_activity_type (
  value text PRIMARY KEY,
  comment text
);

INSERT INTO thread_activity_type (value, comment) VALUES
('Message', ''),
('Poll', ''),
('Thread', ''),
('Meeting', ''),
('Task', ''),
('Decision', '');

alter table "public"."thread_activity"
  add constraint "thread_activity_type_fkey"
  foreign key ("type")
  references "public"."thread_activity_type"
  ("value") on update restrict on delete restrict;
