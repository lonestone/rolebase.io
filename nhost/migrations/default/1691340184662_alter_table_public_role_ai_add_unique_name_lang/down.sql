alter table "public"."role_ai" drop constraint "role_ai_name_lang_key";
alter table "public"."role_ai" add constraint "role_ai_name_key" unique ("name");
