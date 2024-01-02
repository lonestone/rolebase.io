alter table "public"."meeting" add column "invitedReadonly" boolean
 not null default 'false';
