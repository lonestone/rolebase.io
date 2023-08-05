UPDATE auth.users
SET metadata = member.preferences
FROM member
WHERE auth.users.id = member."userId" AND member.preferences IS NOT NULL;

alter table "public"."member" drop column "preferences"
cascade;
