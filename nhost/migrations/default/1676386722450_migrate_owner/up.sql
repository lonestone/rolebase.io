do $$
declare
    f record;
    mem record;
begin
    for f in select id from "public"."org" loop
        for mem in select id from "public"."member" as m where m."orgId" = f.id and m."userId" IS NOT NULL and m."role" = 'Admin' loop
            update "public"."member" set "role" = 'Owner' where id = mem.id;
        end loop;
    end loop;
end; $$;
