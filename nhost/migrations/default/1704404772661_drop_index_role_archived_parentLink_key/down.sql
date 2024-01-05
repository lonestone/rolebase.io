CREATE  INDEX "role_archived_parentLink_key" on
  "public"."role" using btree ("archived", "parentLink");
