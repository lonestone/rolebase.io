CREATE OR REPLACE VIEW "public"."circle_participant" AS 
    SELECT c.id AS "circleId",
        cm."memberId",
        c."orgId"
    FROM circle c
    JOIN circle_member cm ON c.id = cm."circleId"
    WHERE cm.archived = false
UNION
    SELECT c.id AS "circleId",
        l."memberId",
        c."orgId"
    FROM circle c
    JOIN circle sub_circle ON sub_circle."parentId" = c.id
    JOIN circle_leader l ON l."circleId" = sub_circle.id
    WHERE sub_circle.archived = false;
