-- ============================================================================
--  JEETPHYSICS.IN — PHASE 2: CLEAN ARCHITECTURE & SCHEMA DEPLOYMENT
--  Teardown of Prototype Objects & Provisioning of Normalized CMS Schema
--  Migration File: 20260904_phase2_clean_architecture.sql
--  (Safely rerunnable from the beginning; drops and re-provisions clean schema)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. EXTENSIONS SETUP
-- ----------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 2. TEARDOWN PROTOTYPE OBJECTS (DEPENDENCY-SAFE CLEAN RESET)
-- ----------------------------------------------------------------------------
-- Drop prototype tables first with CASCADE.
-- CASCADE automatically drops foreign keys, triggers, and table-level policies.
DROP TABLE IF EXISTS public.resource_files CASCADE;
DROP TABLE IF EXISTS public.resources CASCADE;
DROP TABLE IF EXISTS public.resource_types CASCADE;
DROP TABLE IF EXISTS public.resource_downloads CASCADE;
DROP TABLE IF EXISTS public.pyqs CASCADE;
DROP TABLE IF EXISTS public.lab_components CASCADE;
DROP TABLE IF EXISTS public.units CASCADE;
DROP TABLE IF EXISTS public.papers CASCADE;
DROP TABLE IF EXISTS public.semesters CASCADE;
DROP TABLE IF EXISTS public.subjects CASCADE;
DROP TABLE IF EXISTS public.formulae CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;
DROP TABLE IF EXISTS public.student_queries CASCADE;

-- Drop obsolete helper functions
DROP FUNCTION IF EXISTS public.validate_resource_integrity() CASCADE;
DROP FUNCTION IF EXISTS public.protect_resource_type_configuration() CASCADE;
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- Clean up prototype storage buckets and objects
DELETE FROM storage.objects WHERE bucket_id IN ('syllabus-pdfs', 'pyq-pdfs', 'lab-manuals', 'handwritten-notes', 'academic-resources');
DELETE FROM storage.buckets WHERE id IN ('syllabus-pdfs', 'pyq-pdfs', 'lab-manuals', 'handwritten-notes');

-- ----------------------------------------------------------------------------
-- 3. PROVISION UNIFIED PRIVATE STORAGE BUCKET
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'academic-resources',
    'academic-resources',
    false, -- STRICTLY PRIVATE: Anonymous direct downloads prohibited
    52428800, -- 50 MB limit per document
    ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE SET public = false;

-- ----------------------------------------------------------------------------
-- 4. CREATE TABLES & CONSTRAINTS (IN DEPENDENCY ORDER)
-- ----------------------------------------------------------------------------

-- 4.1 Administrator Users Table (Auth UID Pointer)
CREATE TABLE public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.2 Resource Types Table (Dynamic CMS Configuration Layer)
CREATE TABLE public.resource_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type_key VARCHAR(50) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(20) NOT NULL DEFAULT '📄',
    category VARCHAR(50) NOT NULL DEFAULT 'GENERAL' 
        CHECK (category IN ('CORE', 'EXAM', 'THEORY', 'LAB', 'REFERENCE', 'GENERAL')),
    applicable_paper_type VARCHAR(20) NOT NULL DEFAULT 'BOTH' 
        CHECK (applicable_paper_type IN ('THEORY', 'LAB', 'BOTH')),
    requires_unit BOOLEAN NOT NULL DEFAULT false,
    requires_exam_year BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    show_on_paper BOOLEAN NOT NULL DEFAULT true,
    show_in_navbar BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    -- Reserved URL Route Protection
    -- Universal forbidden routes (never allowed for any type)
    -- Built-in system routes: permitted ONLY for their exact authoritative system type_key
    CONSTRAINT chk_resource_type_slug_not_reserved CHECK (
        slug NOT IN (
            'admin', 'api', 'auth', 'login', 'dashboard', 'settings', '_next', 'static', 'public',
            'papers', 'formulae', 'numericals', 'study-tips', 'resources', 'search', 'about', 'contact'
        )
        AND (slug <> 'syllabus' OR type_key = 'SYLLABUS')
        AND (slug <> 'previous-year-questions' OR type_key = 'PYQ')
        AND (slug <> 'unit-wise-notes' OR type_key = 'NOTES')
        AND (slug <> 'unit-wise-qna' OR type_key = 'Q_AND_A')
    )
);

-- 4.3 Subjects Master Table
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.4 Semesters Table (Scoped strictly under Subject)
CREATE TABLE public.semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    semester_number INT NOT NULL CHECK (semester_number BETWEEN 1 AND 12),
    slug VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_semesters_subject_number UNIQUE (subject_id, semester_number),
    CONSTRAINT uq_semesters_subject_slug UNIQUE (subject_id, slug),
    CONSTRAINT uq_semesters_subject_id UNIQUE (subject_id, id)
);

-- 4.5 Papers Table (With Subject-Semester Composite Foreign Key)
CREATE TABLE public.papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL,
    semester_id UUID NOT NULL,
    paper_code VARCHAR(50) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    paper_type VARCHAR(20) NOT NULL DEFAULT 'THEORY' CHECK (paper_type IN ('THEORY', 'LAB')),
    description TEXT,
    credits INT CHECK (credits >= 0),
    marks INT CHECK (marks >= 0),
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_papers_subject_semester FOREIGN KEY (subject_id, semester_id) 
        REFERENCES public.semesters (subject_id, id) ON DELETE CASCADE,
    CONSTRAINT uq_papers_semester_slug UNIQUE (semester_id, slug),
    CONSTRAINT uq_papers_subject_code UNIQUE (subject_id, paper_code)
);

-- 4.6 Resources Table (Unified Academic Entity)
CREATE TABLE public.resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL REFERENCES public.papers(id) ON DELETE CASCADE,
    resource_type VARCHAR(50) NOT NULL REFERENCES public.resource_types(type_key) ON UPDATE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    unit_number INT CHECK (unit_number BETWEEN 1 AND 10),
    unit_name VARCHAR(150),
    exam_year INT CHECK (exam_year BETWEEN 1990 AND 2050),
    display_order INT NOT NULL DEFAULT 0,
    publication_status VARCHAR(20) NOT NULL DEFAULT 'DRAFT' 
        CHECK (publication_status IN ('DRAFT', 'PUBLISHED', 'ARCHIVED')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.7 Resource Files Table (Physical Attachment Metadata & Versioning)
-- A resource can have multiple file-version records; each stored file has one metadata record.
CREATE TABLE public.resource_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID NOT NULL REFERENCES public.resources(id) ON DELETE CASCADE,
    storage_bucket VARCHAR(100) NOT NULL DEFAULT 'academic-resources'
        CHECK (storage_bucket = 'academic-resources'),
    storage_path TEXT NOT NULL UNIQUE,
    original_filename VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100) NOT NULL DEFAULT 'application/pdf',
    file_size_bytes BIGINT NOT NULL DEFAULT 0,
    file_version INT NOT NULL DEFAULT 1,
    is_primary BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.8 Student Queries Table (Contact Submissions)
CREATE TABLE public.student_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    college_name VARCHAR(255),
    query_text TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. TWO-WAY DATABASE INTEGRITY TRIGGERS
-- ----------------------------------------------------------------------------

-- 5.1 Trigger 1: Protect Resource Type Structural Configuration (Upward Integrity)
CREATE OR REPLACE FUNCTION public.protect_resource_type_configuration()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Block modifications to structural rules if ANY dependent resources exist
    IF (OLD.requires_unit IS DISTINCT FROM NEW.requires_unit)
       OR (OLD.requires_exam_year IS DISTINCT FROM NEW.requires_exam_year)
       OR (OLD.applicable_paper_type IS DISTINCT FROM NEW.applicable_paper_type) THEN
       
        IF EXISTS (
            SELECT 1 FROM public.resources
            WHERE resource_type = OLD.type_key
        ) THEN
            RAISE EXCEPTION 'Cannot alter structural rules (requires_unit, requires_exam_year, applicable_paper_type) for resource type "%" because existing resources depend on it.', OLD.type_key;
        END IF;
    END IF;

    -- Block modifications to slug if any PUBLISHED resources exist
    IF OLD.slug <> NEW.slug THEN
        IF EXISTS (
            SELECT 1 FROM public.resources
            WHERE resource_type = OLD.type_key
              AND publication_status = 'PUBLISHED'
        ) THEN
            RAISE EXCEPTION 'Cannot modify slug for resource type "%" because it has active published resources. To alter public URLs, archive dependent resources first.', OLD.type_key;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_resource_type_configuration ON public.resource_types;
CREATE TRIGGER trg_protect_resource_type_configuration
BEFORE UPDATE ON public.resource_types
FOR EACH ROW
EXECUTE FUNCTION public.protect_resource_type_configuration();

-- 5.2 Trigger 2: Validate Resource Integrity & Normalize Metadata (Downward Integrity)
CREATE OR REPLACE FUNCTION public.validate_resource_integrity()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_rt RECORD;
    v_paper_type VARCHAR(20);
BEGIN
    -- 1. Fetch resource_type configuration
    SELECT requires_unit, requires_exam_year, applicable_paper_type
    INTO v_rt
    FROM public.resource_types
    WHERE type_key = NEW.resource_type AND is_active = true;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid or inactive resource_type: %', NEW.resource_type;
    END IF;

    -- 2. Fetch parent paper type
    SELECT paper_type INTO v_paper_type
    FROM public.papers
    WHERE id = NEW.paper_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Referenced paper_id % does not exist', NEW.paper_id;
    END IF;

    -- 3. Enforce applicable_paper_type compatibility
    IF v_rt.applicable_paper_type <> 'BOTH' AND v_rt.applicable_paper_type <> v_paper_type THEN
        RAISE EXCEPTION 'Resource type % is restricted to % papers, but paper % is %',
            NEW.resource_type, v_rt.applicable_paper_type, NEW.paper_id, v_paper_type;
    END IF;

    -- 4. Enforce Unit Metadata Rules
    IF v_rt.requires_unit THEN
        IF NEW.unit_number IS NULL OR NEW.unit_number < 1 OR NEW.unit_number > 10 THEN
            RAISE EXCEPTION 'Resource type % requires a valid unit_number (1 to 10)', NEW.resource_type;
        END IF;
        IF NEW.unit_name IS NULL OR TRIM(NEW.unit_name) = '' THEN
            RAISE EXCEPTION 'Resource type % requires a non-empty unit_name', NEW.resource_type;
        END IF;
    ELSE
        NEW.unit_number := NULL;
        NEW.unit_name := NULL;
    END IF;

    -- 5. Enforce Exam Year Rules
    IF v_rt.requires_exam_year THEN
        IF NEW.exam_year IS NULL OR NEW.exam_year < 1990 OR NEW.exam_year > 2050 THEN
            RAISE EXCEPTION 'Resource type % requires a valid exam_year (1990 to 2050)', NEW.resource_type;
        END IF;
    ELSE
        NEW.exam_year := NULL;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_resource_integrity ON public.resources;
CREATE TRIGGER trg_validate_resource_integrity
BEFORE INSERT OR UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.validate_resource_integrity();

-- ----------------------------------------------------------------------------
-- 6. PARTIAL UNIQUE INDEXES & PERFORMANCE OPTIMIZATION
-- ----------------------------------------------------------------------------

-- Enforce ONLY ONE active PUBLISHED SYLLABUS resource per paper
CREATE UNIQUE INDEX IF NOT EXISTS uq_single_published_syllabus_per_paper 
ON public.resources (paper_id) 
WHERE resource_type = 'SYLLABUS' 
  AND publication_status = 'PUBLISHED' 
  AND is_active = true;

-- Enforce ONLY ONE active PYQ resource per paper per exam_year
CREATE UNIQUE INDEX IF NOT EXISTS uq_single_active_pyq_per_year 
ON public.resources (paper_id, exam_year) 
WHERE resource_type = 'PYQ' 
  AND is_active = true 
  AND publication_status != 'ARCHIVED';

-- Composite Hierarchy Indexes
CREATE INDEX IF NOT EXISTS idx_subjects_slug ON public.subjects(slug) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_semesters_lookup ON public.semesters(subject_id, slug) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_papers_lookup ON public.papers(subject_id, semester_id, slug) WHERE is_active = true;

-- Resource Query Acceleration
CREATE INDEX IF NOT EXISTS idx_resources_paper_published ON public.resources(paper_id, resource_type) 
    WHERE is_active = true AND publication_status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_resources_pyq_year ON public.resources(paper_id, exam_year DESC) 
    WHERE resource_type = 'PYQ' AND is_active = true AND publication_status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_resources_unit ON public.resources(paper_id, unit_number ASC) 
    WHERE resource_type IN ('NOTES', 'Q_AND_A') AND is_active = true AND publication_status = 'PUBLISHED';
CREATE INDEX IF NOT EXISTS idx_resource_files_path ON public.resource_files(storage_bucket, storage_path);

-- ----------------------------------------------------------------------------
-- 7. HARDENED SECURITY-DEFINER FUNCTION & RLS POLICIES
-- ----------------------------------------------------------------------------

-- 7.1 Hardened Admin Authorization Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_users
    WHERE user_id = auth.uid() 
      AND is_active = true
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- 7.2 Enable Row Level Security on Application Tables
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_queries ENABLE ROW LEVEL SECURITY;

-- 7.3 Public Read Policies (Only active and published rows)
CREATE POLICY "Public read active resource_types" ON public.resource_types FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active subjects" ON public.subjects FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active semesters" ON public.semesters FOR SELECT USING (is_active = true);
CREATE POLICY "Public read active papers" ON public.papers FOR SELECT USING (is_active = true);
CREATE POLICY "Public read published resources" ON public.resources FOR SELECT 
    USING (is_active = true AND publication_status = 'PUBLISHED');
CREATE POLICY "Public read published resource files" ON public.resource_files FOR SELECT 
    USING (
      EXISTS (
        SELECT 1 FROM public.resources r 
        WHERE r.id = resource_files.resource_id 
          AND r.is_active = true 
          AND r.publication_status = 'PUBLISHED'
      )
    );
CREATE POLICY "Students insert queries" ON public.student_queries FOR INSERT WITH CHECK (true);

-- 7.4 Admin Policies (Gated strictly by public.is_admin())
CREATE POLICY "Admin view self admin_users" ON public.admin_users FOR SELECT TO authenticated 
    USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Admin manage resource_types" ON public.resource_types FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage subjects" ON public.subjects FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage semesters" ON public.semesters FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage papers" ON public.papers FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage resources" ON public.resources FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage resource_files" ON public.resource_files FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin manage student_queries" ON public.student_queries FOR ALL TO authenticated 
    USING (public.is_admin()) WITH CHECK (public.is_admin());

-- ----------------------------------------------------------------------------
-- 8. STORAGE RLS POLICIES (ON storage.objects)
-- ----------------------------------------------------------------------------
-- Drop existing custom policies on storage.objects to ensure a clean run
DROP POLICY IF EXISTS "Admin read storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin update storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete storage objects" ON storage.objects;

-- Recreate storage admin policies (Anonymous access remains completely denied)
CREATE POLICY "Admin read storage objects" ON storage.objects FOR SELECT TO authenticated
    USING (bucket_id = 'academic-resources' AND public.is_admin());
CREATE POLICY "Admin upload storage objects" ON storage.objects FOR INSERT TO authenticated
    WITH CHECK (bucket_id = 'academic-resources' AND public.is_admin());
CREATE POLICY "Admin update storage objects" ON storage.objects FOR UPDATE TO authenticated
    USING (bucket_id = 'academic-resources' AND public.is_admin())
    WITH CHECK (bucket_id = 'academic-resources' AND public.is_admin());
CREATE POLICY "Admin delete storage objects" ON storage.objects FOR DELETE TO authenticated
    USING (bucket_id = 'academic-resources' AND public.is_admin());

-- ----------------------------------------------------------------------------
-- 9. SEED INITIAL CMS RESOURCE TYPES
-- ----------------------------------------------------------------------------
-- SYLLABUS: show_on_paper = false because it renders directly in the primary paper viewer
INSERT INTO public.resource_types 
(type_key, slug, display_name, description, icon, category, applicable_paper_type, requires_unit, requires_exam_year, display_order, show_on_paper, show_in_navbar, is_active)
VALUES
('SYLLABUS', 'syllabus', 'Official Syllabus', 'Complete authoritative syllabus PDF for the paper', '📜', 'CORE', 'BOTH', false, false, 1, false, true, true),
('PYQ', 'previous-year-questions', 'Previous Year Questions', 'Official university semester examination questions', '📝', 'EXAM', 'THEORY', false, true, 2, true, true, true),
('NOTES', 'unit-wise-notes', 'Unit-wise Notes', 'Comprehensive lecture notes organized by syllabus unit', '📚', 'THEORY', 'THEORY', true, false, 3, true, true, true),
('Q_AND_A', 'unit-wise-qna', 'Unit-wise Q&A', 'Selected questions and solutions organized by syllabus unit', '💡', 'THEORY', 'THEORY', true, false, 4, true, true, true),
('STUDY_MATERIAL', 'study-material', 'Study Material', 'Supplementary laboratory and conceptual study documents', '🔬', 'LAB', 'LAB', false, false, 5, true, false, true),
('LAB_MANUAL', 'lab-manuals', 'Lab Manual', 'Official experiment procedures and instructions', '🧪', 'LAB', 'LAB', false, false, 6, true, false, true),
('VIVA_QUESTIONS', 'viva-questions', 'Viva Questions', 'Oral examination questions and answers for practicals', '🗣️', 'LAB', 'LAB', false, false, 7, true, false, true),
('EXPERIMENT_NOTES', 'experiment-notes', 'Experiment Notes', 'Detailed guides for specific practical experiments', '📋', 'LAB', 'LAB', false, false, 8, true, false, true),
('FORMULAE', 'formulae-bank', 'Formulae', 'Derivations and key formula reference summaries', '⚡', 'REFERENCE', 'BOTH', false, false, 9, false, false, true),
('SOLVED_NUMERICAL', 'solved-numericals', 'Solved Numericals', 'Step-by-step solutions to numerical physics problems', '🧮', 'REFERENCE', 'THEORY', false, false, 10, false, false, true),
('OTHER', 'other-resources', 'Other Resources', 'Miscellaneous academic and supplementary files', '📎', 'GENERAL', 'BOTH', false, false, 11, false, false, true)
ON CONFLICT (type_key) DO NOTHING;
