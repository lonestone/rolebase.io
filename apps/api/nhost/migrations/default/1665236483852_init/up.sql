SET check_function_bodies = false;
CREATE TABLE public.circle (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "orgId" uuid NOT NULL,
    "roleId" uuid NOT NULL,
    "parentId" uuid,
    archived boolean NOT NULL
);
CREATE TABLE public.circle_member (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "circleId" uuid NOT NULL,
    "memberId" uuid NOT NULL,
    "avgMinPerWeek" integer
);
CREATE TABLE public.member (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "orgId" uuid NOT NULL,
    archived boolean NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    picture text,
    "userId" uuid,
    "inviteEmail" text,
    "inviteDate" timestamp with time zone,
    "workedMinPerWeek" integer,
    role text,
    "meetingId" uuid
);
CREATE TABLE public.org (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    archived boolean NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "defaultWorkedMinPerWeek" integer NOT NULL,
    slug text
);
CREATE TABLE public.role (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "orgId" uuid NOT NULL,
    archived boolean NOT NULL,
    base boolean NOT NULL,
    name text NOT NULL,
    purpose text NOT NULL,
    domain text NOT NULL,
    accountabilities text NOT NULL,
    checklist text NOT NULL,
    indicators text NOT NULL,
    notes text NOT NULL,
    "singleMember" boolean NOT NULL,
    "autoCreate" boolean NOT NULL,
    link text NOT NULL,
    "defaultMinPerWeek" integer,
    "colorHue" smallint
);
ALTER TABLE ONLY public.circle_member
    ADD CONSTRAINT circle_member_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.circle
    ADD CONSTRAINT circle_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.org
    ADD CONSTRAINT org_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.role
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.circle_member
    ADD CONSTRAINT "circle_member_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES public.circle(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.circle_member
    ADD CONSTRAINT "circle_member_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public.member(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.circle
    ADD CONSTRAINT "circle_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES public.org(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.circle
    ADD CONSTRAINT "circle_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public.circle(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.circle
    ADD CONSTRAINT "circle_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.member
    ADD CONSTRAINT "member_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES public.org(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.role
    ADD CONSTRAINT "role_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES public.org(id) ON UPDATE RESTRICT ON DELETE CASCADE;
