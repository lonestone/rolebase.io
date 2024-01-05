CREATE  INDEX "role_id_parentLink_key" on
  "public"."role" using btree ("id", "parentLink");
