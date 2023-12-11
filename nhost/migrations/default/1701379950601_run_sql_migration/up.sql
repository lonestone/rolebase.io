CREATE OR REPLACE VIEW circle_participant AS
    SELECT
        c."id" as "circleId",
        cm."memberId",
        c."orgId"
    FROM circle c
        INNER JOIN circle_member cm ON c.id = cm."circleId"
    WHERE c.archived = false AND cm.archived = false
UNION
    SELECT
        c."id" as "circleId",
        l."memberId",
        c."orgId"
    FROM circle c
        INNER JOIN circle sub_circle ON sub_circle."parentId" = c.id
        INNER JOIN circle_leader l ON l."circleId" = sub_circle.id
    WHERE c.archived = false;
