alter table "public"."skill" drop constraint "skill_categoryId_fkey",
  add constraint "skill_categoryId_fkey"
  foreign key ("categoryId")
  references "public"."skill_category"
  ("id") on update restrict on delete restrict;
