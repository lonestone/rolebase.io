alter table "public"."user_app"
  add constraint "user_app_type_fkey"
  foreign key ("type")
  references "public"."app_type"
  ("value") on update restrict on delete restrict;
