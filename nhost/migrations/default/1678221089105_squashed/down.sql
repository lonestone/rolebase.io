
DROP INDEX IF EXISTS "public"."member_archived_key";

CREATE  INDEX "org_archived" on
  "public"."org" using hash ("archived");

DROP INDEX IF EXISTS "public"."member_userId_archived_key";

CREATE  INDEX "member_orgId_key" on
  "public"."member" using btree ("orgId");

CREATE  INDEX "member_archived_key" on
  "public"."member" using btree ("archived");

DROP INDEX IF EXISTS "public"."circle_orgId_archived_key";

CREATE  INDEX "circle_archived" on
  "public"."circle" using hash ("archived");

DROP INDEX IF EXISTS "public"."member_orgId_key";

DROP INDEX IF EXISTS "public"."member_archived_key";

DROP INDEX IF EXISTS "public"."member_orgId_archived_key";

CREATE  INDEX "member_orgId_archived_key" on
  "public"."member" using btree ("archived");

CREATE  INDEX "member_orgId_archived" on
  "public"."member" using btree ("archived", "orgId");

DROP INDEX IF EXISTS "public"."role_orgId_archived_key";

DROP INDEX IF EXISTS "public"."role_archived_key";

CREATE  INDEX "role_archived" on
  "public"."role" using hash ("archived");

DROP INDEX IF EXISTS "public"."member_orgId_archived_key";

DROP INDEX IF EXISTS "public"."member_orgId_archived";

CREATE  INDEX "member_archived" on
  "public"."member" using hash ("archived");

CREATE  INDEX "circle_member_archived" on
  "public"."circle_member" using hash ("archived");

DROP INDEX IF EXISTS "public"."circle_member_circleId_archived";
