

DROP INDEX IF EXISTS "public"."org_archived";
DROP INDEX IF EXISTS "public"."circle_member_archived";
DROP INDEX IF EXISTS "public"."member_archived";
DROP INDEX IF EXISTS "public"."role_archived";
DROP INDEX IF EXISTS "public"."circle_archived";

CREATE  INDEX "role_archived_key" on
  "public"."role" using btree
("archived");

CREATE  INDEX "role_orgId_archived_key" on
  "public"."role" using btree
("orgId", "archived");

CREATE  INDEX "circle_orgId_archived_key" on
  "public"."circle" using btree
("orgId", "archived");

CREATE  INDEX "circle_member_circleId_archived" on
  "public"."circle_member" using btree
("circleId", "archived");

CREATE  INDEX "member_orgId_archived_key" on
  "public"."member" using btree
("orgId", "archived");

CREATE  INDEX "member_userId_archived_key" on
  "public"."member" using btree
("userId", "archived");

CREATE  INDEX "member_archived_key" on
  "public"."member" using btree
("archived");
