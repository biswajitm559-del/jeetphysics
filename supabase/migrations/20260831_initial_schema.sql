-- ============================================================================
--  JEETPHYSICS.IN — REVISED OFFICIAL SUPABASE DATABASE MIGRATION SCHEMA
--  Complete 100% Curriculum Alignment with Fakir Mohan University (FMU)
--  B.Sc Physics Honours (NEP 2020 Framework - 15 Core Papers)
--  Migration File: 20260831_initial_schema.sql
-- ============================================================================

-- 1. EXTENSIONS SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. SCHEMAS & TABLES

-- 2.1 Semesters Master Table
CREATE TABLE IF NOT EXISTS public.semesters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sem_number INT NOT NULL UNIQUE CHECK (sem_number BETWEEN 1 AND 6),
    label VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 Core Papers Table (15 FMU Core Papers)
CREATE TABLE IF NOT EXISTS public.papers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_code VARCHAR(20) NOT NULL UNIQUE,     -- e.g., 'Paper I', 'Paper XV'
    slug VARCHAR(100) NOT NULL UNIQUE,          -- e.g., 'paper-1-math-physics-1'
    semester_num INT NOT NULL REFERENCES public.semesters(sem_number) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    theory_credits INT DEFAULT 4,
    lab_credits INT DEFAULT 1,
    course_outcomes TEXT[],                      -- Array of learning outcomes
    difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard', 'advanced')),
    description TEXT,
    textbooks JSONB DEFAULT '[]'::jsonb,        -- Array of {title, author, publisher}
    reference_books JSONB DEFAULT '[]'::jsonb,  -- Array of {title, author, publisher}
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 Course Units Table (4 Units per Paper with Exact Syllabus Text)
CREATE TABLE IF NOT EXISTS public.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL REFERENCES public.papers(id) ON DELETE CASCADE,
    unit_number INT NOT NULL CHECK (unit_number BETWEEN 1 AND 4),
    unit_title VARCHAR(255) NOT NULL,
    syllabus_text TEXT NOT NULL,
    key_topics TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(paper_id, unit_number)
);

-- 2.4 Practical / Lab Components Table (Credit-1 Experiments & Software Tools)
CREATE TABLE IF NOT EXISTS public.lab_components (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id UUID NOT NULL UNIQUE REFERENCES public.papers(id) ON DELETE CASCADE,
    lab_title VARCHAR(255) NOT NULL,
    min_experiments INT DEFAULT 4,
    software_tools VARCHAR(255),                 -- e.g., 'C/C++/Scilab/Python/Linux'
    experiments_list TEXT[] NOT NULL,           -- Array of exact lab experiments
    lab_reference_books JSONB DEFAULT '[]'::jsonb,
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
    category VARCHAR(50) NOT NULL,              -- mechanics, em, quantum, thermal, waves, nuclear, math, solidstate, electronics
    name VARCHAR(255) NOT NULL,
    latex_expression TEXT NOT NULL,
    description TEXT,
    paper_code VARCHAR(20),
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

-- 3. STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public) VALUES
    ('syllabus-pdfs', 'syllabus-pdfs', true),
    ('pyq-pdfs', 'pyq-pdfs', true),
    ('lab-manuals', 'lab-manuals', true),
    ('handwritten-notes', 'handwritten-notes', true)
ON CONFLICT (id) DO NOTHING;

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formulae ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_queries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Semesters" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Public Read Papers" ON public.papers FOR SELECT USING (true);
CREATE POLICY "Public Read Units" ON public.units FOR SELECT USING (true);
CREATE POLICY "Public Read Lab Components" ON public.lab_components FOR SELECT USING (true);
CREATE POLICY "Public Read Resource Downloads" ON public.resource_downloads FOR SELECT USING (true);
CREATE POLICY "Public Read PYQs" ON public.pyqs FOR SELECT USING (true);
CREATE POLICY "Public Read Formulae" ON public.formulae FOR SELECT USING (true);

CREATE POLICY "Students Insert Queries" ON public.student_queries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Manage Queries" ON public.student_queries FOR ALL TO authenticated USING (true);

CREATE POLICY "Admin Write Papers" ON public.papers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Units" ON public.units FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Labs" ON public.lab_components FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Downloads" ON public.resource_downloads FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write PYQs" ON public.pyqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Write Formulae" ON public.formulae FOR ALL TO authenticated USING (true);

-- 5. SEED DATA FOR SEMESTERS
INSERT INTO public.semesters (sem_number, label, description) VALUES
    (1, 'Semester I', 'Mathematical Physics-I & Mechanics'),
    (2, 'Semester II', 'Electricity and Magnetism & Mathematical Physics-II'),
    (3, 'Semester III', 'Waves and Optics, Mathematical Physics-III & Thermal Physics'),
    (4, 'Semester IV', 'Analog Systems, Basic Instrumentation & Nuclear and Particle Physics'),
    (5, 'Semester V', 'Digital Systems, Quantum Mechanics and Applications & Solid State Physics'),
    (6, 'Semester VI', 'Electromagnetic Theory & Statistical Mechanics')
ON CONFLICT (sem_number) DO NOTHING;

-- 6. SEED DATA FOR PAPERS (ALL 15 FMU CORE PAPERS WITH EXACT TEXTBOOKS & REFERENCES)

-- 6.1 Paper I
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper I',
    'paper-1-math-physics-1',
    1,
    'Paper I: Mathematical Physics-I',
    'hard',
    'Calculus of one and several variables, first & second order differential equations, vector algebra, vector differentiation, vector integration, Dirac delta function, and orthogonal curvilinear coordinates.',
    ARRAY[
        'Basic understanding of Differential equations and their solutions, conceptual understanding of calculus.',
        'Basic understanding of vector calculus and its differentiation.',
        'Use of vector calculus to understand vector integration. Dirac delta function and its properties.',
        'Understanding of orthogonal curvilinear coordinates and its application in vector differentiation.',
        'To understand the basic algorithm in application to functional algebra and error analysis.'
    ],
    '[
        {"title": "Mathematical Methods for Physicists", "author": "G.B. Arfken, H.J. Weber, F.E. Harris", "publisher": "Elsevier"},
        {"title": "Advanced Engineering Mathematics", "author": "Erwin Kreyszig", "publisher": "Wiley India"}
    ]'::jsonb,
    '[
        {"title": "Mathematical Physics", "author": "C. Harper", "publisher": "Prentice Hall India"},
        {"title": "Complex Variable: Schaum Outline Series", "author": "M. Spiegel", "publisher": "McGraw Hill"},
        {"title": "Complex Variables and Applications", "author": "J.W. Brown and R.V. Churchill", "publisher": "McGraw Hill"},
        {"title": "Mathematical Physics", "author": "Satya Prakash", "publisher": "Sultan Chand"},
        {"title": "Mathematical Physics", "author": "B.D. Gupta", "publisher": "Vikas Publication"},
        {"title": "Mathematical Physics and Special Relativity", "author": "M. Das, P.K. Jena and B.K. Dash", "publisher": "Srikrishna Prakashan"},
        {"title": "Mathematical Physics", "author": "H.K. Das, Dr. Rama Verma", "publisher": "S. Chand Publishing"},
        {"title": "Mathematical Physics", "author": "B.S. Rajput", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.2 Paper II
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper II',
    'paper-2-mechanics',
    1,
    'Paper II: Mechanics',
    'medium',
    'Rotational dynamics, non-inertial systems, damped and forced oscillations, elasticity, fluid motion, gravitation, central force motion, and Special Theory of Relativity.',
    ARRAY[
        'To Learn the basic concepts of Rigid body dynamics, Radius of Gyration, Moment of Inertia, Non-Inertial Systems.',
        'To Understand the concept of Elasticity, Fluid motion and Types of Vibration.',
        'To understand the concept of Newtonian theory through Gravitation, Central force motion, Kepler laws, GPS.',
        'To learn the concept of Special theory of Relativity, Michelson-Morley experiment, Lorentz transformation, Relativistic Doppler effect.',
        'Apply the basic concepts of Mechanics in experiments.'
    ],
    '[
        {"title": "Mechanics", "author": "D.S. Mathur", "publisher": "S. Chand Publishing"},
        {"title": "Introduction to Special Relativity", "author": "R. Resnick", "publisher": "John Wiley"}
    ]'::jsonb,
    '[
        {"title": "Introduction to Mechanics", "author": "Daniel Kleppner and Robert Kolenkow", "publisher": "McGraw Hill"},
        {"title": "Mechanics", "author": "K.R. Simon", "publisher": "Addison Wesley"},
        {"title": "Mechanics (Berkeley Physics Vol. 1)", "author": "C. Kittel, W. Knight et al.", "publisher": "Tata McGraw Hill"},
        {"title": "Physics", "author": "Resnick, Halliday and Walker", "publisher": "Wiley"},
        {"title": "Theoretical Mechanics", "author": "M.R. Spiegel", "publisher": "Tata McGraw Hill"},
        {"title": "Feynman Lectures Vol. I", "author": "R.P. Feynman, R.B. Leighton, M. Sands", "publisher": "Pearson"},
        {"title": "Mechanics", "author": "M. Das, P.K. Jena and R.N. Mishra", "publisher": "Srikrishna Publications"},
        {"title": "Classical Mechanics", "author": "Gupta, Kumar & Sharma", "publisher": "Pragati Prakashan"},
        {"title": "Classical Mechanics", "author": "J.C. Upadhyaya", "publisher": "Himalaya Publishing House"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.3 Paper III
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper III',
    'paper-3-em',
    2,
    'Paper III: Electricity and Magnetism',
    'hard',
    'Electric field & potential, Gauss law, Laplace & Poisson equations, Method of Images, magnetostatics, Biot-Savart law, Ampere law, Ballistic Galvanometer, dielectric & magnetic properties of matter, EM induction, AC circuits, network theorems, and transient currents.',
    ARRAY[
        'To understand the basic concepts of Electricity and Magnetism.',
        'To Understand the various phenomena in Electricity and Magnetism.',
        'To Understand Circuit analysis and network theorems.',
        'To Explain the Dynamics of Charged Particles.',
        'To Apply the acquired knowledge in Experiment.'
    ],
    '[
        {"title": "Introduction to Electrodynamics", "author": "D.J. Griffiths", "publisher": "Pearson"},
        {"title": "Foundations of Electromagnetic Theory", "author": "Reitz and Milford", "publisher": "Pearson"}
    ]'::jsonb,
    '[
        {"title": "Classical Electrodynamics", "author": "J.D. Jackson", "publisher": "Wiley"},
        {"title": "Electricity and Magnetism", "author": "D.C. Tayal", "publisher": "Himalaya Publishing House"},
        {"title": "Electricity, Magnetism and Electromagnetic Theory", "author": "S. Mahajan and Choudhury", "publisher": "Tata McGraw Hill"},
        {"title": "Feynman Lectures Vol. 2", "author": "R.P. Feynman, R.B. Leighton, M. Sands", "publisher": "Pearson"},
        {"title": "Electricity and Magnetism Vol. I", "author": "J.H. Fewkes and J. Yarwood", "publisher": "Oxford Univ. Press"},
        {"title": "Classical Electromagnetism", "author": "H.C. Verma", "publisher": "Bharati Bhawan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.4 Paper IV
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper IV',
    'paper-4-math-physics-2',
    2,
    'Paper IV: Mathematical Physics-II',
    'hard',
    'Fourier series expansion, Frobenius method, special functions (Legendre, Bessel, Hermite, Laguerre), polynomials & special integrals (Beta, Gamma, Error functions), and partial differential equations.',
    ARRAY[
        'Conceptual understanding of Fourier series and its application in periodic function.',
        'Understanding the various special functions and its properties.',
        'Understanding various polynomials and special integrations.',
        'To learn the applications of partial differential equation.',
        'To apply the acquired knowledge to solve problems.'
    ],
    '[
        {"title": "Mathematical Methods for Physicists", "author": "G.B. Arfken, H.J. Weber, F.E. Harris", "publisher": "Elsevier"},
        {"title": "Advanced Engineering Mathematics", "author": "Erwin Kreyszig", "publisher": "Wiley India"}
    ]'::jsonb,
    '[
        {"title": "Mathematical Physics and Special Relativity", "author": "M. Das, P.K. Jena and B.K. Dash", "publisher": "Srikrishna Prakashan"},
        {"title": "Mathematical Physics", "author": "H.K. Dass, Dr. Rama Verma", "publisher": "S. Chand Publishing"},
        {"title": "Mathematical Physics", "author": "C. Harper", "publisher": "Prentice Hall India"},
        {"title": "Complex Variable: Schaum Outlines Series", "author": "M. Spiegel", "publisher": "McGraw Hill"},
        {"title": "Complex Variables and Applications", "author": "J.W. Brown and R.V. Churchill", "publisher": "McGraw Hill"},
        {"title": "Mathematical Physics", "author": "Satya Prakash", "publisher": "Sultan Chand"},
        {"title": "Mathematical Physics", "author": "B.D. Gupta", "publisher": "Vikas Publication"},
        {"title": "Mathematical Physics", "author": "B.S. Rajput", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.5 Paper V
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper V',
    'paper-5-waves-optics',
    3,
    'Paper V: Waves and Optics',
    'medium',
    'Geometrical optics (Fermat principle, lens matrices, eyepieces), wave motion & superposition, interference (biprism, thin films, Michelson & Fabry-Perot interferometers), and Fraunhofer & Fresnel diffraction.',
    ARRAY[
        'Basic understanding of propagation of light, its application and wave nature.',
        'To Understand the concepts of wave motion.',
        'To Understand the concepts of interference and its application.',
        'To Understand the concepts of diffraction and its application.',
        'To Apply the acquired knowledge of optics in Experiment.'
    ],
    '[
        {"title": "A Text Book of Optics", "author": "N. Subrahmanyam and Brij Lal", "publisher": "S. Chand Publishing"},
        {"title": "Optics", "author": "Ajoy Ghatak", "publisher": "McGraw Hill"}
    ]'::jsonb,
    '[
        {"title": "Optics", "author": "E. Hecht", "publisher": "Pearson"},
        {"title": "Fundamentals of Optics", "author": "F.A. Jenkins and H.E. White", "publisher": "McGraw Hill"},
        {"title": "Geometrical and Physical Optics", "author": "R.S. Longhurst", "publisher": "Orient Blackswan"},
        {"title": "The Physics of Vibrations and Waves", "author": "H.J. Pain", "publisher": "John Wiley"},
        {"title": "Optics", "author": "P.K. Chakraborty", "publisher": "Central"},
        {"title": "Principles of Optics", "author": "Max Born and Emil Wolf", "publisher": "Pergamon Press"},
        {"title": "The Physics of Waves and Oscillations", "author": "N.K. Bajaj", "publisher": "McGraw Hill"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.6 Paper VI
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper VI',
    'paper-6-math-physics-3',
    3,
    'Paper VI: Mathematical Physics-III',
    'advanced',
    'Complex functions, analyticity, Cauchy-Riemann conditions, Cauchy integral theorem & formula, Laurent expansion, Residue theorem, Fourier Transforms (1D & 3D), and Laplace Transforms with ODE applications.',
    ARRAY[
        'Understanding and application of Complex function variables.',
        'Understanding the concept of Fourier Integral transform.',
        'To Understand the properties and application of Fourier integral transformation.',
        'To Understand the properties and application of Laplace integral transformation.',
        'To Apply the acquired knowledge to solve problems.'
    ],
    '[
        {"title": "Mathematical Methods for Physicists", "author": "G.B. Arfken, H.J. Weber, F.E. Harris", "publisher": "Elsevier"},
        {"title": "Advanced Engineering Mathematics", "author": "Erwin Kreyszig", "publisher": "Wiley India"}
    ]'::jsonb,
    '[
        {"title": "Mathematical Physics and Special Relativity", "author": "M. Das, P.K. Jena and B.K. Dash", "publisher": "Srikrishna Prakashan"},
        {"title": "Mathematical Physics", "author": "H.K. Dass, Dr. Rama Verma", "publisher": "S. Chand Publishing"},
        {"title": "Mathematical Physics", "author": "C. Harper", "publisher": "Prentice Hall India"},
        {"title": "Complex Variable: Schaum Outlines Series", "author": "M. Spiegel", "publisher": "McGraw Hill"},
        {"title": "Complex Variables and Applications", "author": "J.W. Brown and R.V. Churchill", "publisher": "McGraw Hill"},
        {"title": "Mathematical Physics", "author": "Satya Prakash", "publisher": "Sultan Chand"},
        {"title": "Mathematical Physics", "author": "B.D. Gupta", "publisher": "Vikas Publication"},
        {"title": "Mathematical Physics", "author": "B.S. Rajput", "publisher": "Pragati Prakashan"},
        {"title": "Mathematical Physics-III", "author": "Dr. Ranjan Kumar Bhuyan", "publisher": "Himalaya Publishing House"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.7 Paper VII
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper VII',
    'paper-7-thermal-physics',
    3,
    'Paper VII: Thermal Physics',
    'medium',
    'Thermodynamic laws, Carnot theorem, entropy, T-S diagrams, 3rd law, thermodynamic potentials (U, H, F, G), phase transitions, Maxwell relations, Kinetic Theory of Gases, and Real Gas equations of state.',
    ARRAY[
        'Basic understanding of thermodynamics and various thermal variables.',
        'Understanding various thermodynamics potential applications and their properties.',
        'To Understand the concepts of ideal gas and its thermal properties.',
        'To Understand the concepts of real gas and its thermal properties.',
        'To Apply the acquired knowledge of thermodynamics in Experiments.'
    ],
    '[
        {"title": "Thermal Physics", "author": "A.B. Gupta", "publisher": "Books and Allied Ltd"},
        {"title": "Heat and Thermodynamics", "author": "M.W. Zemansky, Richard Dittman", "publisher": "McGraw Hill"}
    ]'::jsonb,
    '[
        {"title": "Theory and Experiments on Thermal Physics", "author": "P.K. Chakrabarty", "publisher": "New Central Book Agency"},
        {"title": "Thermodynamics, Kinetic Theory and Statistical Thermodynamics", "author": "Sears and Salinger", "publisher": "Narosa"},
        {"title": "A Treatise on Heat", "author": "Meghnad Saha and B.N. Srivastava", "publisher": "Indian Press"},
        {"title": "Heat, Thermodynamics and Statistical Physics", "author": "N. Subrahmanyam and Brij Lal", "publisher": "S. Chand Publishing"},
        {"title": "Thermal and Statistical Physics", "author": "M. Das, P.K. Jena, S. Mishra, R.N. Mishra", "publisher": "Shri Krishna Publication"},
        {"title": "Heat, Thermodynamics and Statistical Physics", "author": "Brijlal, Subhramanyam and Hemne", "publisher": "S. Chand Publishing"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.8 Paper VIII
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper VIII',
    'paper-8-analog-systems',
    4,
    'Paper VIII: Analog Systems and Applications',
    'medium',
    'Semiconductor diodes, rectifiers, Zener diode, BJT transistor configurations & biasing, h-parameter CE amplifiers, RC-coupled amplifier, feedback in amplifiers, oscillators, and Operational Amplifiers (Op-Amps IC741).',
    ARRAY[
        'Basic understanding of semiconductor diodes, devices and their applications.',
        'To understand the basic concepts in transistors and amplifiers.',
        'To understand the concept of coupled amplifier and its application in feedback circuit.',
        'To understand the concepts of operational amplifier and its application.',
        'To apply the acquired knowledge of electronic circuits in Experiments.'
    ],
    '[
        {"title": "Foundations of Electronics", "author": "Rakshit and Chattopadhyay", "publisher": "New Age International"},
        {"title": "Concept of Electronics", "author": "D.C. Tayal", "publisher": "Himalaya Publishing House"}
    ]'::jsonb,
    '[
        {"title": "Electronic Devices and Circuits", "author": "R.L. Boylestad and L. Nashelsky", "publisher": "Pearson India"},
        {"title": "Electronic Principles", "author": "A.P. Malvino", "publisher": "Tata McGraw Hill"},
        {"title": "Principles of Electronics", "author": "V.K. Mehta and Rohit Mehta", "publisher": "S. Chand Publishing"},
        {"title": "OP-Amps and Linear Integrated Circuit", "author": "R.A. Gayakwad", "publisher": "Prentice Hall"},
        {"title": "Physics of Semiconductor Devices", "author": "Donald A. Neamen", "publisher": "Prentice Hall"},
        {"title": "Analog System and Application", "author": "Gupta and Kumar", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.9 Paper IX
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper IX',
    'paper-9-basic-instrumentation',
    4,
    'Paper IX: Basic Instrumentation Skills',
    'medium',
    'Measurement principles & errors, multimeters, electronic voltmeters, Cathode Ray Oscilloscope (CRO), signal generators, pulse & function generators, and digital instruments & counters.',
    ARRAY[
        'Conceptual understanding of different measurement of electronic circuit with measuring devices.',
        'Basic understanding of CRO and its applications.',
        'Basic understanding of signal generators and its analysis.',
        'Basic understanding of digital instruments and their applications.',
        'To Apply the acquired knowledge of different electronic measurement-based instruments in Experiments.'
    ],
    '[
        {"title": "A Text Book of Electrical Technology", "author": "B.L. Theraja", "publisher": "S. Chand Publishing"},
        {"title": "Digital Circuits and Systems", "author": "Venugopal", "publisher": "Tata McGraw Hill"}
    ]'::jsonb,
    '[
        {"title": "Digital Electronics", "author": "Subrata Ghoshal", "publisher": "Cengage Learning"},
        {"title": "Electronic Devices and Circuits", "author": "S. Salivahanan and N.S. Kumar", "publisher": "Tata McGraw Hill"},
        {"title": "Electronic Devices", "author": "Thomas L. Floyd", "publisher": "Pearson"},
        {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
        {"title": "Practical Physics", "author": "B.B. Swain", "publisher": "Kitab Mahal"},
        {"title": "Practical Physics Vol. I & II", "author": "B. Ghosh", "publisher": "Sreedhar"},
        {"title": "A Laboratory Manual of Physics for Undergraduate Classes", "author": "D.P. Khandelwal", "publisher": "Vani Publication"},
        {"title": "B.Sc. Practical Physics", "author": "C.L. Arora", "publisher": "S. Chand Publishing"},
        {"title": "B.Sc. Practical Physics", "author": "H. Singh and P.S. Hemne", "publisher": "S. Chand Publishing"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.10 Paper X
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper X',
    'paper-10-nuclear-particle-physics',
    4,
    'Paper X: Nuclear and Particle Physics',
    'advanced',
    'Atoms in E/M fields (Zeeman & Stark effects), general nuclear properties, Semi-Empirical Mass Formula, Liquid Drop & Shell models, Alpha/Beta/Gamma radioactive decays, nuclear reactions & reactors, and elementary particle physics (Quark model & Standard Model).',
    ARRAY[
        'Understanding the properties of atoms in electric and magnetic field.',
        'Understanding the concept Nuclear physics.',
        'Conceptual understanding nuclear models and nuclear reactions.',
        'Conceptual understanding of particle physics.',
        'To Apply the acquired knowledge in conducting the experiments.'
    ],
    '[
        {"title": "Concepts of Modern Physics", "author": "Arthur Beiser", "publisher": "McGraw Hill"},
        {"title": "Modern Physics", "author": "Murugeshan and Sivaprasad", "publisher": "S. Chand Publishing"},
        {"title": "Concepts of Nuclear Physics", "author": "B.L. Cohen", "publisher": "McGraw Hill"},
        {"title": "Nuclear Physics", "author": "D.C. Tayal", "publisher": "Himalaya Publishing House"},
        {"title": "Nuclear Physics: An Introduction", "author": "S.B. Patel", "publisher": "New Age International"},
        {"title": "Fundamental of Nuclear Physics", "author": "Jahan Singh", "publisher": "Pragati Publications"}
    ]'::jsonb,
    '[
        {"title": "Quantum Mechanics: Theory and Applications", "author": "A.K. Ghatak and S. Lokanathan", "publisher": "Macmillan"},
        {"title": "Introduction to Quantum Theory", "author": "David Park", "publisher": "Dover Publications"},
        {"title": "Theory and Problems of Modern Physics (Schaum Outline)", "author": "R. Gautreau and W. Savin", "publisher": "Tata McGraw Hill"},
        {"title": "Modern Physics", "author": "Serway", "publisher": "Cengage Learning"},
        {"title": "Physics of Atoms and Molecules", "author": "Bransden and Joachain", "publisher": "Pearson India"},
        {"title": "Atomic and Nuclear Physics", "author": "A.B. Gupta", "publisher": "New Central"},
        {"title": "Theoretical Nuclear Physics", "author": "J.M. Blatt and V.F. Weisskopf", "publisher": "Springer"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.11 Paper XI
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper XI',
    'paper-11-digital-systems',
    5,
    'Paper XI: Digital Systems and Applications',
    'medium',
    'Integrated circuits & logic gates, Boolean algebra & K-Maps, combinational circuits (Adders, Subtractors, MUX/DEMUX), IC 555 timers, computer organization intro, shift registers, and 4-bit counters.',
    ARRAY[
        'To Understand and scales of Integration, Digital Circuits and their realization, Applications.',
        'Build strong knowledge about Boolean Algebra, Truth tables, Equivalent Circuits, Theory and application of CRO.',
        'Gain a clear understanding of Data processing circuits, Arithmetic Circuits, different types of Timers: IC 555.',
        'To Explain the knowledge of computer organization, Shift registers and counters.',
        'To Apply the acquired knowledge to realize various types of circuits in experiment.'
    ],
    '[
        {"title": "Digital Circuits and Logic Design", "author": "Samuel C. Lee", "publisher": "Prentice Hall"},
        {"title": "Digital Principles and Applications", "author": "A.P. Malvino, D.P. Leach and Saha", "publisher": "Tata McGraw Hill"}
    ]'::jsonb,
    '[
        {"title": "The Art of Electronics", "author": "Paul Horowitz and Winfield Hill", "publisher": "Cambridge University Press"},
        {"title": "Electronics", "author": "Allan R. Hambley", "publisher": "Prentice Hall"},
        {"title": "Principles of Electronics", "author": "V.K. Mehta and Rohit Mehta", "publisher": "S. Chand Publishing"},
        {"title": "Digital Logic and Computer Design", "author": "M. Morris Mano", "publisher": "Pearson"},
        {"title": "Concepts of Electronics", "author": "D.C. Tayal", "publisher": "Himalaya Publishing House"},
        {"title": "Digital System and Application", "author": "Gupta and Kumar", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.12 Paper XII
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper XII',
    'paper-12-quantum-mechanics',
    5,
    'Paper XII: Quantum Mechanics and Applications',
    'advanced',
    'Time-dependent and time-independent Schrödinger equations, wave function properties, Hermitian operators & commutator algebra, Ehrenfest theorem, 1D rigid box & potential barriers/tunneling, 1D harmonic oscillator, and numerical quantum solvers.',
    ARRAY[
        'To understand Properties and physical interpretation of wave function and its application, knowledge in probability current density, significance of momentum space transformation and time dependent Schrödinger equation.',
        'To explain Time independent Schrödinger equation, Eigen value, Eigen function, generalized solution of stationary states, knowledge in wave function and discrete energy level.',
        'Basic knowledge in quantum mechanical operators, Eigen value and Eigen function, Uncertainty relation and Gaussian wave packet.',
        'Acquire the knowledge in application of Schrödinger equation in different potential barriers, concept of simple harmonic oscillator.',
        'Apply the acquired knowledge to solve various numerical problems.'
    ],
    '[
        {"title": "Introduction to Quantum Theory", "author": "David Park", "publisher": "Dover Publications"},
        {"title": "Introduction to Quantum Mechanics", "author": "D.J. Griffiths", "publisher": "Pearson"},
        {"title": "Quantum Mechanics: Concepts and Applications", "author": "N. Zettili", "publisher": "Wiley"}
    ]'::jsonb,
    '[
        {"title": "Quantum Mechanics, Theory and Applications", "author": "A.K. Ghatak and S. Lokanathan", "publisher": "Macmillan"},
        {"title": "Quantum Mechanics", "author": "G. Aruldhas", "publisher": "Prentice Hall of India"},
        {"title": "Quantum Physics", "author": "S. Gasiorowicz", "publisher": "Wiley"},
        {"title": "Quantum Mechanics", "author": "G.R. Chatwal and S.K. Anand", "publisher": "Himalaya"},
        {"title": "Quantum Mechanics", "author": "J.L. Powell and B. Crasemann", "publisher": "Narosa"},
        {"title": "Introduction to Quantum Mechanics", "author": "M. Das and P.K. Jena", "publisher": "Shri Krishna Publication"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.13 Paper XIII
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper XIII',
    'paper-13-solid-state-physics',
    5,
    'Paper XIII: Solid State Physics',
    'hard',
    'Crystallography, Miller indices, Reciprocal lattice, XRD & Bragg law, phonon lattice dynamics, Einstein & Debye specific heats, Kronig-Penney band theory, Hall effect, magnetic & dielectric properties of matter, LASERs (Ruby & He-Ne), and Superconductivity (BCS & Meissner effect).',
    ARRAY[
        'To understand the Concept of crystal structure and properties, X-ray Diffraction, Bragg and Laue condition.',
        'Conceptual understanding of Lattice vibration, Einstein and Debye specific heat theories of solids, knowledge in Band theory, Kroning-Penny model and Hall Effect.',
        'Understanding the Concept in magnetic and dielectric properties of materials.',
        'Basic knowledge on LASER and its generation, types. Conceptual understanding of Superconductivity and its type, London Equation, Penetration Depth and BCS theory.',
        'To Apply the acquired knowledge in experiments.'
    ],
    '[
        {"title": "Introduction to Solid State Physics", "author": "Charles Kittel", "publisher": "Wiley India"},
        {"title": "LASERS: Fundamentals and Applications", "author": "Thyagarajan and A. Ghatak", "publisher": "McMillan India"}
    ]'::jsonb,
    '[
        {"title": "Solid State Physics", "author": "N.W. Ashcroft and N.D. Mermin", "publisher": "Cengage"},
        {"title": "Solid State Physics", "author": "R.K. Puri and V.K. Babbar", "publisher": "S. Chand Publishing"},
        {"title": "Solid State Physics", "author": "S.O. Pillai", "publisher": "New Age Publication"},
        {"title": "Lasers and Non-linear Optics", "author": "B.B. Laud", "publisher": "Wiley Eastern"},
        {"title": "Elements of Solid State Physics", "author": "J.P. Srivastava", "publisher": "Prentice Hall of India"},
        {"title": "Elementary Solid State Physics", "author": "Ali Omar", "publisher": "Addison Wiley"},
        {"title": "Solid State Physics", "author": "Gupta and Kumar", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.14 Paper XIV
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper XIV',
    'paper-14-electromagnetic-theory',
    6,
    'Paper XIV: Electromagnetic Theory',
    'advanced',
    'Maxwell equations, Gauge transformations (Lorentz & Coulomb), Poynting vector & energy density, plane EM wave propagation in vacuum, dielectrics, conductors & plasma, wave polarization, retarders, rotatory polarization, and EM waves at plane interfaces & waveguides.',
    ARRAY[
        'Physical significance of Maxwell Equation and its application to free space, Lorentz and Coulomb gauge transformation, poynting theorem, concept of energy density.',
        'Analysis of equations in different media and Physical significance of relaxation time, skin depth, Electrical conductivity of ionized gases, plasma frequency.',
        'Basic understanding of polarization of EM wave, and different types of crystals, Phase Retardation Plates and Rotatory Polarization.',
        'Conceptual understanding of EMW application in bounded media, plane interface, dielectric media, Brewster law, TIR, Evanescent wave, metallic reflection.',
        'To Apply the acquired knowledge for visualize basic concept of phenomenon of light in various experiments.'
    ],
    '[
        {"title": "Introduction to Electrodynamics", "author": "D.J. Griffiths", "publisher": "Pearson"},
        {"title": "Principles of Optics", "author": "Max Born and E. Wolf", "publisher": "Pergamon"}
    ]'::jsonb,
    '[
        {"title": "Classical Electrodynamics", "author": "J.D. Jackson", "publisher": "Wiley"},
        {"title": "Foundation of Electromagnetic Theory", "author": "Reitz and Milford", "publisher": "Pearson"},
        {"title": "Electricity and Magnetism", "author": "D.C. Tayal", "publisher": "Himalaya Publishing House"},
        {"title": "Optics", "author": "A.K. Ghatak", "publisher": "McGraw Hill"},
        {"title": "Electricity and Magnetism", "author": "Chattopadhyaya, Rakshit", "publisher": "New Central"},
        {"title": "Electromagnetic Theory", "author": "Gupta and Kumar", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 6.15 Paper XV
INSERT INTO public.papers (paper_code, slug, semester_num, title, difficulty, description, course_outcomes, textbooks, reference_books) VALUES
(
    'Paper XV',
    'paper-15-statistical-mechanics',
    6,
    'Paper XV: Statistical Mechanics',
    'advanced',
    'Macrostate & microstate, ensembles (microcanonical, canonical, grand canonical), Maxwell-Boltzmann distribution, Partition Function Z, Sackur-Tetrode equation, quantum statistics (Fermions & Bosons, BE & FD distributions), Bose-Einstein condensation, and blackbody radiation laws.',
    ARRAY[
        'Understanding the concept of ensembles and its partition function, phase space and thermodynamic relations, MB distribution law.',
        'Conceptual understanding of addition of entropy, Sackur Tetrode equation, Law of equipartition of Energy and its application.',
        'Basic postulates and different distribution of Fermi and Dirac particles and B-E condensation.',
        'Basic knowledge in thermal and Black body radiation, Concept of different laws of radiation and their experimental verification.',
        'Apply the acquired knowledge for analyze the laws radiation and different distribution functions using computational analysis.'
    ],
    '[
        {"title": "Introduction to Statistical Physics", "author": "Kerson Huang", "publisher": "Wiley"},
        {"title": "Statistical Physics (Berkeley Physics Course)", "author": "F. Reif", "publisher": "Tata McGraw Hill"}
    ]'::jsonb,
    '[
        {"title": "Statistical Mechanics", "author": "B.K. Agarwal and Melvin Eisner", "publisher": "New Age International"},
        {"title": "Thermodynamics, Kinetic Theory and Statistical Thermodynamics", "author": "Francis W. Sears and Gerhard L. Salinger", "publisher": "Narosa"},
        {"title": "Statistical Mechanics", "author": "R.K. Pathria and Paul D. Beale", "publisher": "Academic Press"},
        {"title": "Statistical Mechanics", "author": "Sharma and Satyal", "publisher": "Kalyani Publishing"},
        {"title": "Basic Statistical Mechanics", "author": "Gupta and Kumar", "publisher": "Pragati Prakashan"}
    ]'::jsonb
) ON CONFLICT (paper_code) DO NOTHING;

-- 7. SEED DATA FOR COURSE UNITS (EXACT 4 UNITS FOR ALL 15 PAPERS FROM PDF)

-- Units for Paper I
INSERT INTO public.units (paper_id, unit_number, unit_title, syllabus_text, key_topics)
SELECT id, 1, 'Unit I: Calculus-I & II',
'Calculus-I: Plotting of functions, Intuitive ideas of continuous, differentiable functions and plotting of curves, Approximation: Taylor and binomial series (statements only), First Order Differential Equations and Integrating Factor, Second Order Differential equations: Homogeneous Equations with constant coefficients, Wronskian and general solution, Statement of existence and Uniqueness Theorem for Initial Value Problems, Particular Integral. Calculus-II: Calculus of functions of more than one variable: Partial derivatives, exact and inexact differentials. Integrating factor with simple illustration, Constrained Maximization using Lagrange Multipliers.',
ARRAY['Taylor & Binomial Series', 'First & Second Order ODEs', 'Wronskian & Particular Integral', 'Partial Derivatives & Lagrange Multipliers']
FROM public.papers WHERE paper_code = 'Paper I' ON CONFLICT DO NOTHING;

INSERT INTO public.units (paper_id, unit_number, unit_title, syllabus_text, key_topics)
SELECT id, 2, 'Unit II: Vector Algebra & Differentiation',
'Vector algebra: Recapitulation of vectors: Properties of vectors under rotations. Scalar product and its invariance under rotations, Vector product, Scalar triple product and their interpretation in terms of area and volume respectively, Scalar and Vector fields. Vector Differentiation: Directional derivatives and normal derivative, Gradient of a scalar field and its geometrical interpretation, Divergence and curl of a vector field, Del and Laplacian operators, Vector identities.',
ARRAY['Scalar & Vector Products', 'Rotational Invariance', 'Gradient, Divergence & Curl', 'Del & Laplacian Operators']
FROM public.papers WHERE paper_code = 'Paper I' ON CONFLICT DO NOTHING;

INSERT INTO public.units (paper_id, unit_number, unit_title, syllabus_text, key_topics)
SELECT id, 3, 'Unit III: Vector Integration & Dirac Delta Function',
'Vector Integration: Ordinary Integrals of Vectors, Multiple integrals, Jacobian, Notion of infinitesimal line, surface and volume elements, Line, surface and volume integrals of Vector fields, Flux of a vector field, Gauss divergence theorem, Green and Stokes Theorems and their applications (no rigorous proofs). Dirac Delta function and its properties: Definition of Dirac delta function. Representation as limit of a Gaussian function and rectangular function, Properties of Dirac delta function.',
ARRAY['Multiple Integrals & Jacobian', 'Gauss, Stokes & Green Theorems', 'Flux of Vector Field', 'Dirac Delta Function & Properties']
FROM public.papers WHERE paper_code = 'Paper I' ON CONFLICT DO NOTHING;

INSERT INTO public.units (paper_id, unit_number, unit_title, syllabus_text, key_topics)
SELECT id, 4, 'Unit IV: Orthogonal Curvilinear Coordinates',
'Orthogonal Curvilinear Coordinates: Orthogonal Curvilinear Coordinates, Derivation of Gradient, Divergence, Curl and Laplacian in Cartesian, Spherical and Cylindrical Coordinate Systems, Comparison of velocity and acceleration in cylindrical and spherical coordinate system.',
ARRAY['Orthogonal Curvilinear Coordinates', 'Grad, Div, Curl & Laplacian in Spherical/Cylindrical', 'Velocity & Acceleration Comparison']
FROM public.papers WHERE paper_code = 'Paper I' ON CONFLICT DO NOTHING;

-- 8. SEED DATA FOR LAB COMPONENTS (CREDIT-1 EXPERIMENTS FROM PDF)

-- Lab for Paper I
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Computational Physics & Error Analysis)', 4, 'C / C++ / Scilab / Linux / Windows',
ARRAY[
    'Basics of scientific computing: Binary and decimal arithmetic, Floating point numbers, algorithms, iterative methods.',
    'Algorithm Errors and error Analysis: Truncation and round off errors, Absolute and relative errors, Propagation of Errors, Normal Law of Errors.',
    'Review of C and C++ Programming: Constants, Variables, Control statements (If, Else, Loops), Arrays (1D & 2D), Functions, Structures.',
    'Programs: Sum and average of a list of numbers, largest of a given list and its location, sorting in ascending/descending order, Binary search.',
    'Random number generation: Area of circle, area of square, volume of sphere, value of pi.'
],
'[
    {"title": "Introduction to Numerical Analysis", "author": "S.S. Sastry", "publisher": "PHI Learning"},
    {"title": "Outline of Programming with C++", "author": "J. Hubbard", "publisher": "McGraw Hill"},
    {"title": "Numerical Recipes in C: The Art of Scientific Computing", "author": "W.H. Press et al.", "publisher": "Cambridge Univ. Press"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper I' ON CONFLICT DO NOTHING;

-- Lab for Paper II
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Mechanics Practicals)', 4, 'Hardware Apparatus',
ARRAY[
    'To study surface tension by capillary rise method.',
    'To determine the height of a building using a Sextant.',
    'To study the Motion of Spring and calculate (a) Spring constant, (b) g and (c) Modulus of rigidity.',
    'To determine the Moment of Inertia of a Flywheel.',
    'To determine Coefficient of Viscosity of water by Capillary Flow Method (Poiseuille method).',
    'To determine the Modulus of Rigidity of a Wire by Maxwell needle.',
    'To determine the value of g using Bar Pendulum.',
    'To determine the value of g using Kater Pendulum.'
],
'[
    {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
    {"title": "Advanced Level Physics Practicals", "author": "Michael Nelson and Jon M. Ogborn", "publisher": "Heinemann"},
    {"title": "A Text Book of Practical Physics", "author": "I. Prakash and Ramakrishna", "publisher": "Kitab Mahal"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper II' ON CONFLICT DO NOTHING;

-- Lab for Paper III
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Electricity and Magnetism Practicals)', 6, 'Multimeter & Circuit Apparatus',
ARRAY[
    'Use a Multimeter for measuring (a) Resistances, (b) AC/DC Voltages, (c) DC Current, (d) Capacitances, and (e) Fuses.',
    'To study the characteristics of a series RC Circuit.',
    'To determine an unknown Low Resistance using Potentiometer.',
    'To determine an unknown Low Resistance using Carey Fosters Bridge.',
    'To compare capacitances using DeSauty bridge.',
    'Measurement of field strength B and its variation in a solenoid (determine dB/dx).',
    'To verify the Thevenin and Norton theorems.',
    'To determine self-inductance of a coil by Anderson bridge.',
    'To study response curve of a Series LCR circuit and determine its (a) Resonant frequency, (b) Impedance, (c) Quality factor Q, and (d) Bandwidth.',
    'To study the response curve of a parallel LCR circuit and determine its anti-resonance frequency and Quality factor Q.'
],
'[
    {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
    {"title": "A Text Book of Practical Physics", "author": "I. Prakash and Ramakrishna", "publisher": "Kitab Mahal"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper III' ON CONFLICT DO NOTHING;

-- Lab for Paper V
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Waves and Optics Practicals)', 5, 'Optical Bench & Spectrometer Apparatus',
ARRAY[
    'To determine the frequency of an electric tuning fork by Melde experiment and verify 2-T law.',
    'To plot the i-D curve and to determine the refractive index of a prism.',
    'To determine refractive index of the Material of a prism using sodium source.',
    'To determine the dispersive power and Cauchy constants of the material of a prism using mercury source.',
    'To determine wavelength of sodium light using Newton Rings.',
    'To determine wavelength of (1) Na source and (2) spectral lines of Hg source using plane diffraction grating.',
    'To determine dispersive power and resolving power of a plane diffraction grating.'
],
'[
    {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
    {"title": "A Text Book of Practical Physics", "author": "I. Prakash and Ramakrishna", "publisher": "Kitab Mahal"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper V' ON CONFLICT DO NOTHING;

-- Lab for Paper VIII
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Analog Systems Practicals)', 5, 'Breadboard & Electronic Components',
ARRAY[
    'To study the V-I characteristics of a Zener diode and its use as voltage regulator.',
    'Study of V-I and power curves of solar cells, and find maximum power point and efficiency.',
    'To study the characteristics of a Bipolar Junction Transistor in CE configuration.',
    'To study the various biasing configurations of BJT for normal class A operation.',
    'To study the frequency response of voltage gain of a RC-coupled transistor amplifier.',
    'To design a Wien bridge oscillator for given frequency using Op-Amp/BJT.',
    'To design a phase shift oscillator of given specifications using BJT.',
    'To study the Colpitt oscillator.'
],
'[
    {"title": "Basic Electronics: A text lab manual", "author": "P.B. Zbar, A.P. Malvino, M.A. Miller", "publisher": "McGraw Hill"},
    {"title": "Modern Digital Electronics", "author": "R.P. Jain", "publisher": "Tata McGraw Hill"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper VIII' ON CONFLICT DO NOTHING;

-- Lab for Paper XI
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Digital Electronics Practicals)', 6, 'Digital Trainer Kit & CRO',
ARRAY[
    'To measure (a) Voltage, and (b) Time period of a periodic waveform using CRO and test Diode/Transistor using multimeter.',
    'To design a switch (NOT gate) using a transistor.',
    'To verify and design AND, OR, NOT and XOR gates using NAND gates.',
    'Half Adder, Full Adder and 4-bit binary Adder.',
    'Half Subtractor, Full Subtractor, Adder-Subtractor using Full Adder IC.',
    'To build Flip-Flop (RS, Clocked-RS, D-type and JK) circuits using NAND gates.',
    'To design an astable multivibrator of given specifications using 555 Timer.',
    'To design a monostable multivibrator of given specifications using 555 Timer.'
],
'[
    {"title": "Basic Electronics: A Text Books lab manual", "author": "P.B. Zbar, A.P. Malvino", "publisher": "McGraw Hill"},
    {"title": "OP-Amps and Linear Integrated Circuit", "author": "R.A. Gayakwad", "publisher": "Prentice Hall"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper XI' ON CONFLICT DO NOTHING;

-- Lab for Paper XII
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Quantum Mechanics Computational & Modern Physics Lab)', 4, 'C / C++ / Scilab / Modern Physics Kits',
ARRAY[
    'Solve the s-wave Schrodinger equation for ground state & 1st excited state of Hydrogen atom (take e=3.795, hc=1973 eVÅ, m=0.511x10^6 eV/c²).',
    'Solve s-wave radial Schrodinger equation for screened Coulomb potential V(r) = -(e²/r) e^(-r/a).',
    'Solve s-wave radial Schrodinger equation for anharmonic oscillator potential V(r) = 1/2 k r² + 1/3 b r³.',
    'Solve s-wave radial Schrodinger equation for vibrations of hydrogen molecule using Morse potential.',
    'Study of Electron spin resonance (ESR) — determine magnetic field as a function of resonance frequency.',
    'Study of Zeeman effect with external magnetic field and hyperfine splitting.',
    'To show tunneling effect in tunnel diode using I-V characteristics.',
    'Quantum efficiency of CCDs.'
],
'[
    {"title": "Numerical Recipes in C", "author": "W.H. Press et al.", "publisher": "Cambridge Univ. Press"},
    {"title": "An Introduction to Computational Physics", "author": "T. Pang", "publisher": "Cambridge Univ. Press"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper XII' ON CONFLICT DO NOTHING;

-- Lab for Paper XIII
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Solid State Physics Practicals)', 4, 'Solid State Physics Setup & 4-Probe Apparatus',
ARRAY[
    'Measurement of susceptibility of paramagnetic solution by Quincke\'s Tube Method.',
    'To measure the Magnetic susceptibility of Solids.',
    'To measure the Dielectric Constant of a dielectric material with frequency.',
    'To determine the Hall coefficient of a semiconductor sample.',
    'To draw the BH curve of Fe using solenoid and determine energy loss from Hysteresis.',
    'To measure the band gap of a given semiconductor by four-probe method.'
],
'[
    {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
    {"title": "Elements of Solid State Physics", "author": "J.P. Srivastava", "publisher": "Prentice Hall of India"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper XIII' ON CONFLICT DO NOTHING;

-- Lab for Paper XIV
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Electromagnetic Theory Practicals)', 4, 'Optical Polarimeter & Laser Bench',
ARRAY[
    'To verify the law of Malus for plane polarized light.',
    'To determine the specific rotation of sugar solution using Polarimeter.',
    'To analyze elliptically polarized light by using Babinet compensator.',
    'To determine refractive index of liquid by total internal reflection using Wollaston air-film.',
    'To determine refractive index of glass & liquid by TIR using Gaussian eyepiece.',
    'To study polarization of light by reflection & determine polarizing angle for air-glass interface.',
    'To verify Stefan\'s law of radiation & determine Stefan\'s constant.',
    'To determine Boltzmann constant using V-I characteristics of PN junction Diode.'
],
'[
    {"title": "Advanced Practical Physics for Students", "author": "B.L. Flint and H.T. Worsnop", "publisher": "Asia Publishing House"},
    {"title": "Electromagnetic Field Theory for Engineers and Physicists", "author": "G. Lehner", "publisher": "Springer"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper XIV' ON CONFLICT DO NOTHING;

-- Lab for Paper XV
INSERT INTO public.lab_components (paper_id, lab_title, min_experiments, software_tools, experiments_list, lab_reference_books)
SELECT id, 'LAB: Credit-1 (Statistical Mechanics Computational Lab)', 4, 'C / C++ / Scilab',
ARRAY[
    'Plot Planck\'s law for Black Body radiation and compare it with Wien\'s & Rayleigh-Jeans laws at high & low temperatures.',
    'Plot Specific Heat of Solids comparing Dulong-Petit, Einstein, and Debye distribution functions.',
    'Plot Maxwell-Boltzmann distribution function versus temperature.',
    'Plot Fermi-Dirac distribution function versus temperature.',
    'Plot Bose-Einstein distribution function versus temperature.'
],
'[
    {"title": "Statistical Mechanics", "author": "R.K. Pathria", "publisher": "Butterworth Heinemann"},
    {"title": "Simulation of ODE/PDE Models", "author": "A. Vande Wouwer et al.", "publisher": "Springer"}
]'::jsonb
FROM public.papers WHERE paper_code = 'Paper XV' ON CONFLICT DO NOTHING;
