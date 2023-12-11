CREATE OR REPLACE VIEW circle_leader AS
WITH sub_circle_leader AS (
    SELECT
        sub_circle."parentId" as "circleId",
        cm."memberId",
        sub_circle."orgId"
    FROM circle sub_circle
    INNER JOIN role r ON sub_circle."roleId" = r."id"
    INNER JOIN circle_member cm ON sub_circle."id" = cm."circleId"
    WHERE
        r."parentLink" = true
        AND sub_circle."archived" = false
        AND r."archived" = false
        AND cm."archived" = false
)
SELECT
    c."id" as "circleId",
    cm."memberId" as "memberId",
    c."orgId"
FROM circle c
LEFT JOIN circle_member cm ON c."id" = cm."circleId"
WHERE
    NOT EXISTS (
        SELECT 1
        FROM sub_circle_leader scl
        WHERE scl."circleId" = c."id"
    )
    AND c."archived" = false
    AND cm."archived" = false
UNION
SELECT
    scl."circleId",
    scl."memberId",
    scl."orgId"
FROM
    sub_circle_leader scl;
