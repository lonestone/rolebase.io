alter table "public"."thread_poll_answer" alter column "choicesPoints" drop not null;
alter table "public"."thread_poll_answer" add column "choicesPoints" text;
