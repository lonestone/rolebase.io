CREATE TABLE "public"."circle_link" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "parentId" uuid NOT NULL, "circleId" uuid NOT NULL, "createdAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("circleId") REFERENCES "public"."circle"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("parentId") REFERENCES "public"."circle"("id") ON UPDATE restrict ON DELETE cascade, UNIQUE ("parentId", "circleId"));COMMENT ON TABLE "public"."circle_link" IS E'Members that represent a circle in another circle';
CREATE EXTENSION IF NOT EXISTS pgcrypto;