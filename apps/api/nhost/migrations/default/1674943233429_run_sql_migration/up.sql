CREATE  INDEX "circle_archived" on
  "public"."circle" using hash ("archived");
CREATE  INDEX "role_archived" on
  "public"."role" using hash ("archived");
CREATE  INDEX "member_archived" on
  "public"."member" using hash ("archived");
CREATE  INDEX "circle_member_archived" on
  "public"."circle_member" using hash ("archived");
