UPDATE member
  SET "inviteEmail" = u.email
  FROM auth.users u
  WHERE member."userId" = u.id
    AND member."userId" IS NOT NULL;
