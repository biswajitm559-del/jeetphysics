/* ============================================================
   JeetPhysics — B.Sc Honours Study Portal
   Main JavaScript — Data, Interactions & Animations
============================================================ */

'use strict';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const SUBJECTS = [
  // ── SEMESTER I ──
  {
    id: 'paper-1-math-physics-1',
    paperCode: 'Paper I',
    semester: 1,
    icon: '📐',
    iconBg: 'rgba(167,139,250,0.12)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: 'linear-gradient(90deg,#a78bfa,#f472b6)',
    glow: 'rgba(167,139,250,0.08)',
    title: 'Paper I: Mathematical Physics-I',
    difficulty: 'hard',
    desc: 'Calculus, vector differentiation & integration, orthogonal curvilinear coordinates, and first & second-order differential equations.',
    topics: ['Vector Calculus', 'Curvilinear Coordinates', 'Vector Integration Theorems', 'Differential Equations'],
    progress: 75,
    progressLabel: '75% covered',
    detail: {
      units: [
        'Unit I: Calculus & Vector Differentiation — Derivatives of vectors, gradient, divergence, curl and their physical significances.',
        'Unit II: Orthogonal Curvilinear Coordinates — Scale factors, expression for grad, div, curl, Laplacian in spherical & cylindrical coordinates.',
        'Unit III: Vector Integration & Integral Theorems — Line, surface & volume integrals; Gauss Divergence, Stokes, and Green\'s theorems.',
        'Unit IV: Differential Equations — First order ODEs, second order linear ODEs with constant & variable coefficients, singular points.'
      ],
      labComponent: 'Computational Physics Lab I: Plotting functions (sine, cosine, exponential), numerical differentiation & integration using Python/C++, error analysis.',
      downloadSlots: [
        { label: 'Paper I Syllabus PDF', file: 'Paper_I_Mathematical_Physics_I_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_I_Lecture_Notes.pdf' },
        { label: 'Lab Manual & Codes', file: 'Paper_I_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_I_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Mathematical Methods for Physicists', author: 'G. B. Arfken & H. J. Weber' },
        { title: 'Advanced Engineering Mathematics', author: 'E. Kreyszig' },
        { title: 'Mathematical Physics', author: 'H. K. Dass & R. Verma' }
      ],
      formulae: ['∇²φ = 0 (Laplace Equation)', '∮_C F·dl = ∬_S (∇×F)·dA (Stokes)', '∯_S F·dA = ∭_V (∇·F) dV (Gauss)']
    }
  },
  {
    id: 'paper-2-mechanics',
    paperCode: 'Paper II',
    semester: 1,
    icon: '⚙️',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
    accent: 'linear-gradient(90deg,#3b82f6,#22d3ee)',
    glow: 'rgba(59,130,246,0.08)',
    title: 'Paper II: Mechanics',
    difficulty: 'medium',
    desc: 'Rotational dynamics, elasticity, fluid motion, central force gravitation, simple harmonic oscillations, and Special Relativity.',
    topics: ['Rotational Dynamics', 'Elasticity & Fluids', 'Central Forces', 'Special Relativity'],
    progress: 80,
    progressLabel: '80% covered',
    detail: {
      units: [
        'Unit I: Rotational Dynamics & Elasticity — Moment of inertia, parallel and perpendicular axes theorems, moment of inertia of symmetrical bodies, elastic constants Y, K, η, σ and relations.',
        'Unit II: Fluid Motion & Gravitation — Poiseuille\'s formula, Stokes\' law, central forces, Kepler\'s laws of planetary motion, gravitational potential and field.',
        'Unit III: Oscillations & Non-Inertial Systems — Damped and forced harmonic oscillations, resonance, Q-factor, fictitious forces, Coriolis force and applications.',
        'Unit IV: Special Theory of Relativity — Michelson-Morley experiment, Postulates of STR, Lorentz transformations, length contraction, time dilation, mass-energy equivalence E=mc².'
      ],
      labComponent: 'Mechanics Lab: Determination of Young\'s Modulus by Searle\'s / bending method, Rigidity modulus by Maxwell\'s needle, Moment of Inertia by Flywheel, Viscosity by Poiseuille\'s method.',
      downloadSlots: [
        { label: 'Paper II Syllabus PDF', file: 'Paper_II_Mechanics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_II_Lecture_Notes.pdf' },
        { label: 'Mechanics Lab Manual', file: 'Paper_II_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_II_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'An Introduction to Mechanics', author: 'D. Kleppner & R. Kolenkow' },
        { title: 'Mechanics', author: 'D. S. Mathur' },
        { title: 'Introduction to Special Relativity', author: 'R. Resnick' }
      ],
      formulae: ['I = ∫ r² dm', 'T² = (4π²/GM) a³', 'x\' = γ(x - vt), t\' = γ(t - vx/c²)', 'E = mc² = γm₀c²']
    }
  },

  // ── SEMESTER II ──
  {
    id: 'paper-3-em',
    paperCode: 'Paper III',
    semester: 2,
    icon: '⚡',
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.25)',
    accent: 'linear-gradient(90deg,#f59e0b,#fb923c)',
    glow: 'rgba(245,158,11,0.08)',
    title: 'Paper III: Electricity and Magnetism',
    difficulty: 'hard',
    desc: 'Electrostatics, Gauss law, Laplace equation, magnetostatics, Biot-Savart & Ampere laws, EM induction, transient currents, and AC circuits.',
    topics: ['Electrostatics', 'Magnetostatics', 'EM Induction', 'Transient & AC Circuits'],
    progress: 70,
    progressLabel: '70% covered',
    detail: {
      units: [
        'Unit I: Electrostatics — Electric field, potential, Gauss\'s Law & applications, Laplace & Poisson equations, dielectrics, polarization P, electric displacement D.',
        'Unit II: Magnetostatics — Magnetic field B, Biot-Savart law, Ampere\'s circuital law, magnetic vector potential A, magnetic properties of matter (dia, para, ferro).',
        'Unit III: Electromagnetic Induction — Faraday\'s law, Lenz\'s law, self & mutual inductance, energy stored in magnetic field, Maxwell\'s correction to Ampere\'s law.',
        'Unit IV: Transient Currents & AC Circuits — Growth and decay of current in LR, CR, LCR circuits, AC circuits, complex impedance, resonance, Q-factor, ballistics.'
      ],
      labComponent: 'Electricity & Magnetism Lab: Determination of high resistance by leakage method, Carey Foster\'s bridge, Ballistic Galvanometer calibration, Verification of Thevenin & Norton theorems.',
      downloadSlots: [
        { label: 'Paper III Syllabus PDF', file: 'Paper_III_EM_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_III_Lecture_Notes.pdf' },
        { label: 'EM Lab Manual', file: 'Paper_III_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_III_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Introduction to Electrodynamics', author: 'D. J. Griffiths' },
        { title: 'Electricity and Magnetism', author: 'E. M. Purcell & D. J. Morin' },
        { title: 'Electricity and Magnetism', author: 'D. C. Tayal' }
      ],
      formulae: ['∇·E = ρ/ε₀', '∇×B = μ₀J', 'E = -∇V', 'L(dI/dt) + RI = V']
    }
  },
  {
    id: 'paper-4-math-physics-2',
    paperCode: 'Paper IV',
    semester: 2,
    icon: '📊',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    accent: 'linear-gradient(90deg,#34d399,#6ee7b7)',
    glow: 'rgba(52,211,153,0.08)',
    title: 'Paper IV: Mathematical Physics-II',
    difficulty: 'hard',
    desc: 'Fourier series expansion, special functions (Legendre, Bessel, Hermite, Laguerre), and partial differential equations of physics.',
    topics: ['Fourier Series', 'Frobenius Method', 'Special Functions', 'Partial Differential Equations'],
    progress: 65,
    progressLabel: '65% covered',
    detail: {
      units: [
        'Unit I: Fourier Series — Periodic functions, Dirichlet conditions, Fourier series expansion, even and odd functions, complex form of Fourier series, applications.',
        'Unit II: Frobenius Method & Special Functions I — Power series solution of differential equations, Legendre differential equation, Legendre polynomials P_n(x), generating functions, orthogonality.',
        'Unit III: Special Functions II — Bessel differential equation, Bessel functions J_n(x), recurrence relations, generating function, Hermite & Laguerre polynomials intro.',
        'Unit IV: Partial Differential Equations — Separation of variables method for 1D wave equation, 1D heat conduction equation, and 2D Laplace equation in Cartesian & polar coordinates.'
      ],
      labComponent: 'Computational Physics Lab II: Computation of Fourier coefficients, numerical evaluation of Bessel & Legendre functions, solving 1D heat wave equation numerically.',
      downloadSlots: [
        { label: 'Paper IV Syllabus PDF', file: 'Paper_IV_Math_Physics_II_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_IV_Lecture_Notes.pdf' },
        { label: 'Computational Lab Manual II', file: 'Paper_IV_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_IV_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Mathematical Methods for Physicists', author: 'G. B. Arfken & H. J. Weber' },
        { title: 'Special Functions for Scientists & Engineers', author: 'W. W. Bell' },
        { title: 'Advanced Mathematical Physics', author: 'B. S. Rajput' }
      ],
      formulae: ['f(x) = a₀/2 + Σ(aₙ cos(nπx/L) + bₙ sin(nπx/L))', 'Pₙ(x) = (1/(2ⁿ n!)) (dⁿ/dxⁿ)(x²-1)ⁿ', 'Jₙ(x) recurrence relations']
    }
  },

  // ── SEMESTER III ──
  {
    id: 'paper-5-waves-optics',
    paperCode: 'Paper V',
    semester: 3,
    icon: '🌊',
    iconBg: 'rgba(34,211,238,0.12)',
    iconBorder: 'rgba(34,211,238,0.25)',
    accent: 'linear-gradient(90deg,#22d3ee,#67e8f9)',
    glow: 'rgba(34,211,238,0.08)',
    title: 'Paper V: Waves and Optics',
    difficulty: 'medium',
    desc: 'Wave superposition, interference (division of wavefront & amplitude), Fraunhofer & Fresnel diffraction, polarization, and lasers.',
    topics: ['Superposition & Beats', 'Interference', 'Diffraction', 'Polarization & Lasers'],
    progress: 85,
    progressLabel: '85% covered',
    detail: {
      units: [
        'Unit I: Wave Motion & Superposition — Group velocity & phase velocity, wave packet, superposition of two harmonic waves, Lissajous figures, standing waves.',
        'Unit II: Interference — Division of wavefront (Young\'s double slit, Fresnel biprism), Division of amplitude (Thin films, Newton\'s rings, Michelson interferometer).',
        'Unit III: Diffraction — Fresnel diffraction (Half-period zones, Zone plate), Fraunhofer diffraction (Single slit, Double slit, N-slits grating, Resolving power).',
        'Unit IV: Polarization & Lasers — Double refraction, Nicol prism, Quarter/Half wave plates, Optical activity, Laser principles (Einstein coefficients, He-Ne & Ruby laser).'
      ],
      labComponent: 'Optics Lab: Determination of wavelength using Newton\'s rings, Spectrometer with Diffraction Grating, Specific rotation of sugar using Polarimeter, Wavelength by Fresnel Biprism.',
      downloadSlots: [
        { label: 'Paper V Syllabus PDF', file: 'Paper_V_Waves_Optics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_V_Lecture_Notes.pdf' },
        { label: 'Optics Lab Manual', file: 'Paper_V_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_V_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Optics', author: 'A. Ghatak' },
        { title: 'Fundamentals of Optics', author: 'F. A. Jenkins & H. E. White' },
        { title: 'Waves and Oscillations', author: 'N. K. Bajaj' }
      ],
      formulae: ['v_g = dw/dk', 'β = λD/d', 'd sinθ = mλ', 'I = I₀ cos²θ (Malus Law)']
    }
  },
  {
    id: 'paper-6-math-physics-3',
    paperCode: 'Paper VI',
    semester: 3,
    icon: '🔮',
    iconBg: 'rgba(167,139,250,0.12)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: 'linear-gradient(90deg,#a78bfa,#818cf8)',
    glow: 'rgba(167,139,250,0.08)',
    title: 'Paper VI: Mathematical Physics-III',
    difficulty: 'advanced',
    desc: 'Complex variables, Cauchy-Riemann equations, contour integration, Residue Theorem, Fourier & Laplace Transforms, and Tensor algebra.',
    topics: ['Complex Analysis', 'Contour Integration', 'Integral Transforms', 'Tensor Algebra'],
    progress: 60,
    progressLabel: '60% covered',
    detail: {
      units: [
        'Unit I: Complex Variables — Complex functions, limits, continuity, differentiability, Cauchy-Riemann conditions, Analytic functions, Harmonic functions.',
        'Unit II: Complex Integration — Cauchy\'s Integral Theorem, Cauchy\'s Integral Formula, Taylor & Laurent series expansion, Singularities, Residue Theorem & evaluation of definite integrals.',
        'Unit III: Integral Transforms — Fourier Transform & Inverse Fourier Transform, Properties, Convolution Theorem, Laplace Transform & Properties, Inverse Laplace Transform.',
        'Unit IV: Tensor Analysis — Transformation of coordinates, Contravariant & Covariant tensors, Metric tensor, Symmetric & Anti-symmetric tensors, Kronecker delta.'
      ],
      labComponent: 'Computational Physics Lab III: Evaluation of complex contour integrals, numerical Laplace transform inversion, tensor transformations in Python/Matlab.',
      downloadSlots: [
        { label: 'Paper VI Syllabus PDF', file: 'Paper_VI_Math_Physics_III_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_VI_Lecture_Notes.pdf' },
        { label: 'Lab Manual & Algorithms', file: 'Paper_VI_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_VI_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Complex Variables & Applications', author: 'R. V. Churchill & J. W. Brown' },
        { title: 'Mathematical Methods for Physicists', author: 'G. B. Arfken & H. J. Weber' },
        { title: 'Tensors for Physicists', author: 'L. D. Landau' }
      ],
      formulae: ['∂u/∂x = ∂v/∂y, ∂u/∂y = -∂v/∂x (C-R)', '∮ f(z) dz = 2πi Σ Res', 'F(k) = (1/√(2π)) ∫ f(x) e^(-ikx) dx']
    }
  },
  {
    id: 'paper-7-thermal-physics',
    paperCode: 'Paper VII',
    semester: 3,
    icon: '🔥',
    iconBg: 'rgba(248,113,113,0.12)',
    iconBorder: 'rgba(248,113,113,0.25)',
    accent: 'linear-gradient(90deg,#f87171,#fb923c)',
    glow: 'rgba(248,113,113,0.08)',
    title: 'Paper VII: Thermal Physics',
    difficulty: 'medium',
    desc: 'Laws of thermodynamics, Carnot cycle, entropy, thermodynamic potentials (G, F, H, U), Maxwell relations, and Kinetic Theory of Gases.',
    topics: ['Thermodynamic Laws', 'Entropy & Carnot Cycle', 'Maxwell Relations', 'Kinetic Theory of Gases'],
    progress: 75,
    progressLabel: '75% covered',
    detail: {
      units: [
        'Unit I: Zeroth & First Law — Concept of temperature, Zeroth Law, First Law of thermodynamics, Internal energy U, Work done in isothermal & adiabatic processes.',
        'Unit II: Second Law & Entropy — Reversible & irreversible processes, Carnot engine & efficiency, Kelvin-Planck & Clausius statements, Concept of Entropy S, T-S diagrams.',
        'Unit III: Thermodynamic Potentials — Enthalpy H, Helmholtz free energy F, Gibbs free energy G, Maxwell\'s thermodynamic relations and applications (Joule-Thomson effect).',
        'Unit IV: Kinetic Theory of Gases — Maxwell-Boltzmann velocity distribution, Mean free path, Transport phenomena (Viscosity, Thermal conductivity, Diffusion), Real gases & Van der Waals equation.'
      ],
      labComponent: 'Thermal Physics Lab: Determination of Mechanical Equivalent of Heat J by Callender & Barnes method, Thermal Conductivity of bad conductor by Lee\'s Disc, Platinum resistance thermometer calibration.',
      downloadSlots: [
        { label: 'Paper VII Syllabus PDF', file: 'Paper_VII_Thermal_Physics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_VII_Lecture_Notes.pdf' },
        { label: 'Thermal Lab Manual', file: 'Paper_VII_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_VII_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Heat and Thermodynamics', author: 'M. W. Zemansky & R. H. Dittman' },
        { title: 'Thermal Physics', author: 'S. Garg, R. Bansal & C. Ghosh' },
        { title: 'Treatise on Heat', author: 'M. N. Saha & B. N. Srivastava' }
      ],
      formulae: ['dU = dQ - dW', 'η_Carnot = 1 - T_C/T_H', 'dG = VdP - SdT', '(P + a/V²)(V - b) = RT']
    }
  },

  // ── SEMESTER IV ──
  {
    id: 'paper-8-analog-systems',
    paperCode: 'Paper VIII',
    semester: 4,
    icon: '🔌',
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.25)',
    accent: 'linear-gradient(90deg,#fbbf24,#34d399)',
    glow: 'rgba(251,191,36,0.08)',
    title: 'Paper VIII: Analog Systems and Applications',
    difficulty: 'medium',
    desc: 'Semiconductor diodes, BJT transistor biasing, h-parameters, FET/MOSFET, Operational Amplifiers (Op-Amps), and Feedback Oscillators.',
    topics: ['Diode Circuits', 'Transistor Amplifiers', 'Op-Amp Applications', 'Feedback Oscillators'],
    progress: 72,
    progressLabel: '72% covered',
    detail: {
      units: [
        'Unit I: Semiconductor Diodes — PN junction, Zener diode, Voltage regulation, Half-wave & Full-wave rectifiers, Filters (C, L, LC, π-section).',
        'Unit II: Bipolar Junction Transistors (BJT) — CB, CE, CC configurations, Biasing techniques (Q-point, Load line analysis), h-parameter model of CE amplifier.',
        'Unit III: Operational Amplifiers — Ideal Op-Amp characteristics, CMRR, Inverting & Non-inverting amplifiers, Adder, Subtractor, Differentiator, Integrator.',
        'Unit IV: Feedback & Oscillators — Positive & negative feedback, Barkhausen criterion, RC phase shift oscillator, Wien bridge oscillator, Hartley & Colpitts oscillators.'
      ],
      labComponent: 'Analog Electronics Lab: V-I characteristics of PN & Zener diodes, Frequency response of CE BJT amplifier, Op-Amp inverting/non-inverting/adder circuit design, Hartley oscillator.',
      downloadSlots: [
        { label: 'Paper VIII Syllabus PDF', file: 'Paper_VIII_Analog_Systems_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_VIII_Lecture_Notes.pdf' },
        { label: 'Analog Lab Manual', file: 'Paper_VIII_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_VIII_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Electronic Devices & Circuit Theory', author: 'R. L. Boylestad & L. Nashelsky' },
        { title: 'Op-Amps and Linear Integrated Circuits', author: 'R. A. Gayakwad' },
        { title: 'Foundations of Electronics', author: 'D. Chattopadhyay & P. C. Rakshit' }
      ],
      formulae: ['V_out = - (R_f/R_in) V_in [Inverting]', 'A_v = 1 + R_f/R_in [Non-Inverting]', 'f_0 = 1 / (2π RC √(6)) [RC Phase Shift]']
    }
  },
  {
    id: 'paper-9-basic-instrumentation',
    paperCode: 'Paper IX',
    semester: 4,
    icon: '🛠️',
    iconBg: 'rgba(45,212,191,0.12)',
    iconBorder: 'rgba(45,212,191,0.25)',
    accent: 'linear-gradient(90deg,#2dd4bf,#3b82f6)',
    glow: 'rgba(45,212,191,0.08)',
    title: 'Paper IX: Basic Instrumentation Skills',
    difficulty: 'medium',
    desc: 'Measurement standards, error analysis, DC & AC meters, Cathode Ray Oscilloscope (CRO), Signal generators, and Electronic Transducers.',
    topics: ['Measurement Errors', 'Multimeters & Bridges', 'CRO & Signal Generators', 'Transducers & Sensors'],
    progress: 80,
    progressLabel: '80% covered',
    detail: {
      units: [
        'Unit I: Basic Measurement Principles — Accuracy, precision, sensitivity, resolution, errors in measurement (systematic & random), standards of measurement.',
        'Unit II: DC & AC Measuring Instruments — PMMC meter movement, DC Ammeter & Voltmeter, AC Voltmeter using rectifiers, Wheatstone bridge, Maxwell & Schering bridges.',
        'Unit III: Cathode Ray Oscilloscope (CRO) — Block diagram of CRO, Electron gun, deflection plates, Lissajous figures, measurement of voltage, frequency & phase difference.',
        'Unit IV: Transducers & Digital Meters — Strain gauges, LVDT, Thermistors, Thermocouples, Digital Multimeter block diagram, Frequency counter.'
      ],
      labComponent: 'Instrumentation Lab: Measurement of voltage and frequency using CRO, Calibration of LVDT displacement sensor, Temperature measurement using Thermistor/PT100, AC Bridge balancing.',
      downloadSlots: [
        { label: 'Paper IX Syllabus PDF', file: 'Paper_IX_Basic_Instrumentation_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_IX_Lecture_Notes.pdf' },
        { label: 'Instrumentation Lab Manual', file: 'Paper_IX_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_IX_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'A Course in Electrical and Electronic Measurements', author: 'A. K. Sawhney' },
        { title: 'Modern Electronic Instrumentation & Measurement Techniques', author: 'Helfrick & Cooper' },
        { title: 'Electronic Instrumentation', author: 'H. S. Kalsi' }
      ],
      formulae: ['Error = V_measured - V_true', 'f = 1 / (T_div × Time/Div)', 'V_pp = Vertical_div × Volts/Div']
    }
  },
  {
    id: 'paper-10-nuclear-particle-physics',
    paperCode: 'Paper X',
    semester: 4,
    icon: '☢️',
    iconBg: 'rgba(248,113,113,0.12)',
    iconBorder: 'rgba(248,113,113,0.25)',
    accent: 'linear-gradient(90deg,#f87171,#a78bfa)',
    glow: 'rgba(248,113,113,0.08)',
    title: 'Paper X: Nuclear and Particle Physics',
    difficulty: 'advanced',
    desc: 'General nuclear properties, binding energy, Liquid Drop & Shell models, radioactive decay laws, nuclear accelerators, and Standard Model.',
    topics: ['Nuclear Structure', 'Nuclear Models', 'Radioactivity & Decays', 'Detectors & Particle Physics'],
    progress: 65,
    progressLabel: '65% covered',
    detail: {
      units: [
        'Unit I: General Nuclear Properties — Size, mass, spin, magnetic moment, quadrupole moment, binding energy curve, semi-empirical mass formula (Weizsacker).',
        'Unit II: Nuclear Models & Reactions — Liquid drop model, Nuclear fission & fusion, Shell model & magic numbers, Q-value of nuclear reactions.',
        'Unit III: Radioactivity & Decays — Radioactive decay law, Half-life & mean-life, Alpha decay (Gamow theory), Beta decay (Fermi theory & neutrino hypothesis), Gamma decay.',
        'Unit IV: Detectors, Accelerators & Particles — GM counter, Scintillation counter, Cyclotron, Synchrotron, Fundamental forces, Leptons, Hadrons, Quarks & Standard Model.'
      ],
      labComponent: 'Nuclear Physics Lab: GM Counter plateau characteristics, Verification of inverse square law for gamma rays, Determination of linear absorption coefficient of Lead for gamma rays.',
      downloadSlots: [
        { label: 'Paper X Syllabus PDF', file: 'Paper_X_Nuclear_Particle_Physics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_X_Lecture_Notes.pdf' },
        { label: 'Nuclear Lab Manual', file: 'Paper_X_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_X_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Introductory Nuclear Physics', author: 'K. S. Krane' },
        { title: 'Nuclear Physics', author: 'D. C. Tayal' },
        { title: 'Introduction to High Energy Physics', author: 'D. H. Perkins' }
      ],
      formulae: ['BE = [Z m_p + N m_n - M(A,Z)] c²', 'N(t) = N₀ e^(-λt)', 'Q = (m_i - m_f) c²']
    }
  },

  // ── SEMESTER V ──
  {
    id: 'paper-11-digital-systems',
    paperCode: 'Paper XI',
    semester: 5,
    icon: '💻',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
    accent: 'linear-gradient(90deg,#3b82f6,#818cf8)',
    glow: 'rgba(59,130,246,0.08)',
    title: 'Paper XI: Digital Systems and Applications',
    difficulty: 'medium',
    desc: 'Number systems, Boolean algebra, De Morgan\'s laws, combinational logic (Adders, Multiplexers), sequential circuits (Flip-Flops, Counters, Registers), and Microprocessor 8085.',
    topics: ['Boolean Algebra', 'Combinational Circuits', 'Sequential Logic & Flip-Flops', 'Microprocessor 8085'],
    progress: 75,
    progressLabel: '75% covered',
    detail: {
      units: [
        'Unit I: Number Systems & Logic Gates — Binary, Octal, Hexadecimal numbers, De Morgan\'s Theorems, Karnaugh Maps (K-Map up to 4 variables), Logic gates implementation.',
        'Unit II: Combinational Logic Circuits — Half Adder, Full Adder, Half Subtractor, Full Subtractor, Multiplexer (MUX), De-multiplexer (DEMUX), Decoders, Encoders.',
        'Unit III: Sequential Circuits — SR, JK, Master-Slave JK, D, T Flip-Flops, Shift Registers (SISO, SIPO, PISO, PIPO), Asynchronous & Synchronous Counters.',
        'Unit IV: Microprocessor 8085 Architecture — 8085 CPU architecture, pin diagram, bus organization, instruction set, simple assembly language programming.'
      ],
      labComponent: 'Digital Electronics Lab: Verification of truth tables of AND, OR, NOT, NAND, NOR, XOR gates, Realization of Half/Full Adder using NAND gates, JK Flip-Flop setup, 8085 Addition/Subtraction programming.',
      downloadSlots: [
        { label: 'Paper XI Syllabus PDF', file: 'Paper_XI_Digital_Systems_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_XI_Lecture_Notes.pdf' },
        { label: 'Digital Lab Manual & Assembly Codes', file: 'Paper_XI_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_XI_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Digital Fundamentals', author: 'T. L. Floyd' },
        { title: 'Digital Principles and Applications', author: 'A. P. Malvino & D. P. Leach' },
        { title: 'Microprocessor Architecture, Programming & Applications with 8085', author: 'R. S. Gaonkar' }
      ],
      formulae: ['(A + B)\' = A\' · B\' (De Morgan)', 'Sum = A ⊕ B, Carry = A · B (Half Adder)', '2ⁿ states for n flip-flops']
    }
  },
  {
    id: 'paper-12-quantum-mechanics',
    paperCode: 'Paper XII',
    semester: 5,
    icon: '⚛️',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    accent: 'linear-gradient(90deg,#34d399,#6ee7b7)',
    glow: 'rgba(52,211,153,0.08)',
    title: 'Paper XII: Quantum Mechanics and Applications',
    difficulty: 'advanced',
    desc: 'Schrödinger wave equation, operators & observables, 1D potential wells, barrier penetration & tunneling, quantum harmonic oscillator, and Hydrogen atom.',
    topics: ['Wave Functions & Operators', '1D Potentials & Tunneling', 'Harmonic Oscillator', 'Hydrogen Atom'],
    progress: 70,
    progressLabel: '70% covered',
    detail: {
      units: [
        'Unit I: Foundations & TISE — De Broglie waves, Wave-particle duality, Heisenberg Uncertainty Principle, Time-Independent Schrödinger Equation (TISE), Wavefunction properties & normalization.',
        'Unit II: 1D Potentials & Barrier Penetration — Particle in a 1D infinite & finite box, Step potential, Rectangular potential barrier, Quantum mechanical tunneling & alpha decay.',
        'Unit III: Quantum Harmonic Oscillator — 1D Harmonic oscillator solved using Hermite polynomials & ladder operators (a, a†), zero-point energy E₀ = ½ℏω.',
        'Unit IV: Hydrogen Atom & Angular Momentum — TISE in spherical polar coordinates, Radial & Angular wavefunctions, Quantum numbers (n, l, m_l), Orbital angular momentum.'
      ],
      labComponent: 'Modern Physics Lab: Determination of Planck\'s constant using LEDs, Photoelectric effect experiment (work function determination), Study of Hydrogen spectrum using Spectrometer.',
      downloadSlots: [
        { label: 'Paper XII Syllabus PDF', file: 'Paper_XII_Quantum_Mechanics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_XII_Lecture_Notes.pdf' },
        { label: 'QM Lab Manual', file: 'Paper_XII_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_XII_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Introduction to Quantum Mechanics', author: 'D. J. Griffiths' },
        { title: 'Quantum Mechanics: Concepts & Applications', author: 'N. Zettili' },
        { title: 'Quantum Mechanics', author: 'G. Aruldhas' }
      ],
      formulae: ['Ĥψ = Eψ', 'E_n = (n² π² ℏ²) / (2m L²)', 'E_n = (n + ½) ℏω', 'E_n = -13.6 / n² eV']
    }
  },
  {
    id: 'paper-13-solid-state-physics',
    paperCode: 'Paper XIII',
    semester: 5,
    icon: '💎',
    iconBg: 'rgba(45,212,191,0.12)',
    iconBorder: 'rgba(45,212,191,0.25)',
    accent: 'linear-gradient(90deg,#2dd4bf,#22d3ee)',
    glow: 'rgba(45,212,191,0.08)',
    title: 'Paper XIII: Solid State Physics',
    difficulty: 'hard',
    desc: 'Crystal structures, Bravais lattices, X-ray diffraction & Bragg law, phonon lattice dynamics, Free Electron Model, Kronig-Penney band theory, and Superconductivity.',
    topics: ['Crystallography & XRD', 'Lattice Vibrations', 'Band Theory of Solids', 'Superconductivity & Magnetism'],
    progress: 65,
    progressLabel: '65% covered',
    detail: {
      units: [
        'Unit I: Crystal Structure & XRD — Amorphous & crystalline solids, Bravais lattices, Miller indices, Reciprocal lattice, X-ray diffraction, Bragg\'s Law, Laue & Powder methods.',
        'Unit II: Lattice Vibrations & Thermal Properties — Phonons, Vibrations of 1D monoatomic & diatomic lattices, Acoustic & Optical branches, Einstein & Debye theories of specific heat.',
        'Unit III: Free Electron & Band Theory — Drude-Lorentz free electron theory, Sommerfeld model, Fermi energy E_F, Bloch theorem, Kronig-Penney model, Band gap, Metals/Semiconductors/Insulators.',
        'Unit IV: Magnetic Properties & Superconductivity — Dia, Para, Ferro, Ferrimagnetism, Curie-Weiss law, Superconductivity, Zero resistance, Meissner effect, Type I & Type II superconductors, BCS theory intro.'
      ],
      labComponent: 'Solid State Physics Lab: Determination of Hall coefficient & carrier concentration of semiconductor, Band gap of semiconductor by Four-Probe method, Magnetic susceptibility by Quincke\'s method.',
      downloadSlots: [
        { label: 'Paper XIII Syllabus PDF', file: 'Paper_XIII_Solid_State_Physics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_XIII_Lecture_Notes.pdf' },
        { label: 'Solid State Lab Manual', file: 'Paper_XIII_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_XIII_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Introduction to Solid State Physics', author: 'C. Kittel' },
        { title: 'Solid State Physics', author: 'A. J. Dekker' },
        { title: 'Solid State Physics', author: 'S. O. Pillai' }
      ],
      formulae: ['2d sinθ = nλ (Bragg\'s Law)', 'E_F = (ℏ²/2m)(3π²n)^(2/3)', 'χ = C / (T - T_c) (Curie-Weiss)']
    }
  },

  // ── SEMESTER VI ──
  {
    id: 'paper-14-electromagnetic-theory',
    paperCode: 'Paper XIV',
    semester: 6,
    icon: '🛰️',
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.25)',
    accent: 'linear-gradient(90deg,#f59e0b,#ef4444)',
    glow: 'rgba(245,158,11,0.08)',
    title: 'Paper XIV: Electromagnetic Theory',
    difficulty: 'advanced',
    desc: 'Maxwell\'s field equations, displacement current, Poynting vector, EM wave propagation in vacuum, dielectrics, conductors, reflection/refraction, and waveguides.',
    topics: ['Maxwell Equations', 'EM Wave Propagation', 'Reflection & Refraction', 'Waveguides & Radiation'],
    progress: 70,
    progressLabel: '70% covered',
    detail: {
      units: [
        'Unit I: Maxwell\'s Equations — Maxwell\'s equations in differential & integral forms, Displacement current, Vector & Scalar potentials, Gauge transformations (Coulomb & Lorentz gauges).',
        'Unit II: EM Wave Propagation — Wave equation in free space, Plane EM waves, Transverse nature of EM waves, Poynting vector S, Energy density & momentum density of EM field.',
        'Unit III: Reflection & Refraction of EM Waves — Boundary conditions at dielectric interface, Reflection & Transmission coefficients, Fresnel\'s equations, Brewster\'s angle, Total Internal Reflection.',
        'Unit IV: EM Waves in Conducting Media & Waveguides — Wave propagation in conducting media, Skin depth, Dispersion in plasma, TE & TM modes in rectangular waveguides.'
      ],
      labComponent: 'Electromagnetic Theory Lab: Determination of Brewster\'s angle for glass using Polarimeter, Polarization of EM waves setup, Verification of Fresnel\'s laws of reflection.',
      downloadSlots: [
        { label: 'Paper XIV Syllabus PDF', file: 'Paper_XIV_EM_Theory_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_XIV_Lecture_Notes.pdf' },
        { label: 'EM Theory Lab Manual', file: 'Paper_XIV_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_XIV_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Introduction to Electrodynamics', author: 'D. J. Griffiths' },
        { title: 'Classical Electrodynamics', author: 'J. D. Jackson' },
        { title: 'Electromagnetic Waves and Radiating Systems', author: 'E. C. Jordan & K. G. Balmain' }
      ],
      formulae: ['∇×E = -∂B/∂t, ∇×B = μ₀J + μ₀ε₀∂E/∂t', 'S = (1/μ₀) (E × B)', 'δ = √(2 / (μωσ)) (Skin Depth)', 'tan θ_B = n₂ / n₁']
    }
  },
  {
    id: 'paper-15-statistical-mechanics',
    paperCode: 'Paper XV',
    semester: 6,
    icon: '📊',
    iconBg: 'rgba(167,139,250,0.12)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: 'linear-gradient(90deg,#a78bfa,#ec4899)',
    glow: 'rgba(167,139,250,0.08)',
    title: 'Paper XV: Statistical Mechanics',
    difficulty: 'advanced',
    desc: 'Microcanonical, Canonical & Grand Canonical Ensembles, Partition Function Z, MB, BE & FD Quantum Statistics, Blackbody radiation laws, and BEC.',
    topics: ['Ensemble Theory', 'Partition Function', 'Bose-Einstein Statistics', 'Fermi-Dirac Statistics'],
    progress: 60,
    progressLabel: '60% covered',
    detail: {
      units: [
        'Unit I: Classical Statistical Mechanics — Macrostate & Microstate, Phase space, Liouville\'s theorem, Microcanonical, Canonical, and Grand Canonical ensembles, Partition function Z.',
        'Unit II: Thermodynamic Connections — Calculation of U, S, F, G, P from Partition Function Z, Ideal monoatomic gas in canonical ensemble, Gibbs Paradox & resolution.',
        'Unit III: Quantum Statistics — Identical particles, Symmetric & Anti-symmetric wavefunctions, Maxwell-Boltzmann (MB), Bose-Einstein (BE), and Fermi-Dirac (FD) distributions.',
        'Unit IV: Applications of Quantum Statistics — Blackbody radiation (Planck\'s law, Rayleigh-Jeans & Wien laws), Bose-Einstein Condensation (BEC), Degenerate Fermi gas & Fermi energy.'
      ],
      labComponent: 'Computational Statistical Physics Lab: Simulation of Maxwell-Boltzmann speed distribution, Numerical calculation of Fermi-Dirac integral, Monte Carlo simulation of 2D Ising spin lattice.',
      downloadSlots: [
        { label: 'Paper XV Syllabus PDF', file: 'Paper_XV_Statistical_Mechanics_Syllabus.pdf' },
        { label: 'Unit 1-4 Lecture Notes', file: 'Paper_XV_Lecture_Notes.pdf' },
        { label: 'Computational Lab Manual XV', file: 'Paper_XV_Lab_Manual.pdf' },
        { label: 'FMU Solved PYQs (2020-2025)', file: 'Paper_XV_FMU_PYQs.pdf' }
      ],
      textbooks: [
        { title: 'Statistical Mechanics', author: 'R. K. Pathria & P. D. Beale' },
        { title: 'Statistical Mechanics', author: 'K. Huang' },
        { title: 'Fundamentals of Statistical and Thermal Physics', author: 'F. Reif' }
      ],
      formulae: ['Z = Σ e^(-β E_i)', 'F = -k_B T ln Z', 'n̄_i = 1 / (e^(β(ε_i - μ)) ∓ 1)', 'u(ν) dν = (8πhν³/c³) / (e^(hν/k_BT) - 1) dν']
    }
  }
];


const FORMULAE = [
  // Mechanics
  { cat: 'mechanics', name: 'Newton\'s Second Law', latex: 'F = ma = \\frac{dp}{dt}', desc: 'Force equals rate of change of momentum', subject: 'Mechanics' },
  { cat: 'mechanics', name: 'Euler-Lagrange Equation', latex: '\\frac{d}{dt}\\frac{\\partial L}{\\partial \\dot{q}} - \\frac{\\partial L}{\\partial q} = 0', desc: 'Equation of motion from Lagrangian', subject: 'Mechanics' },
  { cat: 'mechanics', name: 'Hamiltonian', latex: 'H = \\sum_i p_i \\dot{q}_i - L', desc: 'Legendre transform of Lagrangian', subject: 'Mechanics' },
  { cat: 'mechanics', name: 'Conservation of Energy', latex: 'E = T + V = \\text{const}', desc: 'Total mechanical energy is conserved', subject: 'Mechanics' },
  { cat: 'mechanics', name: 'Moment of Inertia', latex: 'I = \\int r^2\\, dm', desc: 'Rotational inertia of a rigid body', subject: 'Mechanics' },
  { cat: 'mechanics', name: 'Kepler\'s Third Law', latex: 'T^2 = \\frac{4\\pi^2}{GM} a^3', desc: 'Period–semi-major axis relation', subject: 'Mechanics' },

  // Electromagnetism
  { cat: 'em', name: 'Gauss\'s Law (E)', latex: '\\oint \\mathbf{E}\\cdot d\\mathbf{A} = \\frac{Q_{enc}}{\\varepsilon_0}', desc: 'Electric flux through closed surface', subject: 'EM' },
  { cat: 'em', name: 'Faraday\'s Law', latex: '\\oint \\mathbf{E}\\cdot d\\mathbf{l} = -\\frac{d\\Phi_B}{dt}', desc: 'EMF induced by changing magnetic flux', subject: 'EM' },
  { cat: 'em', name: 'Ampere-Maxwell Law', latex: '\\oint \\mathbf{B}\\cdot d\\mathbf{l} = \\mu_0 I + \\mu_0\\varepsilon_0 \\frac{d\\Phi_E}{dt}', desc: 'Magnetic field from current and displacement current', subject: 'EM' },
  { cat: 'em', name: 'Lorentz Force', latex: '\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})', desc: 'Force on charge in EM fields', subject: 'EM' },
  { cat: 'em', name: 'Poynting Vector', latex: '\\mathbf{S} = \\frac{1}{\\mu_0}\\mathbf{E}\\times\\mathbf{B}', desc: 'Energy flux density of EM field', subject: 'EM' },
  { cat: 'em', name: 'EM Wave Speed', latex: 'c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}}', desc: 'Speed of light in vacuum', subject: 'EM' },

  // Quantum
  { cat: 'quantum', name: 'Time-dependent Schrödinger Eq.', latex: 'i\\hbar \\frac{\\partial \\Psi}{\\partial t} = \\hat{H}\\Psi', desc: 'Evolution of quantum state', subject: 'Quantum' },
  { cat: 'quantum', name: 'Heisenberg Uncertainty', latex: '\\Delta x\\, \\Delta p \\geq \\frac{\\hbar}{2}', desc: 'Fundamental quantum uncertainty', subject: 'Quantum' },
  { cat: 'quantum', name: 'Quantum Harmonic Oscillator', latex: 'E_n = \\hbar\\omega\\left(n + \\frac{1}{2}\\right)', desc: 'Energy levels of QHO', subject: 'Quantum' },
  { cat: 'quantum', name: 'Hydrogen Energy Levels', latex: 'E_n = -\\frac{13.6\\text{ eV}}{n^2}', desc: 'Bohr energy levels of hydrogen atom', subject: 'Quantum' },
  { cat: 'quantum', name: 'de Broglie Wavelength', latex: '\\lambda = \\frac{h}{p} = \\frac{h}{mv}', desc: 'Matter wave wavelength', subject: 'Quantum' },
  { cat: 'quantum', name: 'Commutator Relation', latex: '[\\hat{x}, \\hat{p}] = i\\hbar', desc: 'Canonical commutation relation', subject: 'Quantum' },

  // Thermal
  { cat: 'thermal', name: 'First Law of Thermodynamics', latex: 'dU = \\delta Q - \\delta W', desc: 'Conservation of energy for thermodynamic systems', subject: 'Thermal' },
  { cat: 'thermal', name: 'Entropy (Boltzmann)', latex: 'S = k_B \\ln \\Omega', desc: 'Statistical definition of entropy', subject: 'Thermal' },
  { cat: 'thermal', name: 'Carnot Efficiency', latex: '\\eta = 1 - \\frac{T_c}{T_h}', desc: 'Maximum efficiency of heat engine', subject: 'Thermal' },
  { cat: 'thermal', name: 'Ideal Gas Law', latex: 'PV = nRT = Nk_BT', desc: 'Equation of state for ideal gas', subject: 'Thermal' },
  { cat: 'thermal', name: 'Maxwell-Boltzmann Distribution', latex: 'f(v) = 4\\pi n\\left(\\frac{m}{2\\pi k_B T}\\right)^{3/2} v^2 e^{-mv^2/2k_BT}', desc: 'Speed distribution of gas molecules', subject: 'Thermal' },

  // Waves & Optics
  { cat: 'waves', name: 'Wave Equation', latex: '\\frac{\\partial^2 y}{\\partial t^2} = v^2 \\frac{\\partial^2 y}{\\partial x^2}', desc: 'General wave propagation equation', subject: 'Waves' },
  { cat: 'waves', name: 'Malus\'s Law', latex: 'I = I_0 \\cos^2\\theta', desc: 'Intensity of polarized light through analyser', subject: 'Waves' },
  { cat: 'waves', name: 'Diffraction Grating', latex: 'd\\sin\\theta = m\\lambda', desc: 'Principal maxima of diffraction grating', subject: 'Waves' },
  { cat: 'waves', name: 'Fraunhofer Single Slit', latex: 'I = I_0 \\left(\\frac{\\sin\\alpha}{\\alpha}\\right)^2,\\;\\alpha = \\frac{\\pi a \\sin\\theta}{\\lambda}', desc: 'Single slit diffraction intensity', subject: 'Waves' },

  // Nuclear
  { cat: 'nuclear', name: 'Binding Energy', latex: 'BE = \\left[Zm_p + Nm_n - M\\right]c^2', desc: 'Mass defect converted to energy', subject: 'Nuclear' },
  { cat: 'nuclear', name: 'Radioactive Decay Law', latex: 'N(t) = N_0 e^{-\\lambda t}', desc: 'Exponential decay of radioactive nuclei', subject: 'Nuclear' },
  { cat: 'nuclear', name: 'Half-life', latex: 't_{1/2} = \\frac{\\ln 2}{\\lambda}', desc: 'Time for half of nuclei to decay', subject: 'Nuclear' },
  { cat: 'nuclear', name: 'Q-value of Reaction', latex: 'Q = (m_i - m_f)c^2', desc: 'Energy released or absorbed in nuclear reaction', subject: 'Nuclear' },

  // Mathematical Physics
  { cat: 'math', name: 'Fourier Transform', latex: 'F(k) = \\frac{1}{\\sqrt{2\\pi}}\\int_{-\\infty}^{\\infty} f(x)\\,e^{-ikx}dx', desc: 'Decomposition of function into frequency components', subject: 'Math Physics' },
  { cat: 'math', name: 'Residue Theorem', latex: '\\oint_C f(z)\\,dz = 2\\pi i \\sum_j \\text{Res}[f, z_j]', desc: 'Contour integral via residues', subject: 'Math Physics' },
  { cat: 'math', name: 'Stokes\' Theorem', latex: '\\oint_C \\mathbf{F}\\cdot d\\mathbf{l} = \\iint_S (\\nabla\\times\\mathbf{F})\\cdot d\\mathbf{A}', desc: 'Relating line integral to surface integral of curl', subject: 'Math Physics' },
  { cat: 'math', name: 'Divergence Theorem', latex: '\\oiint_S \\mathbf{F}\\cdot d\\mathbf{A} = \\iiint_V (\\nabla\\cdot\\mathbf{F})\\,dV', desc: 'Relating surface integral to volume integral of divergence', subject: 'Math Physics' }
];

const RESOURCES = [
  { icon: '📺', type: 'Video Lectures', color: '#f87171', name: 'NPTEL Physics Courses', desc: 'Free IIT/IISc professor-taught video lectures on all core B.Sc topics. Downloadable and ad-free.', url: 'https://nptel.ac.in/', linkText: 'Visit NPTEL →' },
  { icon: '🎓', type: 'Video Lectures', color: '#3b82f6', name: 'MIT OpenCourseWare', desc: 'MIT\'s complete physics curriculum — 8.01, 8.02, 8.03, 8.04, 8.05, 8.06, and more. Free to access.', url: 'https://ocw.mit.edu/courses/physics/', linkText: 'Visit MIT OCW →' },
  { icon: '📚', type: 'Open Textbook', color: '#34d399', name: 'LibreTexts Physics', desc: 'Free, open-access physics textbooks at all levels, from introductory to graduate-level treatments.', url: 'https://phys.libretexts.org/', linkText: 'Read Online →' },
  { icon: '🧮', type: 'Problem Solver', color: '#fbbf24', name: 'WolframAlpha', desc: 'Computational engine for solving physics problems, integrals, differential equations, and unit conversions.', url: 'https://www.wolframalpha.com/', linkText: 'Solve Problems →' },
  { icon: '🔬', type: 'Simulation', color: '#a78bfa', name: 'PhET Simulations', desc: 'Interactive physics simulations from University of Colorado — from quantum mechanics to circuits.', url: 'https://phet.colorado.edu/', linkText: 'Try Simulations →' },
  { icon: '📖', type: 'Archive', color: '#22d3ee', name: 'arXiv Physics', desc: 'Open access to research papers in physics — great for reading cutting-edge research and understanding applications.', url: 'https://arxiv.org/archive/physics', linkText: 'Browse Papers →' },
  { icon: '🎥', type: 'Video Lectures', color: '#fb923c', name: 'Feynman Lectures Online', desc: 'The complete Feynman Lectures on Physics — Volumes I, II, III — free online in HTML format.', url: 'https://www.feynmanlectures.caltech.edu/', linkText: 'Read Feynman →' },
  { icon: '⚗️', type: 'Question Bank', color: '#f472b6', name: 'HyperPhysics', desc: 'Concept maps and reference materials on all major physics topics — excellent for quick reference.', url: 'http://hyperphysics.phy-astr.gsu.edu/', linkText: 'Explore →' }
];

const TIMELINE = [
  {
    sem: 'I',
    label: 'Semester I — Mathematical Physics-I & Mechanics',
    subjects: ['Paper I: Mathematical Physics-I', 'Paper II: Mechanics', 'Computational & Mechanics Lab']
  },
  {
    sem: 'II',
    label: 'Semester II — Electricity, Magnetism & Math Physics-II',
    subjects: ['Paper III: Electricity and Magnetism', 'Paper IV: Mathematical Physics-II', 'EM & Computational Lab II']
  },
  {
    sem: 'III',
    label: 'Semester III — Waves, Optics, Math Physics-III & Thermal',
    subjects: ['Paper V: Waves and Optics', 'Paper VI: Mathematical Physics-III', 'Paper VII: Thermal Physics', 'Optics & Thermal Lab']
  },
  {
    sem: 'IV',
    label: 'Semester IV — Analog Systems, Instrumentation & Nuclear',
    subjects: ['Paper VIII: Analog Systems and Applications', 'Paper IX: Basic Instrumentation Skills', 'Paper X: Nuclear and Particle Physics', 'Electronics & Instrumentation Lab']
  },
  {
    sem: 'V',
    label: 'Semester V — Digital Systems, Quantum & Solid State',
    subjects: ['Paper XI: Digital Systems and Applications', 'Paper XII: Quantum Mechanics and Applications', 'Paper XIII: Solid State Physics', 'Digital, Quantum & Solid State Lab']
  },
  {
    sem: 'VI',
    label: 'Semester VI — Electromagnetic Theory & Statistical Mechanics',
    subjects: ['Paper XIV: Electromagnetic Theory', 'Paper XV: Statistical Mechanics', 'Advanced Physics & Computational Lab']
  }
];

const TIPS = [
  { title: 'Master the Fundamentals First', desc: 'Physics is cumulative. Before jumping to Quantum Mechanics, ensure your Classical Mechanics and Math Physics foundation is rock solid.' },
  { title: 'Derive Every Equation', desc: 'Never just memorise formulae. Derive them from first principles. This builds intuition and helps you reconstruct them under exam pressure.' },
  { title: 'Solve Irodov Problems', desc: 'Irodov\'s "Problems in General Physics" is the gold standard. Start with mechanics and work your way through — solving one problem is worth reading 10 pages.' },
  { title: 'Learn LaTeX Early', desc: 'Write your notes and assignments in LaTeX from Day 1. It forces clarity of thought, looks professional, and is essential for research.' },
  { title: 'Connect Concepts Across Subjects', desc: 'The same mathematics appears everywhere: Fourier transforms in QM, EM, and Solid State. Recognising patterns across subjects is a superpower.' },
  { title: 'Use Dimensional Analysis', desc: 'Before solving any problem, check dimensions. A quick dimensional analysis can often reveal the form of the answer without full calculation.' },
  { title: 'Form Study Groups', desc: 'Teaching a concept to others is the most effective way to identify gaps in your own understanding. Feynman\'s learning technique works.' },
  { title: 'Review Regularly', desc: 'Spaced repetition beats last-minute cramming. Review your Semester I material in Semester III. Physics builds on itself mercilessly.' }
];

const PYQS = [
  { exam: 'jee', year: 2023, subject: 'Classical Mechanics', title: 'Rigid Body Rotation - Angular Momentum', difficulty: 'hard', desc: 'A uniform rod of length L rotates about its center. Find the moment of inertia.' },
  { exam: 'jee', year: 2022, subject: 'Electromagnetism', title: 'Magnetic Field in Solenoid', difficulty: 'medium', desc: 'Calculate the magnetic field inside a long solenoid with n turns per unit length.' },
  { exam: 'csir', year: 2023, subject: 'Quantum Mechanics', title: 'Schrödinger Equation - Particle in a Box', difficulty: 'medium', desc: 'Solve the time-independent Schrödinger equation for a particle confined in a 1D box.' },
  { exam: 'csir', year: 2022, subject: 'Statistical Mechanics', title: 'Maxwell-Boltzmann Distribution', difficulty: 'hard', desc: 'Derive the Maxwell-Boltzmann velocity distribution from first principles.' },
  { exam: 'state', year: 2023, subject: 'Thermodynamics', title: 'First Law of Thermodynamics', difficulty: 'easy', desc: 'State and explain the first law of thermodynamics with practical examples.' },
  { exam: 'state', year: 2022, subject: 'Optics', title: 'Youngs Double Slit Experiment', difficulty: 'medium', desc: 'Derive the condition for constructive and destructive interference in YDSE.' },
  { exam: 'university', year: 2023, subject: 'Relativity', title: 'Special Relativity - Time Dilation', difficulty: 'medium', desc: 'Explain time dilation and derive the time dilation formula from Lorentz transformation.' },
  { exam: 'university', year: 2022, subject: 'Nuclear Physics', title: 'Radioactive Decay Law', difficulty: 'easy', desc: 'Derive and explain the radioactive decay constant and half-life formula.' },
  { exam: 'jee', year: 2021, subject: 'Waves & Oscillations', title: 'Simple Harmonic Motion', difficulty: 'medium', desc: 'Find the period and frequency of SHM for a mass-spring system.' },
  { exam: 'csir', year: 2021, subject: 'Solid State Physics', title: 'Band Theory in Solids', difficulty: 'hard', desc: 'Explain the formation of energy bands in crystalline solids using band theory.' },
  { exam: 'state', year: 2021, subject: 'Modern Physics', title: 'Photoelectric Effect', difficulty: 'easy', desc: 'Explain Einstein\'s photoelectric equation and describe experimental observations.' },
  { exam: 'university', year: 2021, subject: 'Atomic Physics', title: 'Bohr Model of Hydrogen', difficulty: 'medium', desc: 'Derive the energy levels and radius of Bohr\'s model of hydrogen atom.' }
];


/* ─────────────────────────────────────────
   STARFIELD ANIMATION
───────────────────────────────────────── */

function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let stars = [];
  let animId = null;
  let isIntersecting = true;

  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    const isMobile = window.innerWidth < 768;
    const n = prefersReducedMotion ? 40 : (isMobile ? 50 : 180);
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.01 + 0.003,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        hue: Math.random() > 0.85 ? 200 + Math.random() * 60 : 0
      });
    }
  }

  function renderFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.hue) {
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${s.alpha})`;
      } else {
        ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha})`;
      }
      ctx.fill();
    });
  }

  function draw() {
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha > 0.9 || s.alpha < 0.05) s.twinkleDir *= -1;
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
    });
    renderFrame();

    if (!document.hidden && isIntersecting && !prefersReducedMotion) {
      animId = requestAnimationFrame(draw);
    } else {
      animId = null;
    }
  }

  function startAnimation() {
    if (prefersReducedMotion) return;
    if (!animId && !document.hidden && isIntersecting) {
      animId = requestAnimationFrame(draw);
    }
  }

  function stopAnimation() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  resize();
  createStars();
  renderFrame();

  if (!prefersReducedMotion) {
    startAnimation();

    // Pause when tab is backgrounded, resume when active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    // Pause when hero / canvas is scrolled out of viewport
    if ('IntersectionObserver' in window) {
      const heroSection = document.getElementById('home') || canvas;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      createStars();
      renderFrame();
    }, 150);
  });
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
    const backToTop = document.getElementById('backToTop');
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 400);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.className = navLinks.classList.contains('open') ? 'ph ph-x' : 'ph ph-list';
      }
    });

    navLinks.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const icon = hamburger.querySelector('i');
        if (icon) icon.className = 'ph ph-list';
      });
    });
  }

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Banner close
  const bannerClose = document.getElementById('bannerClose');
  const banner = document.getElementById('banner');
  if (bannerClose && banner) {
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }

  // Dropdown toggle for mobile and desktop click accessibility
  document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = trigger.closest('.nav-dropdown');
      if (parent) {
        const isOpen = parent.classList.toggle('open');
        trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
    });
  });

  // Close open dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(d => {
        d.classList.remove('open');
        const t = d.querySelector('.nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */

function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), 0);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────
   PROGRESS BARS
───────────────────────────────────────── */

function initProgressBars() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target;
        const w = bar.dataset.progress;
        bar.style.width = w + '%';
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.progress-fill').forEach(el => obs.observe(el));
}

/* ─────────────────────────────────────────
   RENDER SUBJECTS
───────────────────────────────────────── */

function getDifficultyLabel(d) {
  const map = { easy: '⬤ Easy', medium: '⬤ Medium', hard: '⬤ Hard', advanced: '⬤ Advanced' };
  return map[d] || d;
}

function renderSubjects(filter = 'all') {
  const grid = document.getElementById('subjectsGrid');
  const filtered = filter === 'all' ? SUBJECTS : SUBJECTS.filter(s => s.semester === +filter);

  grid.innerHTML = filtered.map(s => `
    <div class="subject-card" data-id="${s.id}" tabindex="0" role="button"
         style="--card-accent:${s.accent};--card-glow:${s.glow};--icon-bg:${s.iconBg};--icon-border:${s.iconBorder};"
         aria-label="Open ${s.title}">
      <div class="card-header">
        <div class="card-icon">${s.icon}</div>
        <div class="card-meta">
          <span class="semester-tag">Sem ${s.semester}</span>
          <span class="difficulty-tag ${s.difficulty}">${getDifficultyLabel(s.difficulty)}</span>
        </div>
      </div>
      <h3 class="card-title">${s.title}</h3>
      <p class="card-desc">${s.desc}</p>
      <div class="card-topics">
        ${s.topics.map(t => `<span class="topic-chip">${t}</span>`).join('')}
      </div>
      <div class="card-footer">
        <div class="card-progress">
          <div class="progress-label">
            <span>Course Coverage</span>
            <span>${s.progressLabel}</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" data-progress="${s.progress}" style="width:0"></div>
          </div>
        </div>
        <div class="card-arrow">→</div>
      </div>
    </div>
  `).join('');

  // Re-observe progress bars
  setTimeout(initProgressBars, 50);

  // Add click handlers
  grid.querySelectorAll('.subject-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(card.dataset.id); });
  });
}

function initSemesterTabs() {
  const tabs = document.getElementById('semTabs');
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubjects(btn.dataset.sem);
    });
  });
}

/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */

function openModal(id) {
  const s = SUBJECTS.find(x => x.id === id);
  if (!s) return;

  document.getElementById('modalIcon').textContent = s.icon;
  document.getElementById('modalIcon').style.background = s.iconBg;
  document.getElementById('modalTitle').textContent = s.title;
  document.getElementById('modalSemester').textContent = `Fakir Mohan University (NEP 2020) · Semester ${s.semester} · ${s.paperCode || ''}`;

  const body = document.getElementById('modalBody');
  
  const outcomesHtml = s.detail.outcomes ? `
    <div class="modal-section-title">🎯 Course Outcomes</div>
    <ul style="background: rgba(59, 130, 246, 0.05); border-left: 3px solid var(--blue-400); padding: 12px 18px 12px 32px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 20px; font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
      ${s.detail.outcomes.map(o => `<li style="margin-bottom: 4px;">${o}</li>`).join('')}
    </ul>
  ` : '';

  const unitsHtml = s.detail.units ? `
    <div class="modal-section-title">📚 Course Units Breakdown</div>
    <div class="modal-units-list" style="margin-bottom: 20px;">
      ${s.detail.units.map(u => `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 8px; font-size: 0.9rem; color: var(--text-primary); line-height: 1.5;">
          ${u}
        </div>
      `).join('')}
    </div>
  ` : '';

  const labHtml = s.detail.labComponent ? `
    <div class="modal-section-title">🔬 Practical / Lab Component (Credit-1)</div>
    <div style="background: rgba(34, 211, 238, 0.05); border-left: 3px solid var(--cyan-400); padding: 14px 18px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 20px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
      ${s.detail.labComponent}
    </div>
  ` : '';

  const downloadSlotsHtml = s.detail.downloadSlots ? `
    <div class="modal-section-title">📥 Resource Download Slots</div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 20px;">
      ${s.detail.downloadSlots.map(slot => `
        <div style="background: var(--bg-deep); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="font-size: 0.85rem; font-weight: 500; color: var(--text-primary);">${slot.label}</div>
          <a href="https://drive.google.com/drive/folders/18NdG14eazAKfoq1HMbBH9aWohgcTgU5o?usp=drive_link" target="_blank" rel="noopener" style="background: var(--blue-500); color: #fff; text-decoration: none; padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
            Download ⬇
          </a>
        </div>
      `).join('')}
    </div>
  ` : '';

  const refBooksHtml = s.detail.referenceBooks ? `
    <div class="modal-section-title">📚 Prescribed Reference Books</div>
    <div class="modal-textbooks" style="margin-bottom: 20px;">
      ${s.detail.referenceBooks.map(b => `
        <div class="modal-textbook">
          <div class="modal-textbook-icon">📙</div>
          <div class="modal-textbook-info">
            <div class="modal-textbook-title">${b.title}</div>
            <div class="modal-textbook-author">${b.author} (${b.publisher || ''})</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  body.innerHTML = `
    ${outcomesHtml}
    ${unitsHtml}
    ${labHtml}
    ${downloadSlotsHtml}

    <div class="modal-section-title">📖 Recommended Textbooks</div>
    <div class="modal-textbooks">
      ${s.detail.textbooks.map(b => `
        <div class="modal-textbook">
          <div class="modal-textbook-icon">📖</div>
          <div class="modal-textbook-info">
            <div class="modal-textbook-title">${b.title}</div>
            <div class="modal-textbook-author">${b.author}</div>
          </div>
        </div>
      `).join('')}
    </div>

    ${refBooksHtml}

    <div class="modal-section-title">⚡ Key Formulae & Core Equations</div>
    <div class="modal-key-formulae">
      ${s.detail.formulae.map(f => `<div class="modal-formula-item">${f}</div>`).join('')}
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

/* ─────────────────────────────────────────
   RENDER FORMULAS
───────────────────────────────────────── */

let currentFormulaeCat = 'all';
let formulaeQuery = '';

function renderFormulae() {
  const grid = document.getElementById('formulaeGrid');
  const filtered = FORMULAE.filter(f => {
    const matchCat = currentFormulaeCat === 'all' || f.cat === currentFormulaeCat;
    const q = formulaeQuery.toLowerCase();
    const matchQ = !q || f.name.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="color:var(--text-muted);font-size:0.9rem;padding:32px 0;">No formulae match your search.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((f, i) => `
    <div class="formulae-card" data-latex="${encodeURIComponent(f.latex)}">
      <div class="formulae-card-header">
        <span class="formulae-subject">${f.subject}</span>
        <button class="formulae-copy-btn" title="Copy LaTeX" data-latex="${encodeURIComponent(f.latex)}">📋 Copy</button>
      </div>
      <div class="formulae-name">${f.name}</div>
      <div class="formulae-math" id="formulae-math-${i}">$${f.latex}$</div>
      <div class="formulae-desc">${f.desc}</div>
    </div>
  `).join('');

  // Re-render KaTeX
  if (window.renderMathInElement) {
    renderMathInElement(grid, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  // Copy buttons
  grid.querySelectorAll('.formulae-copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const latex = decodeURIComponent(btn.dataset.latex);
      navigator.clipboard.writeText(latex).then(() => {
        btn.textContent = '✅ Copied!';
        setTimeout(() => btn.textContent = '📋 Copy', 1800);
      }).catch(() => {
        btn.textContent = '⚠️ Error';
        setTimeout(() => btn.textContent = '📋 Copy', 1800);
      });
    });
  });
}

function initFormulae() {
  const searchInput = document.getElementById('formulaeSearch');
  const catBtns = document.getElementById('formulaeCats');

  searchInput.addEventListener('input', () => {
    formulaeQuery = searchInput.value;
    renderFormulae();
  });

  catBtns.querySelectorAll('.formulae-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.querySelectorAll('.formulae-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFormulaeCat = btn.dataset.cat;
      renderFormulae();
    });
  });
}

/* ─────────────────────────────────────────
   RENDER RESOURCES
───────────────────────────────────────── */

function renderResources() {
  const grid = document.getElementById('resourcesGrid');
  grid.innerHTML = RESOURCES.map(r => `
    <a class="resource-card" href="${r.url}" target="_blank" rel="noopener noreferrer">
      <div class="resource-icon" style="background:${r.color}18;border:1px solid ${r.color}30;">${r.icon}</div>
      <div class="resource-type" style="color:${r.color};">${r.type}</div>
      <div class="resource-name">${r.name}</div>
      <p class="resource-desc">${r.desc}</p>
      <div class="resource-link-text" style="color:${r.color};">
        ${r.linkText}
      </div>
    </a>
  `).join('');
}

/* ─────────────────────────────────────────
   RENDER TIMELINE
───────────────────────────────────────── */

function renderTimeline() {
  const wrapper = document.getElementById('timelineWrapper');
  const items = TIMELINE.map(t => `
    <div class="timeline-item">
      <div class="timeline-dot">${t.sem}</div>
      <div class="timeline-content">
        <div class="timeline-semester">${t.label}</div>
        <div class="timeline-subjects">
          ${t.subjects.map(s => `<span class="timeline-subject-tag">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');

  wrapper.innerHTML = `<div class="timeline-line"></div>` + items;
}

/* ─────────────────────────────────────────
   RENDER STUDY TIPS
───────────────────────────────────────── */

function renderTips() {
  const grid = document.getElementById('tipsGrid');
  grid.innerHTML = TIPS.map((t, i) => `
    <div class="tip-card">
      <div class="tip-number">0${i + 1}</div>
      <div class="tip-title">${t.title}</div>
      <div class="tip-desc">${t.desc}</div>
    </div>
  `).join('');
}

function renderPYQ(exam = 'all') {
  const grid = document.getElementById('pyqGrid');
  const filtered = exam === 'all' ? PYQS : PYQS.filter(p => p.exam === exam);
  
  grid.innerHTML = filtered.map(p => `
    <div class="pyq-card">
      <div class="pyq-exam-badge">
        <i class="ph ph-book"></i> ${p.exam.toUpperCase()}
      </div>
      <div class="pyq-year">Year: ${p.year}</div>
      <div class="pyq-title">${p.title}</div>
      <div class="pyq-subject">
        <i class="ph ph-flask"></i> ${p.subject}
      </div>
      <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:14px; line-height:1.5;">${p.desc}</p>
      <div class="pyq-footer">
        <span class="pyq-difficulty ${p.difficulty}">${p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}</span>
        <button class="pyq-view-btn">
          View Solution <i class="ph ph-arrow-right"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function initPYQFilters() {
  const buttons = document.querySelectorAll('.pyq-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const exam = btn.getAttribute('data-exam');
      renderPYQ(exam);
    });
  });
}

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */

function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  const num = parseInt(target);

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * num);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = [
    { id: 'counter-subjects', val: 15, suffix: '' },
    { id: 'counter-formulas', val: 200, suffix: '+' },
    { id: 'counter-semesters', val: 6, suffix: '' },
    { id: 'counter-books', val: 40, suffix: '+' }
  ];

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const c = counters.find(x => x.id === e.target.id);
        if (c) animateCounter(e.target, c.val, c.suffix);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) obs.observe(el);
  });
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  initNavbar();
  renderSubjects();
  initSemesterTabs();
  initModal();
  renderFormulae();
  initFormulae();
  renderResources();
  renderTimeline();
  renderTips();
  // PYQ section now links to Google Drive, so no rendering needed
  // renderPYQ();
  // initPYQFilters();
  initScrollReveal();
  initProgressBars();
  initCounters();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Stagger card animations
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.subject-card, .formula-card, .resource-card, .tip-card');
        cards.forEach((card, idx) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(24px)';
          card.style.transition = `opacity 0.5s ${idx * 0.07}s ease, transform 0.5s ${idx * 0.07}s ease`;
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 80 + idx * 70);
        });
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  ['subjectsGrid', 'formulaeGrid', 'resourcesGrid', 'tipsGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) revealObs.observe(el);
  });

});
