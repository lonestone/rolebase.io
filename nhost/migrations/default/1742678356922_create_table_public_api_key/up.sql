CREATE TABLE "public"."api_key" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "userId" uuid NOT NULL, "name" Text NOT NULL, "value" text NOT NULL DEFAULT encode(gen_random_bytes(30), 'base64'), "createdAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON UPDATE restrict ON DELETE cascade);COMMENT ON TABLE "public"."api_key" IS E'Users API keys';
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE  INDEX "api_key_userId_key" on
  "public"."api_key" using btree ("userId");
CREATE  INDEX "api_key_value_key" on
  "public"."api_key" using btree ("value");
