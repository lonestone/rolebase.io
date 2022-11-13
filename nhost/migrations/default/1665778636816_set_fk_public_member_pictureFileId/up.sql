alter table "public"."member"
  add constraint "member_pictureFileId_fkey"
  foreign key ("pictureFileId")
  references "storage"."files"
  ("id") on update restrict on delete restrict;
