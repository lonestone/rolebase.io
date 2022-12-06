CREATE TABLE "public"."meeting_recurring" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "orgId" uuid NOT NULL, "circleId" uuid NOT NULL, "participantsScope" text NOT NULL, "participantsMembersIds" json NOT NULL, "templateId" uuid NOT NULL, "rrule" text NOT NULL, "duration" int2 NOT NULL, "videoConf" json,  "createdAt" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("orgId") REFERENCES "public"."org"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("circleId") REFERENCES "public"."circle"("id") ON UPDATE restrict ON DELETE cascade, FOREIGN KEY ("templateId") REFERENCES "public"."meeting_template"("id") ON UPDATE restrict ON DELETE cascade);
CREATE EXTENSION IF NOT EXISTS pgcrypto;

alter table "public"."meeting" add column "recurringId" uuid null;
alter table "public"."meeting" add constraint "meeting_recurringId_fkey"
    foreign key ("recurringId")
    references "public"."meeting_recurring"
    ("id") on update restrict on delete set null;
alter table "public"."meeting" drop column "facilitatorMemberId" cascade;
alter table "public"."meeting" drop column "initiatorMemberId" cascade;
alter table "public"."meeting" add column "recurringDate" timestamptz null;
alter table "public"."meeting" add column "preferences" json;
