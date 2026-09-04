-- ============================================================================
--  JEETPHYSICS.IN — PHASE 3: OFFICIAL CURRICULUM SEEDING
--  Fakir Mohan University (FMU) — B.Sc. Physics Honours (Semesters I – VI)
--  Migration File: 20260904_phase3_seed_physics_curriculum.sql
--  (Idempotent and safe to run on top of Phase 2 Clean Architecture)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. SEED MASTER SUBJECTS
-- ----------------------------------------------------------------------------
-- Physics is active; Mathematics and Chemistry are registered with 0 semesters/papers
INSERT INTO public.subjects (slug, name, description, display_order, is_active)
VALUES
    (
        'physics',
        'Physics',
        'B.Sc. Physics Honours undergraduate curriculum under Fakir Mohan University (NEP 2020 framework).',
        1,
        true
    ),
    (
        'mathematics',
        'Mathematics',
        'Undergraduate Mathematics department curriculum (Department registered; curriculum coming soon).',
        2,
        false
    ),
    (
        'chemistry',
        'Chemistry',
        'Undergraduate Chemistry department curriculum (Department registered; curriculum coming soon).',
        3,
        false
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 2. SEED SEMESTERS FOR PHYSICS (SEMESTERS I THROUGH VI)
-- ----------------------------------------------------------------------------
INSERT INTO public.semesters (subject_id, semester_number, slug, name, display_order, is_active)
SELECT 
    s.id,
    v.sem_num,
    v.sem_slug,
    v.sem_name,
    v.sem_order,
    true
FROM public.subjects s
CROSS JOIN (
    VALUES
        (1, 'semester-i', 'Semester I', 1),
        (2, 'semester-ii', 'Semester II', 2),
        (3, 'semester-iii', 'Semester III', 3),
        (4, 'semester-iv', 'Semester IV', 4),
        (5, 'semester-v', 'Semester V', 5),
        (6, 'semester-vi', 'Semester VI', 6)
) AS v(sem_num, sem_slug, sem_name, sem_order)
WHERE s.slug = 'physics'
ON CONFLICT (subject_id, semester_number) DO UPDATE SET
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 3. SEED PAPERS FOR PHYSICS (30 VERIFIED PAPERS: 15 THEORY + 15 PRACTICAL)
-- ----------------------------------------------------------------------------
-- Strict Rules:
-- 1. Titles strictly match FMU syllabus PDF headers (e.g. 'Analog Systems', 'Basic Instrumentation', 'Digital Systems').
-- 2. Laboratory paper codes strictly formatted as 'Paper I (Practical)' through 'Paper XV (Practical)'.
-- 3. Credits and marks omitted / set to NULL per user directive.
-- 4. display_order sequences Theory Paper immediately followed by its Practical Lab Paper.

INSERT INTO public.papers 
(subject_id, semester_id, paper_code, slug, name, paper_type, description, credits, marks, display_order, is_active)
SELECT 
    sem.subject_id,
    sem.id,
    p.paper_code,
    p.slug,
    p.name,
    p.paper_type,
    p.description,
    NULL::INT AS credits,
    NULL::INT AS marks,
    p.display_order,
    true AS is_active
FROM (
    VALUES
        -- ---------------------------------------------------------------------
        -- SEMESTER I (4 Papers: 2 Theory + 2 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-i',
            'Paper I',
            'paper-1-mathematical-physics-1',
            'Mathematical Physics-I',
            'THEORY',
            'Calculus of one and several variables, first & second order differential equations, vector algebra, vector differentiation, vector integration, Dirac delta function, and orthogonal curvilinear coordinates.',
            1
        ),
        (
            'semester-i',
            'Paper I (Practical)',
            'paper-1-practical-mathematical-physics-1',
            'Mathematical Physics-I Practical',
            'LAB',
            'Computational physics using C, C++, and Scilab: plotting, roots of equations, numerical differentiation, integration, and error analysis.',
            2
        ),
        (
            'semester-i',
            'Paper II',
            'paper-2-mechanics',
            'Mechanics',
            'THEORY',
            'Rotational dynamics, non-inertial systems, damped and forced oscillations, elasticity, fluid motion, gravitation, central force motion, and Special Theory of Relativity.',
            3
        ),
        (
            'semester-i',
            'Paper II (Practical)',
            'paper-2-practical-mechanics',
            'Mechanics Practical',
            'LAB',
            'Mechanics laboratory experiments: Moment of Inertia of flywheel, compound pendulum, Kater pendulum, bar pendulum, and elasticity moduli.',
            4
        ),

        -- ---------------------------------------------------------------------
        -- SEMESTER II (4 Papers: 2 Theory + 2 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-ii',
            'Paper III',
            'paper-3-electricity-and-magnetism',
            'Electricity and Magnetism',
            'THEORY',
            'Electrostatics, Gauss theorem and applications, magnetostatics, Biot-Savart and Ampere laws, dielectrics, magnetic properties of matter, EM induction, and AC network analysis.',
            1
        ),
        (
            'semester-ii',
            'Paper III (Practical)',
            'paper-3-practical-electricity-and-magnetism',
            'Electricity and Magnetism Practical',
            'LAB',
            'Electricity and magnetism experiments: Carey Foster bridge, Ballistic Galvanometer, charging/discharging RC circuits, and series/parallel LCR resonance.',
            2
        ),
        (
            'semester-ii',
            'Paper IV',
            'paper-4-mathematical-physics-2',
            'Mathematical Physics-II',
            'THEORY',
            'Periodic functions and Fourier series, Frobenius method, Legendre polynomials, Bessel functions, Hermite & Laguerre polynomials, and partial differential equations in physics.',
            3
        ),
        (
            'semester-ii',
            'Paper IV (Practical)',
            'paper-4-practical-mathematical-physics-2',
            'Mathematical Physics-II Practical',
            'LAB',
            'Computational simulation using Scilab: Fourier series approximation, orthogonal polynomial generation, ODE boundary value problems, and numerical solutions to PDEs.',
            4
        ),

        -- ---------------------------------------------------------------------
        -- SEMESTER III (6 Papers: 3 Theory + 3 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-iii',
            'Paper V',
            'paper-5-waves-and-optics',
            'Waves and Optics',
            'THEORY',
            'Superposition of collinear & perpendicular harmonic oscillations, wave motion, group and phase velocity, wave optics, interference, Fresnel & Fraunhofer diffraction, and holography.',
            1
        ),
        (
            'semester-iii',
            'Paper V (Practical)',
            'paper-5-practical-waves-and-optics',
            'Waves and Optics Practical',
            'LAB',
            'Optics laboratory experiments: Newton rings, Fresnel biprism, Michelson interferometer, diffraction grating, and resolving power measurements.',
            2
        ),
        (
            'semester-iii',
            'Paper VI',
            'paper-6-mathematical-physics-3',
            'Mathematical Physics-III',
            'THEORY',
            'Complex variable theory, Cauchy-Riemann conditions, Cauchy integral theorem & formula, Taylor and Laurent series, Residue theorem, Fourier transforms, and Laplace transforms.',
            3
        ),
        (
            'semester-iii',
            'Paper VI (Practical)',
            'paper-6-practical-mathematical-physics-3',
            'Mathematical Physics-III Practical',
            'LAB',
            'Computational implementation using Scilab: Complex mappings, Cauchy integral verification, numerical evaluation of residues, and Fast Fourier Transform (FFT) algorithms.',
            4
        ),
        (
            'semester-iii',
            'Paper VII',
            'paper-7-thermal-physics',
            'Thermal Physics',
            'THEORY',
            'Laws of thermodynamics, Carnot cycle, entropy, thermodynamic potentials, Maxwell relations, Joule-Thomson effect, kinetic theory of gases, and behavior of real gases.',
            5
        ),
        (
            'semester-iii',
            'Paper VII (Practical)',
            'paper-7-practical-thermal-physics',
            'Thermal Physics Practical',
            'LAB',
            'Thermal physics experiments: Mechanical equivalent of heat J by Callendar & Barnes, thermal conductivity by Lee disc, Platinum resistance thermometer, and thermocouple calibration.',
            6
        ),

        -- ---------------------------------------------------------------------
        -- SEMESTER IV (6 Papers: 3 Theory + 3 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-iv',
            'Paper VIII',
            'paper-8-analog-systems',
            'Analog Systems',
            'THEORY',
            'Semiconductor diodes, Zener diode, BJT characteristics, biasing, small-signal CE amplifier, feedback amplifiers, sinusoidal oscillators, and operational amplifiers.',
            1
        ),
        (
            'semester-iv',
            'Paper VIII (Practical)',
            'paper-8-practical-analog-systems',
            'Analog Systems Practical',
            'LAB',
            'Analog electronics experiments: V-I characteristics of PN junction and Zener diodes, BJT common emitter characteristics, RC-coupled amplifier frequency response, and Op-Amp applications.',
            2
        ),
        (
            'semester-iv',
            'Paper IX',
            'paper-9-basic-instrumentation',
            'Basic Instrumentation',
            'THEORY',
            'Analog and digital multimeters, cathode ray oscilloscope (CRO), digital storage oscilloscope (DSO), signal generators, impedance bridges, and digital instruments.',
            3
        ),
        (
            'semester-iv',
            'Paper IX (Practical)',
            'paper-9-practical-basic-instrumentation',
            'Basic Instrumentation Practical',
            'LAB',
            'Hands-on instrumentation exercises: Signal measurement using CRO/DSO, Lissajous figures, loading effect of voltmeters, function generator tuning, and AC bridge impedance balance.',
            4
        ),
        (
            'semester-iv',
            'Paper X',
            'paper-10-nuclear-and-particle-physics',
            'Nuclear and Particle Physics',
            'THEORY',
            'General properties of nuclei, nuclear models (Liquid Drop and Shell models), radioactivity and alpha/beta/gamma decay, nuclear detectors, particle accelerators, and elementary particles.',
            5
        ),
        (
            'semester-iv',
            'Paper X (Practical)',
            'paper-10-practical-nuclear-and-particle-physics',
            'Nuclear and Particle Physics Practical',
            'LAB',
            'Modern physics and nuclear experiments: Geiger-Muller (GM) counter plateau and dead time, inverse-square law for gamma radiation, photoelectric effect (Planck constant h), and absorption coefficients.',
            6
        ),

        -- ---------------------------------------------------------------------
        -- SEMESTER V (6 Papers: 3 Theory + 3 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-v',
            'Paper XI',
            'paper-11-digital-systems',
            'Digital Systems',
            'THEORY',
            'Integrated circuits, binary arithmetic, Boolean algebra, Karnaugh maps, logic gates, combinational logic (adders, subtractors, multiplexers), flip-flops, registers, and counters.',
            1
        ),
        (
            'semester-v',
            'Paper XI (Practical)',
            'paper-11-practical-digital-systems',
            'Digital Systems Practical',
            'LAB',
            'Digital electronics experiments: Verification of logic gates using NAND universal gates, Half Adder/Full Adder circuits, RS and JK flip-flops, and 555 Timer multivibrators.',
            2
        ),
        (
            'semester-v',
            'Paper XII',
            'paper-12-quantum-mechanics-and-applications',
            'Quantum Mechanics and Applications',
            'THEORY',
            'Schrodinger equation, wave packet, probability density and current, operators, eigenvalues and eigenstates, 1D potentials (square well, barrier tunneling, harmonic oscillator), and Hydrogen-like atoms.',
            3
        ),
        (
            'semester-v',
            'Paper XII (Practical)',
            'paper-12-practical-quantum-mechanics-and-applications',
            'Quantum Mechanics and Applications Practical',
            'LAB',
            'Computational quantum mechanics using Scilab / C++ (solving 1D radial Schrodinger equation for Hydrogen atom, screened Coulomb and anharmonic potentials) and Electron Spin Resonance (ESR) experiments.',
            4
        ),
        (
            'semester-v',
            'Paper XIII',
            'paper-13-solid-state-physics',
            'Solid State Physics',
            'THEORY',
            'Crystal structure, Bravais lattices, Miller indices, X-ray diffraction, lattice vibrations and phonons, free electron Fermi gas, band theory of solids, dielectric & magnetic properties, and lasers.',
            5
        ),
        (
            'semester-v',
            'Paper XIII (Practical)',
            'paper-13-practical-solid-state-physics',
            'Solid State Physics Practical',
            'LAB',
            'Solid state experiments: Hall coefficient of semiconductor, band gap measurement by Four-Probe method, magnetic susceptibility by Quincke tube method, and B-H curve tracer.',
            6
        ),

        -- ---------------------------------------------------------------------
        -- SEMESTER VI (4 Papers: 2 Theory + 2 Practical)
        -- ---------------------------------------------------------------------
        (
            'semester-vi',
            'Paper XIV',
            'paper-14-electromagnetic-theory',
            'Electromagnetic Theory',
            'THEORY',
            'Maxwell equations, displacement current, Poynting vector, electromagnetic wave propagation in unbounded media, polarization, reflection and refraction at dielectric interface, and Fresnel formulas.',
            1
        ),
        (
            'semester-vi',
            'Paper XIV (Practical)',
            'paper-14-practical-electromagnetic-theory',
            'Electromagnetic Theory Practical',
            'LAB',
            'Optical polarimetry experiments: Verification of Malus law, specific rotation of sugar solution using Polarimeter, Babinet compensator, and determination of refractive index by Total Internal Reflection.',
            2
        ),
        (
            'semester-vi',
            'Paper XV',
            'paper-15-statistical-mechanics',
            'Statistical Mechanics',
            'THEORY',
            'Microstate and macrostate, phase space, classical statistical ensembles, partition function and thermodynamic variables, Maxwell-Boltzmann distribution, Bose-Einstein and Fermi-Dirac quantum statistics, and blackbody radiation.',
            3
        ),
        (
            'semester-vi',
            'Paper XV (Practical)',
            'paper-15-practical-statistical-mechanics',
            'Statistical Mechanics Practical',
            'LAB',
            'Computational statistical physics in C / C++ / Scilab: Numerical evaluation of partition functions, Planck radiation distribution curves, comparison of Maxwell-Boltzmann, Bose-Einstein, and Fermi-Dirac statistics, and Debye specific heat curve.',
            4
        )
) AS p(sem_slug, paper_code, slug, name, paper_type, description, display_order)
JOIN public.subjects s ON s.slug = 'physics'
JOIN public.semesters sem ON sem.subject_id = s.id AND sem.slug = p.sem_slug
ON CONFLICT (subject_id, paper_code) DO UPDATE SET
    semester_id = EXCLUDED.semester_id,
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    paper_type = EXCLUDED.paper_type,
    description = EXCLUDED.description,
    credits = EXCLUDED.credits,
    marks = EXCLUDED.marks,
    display_order = EXCLUDED.display_order,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- ----------------------------------------------------------------------------
-- 4. VERIFICATION QUERY (READ-ONLY SANITY CHECK)
-- ----------------------------------------------------------------------------
-- Run this block to confirm total paper counts and distribution per semester
DO $$
DECLARE
    v_subject_count INT;
    v_semester_count INT;
    v_theory_count INT;
    v_lab_count INT;
BEGIN
    SELECT COUNT(*) INTO v_subject_count FROM public.subjects;
    SELECT COUNT(*) INTO v_semester_count FROM public.semesters;
    SELECT COUNT(*) INTO v_theory_count FROM public.papers WHERE paper_type = 'THEORY';
    SELECT COUNT(*) INTO v_lab_count FROM public.papers WHERE paper_type = 'LAB';

    RAISE NOTICE '=== SEEDING SANITY CHECK ===';
    RAISE NOTICE 'Total Subjects: % (Expected: 3)', v_subject_count;
    RAISE NOTICE 'Total Physics Semesters: % (Expected: 6)', v_semester_count;
    RAISE NOTICE 'Total Theory Papers: % (Expected: 15)', v_theory_count;
    RAISE NOTICE 'Total Practical Papers: % (Expected: 15)', v_lab_count;
    RAISE NOTICE 'Total Physics Papers: % (Expected: 30)', v_theory_count + v_lab_count;
END;
$$;
