CREATE  INDEX "meeting_orgId_startDate_archived_key" on
  "public"."meeting" using btree ("orgId", "startDate", "archived");
