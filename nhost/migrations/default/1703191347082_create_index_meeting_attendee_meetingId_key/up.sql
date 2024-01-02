CREATE  INDEX "meeting_attendee_meetingId_key" on
  "public"."meeting_attendee" using btree ("meetingId");
