--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Debian 14.3-1.pgdg110+1)
-- Dumped by pg_dump version 14.3 (Debian 14.3-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ 
		BEGIN 
			NEW.updated_at = CURRENT_TIMESTAMP; 
			RETURN NEW; 
		END; 
		$$;


ALTER FUNCTION public.update_timestamp() OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO admin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO admin;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO admin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO admin;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: origin; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.origin (
    id integer NOT NULL,
    origin character varying(255) NOT NULL
);


ALTER TABLE public.origin OWNER TO admin;

--
-- Name: origin_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.origin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.origin_id_seq OWNER TO admin;

--
-- Name: origin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.origin_id_seq OWNED BY public.origin.id;


--
-- Name: tracking_now; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tracking_now (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    imported boolean DEFAULT false NOT NULL,
    item_type character varying(255) NOT NULL,
    item_tracking_id character varying(255) NOT NULL,
    item_visionweb_tracking_id character varying(255) NOT NULL,
    item_received_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    item_estimated_delivery timestamp with time zone,
    status_description character varying(255) DEFAULT ''::character varying NOT NULL,
    tracking_status_id integer NOT NULL
);


ALTER TABLE public.tracking_now OWNER TO admin;

--
-- Name: tracking_now_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tracking_now_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tracking_now_id_seq OWNER TO admin;

--
-- Name: tracking_now_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tracking_now_id_seq OWNED BY public.tracking_now.id;


--
-- Name: tracking_status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tracking_status (
    id integer NOT NULL,
    status character varying(255) NOT NULL
);


ALTER TABLE public.tracking_status OWNER TO admin;

--
-- Name: tracking_status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tracking_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tracking_status_id_seq OWNER TO admin;

--
-- Name: tracking_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tracking_status_id_seq OWNED BY public.tracking_status.id;


--
-- Name: xml_content; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_content (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    content xml NOT NULL,
    imported boolean DEFAULT false NOT NULL,
    prepared boolean DEFAULT false NOT NULL,
    xml_register_id integer NOT NULL,
    xml_template_id integer,
    xml_path_id integer
);


ALTER TABLE public.xml_content OWNER TO admin;

--
-- Name: xml_content_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_content_id_seq OWNER TO admin;

--
-- Name: xml_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_content_id_seq OWNED BY public.xml_content.id;


--
-- Name: xml_field; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_field (
    id integer NOT NULL,
    field character varying(255) NOT NULL,
    fieldpath text NOT NULL,
    xml_path_id integer NOT NULL
);


ALTER TABLE public.xml_field OWNER TO admin;

--
-- Name: xml_field_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_field_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_field_id_seq OWNER TO admin;

--
-- Name: xml_field_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_field_id_seq OWNED BY public.xml_field.id;


--
-- Name: xml_gmo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_gmo (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    imported boolean DEFAULT false NOT NULL,
    credat date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cretim time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ihrez date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    bname character varying(255) DEFAULT ''::character varying NOT NULL,
    lifnr character varying(255) DEFAULT ''::character varying NOT NULL,
    belnr character varying(255) DEFAULT ''::character varying NOT NULL,
    idtnr character varying(255) DEFAULT ''::character varying NOT NULL,
    esfera1 character varying(255) DEFAULT ''::character varying NOT NULL,
    cilindro1 character varying(255) DEFAULT ''::character varying NOT NULL,
    eje1 character varying(255) DEFAULT ''::character varying NOT NULL,
    ojo1 character varying(255) DEFAULT ''::character varying NOT NULL,
    diametro1 character varying(255) DEFAULT ''::character varying NOT NULL,
    adicion1 character varying(255) DEFAULT ''::character varying NOT NULL,
    transparencia1 character varying(255) DEFAULT ''::character varying NOT NULL,
    tipo_armazon1 character varying(255) DEFAULT ''::character varying NOT NULL,
    puente1 character varying(255) DEFAULT ''::character varying NOT NULL,
    vertical1 character varying(255) DEFAULT ''::character varying NOT NULL,
    horizontal1 character varying(255) DEFAULT ''::character varying NOT NULL,
    altura1 character varying(255) DEFAULT ''::character varying NOT NULL,
    dis_naso_pup_cerca1 character varying(255) DEFAULT ''::character varying NOT NULL,
    package1 character varying(255) DEFAULT ''::character varying NOT NULL,
    descentrado1 character varying(255) DEFAULT ''::character varying NOT NULL,
    prisma1 character varying(255) DEFAULT ''::character varying NOT NULL,
    orientacion_prisma1 character varying(255) DEFAULT ''::character varying NOT NULL,
    tenido1 character varying(255) DEFAULT ''::character varying NOT NULL,
    corredor1 character varying(255) DEFAULT ''::character varying NOT NULL,
    esfera2 character varying(255) DEFAULT ''::character varying NOT NULL,
    cilindro2 character varying(255) DEFAULT ''::character varying NOT NULL,
    eje2 character varying(255) DEFAULT ''::character varying NOT NULL,
    ojo2 character varying(255) DEFAULT ''::character varying NOT NULL,
    diametro2 character varying(255) DEFAULT ''::character varying NOT NULL,
    adicion2 character varying(255) DEFAULT ''::character varying NOT NULL,
    transparencia2 character varying(255) DEFAULT ''::character varying NOT NULL,
    tipo_armazon2 character varying(255) DEFAULT ''::character varying NOT NULL,
    puente2 character varying(255) DEFAULT ''::character varying NOT NULL,
    vertical2 character varying(255) DEFAULT ''::character varying NOT NULL,
    horizontal2 character varying(255) DEFAULT ''::character varying NOT NULL,
    altura2 character varying(255) DEFAULT ''::character varying NOT NULL,
    dis_naso_pup_cerca2 character varying(255) DEFAULT ''::character varying NOT NULL,
    package2 character varying(255) DEFAULT ''::character varying NOT NULL,
    descentrado2 character varying(255) DEFAULT ''::character varying NOT NULL,
    prisma2 character varying(255) DEFAULT ''::character varying NOT NULL,
    orientacion_prisma2 character varying(255) DEFAULT ''::character varying NOT NULL,
    tenido2 character varying(255) DEFAULT ''::character varying NOT NULL,
    corredor2 character varying(255) DEFAULT ''::character varying NOT NULL,
    ktext character varying(255) DEFAULT ''::character varying NOT NULL,
    xml_content_id integer NOT NULL
);


ALTER TABLE public.xml_gmo OWNER TO admin;

--
-- Name: xml_gmo_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_gmo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_gmo_id_seq OWNER TO admin;

--
-- Name: xml_gmo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_gmo_id_seq OWNED BY public.xml_gmo.id;


--
-- Name: xml_now; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_now (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    imported boolean DEFAULT false NOT NULL,
    rx_spectacle_creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rx_spectacle_applicationid character varying(255) DEFAULT ''::character varying NOT NULL,
    rx_spectacle_id character varying(255) DEFAULT ''::character varying NOT NULL,
    header_purchaseordernumber character varying(255) DEFAULT ''::character varying NOT NULL,
    customer_loginid character varying(255) DEFAULT ''::character varying NOT NULL,
    account_name1 character varying(255) DEFAULT ''::character varying NOT NULL,
    account_class1 character varying(255) DEFAULT ''::character varying NOT NULL,
    account_name2 character varying(255) DEFAULT ''::character varying NOT NULL,
    account_class2 character varying(255) DEFAULT ''::character varying NOT NULL,
    customerservice_loginid character varying(255) DEFAULT ''::character varying NOT NULL,
    promotion_promotionpackageid character varying(255) DEFAULT ''::character varying NOT NULL,
    promotion_promotionpackageorderjoinid character varying(255) DEFAULT ''::character varying NOT NULL,
    promotion_promotioncode character varying(255) DEFAULT ''::character varying NOT NULL,
    promotion_promotionname character varying(255) DEFAULT ''::character varying NOT NULL,
    promotion_paircode character varying(255) DEFAULT ''::character varying NOT NULL,
    patient_lastname character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_patient_initials character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_dominanteye character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_wrapangle character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_pantoangle character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_rightercd character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_rightnvb character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_leftercd character varying(255) DEFAULT ''::character varying NOT NULL,
    personalized_data_leftnvb character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_convert character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_type character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_comment character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_a character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_b character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_dbl character varying(255) DEFAULT ''::character varying NOT NULL,
    frame_supplier_code character varying(255) DEFAULT ''::character varying NOT NULL,
    position_eye1 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_opticalcenter1 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_boxing_height1 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_fitting_height1 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_far_half_pd1 character varying(255) DEFAULT ''::character varying NOT NULL,
    prescription_sphere1 character varying(255) DEFAULT ''::character varying NOT NULL,
    cylinder_value1 character varying(255) DEFAULT ''::character varying NOT NULL,
    cylinder_axis1 character varying(255) DEFAULT ''::character varying NOT NULL,
    addition_value1 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_value1 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_axis1 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_value2 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_axis2 character varying(255) DEFAULT ''::character varying NOT NULL,
    decentration_value1 character varying(255) DEFAULT ''::character varying NOT NULL,
    decentration_axis1 character varying(255) DEFAULT ''::character varying NOT NULL,
    lens_convert1 character varying(255) DEFAULT ''::character varying NOT NULL,
    lens_name1 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_commercial1 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_physical1 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_convert1 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name1 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert1 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name2 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert2 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name3 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert3 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name4 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert4 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name5 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert5 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_eye2 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_opticalcenter2 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_boxing_height2 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_fitting_height2 character varying(255) DEFAULT ''::character varying NOT NULL,
    position_far_half_pd2 character varying(255) DEFAULT ''::character varying NOT NULL,
    prescription_sphere2 character varying(255) DEFAULT ''::character varying NOT NULL,
    cylinder_value2 character varying(255) DEFAULT ''::character varying NOT NULL,
    cylinder_axis2 character varying(255) DEFAULT ''::character varying NOT NULL,
    addition_value2 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_value3 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_axis3 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_value4 character varying(255) DEFAULT ''::character varying NOT NULL,
    prism_axis4 character varying(255) DEFAULT ''::character varying NOT NULL,
    decentration_value2 character varying(255) DEFAULT ''::character varying NOT NULL,
    decentration_axis2 character varying(255) DEFAULT ''::character varying NOT NULL,
    lens_convert2 character varying(255) DEFAULT ''::character varying NOT NULL,
    lens_name2 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_commercial2 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_physical2 character varying(255) DEFAULT ''::character varying NOT NULL,
    diameter_convert2 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name6 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert6 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name7 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert7 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name8 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert8 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name9 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert9 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_name10 character varying(255) DEFAULT ''::character varying NOT NULL,
    treatment_convert10 character varying(255) DEFAULT ''::character varying NOT NULL,
    data text DEFAULT ''::text NOT NULL,
    jobtype_lensaction character varying(255) DEFAULT ''::character varying NOT NULL,
    xml_content_id integer NOT NULL
);


ALTER TABLE public.xml_now OWNER TO admin;

--
-- Name: xml_now_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_now_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_now_id_seq OWNER TO admin;

--
-- Name: xml_now_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_now_id_seq OWNED BY public.xml_now.id;


--
-- Name: xml_path; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_path (
    id integer NOT NULL,
    path character varying(255) NOT NULL,
    origin_id integer NOT NULL
);


ALTER TABLE public.xml_path OWNER TO admin;

--
-- Name: xml_path_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_path_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_path_id_seq OWNER TO admin;

--
-- Name: xml_path_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_path_id_seq OWNED BY public.xml_path.id;


--
-- Name: xml_register; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_register (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    filename character varying(255) NOT NULL,
    filedate timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    imported boolean DEFAULT false NOT NULL,
    origin_id integer NOT NULL
);


ALTER TABLE public.xml_register OWNER TO admin;

--
-- Name: xml_register_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_register_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_register_id_seq OWNER TO admin;

--
-- Name: xml_register_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_register_id_seq OWNED BY public.xml_register.id;


--
-- Name: xml_template; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.xml_template (
    id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    template character varying[] NOT NULL,
    xml_content_id integer NOT NULL
);


ALTER TABLE public.xml_template OWNER TO admin;

--
-- Name: xml_template_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.xml_template_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.xml_template_id_seq OWNER TO admin;

--
-- Name: xml_template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.xml_template_id_seq OWNED BY public.xml_template.id;


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: origin id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.origin ALTER COLUMN id SET DEFAULT nextval('public.origin_id_seq'::regclass);


--
-- Name: tracking_now id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_now ALTER COLUMN id SET DEFAULT nextval('public.tracking_now_id_seq'::regclass);


--
-- Name: tracking_status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_status ALTER COLUMN id SET DEFAULT nextval('public.tracking_status_id_seq'::regclass);


--
-- Name: xml_content id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content ALTER COLUMN id SET DEFAULT nextval('public.xml_content_id_seq'::regclass);


--
-- Name: xml_field id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_field ALTER COLUMN id SET DEFAULT nextval('public.xml_field_id_seq'::regclass);


--
-- Name: xml_gmo id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_gmo ALTER COLUMN id SET DEFAULT nextval('public.xml_gmo_id_seq'::regclass);


--
-- Name: xml_now id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_now ALTER COLUMN id SET DEFAULT nextval('public.xml_now_id_seq'::regclass);


--
-- Name: xml_path id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_path ALTER COLUMN id SET DEFAULT nextval('public.xml_path_id_seq'::regclass);


--
-- Name: xml_register id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_register ALTER COLUMN id SET DEFAULT nextval('public.xml_register_id_seq'::regclass);


--
-- Name: xml_template id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_template ALTER COLUMN id SET DEFAULT nextval('public.xml_template_id_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20211105210458_init.ts	1	2022-06-17 01:12:46.909+00
2	20211117150643_foreign.ts	1	2022-06-17 01:12:46.954+00
3	20211123005742_triggers.ts	1	2022-06-17 01:12:46.966+00
4	20220202022801_tracking.ts	1	2022-06-17 01:12:46.991+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: origin; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.origin (id, origin) FROM stdin;
1	now
2	gmo
\.


--
-- Data for Name: tracking_now; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tracking_now (id, created_at, updated_at, imported, item_type, item_tracking_id, item_visionweb_tracking_id, item_received_at, item_estimated_delivery, status_description, tracking_status_id) FROM stdin;
\.


--
-- Data for Name: tracking_status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.tracking_status (id, status) FROM stdin;
15	lens recived
20	waiting for frame
50	breakage - redo
55	shipping
70	complete
900	cancelled
999	other
\.


--
-- Data for Name: xml_content; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_content (id, created_at, updated_at, content, imported, prepared, xml_register_id, xml_template_id, xml_path_id) FROM stdin;
\.


--
-- Data for Name: xml_field; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_field (id, field, fieldpath, xml_path_id) FROM stdin;
1	credat	ZORDERS05EXT.IDOC[0].EDI_DC40[0].CREDAT[0]	3
2	cretim	ZORDERS05EXT.IDOC[0].EDI_DC40[0].CRETIM[0]	3
3	ihrez	ZORDERS05EXT.IDOC[0].E1EDKA1[1].IHREZ[0]	3
4	bname	ZORDERS05EXT.IDOC[0].E1EDKA1[1].BNAME[0]	3
5	lifnr	ZORDERS05EXT.IDOC[0].E1EDKA1[3].LIFNR[0]	3
6	belnr	ZORDERS05EXT.IDOC[0].E1EDK02[0].BELNR[0]	3
7	idtnr	ZORDERS05EXT.IDOC[0].E1EDP01[0].E1EDP19[1].IDTNR[0]	3
8	esfera1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].ESFERA[0]	3
9	cilindro1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].CILINDRO[0]	3
10	eje1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].EJE[0]	3
11	ojo1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].OJO[0]	3
12	diametro1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].DIAMETRO[0]	3
13	adicion1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].ADICION[0]	3
14	transparencia1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].TRANSPARENCIA[0]	3
15	tipo_armazon1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].TIPO_ARMAZON[0]	3
16	puente1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].PUENTE[0]	3
17	vertical1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].VERTICAL[0]	3
18	horizontal1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].HORIZONTAL[0]	3
19	altura1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].ALTURA[0]	3
20	dis_naso_pup_cerca1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].DIS_NASO_PUP_CERCA[0]	3
21	package1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].PACKAGE[0]	3
22	descentrado1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].DESCENTRADO[0]	3
23	prisma1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].PRISMA[0]	3
24	orientacion_prisma1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].ORIENTACION_PRISMA[0]	3
25	tenido1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].TENIDO[0]	3
26	corredor1	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[0].CORREDOR[0]	3
27	esfera2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].ESFERA[0]	3
28	cilindro2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].CILINDRO[0]	3
29	eje2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].EJE[0]	3
30	ojo2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].OJO[0]	3
31	diametro2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].DIAMETRO[0]	3
32	adicion2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].ADICION[0]	3
33	transparencia2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].TRANSPARENCIA[0]	3
34	tipo_armazon2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].TIPO_ARMAZON[0]	3
35	puente2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].PUENTE[0]	3
36	vertical2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].VERTICAL[0]	3
37	horizontal2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].HORIZONTAL[0]	3
38	altura2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].ALTURA[0]	3
39	dis_naso_pup_cerca2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].DIS_NASO_PUP_CERCA[0]	3
40	package2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].PACKAGE[0]	3
41	descentrado2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].DESCENTRADO[0]	3
42	prisma2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].PRISMA[0]	3
43	orientacion_prisma2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].ORIENTACION_PRISMA[0]	3
44	tenido2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].TENIDO[0]	3
45	corredor2	ZORDERS05EXT.IDOC[0].E1EDP01[1].ZMMXX01[1].CORREDOR[0]	3
46	ktext	ZORDERS05EXT.IDOC[0].E1EDP01[1].E1EDP19[0].KTEXT[0]	3
47	credat	ZORDERS05EXT.IDOC[0].EDI_DC40[0].CREDAT[0]	2
48	cretim	ZORDERS05EXT.IDOC[0].EDI_DC40[0].CRETIM[0]	2
49	ihrez	ZORDERS05EXT.IDOC[0].E1EDKA1[1].IHREZ[0]	2
50	bname	ZORDERS05EXT.IDOC[0].E1EDKA1[1].BNAME[0]	2
51	lifnr	ZORDERS05EXT.IDOC[0].E1EDKA1[3].LIFNR[0]	2
52	belnr	ZORDERS05EXT.IDOC[0].E1EDK02[0].BELNR[0]	2
53	esfera1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].ESFERA[0]	2
54	cilindro1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].CILINDRO[0]	2
55	eje1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].EJE[0]	2
56	ojo1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].OJO[0]	2
57	diametro1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].DIAMETRO[0]	2
58	adicion1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].ADICION[0]	2
59	transparencia1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].TRANSPARENCIA[0]	2
60	tipo_armazon1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].TIPO_ARMAZON[0]	2
61	puente1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].PUENTE[0]	2
62	vertical1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].VERTICAL[0]	2
63	horizontal1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].HORIZONTAL[0]	2
64	altura1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].ALTURA[0]	2
65	dis_naso_pup_cerca1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].DIS_NASO_PUP_CERCA[0]	2
66	package1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].PACKAGE[0]	2
67	descentrado1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].DESCENTRADO[0]	2
68	prisma1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].PRISMA[0]	2
69	orientacion_prisma1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].ORIENTACION_PRISMA[0]	2
70	tenido1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].TENIDO[0]	2
71	corredor1	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[0].CORREDOR[0]	2
72	esfera2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].ESFERA[0]	2
73	cilindro2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].CILINDRO[0]	2
74	eje2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].EJE[0]	2
75	ojo2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].OJO[0]	2
76	diametro2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].DIAMETRO[0]	2
77	adicion2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].ADICION[0]	2
78	transparencia2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].TRANSPARENCIA[0]	2
79	tipo_armazon2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].TIPO_ARMAZON[0]	2
80	puente2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].PUENTE[0]	2
81	vertical2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].VERTICAL[0]	2
82	horizontal2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].HORIZONTAL[0]	2
83	altura2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].ALTURA[0]	2
84	dis_naso_pup_cerca2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].DIS_NASO_PUP_CERCA[0]	2
85	package2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].PACKAGE[0]	2
86	descentrado2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].DESCENTRADO[0]	2
87	prisma2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].PRISMA[0]	2
88	orientacion_prisma2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].ORIENTACION_PRISMA[0]	2
89	tenido2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].TENIDO[0]	2
90	corredor2	ZORDERS05EXT.IDOC[0].E1EDP01[0].ZMMXX01[1].CORREDOR[0]	2
91	ktext	ZORDERS05EXT.IDOC[0].E1EDP01[0].E1EDP19[0].KTEXT[0]	2
92	rx_spectacle_creation_date	RX_SPECTACLE.Attr.Creation_date	1
93	rx_spectacle_applicationid	RX_SPECTACLE.Attr.ApplicationId	1
94	rx_spectacle_id	RX_SPECTACLE.Attr.Id	1
95	header_purchaseordernumber	RX_SPECTACLE.HEADER[0].Attr.PurchaseOrderNumber	1
96	customer_loginid	RX_SPECTACLE.HEADER[0].CUSTOMER[0].Attr.LoginID	1
97	account_name1	RX_SPECTACLE.HEADER[0].CUSTOMER[0].ACCOUNTS[0].ACCOUNT[0].Attr.Name	1
98	account_class1	RX_SPECTACLE.HEADER[0].CUSTOMER[0].ACCOUNTS[0].ACCOUNT[0].Attr.Class	1
99	account_name2	RX_SPECTACLE.HEADER[0].CUSTOMER[0].ACCOUNTS[0].ACCOUNT[1].Attr.Name	1
100	account_class2	RX_SPECTACLE.HEADER[0].CUSTOMER[0].ACCOUNTS[0].ACCOUNT[1].Attr.Class	1
101	customerservice_loginid	RX_SPECTACLE.HEADER[0].CUSTOMERSERVICE[0].Attr.LoginID	1
102	promotion_promotionpackageid	RX_SPECTACLE.HEADER[0].PROMOTION[0].Attr.PromotionPackageID	1
103	promotion_promotionpackageorderjoinid	RX_SPECTACLE.HEADER[0].PROMOTION[0].Attr.PromotionPackageOrderJoinID	1
104	promotion_promotioncode	RX_SPECTACLE.HEADER[0].PROMOTION[0].Attr.PromotionCode	1
105	promotion_promotionname	RX_SPECTACLE.HEADER[0].PROMOTION[0].Attr.PromotionName	1
106	promotion_paircode	RX_SPECTACLE.HEADER[0].PROMOTION[0].Attr.PairCode	1
107	patient_lastname	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].Attr.LastName	1
108	personalized_data_patient_initials	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.Patient_initials	1
109	personalized_data_dominanteye	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.DominantEye	1
110	personalized_data_wrapangle	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.WrapAngle	1
111	personalized_data_pantoangle	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.PantoAngle	1
112	personalized_data_rightercd	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.RightERCD	1
113	personalized_data_rightnvb	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.RightNVB	1
114	personalized_data_leftercd	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.LeftERCD	1
115	personalized_data_leftnvb	RX_SPECTACLE.SP_EQUIPMENT[0].PATIENT[0].PERSONALIZED_DATA[0].Attr.LeftNVB	1
116	frame_convert	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.Convert	1
117	frame_type	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.Type	1
118	frame_comment	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.Comment	1
119	frame_a	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.A	1
120	frame_b	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.B	1
121	frame_dbl	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].Attr.Dbl	1
122	frame_supplier_code	RX_SPECTACLE.SP_EQUIPMENT[0].FRAME[0].FRAME_SUPPLIER[0].Attr.Code	1
123	position_eye1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].Attr.Eye	1
124	position_opticalcenter1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].Attr.OpticalCenter	1
125	position_boxing_height1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].Attr.Boxing_Height	1
126	position_fitting_height1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].Attr.Fitting_Height	1
127	position_far_half_pd1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].Attr.Far_Half_Pd	1
128	prescription_sphere1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].Attr.Sphere	1
129	cylinder_value1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].CYLINDER[0].Attr.Value	1
130	cylinder_axis1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].CYLINDER[0].Attr.Axis	1
131	addition_value1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].ADDITION[0].Attr.Value	1
132	prism_value1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].PRISM[0].Attr.Value	1
133	prism_axis1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].PRISM[0].Attr.Axis	1
134	prism_value2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].PRISM[1].Attr.Value	1
135	prism_axis2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].PRISM[1].Attr.Axis	1
136	decentration_value1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].DECENTRATION[0].Attr.Value	1
137	decentration_axis1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].PRESCRIPTION[0].DECENTRATION[0].Attr.Axis	1
138	lens_convert1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].Attr.Convert	1
139	lens_name1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].Attr.Name	1
140	diameter_commercial1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].DIAMETER[0].Attr.Commercial	1
141	diameter_physical1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].DIAMETER[0].Attr.Physical	1
142	diameter_convert1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].DIAMETER[0].Attr.Convert	1
143	treatment_name1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[0].Attr.Name	1
144	treatment_convert1	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[0].Attr.Convert	1
145	treatment_name2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[1].Attr.Name	1
146	treatment_convert2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[1].Attr.Convert	1
147	treatment_name3	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[2].Attr.Name	1
148	treatment_convert3	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[2].Attr.Convert	1
149	treatment_name4	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[3].Attr.Name	1
150	treatment_convert4	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[3].Attr.Convert	1
151	treatment_name5	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[4].Attr.Name	1
152	treatment_convert5	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[0].LENS[0].TREATMENTS[0].TREATMENT[4].Attr.Convert	1
153	position_eye2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].Attr.Eye	1
154	position_opticalcenter2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].Attr.OpticalCenter	1
155	position_boxing_height2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].Attr.Boxing_Height	1
156	position_fitting_height2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].Attr.Fitting_Height	1
157	position_far_half_pd2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].Attr.Far_Half_Pd	1
158	prescription_sphere2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].Attr.Sphere	1
159	cylinder_value2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].CYLINDER[0].Attr.Value	1
160	cylinder_axis2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].CYLINDER[0].Attr.Axis	1
161	addition_value2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].ADDITION[0].Attr.Value	1
162	prism_value3	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].PRISM[0].Attr.Value	1
163	prism_axis3	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].PRISM[0].Attr.Axis	1
164	prism_value4	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].PRISM[1].Attr.Value	1
165	prism_axis4	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].PRISM[1].Attr.Axis	1
166	decentration_value2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].DECENTRATION[0].Attr.Value	1
167	decentration_axis2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].PRESCRIPTION[0].DECENTRATION[0].Attr.Axis	1
168	lens_convert2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].Attr.Convert	1
169	lens_name2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].Attr.Name	1
170	diameter_commercial2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].DIAMETER[0].Attr.Commercial	1
171	diameter_physical2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].DIAMETER[0].Attr.Physical	1
172	diameter_convert2	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].DIAMETER[0].Attr.Convert	1
173	treatment_name6	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[0].Attr.Name	1
174	treatment_convert6	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[0].Attr.Convert	1
175	treatment_name7	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[1].Attr.Name	1
176	treatment_convert7	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[1].Attr.Convert	1
177	treatment_name8	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[2].Attr.Name	1
178	treatment_convert8	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[2].Attr.Convert	1
179	treatment_name9	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[3].Attr.Name	1
180	treatment_convert9	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[3].Attr.Convert	1
181	treatment_name10	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[4].Attr.Name	1
182	treatment_convert10	RX_SPECTACLE.SP_EQUIPMENT[0].POSITION[1].LENS[0].TREATMENTS[0].TREATMENT[4].Attr.Convert	1
183	data	RX_SPECTACLE.SP_EQUIPMENT[0].OTHER[0].OMA[0].DATA[0]	1
184	jobtype_lensaction	RX_SPECTACLE.SP_EQUIPMENT[0].JOBTYPE[0].Attr.LensAction	1
\.


--
-- Data for Name: xml_gmo; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_gmo (id, created_at, updated_at, imported, credat, cretim, ihrez, bname, lifnr, belnr, idtnr, esfera1, cilindro1, eje1, ojo1, diametro1, adicion1, transparencia1, tipo_armazon1, puente1, vertical1, horizontal1, altura1, dis_naso_pup_cerca1, package1, descentrado1, prisma1, orientacion_prisma1, tenido1, corredor1, esfera2, cilindro2, eje2, ojo2, diametro2, adicion2, transparencia2, tipo_armazon2, puente2, vertical2, horizontal2, altura2, dis_naso_pup_cerca2, package2, descentrado2, prisma2, orientacion_prisma2, tenido2, corredor2, ktext, xml_content_id) FROM stdin;
\.


--
-- Data for Name: xml_now; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_now (id, created_at, updated_at, imported, rx_spectacle_creation_date, rx_spectacle_applicationid, rx_spectacle_id, header_purchaseordernumber, customer_loginid, account_name1, account_class1, account_name2, account_class2, customerservice_loginid, promotion_promotionpackageid, promotion_promotionpackageorderjoinid, promotion_promotioncode, promotion_promotionname, promotion_paircode, patient_lastname, personalized_data_patient_initials, personalized_data_dominanteye, personalized_data_wrapangle, personalized_data_pantoangle, personalized_data_rightercd, personalized_data_rightnvb, personalized_data_leftercd, personalized_data_leftnvb, frame_convert, frame_type, frame_comment, frame_a, frame_b, frame_dbl, frame_supplier_code, position_eye1, position_opticalcenter1, position_boxing_height1, position_fitting_height1, position_far_half_pd1, prescription_sphere1, cylinder_value1, cylinder_axis1, addition_value1, prism_value1, prism_axis1, prism_value2, prism_axis2, decentration_value1, decentration_axis1, lens_convert1, lens_name1, diameter_commercial1, diameter_physical1, diameter_convert1, treatment_name1, treatment_convert1, treatment_name2, treatment_convert2, treatment_name3, treatment_convert3, treatment_name4, treatment_convert4, treatment_name5, treatment_convert5, position_eye2, position_opticalcenter2, position_boxing_height2, position_fitting_height2, position_far_half_pd2, prescription_sphere2, cylinder_value2, cylinder_axis2, addition_value2, prism_value3, prism_axis3, prism_value4, prism_axis4, decentration_value2, decentration_axis2, lens_convert2, lens_name2, diameter_commercial2, diameter_physical2, diameter_convert2, treatment_name6, treatment_convert6, treatment_name7, treatment_convert7, treatment_name8, treatment_convert8, treatment_name9, treatment_convert9, treatment_name10, treatment_convert10, data, jobtype_lensaction, xml_content_id) FROM stdin;
\.


--
-- Data for Name: xml_path; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_path (id, path, origin_id) FROM stdin;
1	now	1
2	gmo sin montaje	2
3	gmo con montaje	2
\.


--
-- Data for Name: xml_register; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_register (id, created_at, updated_at, filename, filedate, imported, origin_id) FROM stdin;
\.


--
-- Data for Name: xml_template; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.xml_template (id, created_at, template, xml_content_id) FROM stdin;
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 4, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: origin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.origin_id_seq', 1, false);


--
-- Name: tracking_now_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tracking_now_id_seq', 1, false);


--
-- Name: tracking_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tracking_status_id_seq', 1, false);


--
-- Name: xml_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_content_id_seq', 1, false);


--
-- Name: xml_field_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_field_id_seq', 1, false);


--
-- Name: xml_gmo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_gmo_id_seq', 1, false);


--
-- Name: xml_now_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_now_id_seq', 1, false);


--
-- Name: xml_path_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_path_id_seq', 1, false);


--
-- Name: xml_register_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_register_id_seq', 1, false);


--
-- Name: xml_template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.xml_template_id_seq', 1, false);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: origin origin_origin_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.origin
    ADD CONSTRAINT origin_origin_unique UNIQUE (origin);


--
-- Name: origin origin_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.origin
    ADD CONSTRAINT origin_pkey PRIMARY KEY (id);


--
-- Name: tracking_now tracking_now_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_now
    ADD CONSTRAINT tracking_now_pkey PRIMARY KEY (id);


--
-- Name: tracking_status tracking_status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_status
    ADD CONSTRAINT tracking_status_pkey PRIMARY KEY (id);


--
-- Name: tracking_status tracking_status_status_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_status
    ADD CONSTRAINT tracking_status_status_unique UNIQUE (status);


--
-- Name: xml_content xml_content_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content
    ADD CONSTRAINT xml_content_pkey PRIMARY KEY (id);


--
-- Name: xml_content xml_content_xml_register_id_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content
    ADD CONSTRAINT xml_content_xml_register_id_unique UNIQUE (xml_register_id);


--
-- Name: xml_field xml_field_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_field
    ADD CONSTRAINT xml_field_pkey PRIMARY KEY (id);


--
-- Name: xml_gmo xml_gmo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_gmo
    ADD CONSTRAINT xml_gmo_pkey PRIMARY KEY (id);


--
-- Name: xml_gmo xml_gmo_xml_content_id_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_gmo
    ADD CONSTRAINT xml_gmo_xml_content_id_unique UNIQUE (xml_content_id);


--
-- Name: xml_now xml_now_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_now
    ADD CONSTRAINT xml_now_pkey PRIMARY KEY (id);


--
-- Name: xml_now xml_now_xml_content_id_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_now
    ADD CONSTRAINT xml_now_xml_content_id_unique UNIQUE (xml_content_id);


--
-- Name: xml_path xml_path_path_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_path
    ADD CONSTRAINT xml_path_path_unique UNIQUE (path);


--
-- Name: xml_path xml_path_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_path
    ADD CONSTRAINT xml_path_pkey PRIMARY KEY (id);


--
-- Name: xml_register xml_register_filename_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_register
    ADD CONSTRAINT xml_register_filename_unique UNIQUE (filename);


--
-- Name: xml_register xml_register_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_register
    ADD CONSTRAINT xml_register_pkey PRIMARY KEY (id);


--
-- Name: xml_template xml_template_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_template
    ADD CONSTRAINT xml_template_pkey PRIMARY KEY (id);


--
-- Name: xml_template xml_template_template_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_template
    ADD CONSTRAINT xml_template_template_unique UNIQUE (template);


--
-- Name: xml_template xml_template_xml_content_id_unique; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_template
    ADD CONSTRAINT xml_template_xml_content_id_unique UNIQUE (xml_content_id);


--
-- Name: tracking_now update_timestamp; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.tracking_now FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: xml_content update_timestamp; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.xml_content FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: xml_gmo update_timestamp; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.xml_gmo FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: xml_now update_timestamp; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.xml_now FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: xml_register update_timestamp; Type: TRIGGER; Schema: public; Owner: admin
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.xml_register FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: tracking_now tracking_now_tracking_status_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tracking_now
    ADD CONSTRAINT tracking_now_tracking_status_id_foreign FOREIGN KEY (tracking_status_id) REFERENCES public.tracking_status(id);


--
-- Name: xml_content xml_content_xml_path_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content
    ADD CONSTRAINT xml_content_xml_path_id_foreign FOREIGN KEY (xml_path_id) REFERENCES public.xml_path(id);


--
-- Name: xml_content xml_content_xml_register_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content
    ADD CONSTRAINT xml_content_xml_register_id_foreign FOREIGN KEY (xml_register_id) REFERENCES public.xml_register(id);


--
-- Name: xml_content xml_content_xml_template_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_content
    ADD CONSTRAINT xml_content_xml_template_id_foreign FOREIGN KEY (xml_template_id) REFERENCES public.xml_template(id);


--
-- Name: xml_field xml_field_xml_path_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_field
    ADD CONSTRAINT xml_field_xml_path_id_foreign FOREIGN KEY (xml_path_id) REFERENCES public.xml_path(id);


--
-- Name: xml_gmo xml_gmo_xml_content_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_gmo
    ADD CONSTRAINT xml_gmo_xml_content_id_foreign FOREIGN KEY (xml_content_id) REFERENCES public.xml_content(id);


--
-- Name: xml_now xml_now_xml_content_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_now
    ADD CONSTRAINT xml_now_xml_content_id_foreign FOREIGN KEY (xml_content_id) REFERENCES public.xml_content(id);


--
-- Name: xml_path xml_path_origin_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_path
    ADD CONSTRAINT xml_path_origin_id_foreign FOREIGN KEY (origin_id) REFERENCES public.origin(id);


--
-- Name: xml_register xml_register_origin_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_register
    ADD CONSTRAINT xml_register_origin_id_foreign FOREIGN KEY (origin_id) REFERENCES public.origin(id);


--
-- Name: xml_template xml_template_xml_content_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.xml_template
    ADD CONSTRAINT xml_template_xml_content_id_foreign FOREIGN KEY (xml_content_id) REFERENCES public.xml_content(id);


--
-- PostgreSQL database dump complete
--

