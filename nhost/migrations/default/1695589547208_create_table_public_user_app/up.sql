CREATE TABLE "public"."user_app"
(
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "userId" uuid NOT NULL,
  "type" text NOT NULL,
  "secretConfig" json NOT NULL,
  PRIMARY KEY ("id") ,
  UNIQUE ("userId", "type")
);
CREATE EXTENSION
IF NOT EXISTS pgcrypto;
