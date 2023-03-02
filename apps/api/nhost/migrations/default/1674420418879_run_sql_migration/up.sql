CREATE TABLE member_role (
  value text PRIMARY KEY,
  comment text
);

INSERT INTO member_role (value, comment) VALUES
('Readonly', 'Can view but not participate'),
('Member', 'Can participate and edit everything'),
('Admin', 'Can invite members');

alter table "public"."member"
  add constraint "member_role_fkey"
  foreign key ("role")
  references "public"."member_role"
  ("value") on update restrict on delete restrict;
