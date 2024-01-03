CREATE  INDEX "meeting_recurringId_recurringDate_key" on
  "public"."meeting" using btree ("recurringId", "recurringDate");
