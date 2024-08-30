SET check_function_bodies = false;
CREATE TABLE public.department (
    id integer NOT NULL,
    title text NOT NULL
);
CREATE SEQUENCE public.department_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.department_id_seq OWNED BY public.department.id;
CREATE TABLE public.employee (
    id integer NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    email text NOT NULL,
    image text DEFAULT 'https://barleybucket.s3.us-east-2.amazonaws.com/d11c3072-da4e-4898-8129-69153c3a784e_photo.jpg'::text NOT NULL,
    "jobId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "salaryId" integer NOT NULL,
    "paybandId" integer NOT NULL
);
CREATE SEQUENCE public.employee_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.employee_id_seq OWNED BY public.employee.id;
CREATE TABLE public.job (
    id integer NOT NULL,
    title text NOT NULL,
    level integer NOT NULL,
    "departmentId" integer NOT NULL
);
CREATE SEQUENCE public.job_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.job_id_seq OWNED BY public.job.id;
CREATE TABLE public.location (
    id integer NOT NULL,
    city text NOT NULL,
    country text NOT NULL
);
CREATE SEQUENCE public.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.location_id_seq OWNED BY public.location.id;
CREATE TABLE public.payband (
    id integer NOT NULL,
    "jobId" integer NOT NULL,
    "departmentId" integer NOT NULL
);
CREATE SEQUENCE public.payband_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.payband_id_seq OWNED BY public.payband.id;
CREATE TABLE public.salary (
    id integer NOT NULL,
    base integer NOT NULL,
    variable integer DEFAULT 0 NOT NULL,
    bonus integer DEFAULT 0 NOT NULL,
    benefits integer DEFAULT 0 NOT NULL,
    equity integer DEFAULT 0 NOT NULL
);
CREATE SEQUENCE public.salary_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.salary_id_seq OWNED BY public.salary.id;
ALTER TABLE ONLY public.department ALTER COLUMN id SET DEFAULT nextval('public.department_id_seq'::regclass);
ALTER TABLE ONLY public.employee ALTER COLUMN id SET DEFAULT nextval('public.employee_id_seq'::regclass);
ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.job_id_seq'::regclass);
ALTER TABLE ONLY public.location ALTER COLUMN id SET DEFAULT nextval('public.location_id_seq'::regclass);
ALTER TABLE ONLY public.payband ALTER COLUMN id SET DEFAULT nextval('public.payband_id_seq'::regclass);
ALTER TABLE ONLY public.salary ALTER COLUMN id SET DEFAULT nextval('public.salary_id_seq'::regclass);
ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.department
    ADD CONSTRAINT department_title_key UNIQUE (title);
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_email_key UNIQUE (email);
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_title_key UNIQUE (title);
ALTER TABLE ONLY public.location
    ADD CONSTRAINT location_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.payband
    ADD CONSTRAINT payband_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.salary
    ADD CONSTRAINT salary_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "employee_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.job(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "employee_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES public.location(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "employee_paybandId_fkey" FOREIGN KEY ("paybandId") REFERENCES public.payband(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.employee
    ADD CONSTRAINT "employee_salaryId_fkey" FOREIGN KEY ("salaryId") REFERENCES public.salary(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.job
    ADD CONSTRAINT "job_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public.department(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.payband
    ADD CONSTRAINT "payband_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES public.department(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.payband
    ADD CONSTRAINT "payband_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public.job(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
