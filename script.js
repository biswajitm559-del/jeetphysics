/* ============================================================
   JeetPhysics — B.Sc Honours Study Portal
   Main JavaScript — Data, Interactions & Animations
============================================================ */

'use strict';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */

const SUBJECTS = [
  {
    id: 'mechanics',
    semester: 1,
    icon: '⚙️',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
    accent: 'linear-gradient(90deg,#3b82f6,#22d3ee)',
    glow: 'rgba(59,130,246,0.08)',
    title: 'Classical Mechanics',
    difficulty: 'medium',
    desc: 'Foundations of Newtonian mechanics, Lagrangian & Hamiltonian formulations, rigid body dynamics, and celestial mechanics.',
    topics: ['Newton\'s Laws', 'Lagrangian Mechanics', 'Hamiltonian Formalism', 'Central Force Problems', 'Rigid Body Dynamics', 'Small Oscillations'],
    progress: 72,
    progressLabel: '72% covered',
    detail: {
      allTopics: ['Newton\'s Laws of Motion', 'Work-Energy Theorem', 'Conservation Laws', 'Lagrangian Mechanics', 'Euler-Lagrange Equations', 'Hamiltonian Mechanics', 'Canonical Transformations', 'Poisson Brackets', 'Central Force Problems', 'Kepler\'s Laws', 'Rigid Body Motion', 'Euler\'s Equations', 'Small Oscillations', 'Normal Modes', 'Special Theory of Relativity'],
      textbooks: [
        { title: 'Classical Mechanics', author: 'H. Goldstein, C. Poole, J. Safko' },
        { title: 'Mechanics', author: 'L. D. Landau & E. M. Lifshitz' },
        { title: 'Classical Dynamics', author: 'J. B. Marion & S. T. Thornton' },
        { title: 'An Introduction to Mechanics', author: 'D. Kleppner & R. Kolenkow' }
      ],
      formulas: ['L = T - V', 'd/dt(∂L/∂q̇) - ∂L/∂q = 0', 'H = Σ(pq̇) - L', '{q_i, p_j} = δ_ij']
    }
  },
  {
    id: 'mathphys1',
    semester: 1,
    icon: '📐',
    iconBg: 'rgba(167,139,250,0.12)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: 'linear-gradient(90deg,#a78bfa,#f472b6)',
    glow: 'rgba(167,139,250,0.08)',
    title: 'Mathematical Physics I',
    difficulty: 'hard',
    desc: 'Vector calculus, complex analysis, differential equations, Fourier series, and special functions essential for physics.',
    topics: ['Vector Calculus', 'Complex Analysis', 'ODEs & PDEs', 'Fourier Series', 'Special Functions', 'Tensor Analysis'],
    progress: 60,
    progressLabel: '60% covered',
    detail: {
      allTopics: ['Gradient, Divergence, Curl', 'Stokes & Green\'s Theorems', 'Gauss Divergence Theorem', 'Complex Variables', 'Cauchy-Riemann Equations', 'Residue Theorem', 'Contour Integration', 'Fourier Series & Transform', 'Laplace Transform', 'Legendre Polynomials', 'Bessel Functions', 'Hermite & Laguerre Polynomials', 'Tensors & Index Notation', 'Group Theory Basics'],
      textbooks: [
        { title: 'Mathematical Methods for Physicists', author: 'G. B. Arfken & H. J. Weber' },
        { title: 'Mathematical Physics', author: 'B. S. Rajput' },
        { title: 'Methods of Theoretical Physics', author: 'Morse & Feshbach' }
      ],
      formulas: ['∇²φ = 0 (Laplace)', '∮ f(z)dz = 2πi Σ Res', 'f(x) = Σ(aₙcos(nπx/L) + bₙsin(nπx/L))']
    }
  },
  {
    id: 'em',
    semester: 2,
    icon: '⚡',
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.25)',
    accent: 'linear-gradient(90deg,#f59e0b,#fb923c)',
    glow: 'rgba(245,158,11,0.08)',
    title: 'Electricity & Magnetism',
    difficulty: 'hard',
    desc: 'Electrostatics, magnetostatics, Maxwell\'s equations, electromagnetic waves, and radiation from accelerating charges.',
    topics: ['Electrostatics', 'Magnetostatics', 'Maxwell\'s Equations', 'EM Waves', 'Electromagnetic Radiation', 'Multipole Expansion'],
    progress: 55,
    progressLabel: '55% covered',
    detail: {
      allTopics: ['Coulomb\'s Law & Gauss\'s Law', 'Electric Potential', 'Laplace & Poisson Equations', 'Boundary Value Problems', 'Biot-Savart Law', 'Ampere\'s Law', 'Faraday\'s Law', 'Maxwell\'s Equations', 'EM Wave Equation', 'Poynting Theorem', 'Multipole Expansion', 'Magnetic Materials', 'Radiation from Oscillating Dipole', 'Relativistic Electrodynamics'],
      textbooks: [
        { title: 'Introduction to Electrodynamics', author: 'D. J. Griffiths' },
        { title: 'Classical Electrodynamics', author: 'J. D. Jackson' },
        { title: 'Electricity & Magnetism', author: 'Purcell & Morin' }
      ],
      formulas: ['∇·E = ρ/ε₀', '∇×B = μ₀J + μ₀ε₀∂E/∂t', '∇×E = -∂B/∂t', '∇·B = 0']
    }
  },
  {
    id: 'waves',
    semester: 2,
    icon: '🌊',
    iconBg: 'rgba(34,211,238,0.12)',
    iconBorder: 'rgba(34,211,238,0.25)',
    accent: 'linear-gradient(90deg,#22d3ee,#67e8f9)',
    glow: 'rgba(34,211,238,0.08)',
    title: 'Waves & Optics',
    difficulty: 'medium',
    desc: 'Wave motion, interference, diffraction, polarization, coherence, and advanced topics in physical optics and laser physics.',
    topics: ['Wave Motion', 'Superposition', 'Interference', 'Diffraction', 'Polarization', 'Lasers & Holography'],
    progress: 80,
    progressLabel: '80% covered',
    detail: {
      allTopics: ['Transverse & Longitudinal Waves', 'Wave Equation', 'Superposition Principle', 'Beats', 'Young\'s Double Slit', 'Thin Film Interference', 'Newton\'s Rings', 'Fraunhofer Diffraction', 'Fresnel Diffraction', 'Diffraction Grating', 'Polarization & Malus\'s Law', 'Brewster\'s Angle', 'Optical Fiber', 'Laser Principles', 'Holography'],
      textbooks: [
        { title: 'Optics', author: 'Eugene Hecht' },
        { title: 'Waves & Oscillations', author: 'N. K. Bajaj' },
        { title: 'Introduction to Optics', author: 'Pedrotti & Pedrotti' }
      ],
      formulas: ['v = fλ', 'I = I₀cos²(θ) [Malus]', 'dsinθ = mλ [Grating]', 'I = 4I₀cos²(δ/2)']
    }
  },
  {
    id: 'quantum1',
    semester: 3,
    icon: '⚛️',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    accent: 'linear-gradient(90deg,#34d399,#6ee7b7)',
    glow: 'rgba(52,211,153,0.08)',
    title: 'Quantum Mechanics I',
    difficulty: 'advanced',
    desc: 'Foundations of quantum theory — wave-particle duality, Schrödinger equation, operators, and exactly solvable potentials.',
    topics: ['Wave-Particle Duality', 'Schrödinger Equation', 'Operators & Observables', 'Harmonic Oscillator', 'Hydrogen Atom', 'Spin'],
    progress: 45,
    progressLabel: '45% covered',
    detail: {
      allTopics: ['Photoelectric Effect', 'Compton Effect', 'de Broglie Hypothesis', 'Uncertainty Principle', 'Schrödinger Equation', 'Wave Functions & Normalization', 'Operators & Eigenstates', 'Dirac Notation (Bra-Ket)', 'Particle in a Box', 'Quantum Harmonic Oscillator', 'Step Potential & Tunneling', 'Angular Momentum', 'Hydrogen Atom', 'Spin & Pauli Matrices', 'Addition of Angular Momenta'],
      textbooks: [
        { title: 'Introduction to Quantum Mechanics', author: 'D. J. Griffiths' },
        { title: 'Quantum Mechanics', author: 'L. I. Schiff' },
        { title: 'Principles of Quantum Mechanics', author: 'P. A. M. Dirac' },
        { title: 'Quantum Mechanics', author: 'J. J. Sakurai & J. Napolitano' }
      ],
      formulas: ['Ĥψ = Eψ', 'ΔxΔp ≥ ℏ/2', 'E_n = ℏω(n+½)', 'E_n = -13.6/n² eV']
    }
  },
  {
    id: 'thermal',
    semester: 3,
    icon: '🔥',
    iconBg: 'rgba(248,113,113,0.12)',
    iconBorder: 'rgba(248,113,113,0.25)',
    accent: 'linear-gradient(90deg,#f87171,#fb923c)',
    glow: 'rgba(248,113,113,0.08)',
    title: 'Thermal Physics',
    difficulty: 'medium',
    desc: 'Laws of thermodynamics, kinetic theory of gases, entropy, thermodynamic potentials, and phase transitions.',
    topics: ['Laws of Thermodynamics', 'Kinetic Theory', 'Entropy', 'Carnot Cycle', 'Thermodynamic Potentials', 'Phase Transitions'],
    progress: 68,
    progressLabel: '68% covered',
    detail: {
      allTopics: ['Zeroth Law & Temperature', 'First Law: Internal Energy', 'Second Law: Entropy', 'Third Law', 'Carnot Engine & Efficiency', 'Refrigerators & Heat Pumps', 'Kinetic Theory of Gases', 'Maxwell-Boltzmann Distribution', 'Equipartition Theorem', 'Van der Waals Gas', 'Thermodynamic Potentials (G, F, H)', 'Maxwell Relations', 'Clausius-Clapeyron Equation', 'Phase Transitions'],
      textbooks: [
        { title: 'Thermal Physics', author: 'F. Reif' },
        { title: 'Heat & Thermodynamics', author: 'Zemansky & Dittman' },
        { title: 'Thermodynamics & Statistical Mechanics', author: 'E. Fermi' }
      ],
      formulas: ['dU = δQ - δW', 'S = k_B ln Ω', 'η_Carnot = 1 - T_c/T_h', 'dG = -SdT + VdP']
    }
  },
  {
    id: 'statmech',
    semester: 4,
    icon: '📊',
    iconBg: 'rgba(59,130,246,0.12)',
    iconBorder: 'rgba(59,130,246,0.25)',
    accent: 'linear-gradient(90deg,#3b82f6,#818cf8)',
    glow: 'rgba(99,102,241,0.08)',
    title: 'Statistical Mechanics',
    difficulty: 'advanced',
    desc: 'Ensemble theory, partition functions, quantum statistics (Bose-Einstein & Fermi-Dirac), and applications to real systems.',
    topics: ['Ensemble Theory', 'Partition Function', 'Bose-Einstein Statistics', 'Fermi-Dirac Statistics', 'Blackbody Radiation', 'Phase Transitions'],
    progress: 40,
    progressLabel: '40% covered',
    detail: {
      allTopics: ['Microcanonical Ensemble', 'Canonical Ensemble', 'Grand Canonical Ensemble', 'Partition Function Z', 'Thermodynamic Quantities from Z', 'Ideal Gas in Statistical Mechanics', 'Maxwell-Boltzmann Statistics', 'Bose-Einstein Distribution', 'Bose-Einstein Condensation', 'Fermi-Dirac Distribution', 'Free Electron Theory of Metals', 'Planck\'s Radiation Law', 'Einstein & Debye Models', 'Ising Model', 'Mean Field Theory'],
      textbooks: [
        { title: 'Statistical Mechanics', author: 'R. K. Pathria & P. D. Beale' },
        { title: 'Statistical Physics', author: 'L. D. Landau & E. M. Lifshitz' },
        { title: 'An Introduction to Statistical Mechanics', author: 'Huang' }
      ],
      formulas: ['Z = Σ_i e^(-βE_i)', 'F = -k_BT ln Z', 'n̄ = 1/(e^(β(ε-μ)) ± 1)']
    }
  },
  {
    id: 'electronics',
    semester: 4,
    icon: '🔌',
    iconBg: 'rgba(251,191,36,0.12)',
    iconBorder: 'rgba(251,191,36,0.25)',
    accent: 'linear-gradient(90deg,#fbbf24,#34d399)',
    glow: 'rgba(251,191,36,0.08)',
    title: 'Electronics & Devices',
    difficulty: 'medium',
    desc: 'Semiconductor devices, diodes, transistors, op-amps, digital electronics, and analog circuit analysis.',
    topics: ['Semiconductors', 'p-n Junction', 'Transistors', 'Op-Amps', 'Logic Gates', 'Oscillators'],
    progress: 75,
    progressLabel: '75% covered',
    detail: {
      allTopics: ['Semiconductor Physics', 'p-n Junction Diode', 'Rectifiers & Filters', 'Zener Diode Applications', 'BJT Transistor', 'FET & MOSFET', 'Amplifier Circuits', 'Op-Amp Characteristics', 'Inverting & Non-Inverting Amplifier', 'Differentiator & Integrator', 'Boolean Algebra', 'Logic Gates', 'Flip-Flops', 'Counters & Registers', 'ADC & DAC'],
      textbooks: [
        { title: 'Electronics: Devices & Circuit Theory', author: 'R. L. Boylestad & L. Nashelsky' },
        { title: 'Fundamentals of Physics', author: 'Halliday, Resnick & Walker' },
        { title: 'Digital Fundamentals', author: 'T. L. Floyd' }
      ],
      formulas: ['I = I₀(e^(V/V_T) - 1)', 'A_v = -g_m R_D', 'V_out/V_in = -R_f/R_in [Inverting]']
    }
  },
  {
    id: 'nuclear',
    semester: 5,
    icon: '☢️',
    iconBg: 'rgba(248,113,113,0.12)',
    iconBorder: 'rgba(248,113,113,0.25)',
    accent: 'linear-gradient(90deg,#f87171,#a78bfa)',
    glow: 'rgba(248,113,113,0.08)',
    title: 'Nuclear & Particle Physics',
    difficulty: 'advanced',
    desc: 'Nuclear structure, radioactive decay, nuclear reactions, particle accelerators, and the Standard Model of particles.',
    topics: ['Nuclear Structure', 'Radioactive Decay', 'Nuclear Reactions', 'Fission & Fusion', 'Particle Detectors', 'Standard Model'],
    progress: 35,
    progressLabel: '35% covered',
    detail: {
      allTopics: ['Nuclear Properties (size, mass, spin)', 'Nuclear Models (Shell, Liquid Drop)', 'Binding Energy & Mass Defect', 'Alpha Decay & Gamow Theory', 'Beta Decay & Neutrinos', 'Gamma Decay & Selection Rules', 'Nuclear Reactions & Cross Sections', 'Nuclear Fission', 'Nuclear Fusion', 'Particle Accelerators', 'Particle Detectors', 'Leptons, Quarks & Bosons', 'Conservation Laws', 'Standard Model', 'Quark Model & Hadrons'],
      textbooks: [
        { title: 'Nuclear Physics', author: 'D. C. Tayal' },
        { title: 'Introduction to Nuclear Physics', author: 'Krane' },
        { title: 'Introduction to Particle Physics', author: 'Griffiths' }
      ],
      formulas: ['BE = [Zm_p + Nm_n - M]c²', 'N(t) = N₀e^(-λt)', 't½ = ln2/λ', 'Q = (m_i - m_f)c²']
    }
  },
  {
    id: 'solidstate',
    semester: 5,
    icon: '💎',
    iconBg: 'rgba(45,212,191,0.12)',
    iconBorder: 'rgba(45,212,191,0.25)',
    accent: 'linear-gradient(90deg,#2dd4bf,#22d3ee)',
    glow: 'rgba(45,212,191,0.08)',
    title: 'Solid State Physics',
    difficulty: 'hard',
    desc: 'Crystal structure, lattice vibrations, electronic band theory, superconductivity, semiconductors, and magnetic properties.',
    topics: ['Crystal Structure', 'Lattice Dynamics', 'Band Theory', 'Semiconductors', 'Superconductivity', 'Magnetism'],
    progress: 50,
    progressLabel: '50% covered',
    detail: {
      allTopics: ['Bravais Lattices & Miller Indices', 'X-ray Diffraction & Bragg\'s Law', 'Reciprocal Lattice', 'Phonons & Lattice Vibrations', 'Debye & Einstein Models', 'Free Electron Model', 'Bloch\'s Theorem', 'Band Structure', 'Effective Mass & Holes', 'Intrinsic & Extrinsic Semiconductors', 'Hall Effect', 'Superconductivity & Meissner Effect', 'BCS Theory', 'Diamagnetism, Paramagnetism, Ferromagnetism'],
      textbooks: [
        { title: 'Introduction to Solid State Physics', author: 'C. Kittel' },
        { title: 'Solid State Physics', author: 'A. J. Dekker' },
        { title: 'Solid State Physics', author: 'S. O. Pillai' }
      ],
      formulas: ['2d sinθ = nλ [Bragg]', 'ω² = 4C/M · sin²(ka/2)', 'E_F = (ℏ²/2m)(3π²n)^(2/3)']
    }
  },
  {
    id: 'atomic',
    semester: 6,
    icon: '🔭',
    iconBg: 'rgba(167,139,250,0.12)',
    iconBorder: 'rgba(167,139,250,0.25)',
    accent: 'linear-gradient(90deg,#a78bfa,#818cf8)',
    glow: 'rgba(167,139,250,0.08)',
    title: 'Atomic & Molecular Physics',
    difficulty: 'advanced',
    desc: 'Atomic spectra, term symbols, perturbation theory, molecular bonding, spectroscopy techniques and applications.',
    topics: ['Atomic Spectra', 'Perturbation Theory', 'Zeeman Effect', 'Molecular Bonding', 'Rotational Spectra', 'Raman Spectroscopy'],
    progress: 30,
    progressLabel: '30% covered',
    detail: {
      allTopics: ['Hydrogen Spectrum & Term Symbols', 'Fine & Hyperfine Structure', 'Time-independent Perturbation Theory', 'Variational Method', 'WKB Approximation', 'Normal & Anomalous Zeeman Effect', 'Stark Effect', 'Helium Atom', 'Multi-electron Atoms & Hund\'s Rules', 'Molecular Orbital Theory', 'Rotational, Vibrational Spectra', 'Raman Effect', 'Electron Spin Resonance', 'NMR Spectroscopy'],
      textbooks: [
        { title: 'Atomic & Molecular Spectra', author: 'Raj Kumar' },
        { title: 'Molecular Quantum Mechanics', author: 'Atkins & Friedman' },
        { title: 'Introduction to Atomic Spectra', author: 'Harvey E. White' }
      ],
      formulas: ['E_n = E_n⁰ + ⟨n|H\'|n⟩', 'ΔE = m_J g_J μ_B B [Zeeman]', 'Δ̃ν = ±2B(J+1) [Rotational]']
    }
  },
  {
    id: 'computational',
    semester: 6,
    icon: '💻',
    iconBg: 'rgba(52,211,153,0.12)',
    iconBorder: 'rgba(52,211,153,0.25)',
    accent: 'linear-gradient(90deg,#34d399,#3b82f6)',
    glow: 'rgba(52,211,153,0.08)',
    title: 'Computational Physics',
    difficulty: 'medium',
    desc: 'Numerical methods for physics problems — ODE solvers, Monte Carlo methods, matrix diagonalization, and data analysis.',
    topics: ['Numerical Methods', 'Monte Carlo', 'ODE Solvers', 'Fourier Analysis', 'Curve Fitting', 'Python for Physics'],
    progress: 55,
    progressLabel: '55% covered',
    detail: {
      allTopics: ['Error Analysis & Floating Point', 'Root Finding (Bisection, Newton-Raphson)', 'Numerical Integration (Simpson, Romberg)', 'Matrix Methods & Eigenvalue Problems', 'ODE Solvers (Euler, Runge-Kutta)', 'Partial Differential Equations', 'Monte Carlo Simulation', 'Random Walk Problems', 'Fast Fourier Transform (FFT)', 'Least Squares Curve Fitting', 'Python (NumPy, SciPy, Matplotlib)', 'Data Visualization'],
      textbooks: [
        { title: 'Computational Physics', author: 'N. J. Giordano & H. Nakanishi' },
        { title: 'Numerical Recipes in C', author: 'Press, Teukolsky et al.' },
        { title: 'Computational Physics', author: 'M. Newman' }
      ],
      formulas: ['y_{n+1} = y_n + hf(x_n,y_n) [Euler]', 'I ≈ (h/3)[f₀ + 4f₁ + f₂] [Simpson]']
    }
  }
];

const FORMULAS = [
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
    label: 'Semester I — Foundations',
    subjects: ['Classical Mechanics', 'Mathematical Physics I', 'Physics Lab I']
  },
  {
    sem: 'II',
    label: 'Semester II — Fields & Waves',
    subjects: ['Electricity & Magnetism', 'Waves & Optics', 'Mathematical Physics II', 'Physics Lab II']
  },
  {
    sem: 'III',
    label: 'Semester III — Quantum Beginnings',
    subjects: ['Quantum Mechanics I', 'Thermal Physics', 'Analog Electronics', 'Physics Lab III']
  },
  {
    sem: 'IV',
    label: 'Semester IV — Statistical & Digital',
    subjects: ['Statistical Mechanics', 'Electronics & Devices', 'Quantum Mechanics II', 'Physics Lab IV']
  },
  {
    sem: 'V',
    label: 'Semester V — Modern Physics',
    subjects: ['Nuclear & Particle Physics', 'Solid State Physics', 'Atomic & Molecular Physics', 'Physics Lab V']
  },
  {
    sem: 'VI',
    label: 'Semester VI — Advanced Topics',
    subjects: ['Computational Physics', 'Atomic & Molecular Spectroscopy', 'Advanced Lab', 'Project / Dissertation']
  }
];

const TIPS = [
  { title: 'Master the Fundamentals First', desc: 'Physics is cumulative. Before jumping to Quantum Mechanics, ensure your Classical Mechanics and Math Physics foundation is rock solid.' },
  { title: 'Derive Every Equation', desc: 'Never just memorise formulas. Derive them from first principles. This builds intuition and helps you reconstruct them under exam pressure.' },
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
  const ctx = canvas.getContext('2d');
  let stars = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars(n = 200) {
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

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const t = Date.now() * 0.001;
    stars.forEach(s => {
      s.alpha += s.twinkleSpeed * s.twinkleDir;
      if (s.alpha > 0.9 || s.alpha < 0.05) s.twinkleDir *= -1;
      s.y += s.speed;
      if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      if (s.hue) {
        ctx.fillStyle = `hsla(${s.hue}, 80%, 80%, ${s.alpha})`;
      } else {
        ctx.fillStyle = `rgba(200, 220, 255, ${s.alpha})`;
      }
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  createStars();
  draw();
  window.addEventListener('resize', () => { resize(); createStars(); });
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */

function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.querySelector('i').className = navLinks.classList.contains('open')
      ? 'ph ph-x' : 'ph ph-list';
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelector('i').className = 'ph ph-list';
    });
  });

  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Banner close
  const bannerClose = document.getElementById('bannerClose');
  const banner = document.getElementById('banner');
  if (bannerClose) {
    bannerClose.addEventListener('click', () => {
      banner.style.display = 'none';
    });
  }
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
  document.getElementById('modalSemester').textContent = `Semester ${s.semester} · ${s.difficulty.charAt(0).toUpperCase() + s.difficulty.slice(1)} Level`;

  const body = document.getElementById('modalBody');
  body.innerHTML = `
    <div class="modal-section-title">Topics Covered</div>
    <ul class="modal-topics-list">
      ${s.detail.allTopics.map(t => `<li>${t}</li>`).join('')}
    </ul>

    <div class="modal-section-title">Recommended Textbooks</div>
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

    <div class="modal-section-title">Key Formulas</div>
    <div class="modal-key-formulas">
      ${s.detail.formulas.map(f => `<div class="modal-formula-item">${f}</div>`).join('')}
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

let currentFormulaCat = 'all';
let formulaQuery = '';

function renderFormulas() {
  const grid = document.getElementById('formulasGrid');
  const filtered = FORMULAS.filter(f => {
    const matchCat = currentFormulaCat === 'all' || f.cat === currentFormulaCat;
    const q = formulaQuery.toLowerCase();
    const matchQ = !q || f.name.toLowerCase().includes(q) || f.subject.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="color:var(--text-muted);font-size:0.9rem;padding:32px 0;">No formulas match your search.</div>`;
    return;
  }

  grid.innerHTML = filtered.map((f, i) => `
    <div class="formula-card" data-latex="${encodeURIComponent(f.latex)}">
      <div class="formula-card-header">
        <span class="formula-subject">${f.subject}</span>
        <button class="formula-copy-btn" title="Copy LaTeX" data-latex="${encodeURIComponent(f.latex)}">📋 Copy</button>
      </div>
      <div class="formula-name">${f.name}</div>
      <div class="formula-math" id="formula-math-${i}">$${f.latex}$</div>
      <div class="formula-desc">${f.desc}</div>
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
  grid.querySelectorAll('.formula-copy-btn').forEach(btn => {
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

function initFormulas() {
  const searchInput = document.getElementById('formulaSearch');
  const catBtns = document.getElementById('formulaCats');

  searchInput.addEventListener('input', () => {
    formulaQuery = searchInput.value;
    renderFormulas();
  });

  catBtns.querySelectorAll('.formula-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.querySelectorAll('.formula-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFormulaCat = btn.dataset.cat;
      renderFormulas();
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
    { id: 'counter-subjects', val: 12, suffix: '' },
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
  renderFormulas();
  initFormulas();
  renderResources();
  renderTimeline();
  renderTips();
  renderPYQ();
  initPYQFilters();
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

  ['subjectsGrid', 'formulasGrid', 'resourcesGrid', 'tipsGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) revealObs.observe(el);
  });
});
