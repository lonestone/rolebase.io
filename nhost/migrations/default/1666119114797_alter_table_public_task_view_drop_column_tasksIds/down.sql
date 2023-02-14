alter table "public"."task_view" alter column "tasksIds" drop not null;
alter table "public"."task_view" add column "tasksIds" _text;
