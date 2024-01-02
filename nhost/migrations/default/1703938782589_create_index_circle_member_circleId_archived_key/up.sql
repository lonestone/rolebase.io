CREATE  INDEX "circle_member_circleId_archived_key" on
  "public"."circle_member" using btree ("circleId", "archived");
