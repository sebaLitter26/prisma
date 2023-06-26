-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."Answer"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "isCorrect" boolean NOT NULL DEFAULT false,
    url text COLLATE pg_catalog."default" NOT NULL,
    "questionId" text COLLATE pg_catalog."default",
    CONSTRAINT "Answer_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Appartment"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "appartmentId" text COLLATE pg_catalog."default",
    "tenantId" text COLLATE pg_catalog."default",
    "ownerId" text COLLATE pg_catalog."default",
    CONSTRAINT "Appartment_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Building"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    address text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Building_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Category"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Owner"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "userId" text COLLATE pg_catalog."default",
    CONSTRAINT "Owner_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Question"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "categoryId" text COLLATE pg_catalog."default",
    CONSTRAINT "Question_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."Tenant"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "userId" text COLLATE pg_catalog."default",
    CONSTRAINT "Tenant_pkey" PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."User"
(
    id text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    name text COLLATE pg_catalog."default" NOT NULL,
    roles "Roles"[] DEFAULT ARRAY['user'::"Roles"],
    "isActive" boolean NOT NULL DEFAULT true,
    "createdAt" timestamp(3) without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public."Answer"
    ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId")
    REFERENCES public."Question" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Appartment"
    ADD CONSTRAINT "Appartment_appartmentId_fkey" FOREIGN KEY ("appartmentId")
    REFERENCES public."Building" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Appartment"
    ADD CONSTRAINT "Appartment_ownerId_fkey" FOREIGN KEY ("ownerId")
    REFERENCES public."Owner" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Appartment"
    ADD CONSTRAINT "Appartment_tenantId_fkey" FOREIGN KEY ("tenantId")
    REFERENCES public."Tenant" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Owner"
    ADD CONSTRAINT "Owner_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "Owner_userId_key"
    ON public."Owner"("userId");


ALTER TABLE IF EXISTS public."Question"
    ADD CONSTRAINT "Question_categoryId_fkey" FOREIGN KEY ("categoryId")
    REFERENCES public."Category" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;


ALTER TABLE IF EXISTS public."Tenant"
    ADD CONSTRAINT "Tenant_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "Tenant_userId_key"
    ON public."Tenant"("userId");


ALTER TABLE IF EXISTS public."User"
    ADD CONSTRAINT "User_userId_fkey" FOREIGN KEY ("userId")
    REFERENCES public."User" (id) MATCH SIMPLE
    ON UPDATE CASCADE
    ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS "User_userId_key"
    ON public."User"("userId");

END;