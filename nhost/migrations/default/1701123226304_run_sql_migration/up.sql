INSERT INTO circle_link ("parentId", "circleId")
SELECT c2.id AS "parentId", c.id AS "circleId"
FROM role r
INNER JOIN circle c ON c."roleId" = r.id
INNER JOIN circle c2 ON c2.id = (CASE WHEN r.link ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN r.link::uuid ELSE null END)
WHERE r.link != 'No' AND r.link != 'Parent';
