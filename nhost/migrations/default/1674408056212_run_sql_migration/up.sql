CREATE TABLE task_status (
  value text PRIMARY KEY,
  comment text
);

INSERT INTO task_status (value, comment) VALUES
('Open', ''),
('InProgress', ''),
('InReview', ''),
('Blocked', ''),
('Done', '');

alter table "public"."task"
  add constraint "task_status_fkey"
  foreign key ("status")
  references "public"."task_status"
  ("value") on update restrict on delete restrict;
