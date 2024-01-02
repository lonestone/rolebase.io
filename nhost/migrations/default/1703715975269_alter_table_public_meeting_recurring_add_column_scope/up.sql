alter table "public"."meeting_recurring" add column "scope" json
 not null default '[]';
