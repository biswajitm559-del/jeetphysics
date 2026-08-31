-- ============================================================================
--  JEETPHYSICS.IN — SUPABASE DATABASE MIGRATION SCHEMA (FREE TIER)
--  Fakir Mohan University (FMU) B.Sc Physics NEP 2020 6-Semester Curriculum
--  Migration File: 20260831_initial_schema.sql
-- ============================================================================

-- 1. ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CREATE SCHEMAS & TABLES

-- 2.1 Semesters Master Table
CREATE TABLE IF NOT EXISTS public.semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sem_number INT NOT NULL UNIQUE CHECK (sem_number BETWEEN 1 AND 6),
    label TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Core Papers Table (15 FMU NEP 2020 Papers)
CREATE TABLE IF NOT EXISTS public.papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_code VARCHAR(20) NOT NULL UNIQUE, -- e.g., 'Paper I', 'Paper XV'
    slug VARCHAR(100) NOT NULL UNIQUE,      -- e.g., 'paper-1-math-physics-1'
    semester_num INT NOT NULL REFERENCES public.semesters(sem_number) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'advanced')),
    description TEXT,
    topics TEXT[],
    progress_percentage INT DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Course Units Table (4 Units per Paper)
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL REFERENCES public.papers(id) ON DELETE CASCADE,
    unit_number INT NOT NULL CHECK (unit_number BETWEEN 1 AND 4),
    unit_title VARCHAR(255) NOT NULL,
    syllabus_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(paper_id, unit_number)
);

-- 2.4 Practical / Lab Components Table
CREATE TABLE IF NOT EXISTS public.lab_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL UNIQUE REFERENCES public.papers(id) ON DELETE CASCADE,
    lab_title VARCHAR(255) NOT NULL,
    lab_syllabus TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Resource Downloads Table
CREATE TABLE IF NOT EXISTS public.resource_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL REFERENCES public.papers(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    resource_type VARCHAR(50) DEFAULT 'pdf' CHECK (resource_type IN ('syllabus', 'notes', 'lab_manual', 'pyq', 'other')),
    file_size_mb NUMERIC(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.6 Previous Year Questions (PYQs) Table
CREATE TABLE IF NOT EXISTS public.pyqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID REFERENCES public.papers(id) ON DELETE SET NULL,
    exam_type VARCHAR(50) NOT NULL CHECK (exam_type IN ('fmu_university', 'jam_physics', 'csir_net', 'gate_physics', 'cuet_pg')),
    exam_year INT NOT NULL CHECK (exam_year BETWEEN 2000 AND 2030),
    title VARCHAR(255) NOT NULL,
    problem_text TEXT NOT NULL,
    solution_text TEXT,
    solution_pdf_url TEXT,
    difficulty VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.7 Formulae Bank Table
CREATE TABLE IF NOT EXISTS public.formulae (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL, -- mechanics, em, quantum, thermal, waves, nuclear, math
    name VARCHAR(255) NOT NULL,
    latex_expression TEXT NOT NULL,
    description TEXT,
    subject_label VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.8 Student Contact & Guidance Queries Table
CREATE TABLE IF NOT EXISTS public.student_queries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    college_name VARCHAR(255),
    query_text TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SUPABASE STORAGE BUCKETS CONFIGURATION
INSERT INTO storage.buckets (id, name, public) VALUES
    ('syllabus-pdfs', 'syllabus-pdfs', true),
    ('pyq-pdfs', 'pyq-pdfs', true),
    ('lab-manuals', 'lab-manuals', true),
    ('handwritten-notes', 'handwritten-notes', true)
ON CONFLICT (id) DO NOTHING;

-- 4. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulae ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_queries ENABLE ROW LEVEL SECURITY;

-- 4.1 Public READ Policies (Allow free access to students for curriculum materials)
CREATE POLICY "Public Read Semesters" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Public Read Papers" ON public.papers FOR SELECT USING (true);
CREATE POLICY "Public Read Units" ON public.units FOR SELECT USING (true);
CREATE POLICY "Public Read Lab Components" ON public.lab_components FOR SELECT USING (true);
CREATE POLICY "Public Read Resource Downloads" ON public.resource_downloads FOR SELECT USING (true);
CREATE POLICY "Public Read PYQs" ON public.pyqs FOR SELECT USING (true);
CREATE POLICY "Public Read Formulae" ON public.formulae FOR SELECT USING (true);

-- 4.2 Student Queries Policies (Public can insert questions, only admin can view/manage)
CREATE POLICY "Students Insert Queries" ON public.student_queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Manage Queries" ON public.student_queries FOR ALL TO authenticated USING (true);

-- 4.3 Admin WRITE Policies (Only authenticated SSB Lecturers / Admin users can insert/update syllabus data)
CREATE POLICY "Admin Write Papers" ON public.papers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Units" ON public.units FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Labs" ON public.lab_components FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Downloads" ON public.resource_downloads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write PYQs" ON public.pyqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Formulae" ON public.formulae FOR ALL TO authenticated USING (true);

-- 5. INITIAL SEED DATA (Fakir Mohan University NEP 2020 15 Core Papers)

INSERT INTO public.semesters (sem_number, label, description) VALUES
    (1, 'Semester I', 'Foundations: Mathematical Physics-I & Mechanics'),
    (2, 'Semester II', 'Fields & Functions: Electricity, Magnetism & Math Physics-II'),
    (3, 'Semester III', 'Optics & Thermal: Waves, Optics, Math Physics-III & Thermal Physics'),
    (4, 'Semester IV', 'Instruments & Nuclear: Analog Systems, Basic Instrumentation & Nuclear Physics'),
    (5, 'Semester V', 'Modern & Digital: Digital Systems, Quantum Mechanics & Solid State Physics'),
    (6, 'Semester VI', 'Advanced Fields: Electromagnetic Theory & Statistical Mechanics')
ON CONFLICT (sem_number) DO NOTHING;

INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, topics, progress_percentage) VALUES
    ('Paper I', 'paper-1-math-physics-1', 1, 'Paper I: Mathematical Physics-I', 'hard', 'Calculus, vector differentiation & integration, orthogonal curvilinear coordinates, and ODEs.', ARRAY['Vector Calculus', 'Curvilinear Coordinates', 'Integral Theorems', 'Differential Equations'], 75),
    ('Paper II', 'paper-2-mechanics', 1, 'Paper II: Mechanics', 'medium', 'Rotational dynamics, elasticity, fluid motion, central force gravitation, oscillations, and Special Relativity.', ARRAY['Rotational Dynamics', 'Elasticity & Fluids', 'Central Forces', 'Special Relativity'], 80),
    ('Paper III', 'paper-3-em', 2, 'Paper III: Electricity and Magnetism', 'hard', 'Electrostatics, Gauss law, Laplace equation, magnetostatics, Biot-Savart & Ampere laws, EM induction, AC circuits.', ARRAY['Electrostatics', 'Magnetostatics', 'EM Induction', 'AC Circuits'], 70),
    ('Paper IV', 'paper-4-math-physics-2', 2, 'Paper IV: Mathematical Physics-II', 'hard', 'Fourier series, special functions (Legendre, Bessel, Hermite, Laguerre), and PDEs of physics.', ARRAY['Fourier Series', 'Frobenius Method', 'Special Functions', 'Partial Differential Equations'], 65),
    ('Paper V', 'paper-5-waves-optics', 3, 'Paper V: Waves and Optics', 'medium', 'Wave superposition, interference (wavefront & amplitude), Fraunhofer & Fresnel diffraction, polarization, and lasers.', ARRAY['Superposition & Beats', 'Interference', 'Diffraction', 'Polarization & Lasers'], 85),
    ('Paper VI', 'paper-6-math-physics-3', 3, 'Paper VI: Mathematical Physics-III', 'advanced', 'Complex variables, Cauchy-Riemann equations, contour integration, Residue Theorem, Fourier & Laplace Transforms, Tensors.', ARRAY['Complex Analysis', 'Contour Integration', 'Integral Transforms', 'Tensor Algebra'], 60),
    ('Paper VII', 'paper-7-thermal-physics', 3, 'Paper VII: Thermal Physics', 'medium', 'Laws of thermodynamics, Carnot cycle, entropy, thermodynamic potentials (G, F, H, U), Maxwell relations, Kinetic Theory.', ARRAY['Thermodynamic Laws', 'Entropy & Carnot Cycle', 'Maxwell Relations', 'Kinetic Theory of Gases'], 75),
    ('Paper VIII', 'paper-8-analog-systems', 4, 'Paper VIII: Analog Systems and Applications', 'medium', 'Semiconductor diodes, BJT biasing, h-parameters, FET/MOSFET, Operational Amplifiers (Op-Amps), Oscillators.', ARRAY['Diode Circuits', 'Transistor Amplifiers', 'Op-Amp Applications', 'Feedback Oscillators'], 72),
    ('Paper IX', 'paper-9-basic-instrumentation', 4, 'Paper IX: Basic Instrumentation Skills', 'medium', 'Measurement standards, error analysis, DC & AC meters, CRO, Signal generators, Transducers.', ARRAY['Measurement Errors', 'Multimeters & Bridges', 'CRO & Signal Generators', 'Transducers & Sensors'], 80),
    ('Paper X', 'paper-10-nuclear-particle-physics', 4, 'Paper X: Nuclear and Particle Physics', 'advanced', 'Nuclear properties, binding energy, Liquid Drop & Shell models, radioactive decay, accelerators, Standard Model.', ARRAY['Nuclear Structure', 'Nuclear Models', 'Radioactivity & Decays', 'Detectors & Particle Physics'], 65),
    ('Paper XI', 'paper-11-digital-systems', 5, 'Paper XI: Digital Systems and Applications', 'medium', 'Number systems, Boolean algebra, De Morgan laws, Adders, MUX, Flip-Flops, Counters, Microprocessor 8085.', ARRAY['Boolean Algebra', 'Combinational Circuits', 'Sequential Logic', 'Microprocessor 8085'], 75),
    ('Paper XII', 'paper-12-quantum-mechanics', 5, 'Paper XII: Quantum Mechanics and Applications', 'advanced', 'Schrödinger wave equation, operators, 1D potential wells, barrier tunneling, quantum harmonic oscillator, Hydrogen atom.', ARRAY['Wave Functions & Operators', '1D Potentials & Tunneling', 'Harmonic Oscillator', 'Hydrogen Atom'], 70),
    ('Paper XIII', 'paper-13-solid-state-physics', 5, 'Paper XIII: Solid State Physics', 'hard', 'Crystal structures, Bravais lattices, XRD & Bragg law, phonons, Free Electron Model, Kronig-Penney band theory, Superconductivity.', ARRAY['Crystallography & XRD', 'Lattice Vibrations', 'Band Theory of Solids', 'Superconductivity'], 65),
    ('Paper XIV', 'paper-14-electromagnetic-theory', 6, 'Paper XIV: Electromagnetic Theory', 'advanced', 'Maxwell field equations, displacement current, Poynting vector, EM waves in vacuum/media, reflection/refraction, waveguides.', ARRAY['Maxwell Equations', 'EM Wave Propagation', 'Reflection & Refraction', 'Waveguides & Radiation'], 70),
    ('Paper XV', 'paper-15-statistical-mechanics', 6, 'Paper XV: Statistical Mechanics', 'advanced', 'Microcanonical, Canonical & Grand Canonical Ensembles, Partition Function Z, MB, BE & FD Statistics, Blackbody radiation, BEC.', ARRAY['Ensemble Theory', 'Partition Function', 'Bose-Einstein Statistics', 'Fermi-Dirac Statistics'], 60)
ON CONFLICT (paper_code) DO NOTHING;
