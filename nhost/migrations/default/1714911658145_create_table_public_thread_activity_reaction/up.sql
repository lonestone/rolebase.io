CREATE TABLE "public"."thread_activity_reaction" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "activityId" uuid NOT NULL, "userId" uuid NOT NULL,
  "createdAt" timestamptz NOT NULL default now(),
  "shortcode" text NOT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY ("activityId") REFERENCES "public"."thread_activity"("id") ON UPDATE restrict ON
DELETE cascade,
  FOREIGN KEY ("userId")
REFERENCES "auth"."users"
("id") ON
UPDATE restrict ON
DELETE cascade
);
CREATE EXTENSION
IF NOT EXISTS pgcrypto;

CREATE  INDEX "thread_activity_reaction_activityId_key" on
  "public"."thread_activity_reaction" using btree
("activityId");
