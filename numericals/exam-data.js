'use strict';

// ============================================================================
//  EXAM-DATA.JS — Physics Numerical Solutions Portal
//  Contains exam configurations, problem sets (40 problems), and rendering
//  functions for the JeetPhysics Numericals section.
// ============================================================================

// ---------------------------------------------------------------------------
//  1. EXAM CONFIGURATION
//  Each exam has metadata, visual styling, statistics, and chapter lists.
// ---------------------------------------------------------------------------

const EXAM_CONFIG = {

    'jee-main': {
        title: 'JEE Main Physics',
        subtitle: 'Numerical Solutions',
        icon: '🎯',
        color: '#3b82f6',
        description: 'Comprehensive collection of JEE Main Physics numerical problems with detailed step-by-step solutions covering all chapters from NTA syllabus. Master integer-type and numerical value questions for guaranteed full marks.',
        stats: { problems: 450, topics: 32, years: 10 },
        chapters: [
            'Mechanics', 'Electrostatics', 'Current Electricity', 'Optics',
            'Modern Physics', 'Thermodynamics', 'Magnetism', 'Waves'
        ]
    },

    'jee-advanced': {
        title: 'JEE Advanced Physics',
        subtitle: 'Numerical Solutions',
        icon: '🏆',
        color: '#f59e0b',
        description: 'Challenging JEE Advanced numerical problems demanding deep conceptual clarity and multi-step problem solving. Includes problems from both Paper 1 and Paper 2 across all years.',
        stats: { problems: 380, topics: 28, years: 12 },
        chapters: [
            'Rotational Dynamics', 'EM Induction', 'Wave Optics',
            'Quantum Mechanics', 'Fluid Mechanics', 'Gravitation',
            'Electrostatics', 'Thermodynamics'
        ]
    },

    'neet': {
        title: 'NEET Physics',
        subtitle: 'Numerical Solutions',
        icon: '🩺',
        color: '#34d399',
        description: 'NEET Physics numerical problems solved with conceptual clarity. Focused on NCERT-based derivations and formulae most frequently asked by NTA in the medical entrance examination.',
        stats: { problems: 320, topics: 25, years: 8 },
        chapters: [
            'Mechanics', 'Ray Optics', 'Current Electricity', 'Atomic Physics',
            'Heat & Thermodynamics', 'Magnetism', 'Waves', 'Semiconductors'
        ]
    },

    'jam-physics': {
        title: 'IIT JAM Physics',
        subtitle: 'Numerical Solutions',
        icon: '🔬',
        color: '#a78bfa',
        description: 'IIT JAM Physics numerical problems covering advanced undergraduate topics. Ideal for M.Sc. entrance preparation with rigorous mathematical treatment and detailed solutions.',
        stats: { problems: 280, topics: 24, years: 15 },
        chapters: [
            'Classical Mechanics', 'Quantum Mechanics', 'EM Theory',
            'Thermodynamics & Statistics', 'Oscillations & Waves', 'Optics',
            'Electronics', 'Mathematical Physics'
        ]
    },

    'jam-chemistry': {
        title: 'IIT JAM Chemistry',
        subtitle: 'Physical Chemistry Numericals',
        icon: '⚗️',
        color: '#f472b6',
        description: 'Physical Chemistry numerical problems from IIT JAM Chemistry. Covers thermodynamics, kinetics, quantum chemistry, electrochemistry and more with step-by-step mathematical solutions.',
        stats: { problems: 240, topics: 20, years: 12 },
        chapters: [
            'Chemical Thermodynamics', 'Chemical Kinetics', 'Quantum Chemistry',
            'Electrochemistry', 'Surface Chemistry', 'Spectroscopy',
            'Solid State', 'Solutions'
        ]
    },

    'csir-net': {
        title: 'CSIR-UGC NET Physics',
        subtitle: 'Numerical Solutions',
        icon: '📜',
        color: '#22d3ee',
        description: 'CSIR-UGC NET Physical Sciences numerical problems for JRF/LS qualification. Covers all five units with graduate-level rigour including mathematical physics, quantum mechanics and statistical mechanics.',
        stats: { problems: 350, topics: 30, years: 15 },
        chapters: [
            'Mathematical Physics', 'Classical Mechanics', 'Quantum Mechanics',
            'Statistical Mechanics', 'EM Theory', 'Nuclear & Particle',
            'Condensed Matter', 'Electronics'
        ]
    },

    'gate-physics': {
        title: 'GATE Physics',
        subtitle: 'Numerical Solutions',
        icon: '🏗️',
        color: '#fb923c',
        description: 'GATE Physics (PH) numerical problems with detailed solutions. Essential for PSU recruitment and M.Tech./Ph.D. admissions at IITs and IISc. Covers NAT and MSQ type questions.',
        stats: { problems: 300, topics: 26, years: 10 },
        chapters: [
            'EM Theory', 'Quantum Mechanics', 'Thermodynamics',
            'Solid State Physics', 'Nuclear Physics', 'Atomic & Molecular',
            'Mathematical Physics', 'Electronics'
        ]
    },

    'cuet-science': {
        title: 'CUET Science',
        subtitle: 'Physics Numericals',
        icon: '📝',
        color: '#2dd4bf',
        description: 'CUET Science domain Physics numerical problems based on Class XII NCERT syllabus. Perfect for undergraduate admissions to central universities with concept-based solved examples.',
        stats: { problems: 200, topics: 18, years: 4 },
        chapters: [
            'Mechanics', 'Heat & Thermodynamics', 'Waves & Sound',
            'Electricity', 'Magnetism', 'Modern Physics',
            'Optics', 'Units & Dimensions'
        ]
    }
};


// ---------------------------------------------------------------------------
//  2. EXAM PROBLEMS — 40 problems (5 per exam), with full solutions
// ---------------------------------------------------------------------------

const EXAM_PROBLEMS = {

    // ===== JEE MAIN — 5 Problems ===========================================
    'jee-main': [
        {
            id: 1,
            exam: 'jee-main',
            chapter: 'Mechanics',
            topic: 'Projectile Motion',
            difficulty: 'easy',
            year: '2023',
            question: 'A ball is thrown from the ground at an angle of 45° with the horizontal with an initial velocity of 20 m/s. Assuming no air resistance and g = 9.8 m/s², find the horizontal range of the projectile.',
            given: 'Given: Initial velocity u = 20 m/s, Angle of projection θ = 45°, g = 9.8 m/s²',
            required: 'Find: Horizontal range R',
            formula: '$$R = \\frac{u^2 \\sin 2\\theta}{g}$$',
            steps: [
                'Step 1: Identify the range formula for projectile motion: R = u² sin(2θ) / g',
                'Step 2: Substitute θ = 45°, so sin(2 × 45°) = sin 90° = 1',
                'Step 3: R = (20)² × 1 / 9.8 = 400 / 9.8',
                'Step 4: R = 40.82 m'
            ],
            answer: 'R ≈ 40.8 m',
            notes: 'Maximum range is obtained at θ = 45° for a given speed. This is one of the most frequently asked concepts in JEE Main Mechanics.'
        },
        {
            id: 2,
            exam: 'jee-main',
            chapter: 'Electrostatics',
            topic: 'Electric Field due to Point Charges',
            difficulty: 'moderate',
            year: '2022',
            question: 'Two point charges +3 μC and −3 μC are placed 20 cm apart. Find the magnitude of the electric field at the midpoint of the line joining the two charges.',
            given: 'Given: q₁ = +3 μC = 3 × 10⁻⁶ C, q₂ = −3 μC = −3 × 10⁻⁶ C, separation d = 20 cm = 0.2 m, k = 9 × 10⁹ N·m²/C²',
            required: 'Find: Net electric field E at the midpoint',
            formula: '$$E_{\\text{net}} = \\frac{2kq}{r^2}$$',
            steps: [
                'Step 1: The midpoint is at distance r = d/2 = 0.1 m from each charge.',
                'Step 2: Electric field due to +3 μC at midpoint: E₁ = kq/r² = 9×10⁹ × 3×10⁻⁶ / (0.1)² = 2.7 × 10⁶ N/C (pointing away from +q)',
                'Step 3: Electric field due to −3 μC at midpoint: E₂ = kq/r² = 2.7 × 10⁶ N/C (pointing toward −q)',
                'Step 4: Both fields point in the same direction (from + to −), so E_net = E₁ + E₂ = 5.4 × 10⁶ N/C'
            ],
            answer: 'E = 5.4 × 10⁶ N/C',
            notes: 'At the midpoint of a dipole, the fields from both charges add up because they point in the same direction (from positive to negative charge). This is different from the axial point of a dipole.'
        },
        {
            id: 3,
            exam: 'jee-main',
            chapter: 'Optics',
            topic: 'Thin Lens Formula',
            difficulty: 'easy',
            year: '2023',
            question: 'An object is placed 30 cm in front of a convex lens of focal length 20 cm. Find the position and nature of the image formed.',
            given: 'Given: Object distance u = −30 cm (sign convention), Focal length f = +20 cm (convex lens)',
            required: 'Find: Image distance v and nature of image',
            formula: '$$\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}$$',
            steps: [
                'Step 1: Apply the thin lens formula: 1/v − 1/u = 1/f',
                'Step 2: Substitute values: 1/v − 1/(−30) = 1/20',
                'Step 3: 1/v + 1/30 = 1/20',
                'Step 4: 1/v = 1/20 − 1/30 = (3 − 2)/60 = 1/60',
                'Step 5: v = +60 cm (positive sign means real image on the other side of the lens)'
            ],
            answer: 'v = +60 cm, real and inverted image, magnification m = v/u = 60/(−30) = −2 (magnified)',
            notes: 'When the object is between F and 2F of a convex lens, the image is real, inverted, and magnified, formed beyond 2F on the other side.'
        },
        {
            id: 4,
            exam: 'jee-main',
            chapter: 'Modern Physics',
            topic: 'Photoelectric Effect',
            difficulty: 'moderate',
            year: '2022',
            question: 'Light of wavelength 400 nm is incident on a metal surface with work function 2.0 eV. Find the maximum kinetic energy of the emitted photoelectrons.',
            given: 'Given: Wavelength λ = 400 nm = 400 × 10⁻⁹ m, Work function φ = 2.0 eV, h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s, 1 eV = 1.6 × 10⁻¹⁹ J',
            required: 'Find: Maximum kinetic energy KE_max of photoelectrons',
            formula: '$$KE_{\\max} = \\frac{hc}{\\lambda} - \\phi$$',
            steps: [
                'Step 1: Calculate the energy of the incident photon: E = hc/λ',
                'Step 2: E = (6.626 × 10⁻³⁴ × 3 × 10⁸) / (400 × 10⁻⁹) = 4.97 × 10⁻¹⁹ J',
                'Step 3: Convert to eV: E = 4.97 × 10⁻¹⁹ / 1.6 × 10⁻¹⁹ = 3.1 eV',
                'Step 4: Apply Einstein\'s photoelectric equation: KE_max = E − φ = 3.1 − 2.0 = 1.1 eV'
            ],
            answer: 'KE_max = 1.1 eV',
            notes: 'The threshold wavelength for this metal is λ₀ = hc/φ = 1240/2.0 = 620 nm. Any light with λ < 620 nm will cause photoemission. This is a standard JEE Main numerical.'
        },
        {
            id: 5,
            exam: 'jee-main',
            chapter: 'Thermodynamics',
            topic: 'Isothermal Expansion',
            difficulty: 'easy',
            year: '2023',
            question: 'Two moles of an ideal gas undergo an isothermal expansion at 300 K, during which the volume doubles. Calculate the work done by the gas.',
            given: 'Given: n = 2 mol, T = 300 K, V₂ = 2V₁, R = 8.314 J/(mol·K)',
            required: 'Find: Work done W by the gas',
            formula: '$$W = nRT \\ln\\left(\\frac{V_2}{V_1}\\right)$$',
            steps: [
                'Step 1: For an isothermal process, work done W = nRT ln(V₂/V₁)',
                'Step 2: Substitute V₂/V₁ = 2, so ln(2) = 0.693',
                'Step 3: W = 2 × 8.314 × 300 × 0.693',
                'Step 4: W = 2 × 8.314 × 300 × 0.693 = 3458.1 J ≈ 3.46 kJ'
            ],
            answer: 'W ≈ 3458 J ≈ 3.46 kJ',
            notes: 'In isothermal expansion, the gas does positive work on the surroundings. The internal energy remains constant (ΔU = 0) and the heat absorbed equals the work done: Q = W.'
        }
    ],

    // ===== JEE ADVANCED — 5 Problems ========================================
    'jee-advanced': [
        {
            id: 1,
            exam: 'jee-advanced',
            chapter: 'Rotational Dynamics',
            topic: 'Rolling Without Slipping',
            difficulty: 'moderate',
            year: '2022',
            question: 'A solid cylinder of mass m and radius R rolls without slipping down an inclined plane of height h = 5 m. Using energy conservation, find the velocity of the centre of mass at the bottom of the incline.',
            given: 'Given: Height h = 5 m, g = 9.8 m/s², Moment of inertia of solid cylinder I = ½mR²',
            required: 'Find: Velocity v of the centre of mass at the bottom',
            formula: '$$v = \\sqrt{\\frac{4gh}{3}}$$',
            steps: [
                'Step 1: Total KE at bottom = Translational KE + Rotational KE = ½mv² + ½Iω²',
                'Step 2: For rolling without slipping, ω = v/R, and I = ½mR² for a solid cylinder',
                'Step 3: KE = ½mv² + ½(½mR²)(v/R)² = ½mv² + ¼mv² = ¾mv²',
                'Step 4: By energy conservation: mgh = ¾mv² → v² = 4gh/3',
                'Step 5: v = √(4 × 9.8 × 5 / 3) = √(65.33) = 8.08 m/s'
            ],
            answer: 'v ≈ 8.08 m/s',
            notes: 'A solid cylinder reaches the bottom faster than a hollow cylinder or hollow sphere but slower than a solid sphere. The velocity is independent of mass and radius — only the geometry (moment of inertia factor) matters.'
        },
        {
            id: 2,
            exam: 'jee-advanced',
            chapter: 'EM Induction',
            topic: 'Motional EMF',
            difficulty: 'advanced',
            year: '2021',
            question: 'A square conducting loop of side 10 cm enters a region of uniform magnetic field B = 0.5 T (perpendicular to the plane of the loop) at a constant velocity v = 2 m/s. Find the EMF induced in the loop as it enters the field region.',
            given: 'Given: Side of loop l = 10 cm = 0.1 m, B = 0.5 T, v = 2 m/s',
            required: 'Find: Induced EMF ε',
            formula: '$$\\varepsilon = Blv$$',
            steps: [
                'Step 1: As the loop enters the field region, only the leading edge cuts through field lines.',
                'Step 2: The motional EMF is generated across the leading edge of length l.',
                'Step 3: Apply the motional EMF formula: ε = Blv',
                'Step 4: ε = 0.5 × 0.1 × 2 = 0.1 V'
            ],
            answer: 'ε = 0.1 V = 100 mV',
            notes: 'Once the entire loop is inside the uniform field, the flux through it remains constant and the induced EMF becomes zero. EMF is non-zero only while the loop is partially inside the field (entering or leaving).'
        },
        {
            id: 3,
            exam: 'jee-advanced',
            chapter: 'Wave Optics',
            topic: 'Single Slit Diffraction',
            difficulty: 'moderate',
            year: '2023',
            question: 'Monochromatic light of wavelength 600 nm passes through a single slit of width 0.1 mm. The diffraction pattern is observed on a screen placed 1 m away. Find the width of the central maximum.',
            given: 'Given: Wavelength λ = 600 nm = 6 × 10⁻⁷ m, Slit width a = 0.1 mm = 1 × 10⁻⁴ m, Screen distance D = 1 m',
            required: 'Find: Width of central maximum w',
            formula: '$$w = \\frac{2\\lambda D}{a}$$',
            steps: [
                'Step 1: The first minimum in single slit diffraction occurs at sin θ = λ/a',
                'Step 2: For small angles, the position of first minimum: y = λD/a',
                'Step 3: The central maximum extends from −y to +y, so total width w = 2λD/a',
                'Step 4: w = 2 × 6 × 10⁻⁷ × 1 / (1 × 10⁻⁴) = 12 × 10⁻³ m = 12 mm'
            ],
            answer: 'w = 12 mm',
            notes: 'The central maximum in single slit diffraction is twice as wide as the secondary maxima. Decreasing the slit width increases the spread of the diffraction pattern.'
        },
        {
            id: 4,
            exam: 'jee-advanced',
            chapter: 'Fluid Mechanics',
            topic: 'Equation of Continuity',
            difficulty: 'easy',
            year: '2022',
            question: 'Water flows through a horizontal pipe that narrows from a cross-sectional area of 10 cm² to 5 cm². If the speed of water in the wider section is 2 m/s, find the speed in the narrower section.',
            given: 'Given: A₁ = 10 cm² = 10 × 10⁻⁴ m², v₁ = 2 m/s, A₂ = 5 cm² = 5 × 10⁻⁴ m²',
            required: 'Find: Speed v₂ in the narrower section',
            formula: '$$A_1 v_1 = A_2 v_2$$',
            steps: [
                'Step 1: Apply the equation of continuity for incompressible fluids: A₁v₁ = A₂v₂',
                'Step 2: Substitute: 10 × 2 = 5 × v₂',
                'Step 3: v₂ = 20/5 = 4 m/s'
            ],
            answer: 'v₂ = 4 m/s',
            notes: 'The equation of continuity is a direct consequence of conservation of mass for incompressible flow. When the cross-section halves, the speed doubles. This principle is used in Venturi meters and carburetors.'
        },
        {
            id: 5,
            exam: 'jee-advanced',
            chapter: 'Gravitation',
            topic: 'Orbital Velocity',
            difficulty: 'moderate',
            year: '2023',
            question: 'A satellite orbits the Earth at a height h equal to the radius of the Earth (h = R). Find the orbital velocity of the satellite. Take g = 9.8 m/s² and R = 6.4 × 10⁶ m.',
            given: 'Given: h = R = 6.4 × 10⁶ m, g = 9.8 m/s², Total orbital radius r = R + h = 2R',
            required: 'Find: Orbital velocity v₀',
            formula: '$$v_0 = \\sqrt{\\frac{gR^2}{r}} = \\sqrt{\\frac{gR^2}{2R}} = \\sqrt{\\frac{gR}{2}}$$',
            steps: [
                'Step 1: Gravitational force provides centripetal force: GMm/r² = mv²/r',
                'Step 2: v² = GM/r. Since GM = gR², we get v² = gR²/r',
                'Step 3: At height h = R, the orbital radius r = R + R = 2R',
                'Step 4: v² = gR²/(2R) = gR/2 = 9.8 × 6.4 × 10⁶ / 2',
                'Step 5: v = √(31.36 × 10⁶) = 5.6 × 10³ m/s = 5.6 km/s'
            ],
            answer: 'v₀ ≈ 5.6 km/s',
            notes: 'The orbital velocity at Earth\'s surface (h = 0) is about 7.9 km/s. As altitude increases, orbital velocity decreases. Geostationary satellites at h ≈ 5.6R orbit at about 3.07 km/s.'
        }
    ],

    // ===== NEET — 5 Problems =================================================
    'neet': [
        {
            id: 1,
            exam: 'neet',
            chapter: 'Mechanics',
            topic: 'Simple Harmonic Motion',
            difficulty: 'easy',
            year: '2023',
            question: 'A block of mass 0.5 kg is attached to a spring of spring constant k = 200 N/m. The block is displaced from its equilibrium position and released. Find the time period of oscillation.',
            given: 'Given: Mass m = 0.5 kg, Spring constant k = 200 N/m',
            required: 'Find: Time period T of oscillation',
            formula: '$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$',
            steps: [
                'Step 1: The time period of a mass-spring system is T = 2π√(m/k)',
                'Step 2: Substitute: T = 2π√(0.5/200) = 2π√(0.0025)',
                'Step 3: T = 2π × 0.05 = 2 × 3.1416 × 0.05',
                'Step 4: T = 0.314 s'
            ],
            answer: 'T ≈ 0.314 s',
            notes: 'The time period of SHM depends only on m and k, and is independent of the amplitude. This is a defining characteristic of simple harmonic motion. Commonly tested in NEET.'
        },
        {
            id: 2,
            exam: 'neet',
            chapter: 'Ray Optics',
            topic: 'Concave Mirror',
            difficulty: 'easy',
            year: '2022',
            question: 'An object is placed 15 cm in front of a concave mirror of focal length 10 cm. Find the position, nature, and magnification of the image.',
            given: 'Given: Object distance u = −15 cm (sign convention), Focal length f = −10 cm (concave mirror)',
            required: 'Find: Image distance v, nature, and magnification m',
            formula: '$$\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$$',
            steps: [
                'Step 1: Apply mirror formula: 1/v + 1/u = 1/f',
                'Step 2: 1/v + 1/(−15) = 1/(−10)',
                'Step 3: 1/v = −1/10 + 1/15 = (−3 + 2)/30 = −1/30',
                'Step 4: v = −30 cm (negative sign → real image, same side as object)',
                'Step 5: Magnification m = −v/u = −(−30)/(−15) = −2 (inverted and magnified)'
            ],
            answer: 'v = −30 cm, real, inverted image with magnification |m| = 2',
            notes: 'When the object is between the centre of curvature (C) and the focus (F) of a concave mirror, the image is real, inverted, and magnified. This arrangement is used in shaving/makeup mirrors at close range.'
        },
        {
            id: 3,
            exam: 'neet',
            chapter: 'Current Electricity',
            topic: 'Parallel Combination of Resistors',
            difficulty: 'moderate',
            year: '2023',
            question: 'Three resistors of 2 Ω, 3 Ω and 6 Ω are connected in parallel. Find the equivalent resistance of the combination.',
            given: 'Given: R₁ = 2 Ω, R₂ = 3 Ω, R₃ = 6 Ω, connected in parallel',
            required: 'Find: Equivalent resistance R_eq',
            formula: '$$\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$$',
            steps: [
                'Step 1: For parallel combination: 1/R_eq = 1/R₁ + 1/R₂ + 1/R₃',
                'Step 2: 1/R_eq = 1/2 + 1/3 + 1/6',
                'Step 3: Find LCM of 2, 3, 6 → LCM = 6',
                'Step 4: 1/R_eq = 3/6 + 2/6 + 1/6 = 6/6 = 1',
                'Step 5: R_eq = 1 Ω'
            ],
            answer: 'R_eq = 1 Ω',
            notes: 'The equivalent resistance of a parallel combination is always less than the smallest individual resistance. Here, R_eq = 1 Ω < 2 Ω (the smallest resistor). This is a very commonly asked NEET problem.'
        },
        {
            id: 4,
            exam: 'neet',
            chapter: 'Atomic Physics',
            topic: 'Hydrogen Spectrum – Balmer Series',
            difficulty: 'easy',
            year: '2022',
            question: 'Calculate the wavelength of light emitted when a hydrogen atom makes a transition from n = 3 to n = 2 energy level. (Rydberg constant R = 1.097 × 10⁷ m⁻¹)',
            given: 'Given: n₁ = 2, n₂ = 3, R = 1.097 × 10⁷ m⁻¹',
            required: 'Find: Wavelength λ of emitted photon',
            formula: '$$\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$$',
            steps: [
                'Step 1: Apply the Rydberg formula: 1/λ = R(1/n₁² − 1/n₂²)',
                'Step 2: 1/λ = 1.097 × 10⁷ × (1/4 − 1/9)',
                'Step 3: 1/4 − 1/9 = (9 − 4)/36 = 5/36',
                'Step 4: 1/λ = 1.097 × 10⁷ × 5/36 = 1.524 × 10⁶ m⁻¹',
                'Step 5: λ = 1 / (1.524 × 10⁶) = 656.3 × 10⁻⁹ m = 656 nm'
            ],
            answer: 'λ ≈ 656 nm (red light — Hα line of Balmer series)',
            notes: 'The transition from n = 3 → n = 2 produces the first line of the Balmer series (Hα), which falls in the visible red region. This is the most prominent line in the hydrogen emission spectrum.'
        },
        {
            id: 5,
            exam: 'neet',
            chapter: 'Heat & Thermodynamics',
            topic: 'Calorimetry – Ice-Water Mixing',
            difficulty: 'moderate',
            year: '2023',
            question: '100 g of ice at 0°C is mixed with 200 g of water at 50°C in a calorimeter. Find the final temperature of the mixture. (Latent heat of fusion L = 80 cal/g, Specific heat of water c = 1 cal/g·°C)',
            given: 'Given: m_ice = 100 g at 0°C, m_water = 200 g at 50°C, L = 80 cal/g, c = 1 cal/g·°C',
            required: 'Find: Final equilibrium temperature T_f',
            formula: '$$m_{ice} \\cdot L + m_{ice} \\cdot c \\cdot T_f = m_{water} \\cdot c \\cdot (50 - T_f)$$',
            steps: [
                'Step 1: Heat needed to melt all ice: Q_melt = m_ice × L = 100 × 80 = 8000 cal',
                'Step 2: Heat available from water cooling to 0°C: Q_avail = 200 × 1 × 50 = 10000 cal',
                'Step 3: Since Q_avail (10000) > Q_melt (8000), all ice melts. Remaining heat = 10000 − 8000 = 2000 cal',
                'Step 4: This remaining heat warms the total water (100 + 200 = 300 g) from 0°C to T_f',
                'Step 5: 2000 = 300 × 1 × T_f → T_f = 2000/300 = 6.67°C'
            ],
            answer: 'T_f ≈ 6.67°C',
            notes: 'Always first check whether the available heat is sufficient to melt all the ice. If not, the final temperature would be 0°C with some ice remaining. Here, all ice melts and the mixture equilibrates above 0°C.'
        }
    ],

    // ===== IIT JAM PHYSICS — 5 Problems ======================================
    'jam-physics': [
        {
            id: 1,
            exam: 'jam-physics',
            chapter: 'Classical Mechanics',
            topic: 'Lagrangian Mechanics',
            difficulty: 'moderate',
            year: null,
            question: 'Using the Lagrangian formulation, derive the equation of motion for a simple pendulum of length l and mass m. Write the Lagrangian and apply the Euler–Lagrange equation.',
            given: 'Given: Pendulum of length l, mass m, gravitational acceleration g. Generalized coordinate: angle θ',
            required: 'Find: Equation of motion using Lagrangian mechanics',
            formula: '$$L = T - V = \\frac{1}{2}ml^2\\dot{\\theta}^2 + mgl\\cos\\theta$$',
            steps: [
                'Step 1: Kinetic energy T = ½m(lθ̇)² = ½ml²θ̇²',
                'Step 2: Potential energy V = −mgl cos θ (taking lowest point as reference gives V = mgl(1 − cos θ), but using pivot as reference: V = −mgl cos θ)',
                'Step 3: Lagrangian L = T − V = ½ml²θ̇² + mgl cos θ',
                'Step 4: Euler–Lagrange equation: d/dt(∂L/∂θ̇) − ∂L/∂θ = 0',
                'Step 5: ∂L/∂θ̇ = ml²θ̇ → d/dt(ml²θ̇) = ml²θ̈',
                'Step 6: ∂L/∂θ = −mgl sin θ',
                'Step 7: ml²θ̈ + mgl sin θ = 0 → θ̈ + (g/l) sin θ = 0'
            ],
            answer: 'θ̈ + (g/l) sin θ = 0; for small oscillations sin θ ≈ θ, giving SHM with ω = √(g/l)',
            notes: 'The Lagrangian approach is powerful because it works naturally with generalized coordinates and avoids the need to resolve forces. For small angles, this reduces to θ̈ + (g/l)θ = 0 with period T = 2π√(l/g).'
        },
        {
            id: 2,
            exam: 'jam-physics',
            chapter: 'Quantum Mechanics',
            topic: 'Particle in a Box',
            difficulty: 'moderate',
            year: null,
            question: 'An electron is confined in a one-dimensional infinite potential well (particle in a box) of width L = 2 nm. Calculate the energy gap between the ground state (n=1) and the first excited state (n=2).',
            given: 'Given: L = 2 nm = 2 × 10⁻⁹ m, m_e = 9.109 × 10⁻³¹ kg, ℏ = 1.055 × 10⁻³⁴ J·s',
            required: 'Find: Energy gap ΔE = E₂ − E₁',
            formula: '$$E_n = \\frac{n^2 \\pi^2 \\hbar^2}{2mL^2}, \\quad \\Delta E = \\frac{3\\pi^2\\hbar^2}{2mL^2}$$',
            steps: [
                'Step 1: Energy levels: Eₙ = n²π²ℏ²/(2mL²)',
                'Step 2: ΔE = E₂ − E₁ = (4 − 1)π²ℏ²/(2mL²) = 3π²ℏ²/(2mL²)',
                'Step 3: Numerator: 3 × (3.1416)² × (1.055 × 10⁻³⁴)² = 3 × 9.87 × 1.113 × 10⁻⁶⁸ = 3.295 × 10⁻⁶⁷ J²·s²',
                'Step 4: Denominator: 2 × 9.109 × 10⁻³¹ × (2 × 10⁻⁹)² = 2 × 9.109 × 10⁻³¹ × 4 × 10⁻¹⁸ = 7.287 × 10⁻⁴⁸ kg·m²',
                'Step 5: ΔE = 3.295 × 10⁻⁶⁷ / 7.287 × 10⁻⁴⁸ = 4.52 × 10⁻²⁰ J ≈ 0.283 eV'
            ],
            answer: 'ΔE ≈ 0.283 eV',
            notes: 'The energy levels of a particle in a box scale as n². The spacing increases with n, unlike the harmonic oscillator where spacing is constant. Smaller box → larger energy gap (quantum confinement).'
        },
        {
            id: 3,
            exam: 'jam-physics',
            chapter: 'EM Theory',
            topic: 'Electric Field of Infinite Line Charge',
            difficulty: 'advanced',
            year: null,
            question: 'An infinitely long straight wire carries a uniform linear charge density λ = 10 nC/m. Using Gauss\'s law, find the electric field at a perpendicular distance r = 5 cm from the wire.',
            given: 'Given: λ = 10 nC/m = 10 × 10⁻⁹ C/m, r = 5 cm = 0.05 m, ε₀ = 8.854 × 10⁻¹² C²/(N·m²)',
            required: 'Find: Electric field E at distance r',
            formula: '$$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$$',
            steps: [
                'Step 1: Choose a cylindrical Gaussian surface of radius r and length L, coaxial with the wire.',
                'Step 2: By symmetry, E is radially outward and constant on the curved surface. Flux through flat caps is zero.',
                'Step 3: Gauss\'s law: ∮ E⃗·dA⃗ = Q_enc/ε₀ → E(2πrL) = λL/ε₀',
                'Step 4: E = λ/(2πε₀r) = 10 × 10⁻⁹ / (2π × 8.854 × 10⁻¹² × 0.05)',
                'Step 5: E = 10⁻⁸ / (2.783 × 10⁻¹²) = 3593 V/m ≈ 3.6 kV/m'
            ],
            answer: 'E ≈ 3593 V/m ≈ 3.6 kV/m, directed radially outward',
            notes: 'The electric field of an infinite line charge falls off as 1/r (not 1/r² as for a point charge). This is because the field lines spread in two dimensions only (cylindrical symmetry), not three.'
        },
        {
            id: 4,
            exam: 'jam-physics',
            chapter: 'Thermodynamics & Statistics',
            topic: 'Ideal Gas Heat Capacities',
            difficulty: 'easy',
            year: null,
            question: 'For one mole of an ideal monatomic gas, the molar heat capacity at constant volume is Cᵥ = 3R/2. Find the molar heat capacity at constant pressure Cₚ and the adiabatic index γ.',
            given: 'Given: Cᵥ = 3R/2 for monatomic ideal gas, R = 8.314 J/(mol·K)',
            required: 'Find: Cₚ and γ = Cₚ/Cᵥ',
            formula: '$$C_p = C_v + R, \\quad \\gamma = \\frac{C_p}{C_v}$$',
            steps: [
                'Step 1: Apply Mayer\'s relation: Cₚ − Cᵥ = R (for any ideal gas)',
                'Step 2: Cₚ = Cᵥ + R = 3R/2 + R = 5R/2',
                'Step 3: In SI units: Cₚ = 5 × 8.314/2 = 20.785 J/(mol·K)',
                'Step 4: γ = Cₚ/Cᵥ = (5R/2)/(3R/2) = 5/3 ≈ 1.667'
            ],
            answer: 'Cₚ = 5R/2 ≈ 20.8 J/(mol·K), γ = 5/3 ≈ 1.667',
            notes: 'Monatomic gases (He, Ne, Ar) have γ = 5/3. Diatomic gases at moderate temperatures have γ = 7/5 = 1.4 (e.g., N₂, O₂). The value of γ determines the speed of sound and adiabatic processes.'
        },
        {
            id: 5,
            exam: 'jam-physics',
            chapter: 'Oscillations & Waves',
            topic: 'Springs in Series',
            difficulty: 'easy',
            year: null,
            question: 'Two springs with spring constants k₁ = 100 N/m and k₂ = 200 N/m are connected in series. Find the effective spring constant of the combination.',
            given: 'Given: k₁ = 100 N/m, k₂ = 200 N/m, connected in series',
            required: 'Find: Effective spring constant k_eff',
            formula: '$$\\frac{1}{k_{eff}} = \\frac{1}{k_1} + \\frac{1}{k_2}$$',
            steps: [
                'Step 1: For springs in series, the reciprocal of effective k is the sum of reciprocals.',
                'Step 2: 1/k_eff = 1/k₁ + 1/k₂ = 1/100 + 1/200',
                'Step 3: 1/k_eff = 2/200 + 1/200 = 3/200',
                'Step 4: k_eff = 200/3 = 66.67 N/m'
            ],
            answer: 'k_eff ≈ 66.7 N/m',
            notes: 'Springs in series are softer (lower k) than either individual spring, similar to resistors in parallel. Springs in parallel add directly: k_eff = k₁ + k₂. This analogy with electrical circuits is useful to remember.'
        }
    ],

    // ===== IIT JAM CHEMISTRY — 5 Problems ====================================
    'jam-chemistry': [
        {
            id: 1,
            exam: 'jam-chemistry',
            chapter: 'Chemical Thermodynamics',
            topic: 'Gibbs Free Energy',
            difficulty: 'easy',
            year: null,
            question: 'For the combustion of hydrogen: H₂(g) + ½O₂(g) → H₂O(l), ΔH = −285.8 kJ/mol and ΔS = −0.163 kJ/(mol·K) at 298 K. Calculate the Gibbs free energy change ΔG.',
            given: 'Given: ΔH = −285.8 kJ/mol, ΔS = −0.163 kJ/(mol·K), T = 298 K',
            required: 'Find: ΔG for the reaction',
            formula: '$$\\Delta G = \\Delta H - T\\Delta S$$',
            steps: [
                'Step 1: Apply the Gibbs–Helmholtz equation: ΔG = ΔH − TΔS',
                'Step 2: ΔG = −285.8 − (298)(−0.163)',
                'Step 3: ΔG = −285.8 + 48.57',
                'Step 4: ΔG = −237.2 kJ/mol'
            ],
            answer: 'ΔG = −237.2 kJ/mol',
            notes: 'A negative ΔG indicates a spontaneous reaction. Despite the decrease in entropy (ΔS < 0, as gas → liquid), the large exothermic enthalpy drives the reaction spontaneously at 298 K. This is the standard free energy of formation of liquid water.'
        },
        {
            id: 2,
            exam: 'jam-chemistry',
            chapter: 'Chemical Kinetics',
            topic: 'First Order Half-Life',
            difficulty: 'moderate',
            year: null,
            question: 'A first-order reaction has a rate constant k = 0.0693 min⁻¹. Calculate the half-life of the reaction and the time required for 75% completion.',
            given: 'Given: Rate constant k = 0.0693 min⁻¹, first-order reaction',
            required: 'Find: Half-life t₁/₂ and time for 75% completion',
            formula: '$$t_{1/2} = \\frac{0.693}{k}, \\quad t = \\frac{2.303}{k}\\log\\frac{[A]_0}{[A]}$$',
            steps: [
                'Step 1: Half-life: t₁/₂ = 0.693/k = 0.693/0.0693 = 10 min',
                'Step 2: For 75% completion, 25% remains: [A] = 0.25[A]₀',
                'Step 3: t = (2.303/k) × log([A]₀/[A]) = (2.303/0.0693) × log(1/0.25)',
                'Step 4: t = 33.24 × log(4) = 33.24 × 0.602 = 20 min',
                'Step 5: Alternatively, 75% completion = 2 half-lives: t = 2 × 10 = 20 min ✓'
            ],
            answer: 't₁/₂ = 10 min; time for 75% completion = 20 min',
            notes: 'For a first-order reaction, the half-life is independent of initial concentration. 75% completion equals exactly 2 half-lives, 87.5% = 3 half-lives, and so on. Each half-life halves the remaining amount.'
        },
        {
            id: 3,
            exam: 'jam-chemistry',
            chapter: 'Quantum Chemistry',
            topic: 'Particle in a Box – Transition Wavelength',
            difficulty: 'moderate',
            year: null,
            question: 'An electron is confined in a one-dimensional box of length L = 1 nm. Calculate the wavelength of the photon emitted when the electron transitions from n = 2 to n = 1.',
            given: 'Given: L = 1 nm = 10⁻⁹ m, m_e = 9.109 × 10⁻³¹ kg, h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s',
            required: 'Find: Wavelength λ of emitted photon',
            formula: '$$\\Delta E = \\frac{3h^2}{8mL^2}, \\quad \\lambda = \\frac{hc}{\\Delta E}$$',
            steps: [
                'Step 1: Energy of level n: Eₙ = n²h²/(8mL²)',
                'Step 2: ΔE = E₂ − E₁ = (4−1)h²/(8mL²) = 3h²/(8mL²)',
                'Step 3: ΔE = 3 × (6.626×10⁻³⁴)² / (8 × 9.109×10⁻³¹ × (10⁻⁹)²)',
                'Step 4: ΔE = 3 × 4.39×10⁻⁶⁷ / (7.287×10⁻⁴⁸) = 1.81 × 10⁻¹⁹ J = 1.13 eV',
                'Step 5: λ = hc/ΔE = (6.626×10⁻³⁴ × 3×10⁸) / 1.81×10⁻¹⁹ = 1.098 × 10⁻⁶ m ≈ 1098 nm (near-IR)'
            ],
            answer: 'λ ≈ 1098 nm (near-infrared)',
            notes: 'This photon falls in the near-infrared region. The particle-in-a-box model, while simple, provides useful qualitative insights into conjugated molecules and quantum dots where confinement effects are significant.'
        },
        {
            id: 4,
            exam: 'jam-chemistry',
            chapter: 'Electrochemistry',
            topic: 'Standard Free Energy from Cell Potential',
            difficulty: 'easy',
            year: null,
            question: 'A galvanic cell has a standard cell potential E°_cell = 1.1 V and the cell reaction involves the transfer of 2 electrons. Calculate the standard Gibbs free energy change ΔG°.',
            given: 'Given: E°_cell = 1.1 V, n = 2 (electrons transferred), F = 96485 C/mol',
            required: 'Find: ΔG° for the cell reaction',
            formula: '$$\\Delta G^\\circ = -nFE^\\circ_{cell}$$',
            steps: [
                'Step 1: Apply the relation ΔG° = −nFE°',
                'Step 2: ΔG° = −2 × 96485 × 1.1',
                'Step 3: ΔG° = −2 × 106133.5',
                'Step 4: ΔG° = −212267 J = −212.3 kJ/mol'
            ],
            answer: 'ΔG° = −212.3 kJ/mol',
            notes: 'The negative ΔG° confirms that the galvanic cell reaction is spontaneous under standard conditions. This is the Daniell cell (Zn-Cu) standard potential. The equilibrium constant can be found from: ln K = nFE°/(RT).'
        },
        {
            id: 5,
            exam: 'jam-chemistry',
            chapter: 'Solutions',
            topic: 'Molality and Boiling Point Elevation',
            difficulty: 'easy',
            year: null,
            question: '18 g of glucose (C₆H₁₂O₆, M = 180 g/mol) is dissolved in 1 kg of water. Find the molality of the solution and the elevation in boiling point. (Kb for water = 0.512 °C/m)',
            given: 'Given: Mass of glucose = 18 g, Molar mass M = 180 g/mol, Mass of solvent = 1 kg, Kb = 0.512 °C·kg/mol',
            required: 'Find: Molality m and boiling point elevation ΔTb',
            formula: '$$m = \\frac{\\text{moles of solute}}{\\text{mass of solvent (kg)}}, \\quad \\Delta T_b = K_b \\cdot m$$',
            steps: [
                'Step 1: Moles of glucose = mass/molar mass = 18/180 = 0.1 mol',
                'Step 2: Molality m = moles/kg of solvent = 0.1/1 = 0.1 mol/kg',
                'Step 3: Boiling point elevation: ΔTb = Kb × m = 0.512 × 0.1',
                'Step 4: ΔTb = 0.0512 °C',
                'Step 5: New boiling point = 100 + 0.0512 = 100.0512 °C'
            ],
            answer: 'Molality = 0.1 m; ΔTb = 0.0512 °C',
            notes: 'Glucose is a non-electrolyte, so the van\'t Hoff factor i = 1. For electrolytes like NaCl, ΔTb = i·Kb·m where i ≈ 2 (accounting for dissociation into Na⁺ and Cl⁻ ions).'
        }
    ],

    // ===== CSIR-UGC NET PHYSICS — 5 Problems ================================
    'csir-net': [
        {
            id: 1,
            exam: 'csir-net',
            chapter: 'Mathematical Physics',
            topic: 'Contour Integration – Cauchy Residue Theorem',
            difficulty: 'moderate',
            year: null,
            question: 'Evaluate the contour integral ∮ dz/(z² + 1) around the circle |z| = 2 in the complex plane, traversed counterclockwise.',
            given: 'Given: f(z) = 1/(z² + 1), contour C: |z| = 2 (counterclockwise)',
            required: 'Find: ∮_C dz/(z² + 1)',
            formula: '$$\\oint_C \\frac{dz}{z^2+1} = 2\\pi i \\sum \\text{Res}(f, z_k)$$',
            steps: [
                'Step 1: Factor the denominator: z² + 1 = (z − i)(z + i)',
                'Step 2: Singularities at z = i and z = −i. Both lie inside |z| = 2.',
                'Step 3: Residue at z = i: Res(f, i) = lim_{z→i} (z−i)·1/((z−i)(z+i)) = 1/(2i)',
                'Step 4: Residue at z = −i: Res(f, −i) = lim_{z→−i} (z+i)·1/((z−i)(z+i)) = 1/(−2i) = −1/(2i)',
                'Step 5: Sum of residues = 1/(2i) + (−1/(2i)) = 0',
                'Step 6: ∮ dz/(z²+1) = 2πi × 0 = 0'
            ],
            answer: '∮ dz/(z² + 1) = 0',
            notes: 'When all singularities inside the contour have residues that sum to zero, the integral vanishes. Alternatively, note that 1/(z²+1) has an antiderivative arctan(z) which is single-valued on this contour, giving zero by the fundamental theorem.'
        },
        {
            id: 2,
            exam: 'csir-net',
            chapter: 'Quantum Mechanics',
            topic: 'Expectation Value in QHO',
            difficulty: 'advanced',
            year: null,
            question: 'For the ground state of a one-dimensional quantum harmonic oscillator with angular frequency ω, calculate the expectation value ⟨x²⟩.',
            given: 'Given: QHO ground state ψ₀(x) = (mω/πℏ)^(1/4) exp(−mωx²/2ℏ), angular frequency ω, mass m',
            required: 'Find: ⟨x²⟩ = ⟨ψ₀|x²|ψ₀⟩',
            formula: '$$\\langle x^2 \\rangle = \\frac{\\hbar}{2m\\omega}$$',
            steps: [
                'Step 1: Express x in terms of raising/lowering operators: x = √(ℏ/2mω)(a + a†)',
                'Step 2: x² = (ℏ/2mω)(a + a†)² = (ℏ/2mω)(a² + a†² + aa† + a†a)',
                'Step 3: ⟨0|a²|0⟩ = 0, ⟨0|a†²|0⟩ = 0, ⟨0|a†a|0⟩ = 0 (ground state has n=0)',
                'Step 4: ⟨0|aa†|0⟩ = ⟨0|(a†a + 1)|0⟩ = ⟨0|0⟩ = 1',
                'Step 5: ⟨x²⟩ = (ℏ/2mω)(0 + 0 + 1 + 0) = ℏ/(2mω)'
            ],
            answer: '⟨x²⟩ = ℏ/(2mω)',
            notes: 'This result is consistent with the uncertainty principle: ΔxΔp = ℏ/2 for the ground state (minimum uncertainty state). The ground-state energy E₀ = ½ℏω equals ½mω²⟨x²⟩ + ⟨p²⟩/(2m), with each contribution being ℏω/4.'
        },
        {
            id: 3,
            exam: 'csir-net',
            chapter: 'Statistical Mechanics',
            topic: 'Two-Level System',
            difficulty: 'moderate',
            year: null,
            question: 'A system has two non-degenerate energy levels with energies E = 0 and E = ε. Find the partition function Z and the mean energy ⟨E⟩ at temperature T.',
            given: 'Given: Two levels with energies 0 and ε, temperature T, Boltzmann constant k_B',
            required: 'Find: Partition function Z and mean energy ⟨E⟩',
            formula: '$$Z = \\sum_i e^{-\\beta E_i}, \\quad \\langle E \\rangle = -\\frac{\\partial \\ln Z}{\\partial \\beta}$$',
            steps: [
                'Step 1: Partition function: Z = e^{−β·0} + e^{−βε} = 1 + e^{−βε}, where β = 1/(k_BT)',
                'Step 2: Mean energy: ⟨E⟩ = (1/Z) Σ Eᵢ e^{−βEᵢ} = (0·1 + ε·e^{−βε}) / (1 + e^{−βε})',
                'Step 3: ⟨E⟩ = ε·e^{−βε} / (1 + e^{−βε}) = ε / (e^{βε} + 1)',
                'Step 4: At low T (βε ≫ 1): ⟨E⟩ → ε·e^{−ε/k_BT} ≈ 0 (system in ground state)',
                'Step 5: At high T (βε ≪ 1): ⟨E⟩ → ε/2 (equal population of both levels)'
            ],
            answer: 'Z = 1 + e^{−ε/k_BT}; ⟨E⟩ = ε/(e^{ε/k_BT} + 1)',
            notes: 'The two-level system is the simplest non-trivial statistical mechanics model. The mean energy expression has the form of the Fermi–Dirac distribution. The heat capacity of this system exhibits the famous Schottky anomaly — a peak at k_BT ≈ 0.42ε.'
        },
        {
            id: 4,
            exam: 'csir-net',
            chapter: 'Nuclear & Particle',
            topic: 'Alpha Decay Q-Value',
            difficulty: 'easy',
            year: null,
            question: 'Calculate the Q-value of the alpha decay: ²³⁸U → ²³⁴Th + ⁴He. Given atomic masses: M(²³⁸U) = 238.05079 u, M(²³⁴Th) = 234.04363 u, M(⁴He) = 4.00260 u.',
            given: 'Given: M(²³⁸U) = 238.05079 u, M(²³⁴Th) = 234.04363 u, M(⁴He) = 4.00260 u, 1 u = 931.5 MeV/c²',
            required: 'Find: Q-value of the alpha decay',
            formula: '$$Q = [M(\\text{parent}) - M(\\text{daughter}) - M(\\alpha)] \\times 931.5 \\text{ MeV}$$',
            steps: [
                'Step 1: Mass defect Δm = M(²³⁸U) − M(²³⁴Th) − M(⁴He)',
                'Step 2: Δm = 238.05079 − 234.04363 − 4.00260 = 0.00456 u',
                'Step 3: Q = Δm × 931.5 MeV/u = 0.00456 × 931.5',
                'Step 4: Q = 4.25 MeV'
            ],
            answer: 'Q ≈ 4.25 MeV',
            notes: 'The positive Q-value confirms that the decay is energetically favourable. This energy is shared between the alpha particle (kinetic energy ≈ 4.19 MeV) and the recoiling thorium nucleus (≈ 0.07 MeV) according to conservation of momentum. ²³⁸U has a half-life of 4.47 × 10⁹ years.'
        },
        {
            id: 5,
            exam: 'csir-net',
            chapter: 'Condensed Matter',
            topic: 'Free Electron Fermi Energy',
            difficulty: 'moderate',
            year: null,
            question: 'Calculate the Fermi energy of sodium metal using the free electron model. The number density of conduction electrons in sodium is n = 2.65 × 10²⁸ m⁻³.',
            given: 'Given: n = 2.65 × 10²⁸ m⁻³, ℏ = 1.055 × 10⁻³⁴ J·s, m_e = 9.109 × 10⁻³¹ kg',
            required: 'Find: Fermi energy E_F',
            formula: '$$E_F = \\frac{\\hbar^2}{2m_e}(3\\pi^2 n)^{2/3}$$',
            steps: [
                'Step 1: Calculate 3π²n = 3 × (3.1416)² × 2.65 × 10²⁸ = 3 × 9.87 × 2.65 × 10²⁸ = 7.846 × 10²⁹ m⁻³',
                'Step 2: (3π²n)^{2/3} = (7.846 × 10²⁹)^{2/3}',
                'Step 3: (7.846)^{2/3} ≈ 3.93 and (10²⁹)^{2/3} = 10^{19.33} ≈ 8.48 × 10¹⁹',
                'Step 4: ℏ²/(2m_e) = (1.055 × 10⁻³⁴)² / (2 × 9.109 × 10⁻³¹) = 1.113 × 10⁻⁶⁸ / 1.822 × 10⁻³⁰ = 6.11 × 10⁻³⁹ J·m²',
                'Step 5: E_F = 6.11 × 10⁻³⁹ × 3.93 × 8.48 × 10¹⁹ = 5.19 × 10⁻¹⁹ J ≈ 3.24 eV'
            ],
            answer: 'E_F ≈ 3.24 eV',
            notes: 'Sodium is a nearly free electron metal (one 3s electron per atom). The Fermi temperature T_F = E_F/k_B ≈ 37,600 K, far above room temperature, justifying the degenerate electron gas approximation. The Fermi velocity v_F = √(2E_F/m) ≈ 1.07 × 10⁶ m/s.'
        }
    ],

    // ===== GATE PHYSICS — 5 Problems =========================================
    'gate-physics': [
        {
            id: 1,
            exam: 'gate-physics',
            chapter: 'EM Theory',
            topic: 'Plane Electromagnetic Wave',
            difficulty: 'moderate',
            year: '2022',
            question: 'A plane electromagnetic wave has an electric field amplitude E₀ = 100 V/m. Find the magnetic field amplitude B₀ and the intensity of the wave.',
            given: 'Given: E₀ = 100 V/m, c = 3 × 10⁸ m/s, ε₀ = 8.854 × 10⁻¹² F/m',
            required: 'Find: Magnetic field amplitude B₀ and intensity I',
            formula: '$$B_0 = \\frac{E_0}{c}, \\quad I = \\frac{1}{2}\\varepsilon_0 c E_0^2$$',
            steps: [
                'Step 1: In an EM wave, E and B are related by: B₀ = E₀/c',
                'Step 2: B₀ = 100 / (3 × 10⁸) = 3.33 × 10⁻⁷ T = 0.333 μT',
                'Step 3: Intensity (time-averaged Poynting vector): I = ½ε₀cE₀²',
                'Step 4: I = ½ × 8.854 × 10⁻¹² × 3 × 10⁸ × (100)²',
                'Step 5: I = ½ × 8.854 × 10⁻¹² × 3 × 10⁸ × 10⁴ = 13.28 W/m²'
            ],
            answer: 'B₀ ≈ 3.33 × 10⁻⁷ T (0.333 μT); I ≈ 13.3 W/m²',
            notes: 'The electric and magnetic field energy densities are equal in an EM wave: ½ε₀E₀² = ½B₀²/μ₀. The intensity can also be written as I = E₀B₀/(2μ₀). These relations are fundamental in GATE EM theory questions.'
        },
        {
            id: 2,
            exam: 'gate-physics',
            chapter: 'Quantum Mechanics',
            topic: 'Hydrogen Atom – Radial Probability',
            difficulty: 'moderate',
            year: '2023',
            question: 'For the ground state (1s) of the hydrogen atom, calculate the probability of finding the electron within one Bohr radius a₀ from the nucleus.',
            given: 'Given: Ground state wavefunction ψ₁ₛ = (1/√π)(1/a₀)^{3/2} e^{−r/a₀}, Bohr radius a₀',
            required: 'Find: P(r ≤ a₀) = ∫₀^{a₀} |ψ|² 4πr² dr',
            formula: '$$P = \\frac{4}{a_0^3} \\int_0^{a_0} r^2 e^{-2r/a_0} dr$$',
            steps: [
                'Step 1: Radial probability density: P(r)dr = |ψ|² · 4πr² dr = (4/a₀³) r² e^{−2r/a₀} dr',
                'Step 2: Let x = 2r/a₀, then r = a₀x/2, dr = a₀dx/2. When r = a₀, x = 2.',
                'Step 3: P = (4/a₀³) × (a₀/2)³ ∫₀² x² e^{−x} (a₀/2) dx... Simplifying: P = ½ ∫₀² x² e^{−x} dx',
                'Step 4: ∫₀² x²e^{−x}dx = [−x²e^{−x}]₀² + 2∫₀² xe^{−x}dx = −4e⁻² + 2[−xe^{−x} + ∫e^{−x}dx]₀² = −4e⁻² + 2[−2e⁻² − e⁻² + 1] = −4e⁻² + 2(1 − 3e⁻²) = 2 − 10e⁻²',
                'Step 5: P = ½(2 − 10e⁻²) = 1 − 5e⁻² = 1 − 5(0.1353) = 1 − 0.677 = 0.323'
            ],
            answer: 'P(r ≤ a₀) ≈ 0.323 or 32.3%',
            notes: 'There is only about a 32% chance of finding the electron within one Bohr radius. The most probable radius (peak of radial probability) is r = a₀, but the mean radius ⟨r⟩ = 3a₀/2. This illustrates the spread of the quantum probability distribution.'
        },
        {
            id: 3,
            exam: 'gate-physics',
            chapter: 'Thermodynamics',
            topic: 'Free Expansion – Entropy Change',
            difficulty: 'easy',
            year: '2022',
            question: 'One mole of an ideal gas undergoes free expansion into vacuum, doubling its volume. Calculate the change in entropy of the gas.',
            given: 'Given: n = 1 mol, V₂ = 2V₁, Free expansion (irreversible), R = 8.314 J/(mol·K)',
            required: 'Find: Entropy change ΔS',
            formula: '$$\\Delta S = nR\\ln\\frac{V_2}{V_1}$$',
            steps: [
                'Step 1: In free expansion: Q = 0, W = 0, ΔU = 0 (for ideal gas, T is unchanged)',
                'Step 2: Since entropy is a state function, we compute ΔS via a reversible path between the same states.',
                'Step 3: Choose a reversible isothermal expansion from V₁ to V₂ at temperature T.',
                'Step 4: For this reversible path: ΔS = nR ln(V₂/V₁) = 1 × 8.314 × ln(2)',
                'Step 5: ΔS = 8.314 × 0.693 = 5.76 J/K'
            ],
            answer: 'ΔS = nR ln 2 ≈ 5.76 J/K',
            notes: 'Free expansion is irreversible, so ΔS_total > 0. Since no heat is exchanged with surroundings, ΔS_surroundings = 0, and the entire entropy increase is in the gas. This is a classic example of the second law of thermodynamics.'
        },
        {
            id: 4,
            exam: 'gate-physics',
            chapter: 'Solid State Physics',
            topic: 'BCC Nearest Neighbour Distance',
            difficulty: 'moderate',
            year: '2023',
            question: 'A body-centred cubic (BCC) crystal has a lattice constant a = 3.16 Å. Find the nearest-neighbour distance between atoms.',
            given: 'Given: Crystal structure: BCC, Lattice constant a = 3.16 Å = 3.16 × 10⁻¹⁰ m',
            required: 'Find: Nearest-neighbour distance d',
            formula: '$$d = \\frac{a\\sqrt{3}}{2}$$',
            steps: [
                'Step 1: In a BCC lattice, the nearest neighbour of the body-centre atom is at a corner.',
                'Step 2: The body diagonal of the cube has length a√3.',
                'Step 3: The nearest-neighbour distance is half the body diagonal: d = a√3/2',
                'Step 4: d = 3.16 × √3 / 2 = 3.16 × 1.732 / 2 = 5.473 / 2 = 2.737 Å'
            ],
            answer: 'd ≈ 2.74 Å',
            notes: 'In BCC, the coordination number is 8 (each atom has 8 nearest neighbours). For FCC, the nearest-neighbour distance is a/√2, and the coordination number is 12. Tungsten (W) is a common example of a BCC metal with a = 3.16 Å.'
        },
        {
            id: 5,
            exam: 'gate-physics',
            chapter: 'Nuclear Physics',
            topic: 'Nuclear Radius',
            difficulty: 'easy',
            year: '2021',
            question: 'Estimate the radius of the ⁵⁶Fe (iron-56) nucleus using the empirical nuclear radius formula.',
            given: 'Given: Mass number A = 56, R₀ = 1.2 fm = 1.2 × 10⁻¹⁵ m',
            required: 'Find: Nuclear radius R',
            formula: '$$R = R_0 A^{1/3}$$',
            steps: [
                'Step 1: Apply the empirical formula: R = R₀ × A^{1/3}',
                'Step 2: A^{1/3} = 56^{1/3} = (56)^{0.333}',
                'Step 3: 56^{1/3} ≈ 3.826 (since 3.826³ ≈ 56)',
                'Step 4: R = 1.2 × 3.826 = 4.59 fm'
            ],
            answer: 'R ≈ 4.59 fm (4.59 × 10⁻¹⁵ m)',
            notes: 'The nuclear radius scales as A^{1/3}, implying constant nuclear density ρ = 3m_p/(4πR₀³) ≈ 2.3 × 10¹⁷ kg/m³ across all nuclei. This extraordinary density is comparable to neutron star matter. ⁵⁶Fe has the highest binding energy per nucleon among all nuclides.'
        }
    ],

    // ===== CUET SCIENCE — 5 Problems =========================================
    'cuet-science': [
        {
            id: 1,
            exam: 'cuet-science',
            chapter: 'Mechanics',
            topic: 'Free Fall',
            difficulty: 'easy',
            year: null,
            question: 'An object is dropped from a height of 80 m. Neglecting air resistance, find the time it takes to reach the ground. (g = 9.8 m/s²)',
            given: 'Given: Height h = 80 m, Initial velocity u = 0 (dropped), g = 9.8 m/s²',
            required: 'Find: Time t to reach the ground',
            formula: '$$h = \\frac{1}{2}gt^2 \\implies t = \\sqrt{\\frac{2h}{g}}$$',
            steps: [
                'Step 1: Use the kinematic equation for free fall: h = ½gt² (since u = 0)',
                'Step 2: Solve for t: t = √(2h/g)',
                'Step 3: t = √(2 × 80 / 9.8) = √(160/9.8) = √(16.33)',
                'Step 4: t = 4.04 s'
            ],
            answer: 't ≈ 4.04 s',
            notes: 'In free fall, the velocity just before hitting the ground would be v = gt = 9.8 × 4.04 ≈ 39.6 m/s (about 143 km/h). In reality, air resistance would reduce this significantly for most objects.'
        },
        {
            id: 2,
            exam: 'cuet-science',
            chapter: 'Heat & Thermodynamics',
            topic: 'Heat Energy',
            difficulty: 'easy',
            year: null,
            question: '500 g of water is heated from 20°C to 80°C. Calculate the amount of heat energy required. (Specific heat of water c = 4.18 J/g·°C)',
            given: 'Given: Mass m = 500 g, Initial temperature T₁ = 20°C, Final temperature T₂ = 80°C, c = 4.18 J/(g·°C)',
            required: 'Find: Heat energy Q required',
            formula: '$$Q = mc\\Delta T$$',
            steps: [
                'Step 1: Temperature change: ΔT = T₂ − T₁ = 80 − 20 = 60°C',
                'Step 2: Apply Q = mcΔT',
                'Step 3: Q = 500 × 4.18 × 60',
                'Step 4: Q = 125,400 J = 125.4 kJ'
            ],
            answer: 'Q = 125,400 J = 125.4 kJ',
            notes: 'This is equivalent to about 30 food Calories (kcal). Water has one of the highest specific heat capacities of any common substance (4.18 J/g·°C), which is why it\'s used as a coolant and why coastal climates are milder.'
        },
        {
            id: 3,
            exam: 'cuet-science',
            chapter: 'Waves & Sound',
            topic: 'Harmonics of a Vibrating String',
            difficulty: 'easy',
            year: null,
            question: 'The fundamental frequency of a vibrating string is f₁ = 200 Hz. Find the frequencies of the second and third harmonics.',
            given: 'Given: Fundamental frequency f₁ = 200 Hz',
            required: 'Find: Second harmonic f₂ and third harmonic f₃',
            formula: '$$f_n = n \\cdot f_1$$',
            steps: [
                'Step 1: For a vibrating string, the nth harmonic has frequency fₙ = n × f₁',
                'Step 2: Second harmonic (first overtone): f₂ = 2 × f₁ = 2 × 200 = 400 Hz',
                'Step 3: Third harmonic (second overtone): f₃ = 3 × f₁ = 3 × 200 = 600 Hz'
            ],
            answer: 'f₂ = 400 Hz, f₃ = 600 Hz',
            notes: 'A vibrating string supports all harmonics (both odd and even). An open pipe also supports all harmonics, but a closed pipe supports only odd harmonics (f₁, 3f₁, 5f₁, ...). The fundamental frequency depends on length, tension, and linear mass density: f₁ = (1/2L)√(T/μ).'
        },
        {
            id: 4,
            exam: 'cuet-science',
            chapter: 'Electricity',
            topic: 'Ohm\'s Law and Power',
            difficulty: 'easy',
            year: null,
            question: 'A 12 V battery is connected across a resistor of 4 Ω. Find the current flowing through the resistor and the power dissipated.',
            given: 'Given: Voltage V = 12 V, Resistance R = 4 Ω',
            required: 'Find: Current I and Power P',
            formula: '$$I = \\frac{V}{R}, \\quad P = VI = I^2R = \\frac{V^2}{R}$$',
            steps: [
                'Step 1: Apply Ohm\'s law: I = V/R = 12/4 = 3 A',
                'Step 2: Power dissipated: P = V × I = 12 × 3 = 36 W',
                'Step 3: Verify: P = I²R = 9 × 4 = 36 W ✓',
                'Step 4: Also: P = V²/R = 144/4 = 36 W ✓'
            ],
            answer: 'I = 3 A, P = 36 W',
            notes: 'All three power formulas (P = VI, P = I²R, P = V²/R) give the same result. 36 W means the resistor converts 36 joules of electrical energy to heat every second. This is equivalent to a small light bulb.'
        },
        {
            id: 5,
            exam: 'cuet-science',
            chapter: 'Modern Physics',
            topic: 'Photoelectric Effect – Stopping Potential',
            difficulty: 'moderate',
            year: null,
            question: 'Ultraviolet light of wavelength 200 nm is incident on a metal surface with work function φ = 4.2 eV. Find the maximum kinetic energy of the emitted photoelectrons and the stopping potential.',
            given: 'Given: λ = 200 nm = 200 × 10⁻⁹ m, φ = 4.2 eV, h = 6.626 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s, 1 eV = 1.6 × 10⁻¹⁹ J',
            required: 'Find: Maximum KE and stopping potential V₀',
            formula: '$$KE_{\\max} = \\frac{hc}{\\lambda} - \\phi, \\quad eV_0 = KE_{\\max}$$',
            steps: [
                'Step 1: Energy of incident photon: E = hc/λ',
                'Step 2: Using hc = 1240 eV·nm: E = 1240/200 = 6.2 eV',
                'Step 3: Maximum KE: KE_max = E − φ = 6.2 − 4.2 = 2.0 eV',
                'Step 4: Stopping potential: eV₀ = KE_max, so V₀ = 2.0 eV / e = 2.0 V'
            ],
            answer: 'KE_max = 2.0 eV; Stopping potential V₀ = 2.0 V',
            notes: 'The stopping potential is numerically equal to the maximum KE in electron-volts. The shortcut hc = 1240 eV·nm is extremely useful for quick calculations. Photoemission occurs only when E > φ, i.e., λ < hc/φ = 1240/4.2 = 295 nm (UV threshold).'
        }
    ]
};


// ---------------------------------------------------------------------------
//  3. RENDERING & UTILITY FUNCTIONS
// ---------------------------------------------------------------------------

/** Current state for pagination and filtering */
let currentPage = 1;
const PROBLEMS_PER_PAGE = 6;
let filteredProblems = [];
let currentExamKey = '';

/**
 * Reads the 'exam' URL parameter and initialises the exam page.
 * Falls back to 'jee-main' if no valid exam is specified.
 */
function initExamPage() {
    const params = new URLSearchParams(window.location.search);
    currentExamKey = params.get('exam') || 'jee-main';

    const exam = EXAM_CONFIG[currentExamKey];
    if (!exam) {
        document.getElementById('exam-content').innerHTML =
            '<div class="error-state"><h2>Exam Not Found</h2><p>The requested exam does not exist.</p></div>';
        return;
    }

    // Set page title
    document.title = `${exam.title} — ${exam.subtitle || 'Numerical Solutions'} | JeetPhysics`;

    // Load problems for this exam
    filteredProblems = EXAM_PROBLEMS[currentExamKey] || [];
    currentPage = 1;

    // Render all sections
    renderExamHeader(exam);
    renderSidebar(exam);
    renderProblems(filteredProblems);
    initSearch();
    initFilters(exam);
}


/**
 * Renders the exam header: icon, title, subtitle, description, and stats.
 * @param {Object} exam — The exam configuration object.
 */
function renderExamHeader(exam) {
    const headerEl = document.getElementById('exam-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
        <div class="exam-header-card" style="--exam-color: ${exam.color}">
            <div class="exam-header-top">
                <span class="exam-icon">${exam.icon}</span>
                <div class="exam-title-block">
                    <h1 class="exam-title">${exam.title}</h1>
                    <p class="exam-subtitle">${exam.subtitle || 'Numerical Solutions'}</p>
                </div>
            </div>
            <p class="exam-description">${exam.description}</p>
            <div class="exam-stats">
                <div class="stat-item">
                    <span class="stat-value">${exam.stats.problems}+</span>
                    <span class="stat-label">Problems</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${exam.stats.topics}</span>
                    <span class="stat-label">Topics</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${exam.stats.years}</span>
                    <span class="stat-label">Years</span>
                </div>
            </div>
        </div>
    `;
}


/**
 * Renders the sidebar with popular questions, recent additions, quick links,
 * and a download section.
 * @param {Object} exam — The exam configuration object.
 */
function renderSidebar(exam) {
    const sidebarEl = document.getElementById('exam-sidebar');
    if (!sidebarEl) return;

    const problems = EXAM_PROBLEMS[currentExamKey] || [];

    // Popular questions — first 3 problems
    const popular = problems.slice(0, 3);
    const popularHTML = popular.map(p => `
        <div class="sidebar-question-item" onclick="scrollToProblem(${p.id})">
            <span class="sidebar-q-difficulty sidebar-q-${p.difficulty}">${p.difficulty}</span>
            <span class="sidebar-q-text">${p.topic}</span>
        </div>
    `).join('');

    // Recent questions — last 2 problems
    const recent = problems.slice(-2);
    const recentHTML = recent.map(p => `
        <div class="sidebar-question-item" onclick="scrollToProblem(${p.id})">
            <span class="sidebar-q-year">${p.year || 'Practice'}</span>
            <span class="sidebar-q-text">${p.topic}</span>
        </div>
    `).join('');

    // Quick links — chapter filters
    const quickLinksHTML = exam.chapters.slice(0, 5).map(ch => `
        <a href="#" class="sidebar-quick-link" onclick="event.preventDefault(); filterByChapter('${ch}')">${ch}</a>
    `).join('');

    sidebarEl.innerHTML = `
        <div class="sidebar-section">
            <h3 class="sidebar-heading">🔥 Popular Questions</h3>
            ${popularHTML}
        </div>
        <div class="sidebar-section">
            <h3 class="sidebar-heading">🕐 Recently Added</h3>
            ${recentHTML}
        </div>
        <div class="sidebar-section">
            <h3 class="sidebar-heading">⚡ Quick Links</h3>
            <div class="sidebar-links-list">
                ${quickLinksHTML}
            </div>
        </div>
        <div class="sidebar-section">
            <h3 class="sidebar-heading">📥 Downloads</h3>
            <div class="sidebar-download-card" style="--exam-color: ${exam.color}">
                <p>Download all <strong>${exam.title}</strong> solutions as PDF</p>
                <button class="btn-download" onclick="alert('PDF download coming soon!')">
                    Download PDF
                </button>
            </div>
        </div>
    `;
}


/**
 * Renders problem cards with expandable/collapsible solutions.
 * Includes pagination.
 * @param {Array} problems — Array of problem objects to render.
 */
function renderProblems(problems) {
    const container = document.getElementById('problems-container');
    if (!container) return;

    if (problems.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No problems found</h3>
                <p>Try changing your filters or search query.</p>
            </div>
        `;
        renderPagination(0);
        return;
    }

    // Get paginated subset
    const paginated = paginate(problems, currentPage, PROBLEMS_PER_PAGE);

    const cardsHTML = paginated.map(p => {
        const diffClass = `difficulty-${p.difficulty}`;
        const yearBadge = p.year ? `<span class="year-badge">${p.year}</span>` : '';

        const stepsHTML = p.steps.map((step, i) => `
            <div class="solution-step">
                <span class="step-number">${i + 1}</span>
                <span class="step-text">${step.replace(/^Step \d+:\s*/, '')}</span>
            </div>
        `).join('');

        return `
            <div class="problem-card" id="problem-${p.id}" data-chapter="${p.chapter}" data-difficulty="${p.difficulty}">
                <div class="problem-header">
                    <div class="problem-meta">
                        <span class="chapter-tag">${p.chapter}</span>
                        <span class="topic-tag">${p.topic}</span>
                        <span class="difficulty-tag ${diffClass}">${p.difficulty}</span>
                        ${yearBadge}
                    </div>
                    <span class="problem-id">#${p.id}</span>
                </div>

                <div class="problem-question">
                    <h3>${p.question}</h3>
                </div>

                <div class="problem-info-grid">
                    <div class="info-block given-block">
                        <h4>📋 Given</h4>
                        <p>${p.given}</p>
                    </div>
                    <div class="info-block required-block">
                        <h4>🎯 Required</h4>
                        <p>${p.required}</p>
                    </div>
                </div>

                <div class="formula-block">
                    <h4>📐 Formula</h4>
                    <div class="formula-content">${p.formula}</div>
                </div>

                <button class="btn-toggle-solution" onclick="toggleSolution(${p.id})">
                    <span class="toggle-icon" id="toggle-icon-${p.id}">▶</span>
                    Show Solution
                </button>

                <div class="solution-panel" id="solution-${p.id}" style="display: none;">
                    <h4>📝 Step-by-Step Solution</h4>
                    <div class="solution-steps">
                        ${stepsHTML}
                    </div>
                    <div class="answer-block">
                        <h4>✅ Answer</h4>
                        <p class="final-answer">${p.answer}</p>
                    </div>
                    <div class="notes-block">
                        <h4>💡 Notes</h4>
                        <p>${p.notes}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = cardsHTML;
    renderPagination(problems.length);

    // Render LaTeX with KaTeX if available
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(container, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}


/**
 * Filters problems by chapter, difficulty, and search query.
 * @param {string|null} chapter — Chapter name or null for all.
 * @param {string|null} difficulty — 'easy', 'moderate', 'advanced', or null.
 * @param {string|null} query — Search text or null.
 */
function filterProblems(chapter, difficulty, query) {
    let problems = EXAM_PROBLEMS[currentExamKey] || [];

    if (chapter && chapter !== 'all') {
        problems = problems.filter(p => p.chapter === chapter);
    }

    if (difficulty && difficulty !== 'all') {
        problems = problems.filter(p => p.difficulty === difficulty);
    }

    if (query && query.trim() !== '') {
        const q = query.toLowerCase().trim();
        problems = problems.filter(p =>
            p.question.toLowerCase().includes(q) ||
            p.topic.toLowerCase().includes(q) ||
            p.chapter.toLowerCase().includes(q) ||
            p.answer.toLowerCase().includes(q)
        );
    }

    filteredProblems = problems;
    currentPage = 1;
    renderProblems(filteredProblems);
}


/**
 * Returns a paginated slice of the problems array.
 * @param {Array} problems — Full array of problems.
 * @param {number} page — Current page number (1-indexed).
 * @param {number} perPage — Number of items per page.
 * @returns {Array} — Sliced array for the current page.
 */
function paginate(problems, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return problems.slice(start, end);
}


/**
 * Renders pagination controls below the problem cards.
 * @param {number} totalProblems — Total number of problems after filtering.
 */
function renderPagination(totalProblems) {
    const paginationEl = document.getElementById('pagination-controls');
    if (!paginationEl) return;

    const totalPages = Math.ceil(totalProblems / PROBLEMS_PER_PAGE);

    if (totalPages <= 1) {
        paginationEl.innerHTML = '';
        return;
    }

    let buttonsHTML = '';

    // Previous button
    buttonsHTML += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}"
                     onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
                     ‹ Prev
                   </button>`;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}"
                         onclick="goToPage(${i})">${i}</button>`;
    }

    // Next button
    buttonsHTML += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}"
                     onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
                     Next ›
                   </button>`;

    paginationEl.innerHTML = `<div class="pagination">${buttonsHTML}</div>`;
}


/**
 * Navigates to a specific page of problems.
 * @param {number} page — Target page number.
 */
function goToPage(page) {
    const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderProblems(filteredProblems);

    // Smooth scroll to top of problems area
    const container = document.getElementById('problems-container');
    if (container) {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


/**
 * Toggles the visibility of a problem's solution panel.
 * @param {number} id — The problem ID.
 */
function toggleSolution(id) {
    const panel = document.getElementById(`solution-${id}`);
    const icon = document.getElementById(`toggle-icon-${id}`);
    const btn = panel ? panel.previousElementSibling : null;

    if (!panel) return;

    const isHidden = panel.style.display === 'none';
    panel.style.display = isHidden ? 'block' : 'none';

    if (icon) {
        icon.textContent = isHidden ? '▼' : '▶';
    }
    if (btn) {
        btn.innerHTML = `<span class="toggle-icon" id="toggle-icon-${id}">${isHidden ? '▼' : '▶'}</span> ${isHidden ? 'Hide' : 'Show'} Solution`;
    }

    // Render math in newly visible solution
    if (isHidden && typeof renderMathInElement === 'function') {
        renderMathInElement(panel, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false
        });
    }
}


/**
 * Scrolls to a specific problem card by ID.
 * @param {number} id — The problem ID.
 */
function scrollToProblem(id) {
    const el = document.getElementById(`problem-${id}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-pulse');
        setTimeout(() => el.classList.remove('highlight-pulse'), 2000);
    }
}


/**
 * Convenience function: filter by chapter from sidebar quick links.
 * @param {string} chapter — Chapter name.
 */
function filterByChapter(chapter) {
    // Update active state on chapter filter buttons (if they exist)
    const chapterBtns = document.querySelectorAll('.chapter-filter-btn');
    chapterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.chapter === chapter);
    });

    filterProblems(chapter, getActiveDifficulty(), getSearchQuery());
}


/**
 * Initialises the search input with debounced filtering.
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let debounceTimer;

    searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            filterProblems(getActiveChapter(), getActiveDifficulty(), this.value);
        }, 300);
    });

    // Clear search on Escape
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterProblems(getActiveChapter(), getActiveDifficulty(), '');
        }
    });
}


/**
 * Initialises chapter and difficulty filter buttons.
 * @param {Object} exam — The exam configuration object.
 */
function initFilters(exam) {
    const filtersContainer = document.getElementById('filters-container');
    if (!filtersContainer) return;

    // Chapter filter buttons
    const chapterBtnsHTML = [`<button class="chapter-filter-btn active" data-chapter="all" onclick="handleChapterFilter(this)">All Chapters</button>`]
        .concat(exam.chapters.map(ch =>
            `<button class="chapter-filter-btn" data-chapter="${ch}" onclick="handleChapterFilter(this)">${ch}</button>`
        ))
        .join('');

    // Difficulty filter buttons
    const diffBtnsHTML = `
        <button class="diff-filter-btn active" data-difficulty="all" onclick="handleDifficultyFilter(this)">All Levels</button>
        <button class="diff-filter-btn" data-difficulty="easy" onclick="handleDifficultyFilter(this)">Easy</button>
        <button class="diff-filter-btn" data-difficulty="moderate" onclick="handleDifficultyFilter(this)">Moderate</button>
        <button class="diff-filter-btn" data-difficulty="advanced" onclick="handleDifficultyFilter(this)">Advanced</button>
    `;

    filtersContainer.innerHTML = `
        <div class="filter-group">
            <label class="filter-label">📚 Chapter</label>
            <div class="filter-buttons chapter-filters">${chapterBtnsHTML}</div>
        </div>
        <div class="filter-group">
            <label class="filter-label">📊 Difficulty</label>
            <div class="filter-buttons difficulty-filters">${diffBtnsHTML}</div>
        </div>
    `;
}


/**
 * Handler for chapter filter button clicks.
 * @param {HTMLElement} btn — The clicked button element.
 */
function handleChapterFilter(btn) {
    document.querySelectorAll('.chapter-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProblems(btn.dataset.chapter, getActiveDifficulty(), getSearchQuery());
}


/**
 * Handler for difficulty filter button clicks.
 * @param {HTMLElement} btn — The clicked button element.
 */
function handleDifficultyFilter(btn) {
    document.querySelectorAll('.diff-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProblems(getActiveChapter(), btn.dataset.difficulty, getSearchQuery());
}


// ---------------------------------------------------------------------------
//  HELPER FUNCTIONS — Get active filter values
// ---------------------------------------------------------------------------

/** @returns {string} Currently active chapter filter value. */
function getActiveChapter() {
    const active = document.querySelector('.chapter-filter-btn.active');
    return active ? active.dataset.chapter : 'all';
}

/** @returns {string} Currently active difficulty filter value. */
function getActiveDifficulty() {
    const active = document.querySelector('.diff-filter-btn.active');
    return active ? active.dataset.difficulty : 'all';
}

/** @returns {string} Current search input value. */
function getSearchQuery() {
    const input = document.getElementById('search-input');
    return input ? input.value : '';
}


// ---------------------------------------------------------------------------
//  4. DOM CONTENT LOADED — Bootstrap the exam page
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    initExamPage();
});
