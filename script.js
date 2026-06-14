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
      formulae: ['L = T - V', 'd/dt(∂L/∂q̇) - ∂L/∂q = 0', 'H = Σ(pq̇) - L', '{q_i, p_j} = δ_ij']
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
      formulae: ['∇²φ = 0 (Laplace)', '∮ f(z)dz = 2πi Σ Res', 'f(x) = Σ(aₙcos(nπx/L) + bₙsin(nπx/L))']
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
      formulae: ['∇·E = ρ/ε₀', '∇×B = μ₀J + μ₀ε₀∂E/∂t', '∇×E = -∂B/∂t', '∇·B = 0']
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
      formulae: ['v = fλ', 'I = I₀cos²(θ) [Malus]', 'dsinθ = mλ [Grating]', 'I = 4I₀cos²(δ/2)']
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
      formulae: ['Ĥψ = Eψ', 'ΔxΔp ≥ ℏ/2', 'E_n = ℏω(n+½)', 'E_n = -13.6/n² eV']
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
      formulae: ['dU = δQ - δW', 'S = k_B ln Ω', 'η_Carnot = 1 - T_c/T_h', 'dG = -SdT + VdP']
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
      formulae: ['Z = Σ_i e^(-βE_i)', 'F = -k_BT ln Z', 'n̄ = 1/(e^(β(ε-μ)) ± 1)']
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
      formulae: ['I = I₀(e^(V/V_T) - 1)', 'A_v = -g_m R_D', 'V_out/V_in = -R_f/R_in [Inverting]']
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
      formulae: ['BE = [Zm_p + Nm_n - M]c²', 'N(t) = N₀e^(-λt)', 't½ = ln2/λ', 'Q = (m_i - m_f)c²']
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
      formulae: ['2d sinθ = nλ [Bragg]', 'ω² = 4C/M · sin²(ka/2)', 'E_F = (ℏ²/2m)(3π²n)^(2/3)']
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
      formulae: ['E_n = E_n⁰ + ⟨n|H\'|n⟩', 'ΔE = m_J g_J μ_B B [Zeeman]', 'Δ̃ν = ±2B(J+1) [Rotational]']
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
      formulae: ['y_{n+1} = y_n + hf(x_n,y_n) [Euler]', 'I ≈ (h/3)[f₀ + 4f₁ + f₂] [Simpson]']
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

const NUMERICALS = [
  // ── Mechanics ──
  {
    cat: 'mechanics', branch: 'Mechanics', difficulty: 'easy',
    question: 'A 2 kg block slides down a frictionless inclined plane of height 5 m. Find its speed at the bottom.',
    given: '<strong>Given:</strong> m = 2 kg, h = 5 m, g = 9.8 m/s²',
    steps: ['Using conservation of energy: mgh = ½mv²', 'v² = 2gh = 2 × 9.8 × 5 = 98', 'v = √98 = 9.9 m/s'],
    answer: 'v = 9.9 m/s'
  },
  {
    cat: 'mechanics', branch: 'Mechanics', difficulty: 'easy',
    question: 'A body of mass 5 kg is moving with a velocity of 10 m/s. Find its kinetic energy.',
    given: '<strong>Given:</strong> m = 5 kg, v = 10 m/s',
    steps: ['Kinetic energy: KE = ½mv²', 'KE = ½ × 5 × (10)²', 'KE = ½ × 5 × 100 = 250 J'],
    answer: 'KE = 250 J'
  },
  {
    cat: 'mechanics', branch: 'Mechanics', difficulty: 'medium',
    question: 'Find the moment of inertia of a uniform solid sphere of mass 3 kg and radius 0.2 m about an axis through its centre.',
    given: '<strong>Given:</strong> m = 3 kg, R = 0.2 m, I = (2/5)mR² for solid sphere',
    steps: ['I = (2/5) × m × R²', 'I = (2/5) × 3 × (0.2)²', 'I = 0.4 × 3 × 0.04 = 0.048 kg·m²'],
    answer: 'I = 0.048 kg·m²'
  },
  // ── Electromagnetism ──
  {
    cat: 'em', branch: 'Electromagnetism', difficulty: 'easy',
    question: 'Find the electric field at a distance of 0.3 m from a point charge of 5 μC in vacuum.',
    given: '<strong>Given:</strong> q = 5 × 10⁻⁶ C, r = 0.3 m, k = 9 × 10⁹ N·m²/C²',
    steps: ['E = kq/r²', 'E = (9 × 10⁹ × 5 × 10⁻⁶) / (0.3)²', 'E = 45000 / 0.09 = 5 × 10⁵ N/C'],
    answer: 'E = 5 × 10⁵ N/C'
  },
  {
    cat: 'em', branch: 'Electromagnetism', difficulty: 'easy',
    question: 'A straight wire of length 0.5 m carries a current of 3 A in a magnetic field of 0.4 T. Find the force if the wire is perpendicular to B.',
    given: '<strong>Given:</strong> L = 0.5 m, I = 3 A, B = 0.4 T, θ = 90°',
    steps: ['Force on current-carrying wire: F = BIL sin θ', 'F = 0.4 × 3 × 0.5 × sin 90°', 'F = 0.4 × 3 × 0.5 × 1 = 0.6 N'],
    answer: 'F = 0.6 N'
  },
  {
    cat: 'em', branch: 'Electromagnetism', difficulty: 'medium',
    question: 'A parallel plate capacitor has plate area 200 cm² and separation 2 mm. Find its capacitance in vacuum.',
    given: '<strong>Given:</strong> A = 200 cm² = 0.02 m², d = 2 mm = 0.002 m, ε₀ = 8.85 × 10⁻¹² F/m',
    steps: ['C = ε₀A/d', 'C = (8.85 × 10⁻¹² × 0.02) / 0.002', 'C = 1.77 × 10⁻¹³ / 0.002 = 8.85 × 10⁻¹¹ F'],
    answer: 'C = 88.5 pF'
  },
  // ── Waves & Optics ──
  {
    cat: 'waves', branch: 'Waves & Optics', difficulty: 'easy',
    question: 'In Young\'s double slit experiment, the slit separation is 0.5 mm and the screen is 1 m away. Find the fringe width for light of wavelength 600 nm.',
    given: '<strong>Given:</strong> d = 0.5 mm = 5 × 10⁻⁴ m, D = 1 m, λ = 600 nm = 6 × 10⁻⁷ m',
    steps: ['Fringe width: β = λD/d', 'β = (6 × 10⁻⁷ × 1) / (5 × 10⁻⁴)', 'β = 6 × 10⁻⁷ / 5 × 10⁻⁴ = 1.2 × 10⁻³ m'],
    answer: 'β = 1.2 mm'
  },
  {
    cat: 'waves', branch: 'Waves & Optics', difficulty: 'easy',
    question: 'Light passes from air into glass (n = 1.5). If the angle of incidence is 60°, find the angle of refraction.',
    given: '<strong>Given:</strong> n₁ = 1 (air), n₂ = 1.5, θ₁ = 60°',
    steps: ['Snell\'s law: n₁ sin θ₁ = n₂ sin θ₂', 'sin θ₂ = n₁ sin θ₁ / n₂ = sin 60° / 1.5', 'sin θ₂ = 0.866 / 1.5 = 0.577 → θ₂ = 35.3°'],
    answer: 'θ₂ ≈ 35.3°'
  },
  {
    cat: 'waves', branch: 'Waves & Optics', difficulty: 'medium',
    question: 'A diffraction grating has 5000 lines/cm. Find the angular position of the first-order maximum for light of wavelength 500 nm.',
    given: '<strong>Given:</strong> N = 5000 lines/cm, λ = 500 nm = 5 × 10⁻⁷ m, m = 1',
    steps: ['Grating spacing: d = 1/N = 1/(5 × 10⁵) = 2 × 10⁻⁶ m', 'd sin θ = mλ', 'sin θ = mλ/d = (1 × 5 × 10⁻⁷) / (2 × 10⁻⁶) = 0.25 → θ = 14.48°'],
    answer: 'θ ≈ 14.5°'
  },
  // ── Quantum Mechanics ──
  {
    cat: 'quantum', branch: 'Quantum Mechanics', difficulty: 'easy',
    question: 'Find the de Broglie wavelength of an electron accelerated through a potential difference of 100 V.',
    given: '<strong>Given:</strong> V = 100 V, m = 9.1 × 10⁻³¹ kg, e = 1.6 × 10⁻¹⁹ C, h = 6.63 × 10⁻³⁴ J·s',
    steps: ['KE = eV = 1.6 × 10⁻¹⁹ × 100 = 1.6 × 10⁻¹⁷ J', 'p = √(2mKE) = √(2 × 9.1 × 10⁻³¹ × 1.6 × 10⁻¹⁷)', 'p = 5.4 × 10⁻²⁴ kg·m/s → λ = h/p = 1.23 × 10⁻¹⁰ m'],
    answer: 'λ ≈ 1.23 Å (0.123 nm)'
  },
  {
    cat: 'quantum', branch: 'Quantum Mechanics', difficulty: 'easy',
    question: 'Find the energy of a photon of wavelength 500 nm in electron volts.',
    given: '<strong>Given:</strong> λ = 500 nm = 5 × 10⁻⁷ m, h = 6.63 × 10⁻³⁴ J·s, c = 3 × 10⁸ m/s',
    steps: ['E = hc/λ = (6.63 × 10⁻³⁴ × 3 × 10⁸) / (5 × 10⁻⁷)', 'E = 3.98 × 10⁻¹⁹ J', 'E = 3.98 × 10⁻¹⁹ / 1.6 × 10⁻¹⁹ = 2.49 eV'],
    answer: 'E ≈ 2.49 eV'
  },
  {
    cat: 'quantum', branch: 'Quantum Mechanics', difficulty: 'medium',
    question: 'An electron is confined in a 1D box of width 1 Å. Calculate the energy of the ground state.',
    given: '<strong>Given:</strong> L = 1 Å = 10⁻¹⁰ m, m = 9.1 × 10⁻³¹ kg, ℏ = 1.055 × 10⁻³⁴ J·s, n = 1',
    steps: ['Eₙ = n²π²ℏ² / (2mL²)', 'E₁ = π² × (1.055 × 10⁻³⁴)² / (2 × 9.1 × 10⁻³¹ × (10⁻¹⁰)²)', 'E₁ = 6.03 × 10⁻¹⁸ J = 37.7 eV'],
    answer: 'E₁ ≈ 37.7 eV'
  },
  // ── Thermal Physics ──
  {
    cat: 'thermal', branch: 'Thermal Physics', difficulty: 'easy',
    question: 'A Carnot engine operates between reservoirs at 500 K and 300 K. Find its efficiency.',
    given: '<strong>Given:</strong> T_H = 500 K, T_C = 300 K',
    steps: ['Carnot efficiency: η = 1 - T_C/T_H', 'η = 1 - 300/500 = 1 - 0.6', 'η = 0.4 = 40%'],
    answer: 'η = 40%'
  },
  {
    cat: 'thermal', branch: 'Thermal Physics', difficulty: 'easy',
    question: 'Find the rms speed of nitrogen molecules at 27°C. (M = 28 g/mol)',
    given: '<strong>Given:</strong> T = 27°C = 300 K, M = 28 × 10⁻³ kg/mol, R = 8.314 J/(mol·K)',
    steps: ['v_rms = √(3RT/M)', 'v_rms = √(3 × 8.314 × 300 / 0.028)', 'v_rms = √(267,214) = 517 m/s'],
    answer: 'v_rms ≈ 517 m/s'
  },
  {
    cat: 'thermal', branch: 'Thermal Physics', difficulty: 'medium',
    question: 'Calculate the change in entropy when 2 kg of water at 100°C is converted to steam at the same temperature. (L = 2260 kJ/kg)',
    given: '<strong>Given:</strong> m = 2 kg, T = 373 K, L = 2260 kJ/kg',
    steps: ['ΔS = Q/T = mL/T', 'Q = 2 × 2260 × 10³ = 4.52 × 10⁶ J', 'ΔS = 4.52 × 10⁶ / 373 = 12,118 J/K'],
    answer: 'ΔS ≈ 12,118 J/K ≈ 12.1 kJ/K'
  },
  // ── Nuclear Physics ──
  {
    cat: 'nuclear', branch: 'Nuclear Physics', difficulty: 'easy',
    question: 'The half-life of ⁶⁰Co is 5.27 years. Find the decay constant λ.',
    given: '<strong>Given:</strong> t₁/₂ = 5.27 years',
    steps: ['λ = ln(2) / t₁/₂', 'λ = 0.693 / 5.27', 'λ = 0.1315 per year = 4.17 × 10⁻⁹ s⁻¹'],
    answer: 'λ ≈ 0.1315 year⁻¹'
  },
  {
    cat: 'nuclear', branch: 'Nuclear Physics', difficulty: 'easy',
    question: 'Calculate the binding energy per nucleon of ⁴He. Given: mass of ⁴He = 4.0026 u, mp = 1.00783 u, mn = 1.00867 u.',
    given: '<strong>Given:</strong> M(⁴He) = 4.0026 u, Z = 2, N = 2, 1 u = 931.5 MeV/c²',
    steps: ['Mass defect Δm = (Zmp + Nmn) − M', 'Δm = (2 × 1.00783 + 2 × 1.00867) − 4.0026 = 0.0304 u', 'BE = Δm × 931.5 = 28.3 MeV → BE/A = 28.3/4 = 7.07 MeV'],
    answer: 'BE/A ≈ 7.07 MeV/nucleon'
  },
  {
    cat: 'nuclear', branch: 'Nuclear Physics', difficulty: 'medium',
    question: 'A radioactive sample has an activity of 8000 Bq. What will the activity be after 3 half-lives?',
    given: '<strong>Given:</strong> A₀ = 8000 Bq, n = 3 half-lives',
    steps: ['After n half-lives: A = A₀ / 2ⁿ', 'A = 8000 / 2³ = 8000 / 8', 'A = 1000 Bq'],
    answer: 'A = 1000 Bq'
  },
  // ── Solid State Physics ──
  {
    cat: 'solidstate', branch: 'Solid State Physics', difficulty: 'easy',
    question: 'For a simple cubic lattice with lattice constant a = 3 Å, find the interplanar spacing for (100) planes.',
    given: '<strong>Given:</strong> a = 3 Å, (hkl) = (100)',
    steps: ['d_hkl = a / √(h² + k² + l²)', 'd_100 = 3 / √(1 + 0 + 0)', 'd_100 = 3 Å'],
    answer: 'd₁₀₀ = 3 Å'
  },
  {
    cat: 'solidstate', branch: 'Solid State Physics', difficulty: 'medium',
    question: 'X-rays of wavelength 1.54 Å are diffracted by (111) planes of an FCC crystal. First-order diffraction occurs at 2θ = 38.2°. Find the lattice constant.',
    given: '<strong>Given:</strong> λ = 1.54 Å, 2θ = 38.2° → θ = 19.1°, n = 1, (111) planes',
    steps: ['Bragg\'s law: 2d sinθ = nλ → d = λ/(2 sinθ)', 'd = 1.54 / (2 × sin 19.1°) = 1.54 / (2 × 0.327) = 2.35 Å', 'For (111): d = a/√3 → a = d√3 = 2.35 × 1.732 = 4.07 Å'],
    answer: 'a ≈ 4.07 Å'
  },
  {
    cat: 'solidstate', branch: 'Solid State Physics', difficulty: 'easy',
    question: 'Calculate the Fermi energy of copper at 0 K. Given: n = 8.5 × 10²⁸ electrons/m³.',
    given: '<strong>Given:</strong> n = 8.5 × 10²⁸ m⁻³, m = 9.1 × 10⁻³¹ kg, ℏ = 1.055 × 10⁻³⁴ J·s',
    steps: ['E_F = (ℏ²/2m)(3π²n)^(2/3)', 'E_F = (1.055 × 10⁻³⁴)² / (2 × 9.1 × 10⁻³¹) × (3π² × 8.5 × 10²⁸)^(2/3)', 'E_F ≈ 1.13 × 10⁻¹⁸ J = 7.04 eV'],
    answer: 'E_F ≈ 7.04 eV'
  },
  // ── Electronics ──
  {
    cat: 'electronics', branch: 'Electronics', difficulty: 'easy',
    question: 'An inverting amplifier uses an op-amp with R_in = 10 kΩ and R_f = 100 kΩ. Find the voltage gain.',
    given: '<strong>Given:</strong> R_in = 10 kΩ, R_f = 100 kΩ',
    steps: ['Gain of inverting amplifier: A_v = -R_f / R_in', 'A_v = -100 / 10', 'A_v = -10 (inverted output)'],
    answer: 'A_v = −10'
  },
  {
    cat: 'electronics', branch: 'Electronics', difficulty: 'easy',
    question: 'A silicon diode has a forward voltage drop of 0.7 V. If a 5 V battery is connected in series with a 1 kΩ resistor and the diode, find the current.',
    given: '<strong>Given:</strong> V = 5 V, V_d = 0.7 V, R = 1 kΩ',
    steps: ['Voltage across resistor: V_R = V - V_d = 5 - 0.7 = 4.3 V', 'I = V_R / R = 4.3 / 1000', 'I = 4.3 mA'],
    answer: 'I = 4.3 mA'
  },
  {
    cat: 'electronics', branch: 'Electronics', difficulty: 'medium',
    question: 'In a common-emitter transistor circuit, β = 100, I_B = 20 μA. Find I_C and I_E.',
    given: '<strong>Given:</strong> β = 100, I_B = 20 μA = 20 × 10⁻⁶ A',
    steps: ['I_C = β × I_B = 100 × 20 × 10⁻⁶ = 2 × 10⁻³ A = 2 mA', 'I_E = I_C + I_B = 2 + 0.02 = 2.02 mA', 'Alternatively: I_E = (β + 1) × I_B = 101 × 0.02 = 2.02 mA'],
    answer: 'I_C = 2 mA, I_E = 2.02 mA'
  }
];

/* ─────────────────────────────────────────
   PHYSICS CHATBOT WITH GOOGLE GEMINI AI
───────────────────────────────────────── */

// API Configuration - See CHATBOT_API_SETUP.md for instructions
const GEMINI_API_KEY = ''; // Set your API key here or in environment variable
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const USE_DEMO_MODE = true; // Set to false when API key is properly configured

// Demo Physics Responses
const DEMO_RESPONSES = {
  'newton|law|motion': `Newton's Laws of Motion are fundamental principles of classical mechanics:\n\n**First Law (Law of Inertia):**\nAn object at rest stays at rest, and an object in motion stays in motion unless acted upon by a net external force. Mathematically: ΣF = 0 → a = 0\n\n**Second Law (Law of Acceleration):**\nThe net force on an object is equal to the mass times its acceleration: F = ma\n\n**Third Law (Action-Reaction):**\nFor every action, there's an equal and opposite reaction: F₁₂ = -F₂₁\n\nThese laws form the foundation of classical mechanics and are essential for understanding particle motion, orbital mechanics, and many engineering applications.`,
  
  'momentum': `**Momentum** is a fundamental quantity in physics that measures the quantity of motion of an object.\n\n**Definition:** p = mv\nWhere m is mass and v is velocity\n\n**Key Properties:**\n- Vector quantity (has direction)\n- SI Unit: kg⋅m/s\n- Conserved in isolated systems (Law of Conservation of Momentum)\n\n**Impulse-Momentum Theorem:**\nJ = FΔt = Δp = m(v_f - v_i)\n\n**Applications:**\n- Collisions and explosions\n- Rocket propulsion\n- Sports physics\n- Orbital mechanics\n\nMomentum conservation is crucial for analyzing collisions and understanding how forces change the motion of objects over time.`,
  
  'energy': `**Energy** is the capacity of a system to do work. It's one of the most fundamental concepts in physics.\n\n**Forms of Energy:**\n- Kinetic Energy: KE = ½mv²\n- Potential Energy: PE = mgh (gravitational)\n- Elastic Energy: PE = ½kx²\n- Thermal, Chemical, Nuclear, Electromagnetic energy\n\n**Law of Conservation of Energy:**\nTotal energy in an isolated system remains constant. Energy can transform from one form to another but is never created or destroyed.\n\nE_total = KE + PE = constant\n\n**Power:**\nRate of energy transfer: P = W/t = dE/dt (Watts)\n\n**Key Applications:**\n- Thermal dynamics\n- Oscillations and waves\n- Quantum mechanics\n- Astrophysics\n\nUnderstanding energy conservation and transformation is essential for all areas of physics.`,
  
  'ferromagnetism|magnetic': `**Ferromagnetism** is the phenomenon where certain materials become strongly attracted to magnets and can remain magnetized.\n\n**Characteristics:**\n- Permanent magnetic dipole moments\n- Unpaired electron spins aligned in the same direction\n- Magnetic susceptibility χ >> 1\n- Examples: Iron (Fe), Cobalt (Co), Nickel (Ni)\n\n**Physical Basis:**\n- Exchange interaction keeps spins aligned\n- Weiss domains: regions of aligned spins\n- Curie temperature: above this, ferromagnetic materials lose permanent magnetism\n\n**Applications:**\n- Electric motors and generators\n- Transformers\n- Magnetic recording media\n- MRI machines\n- Permanent magnets\n\n**Temperature Dependence:**\nAbove Curie temperature (T_c), ferromagnetic materials become paramagnetic due to thermal agitation overcoming exchange interaction.\n\nFerromagnetism is critical for modern technology and electromagnetic applications.`,
  
  'quantum|schrödinger': `**Quantum Mechanics** is the branch of physics dealing with particles at atomic and subatomic scales.\n\n**Schrödinger Equation:**\niℏ(∂Ψ/∂t) = ĤΨ (Time-dependent)\n\nĤΨ = EΨ (Time-independent)\n\nWhere Ψ is the wave function, Ĥ is the Hamiltonian, E is energy\n\n**Key Principles:**\n- **Wave-Particle Duality:** Particles exhibit both wave and particle properties\n- **Superposition:** Systems can exist in multiple states simultaneously\n- **Uncertainty Principle:** ΔxΔp ≥ ℏ/2\n- **Quantization:** Energy, angular momentum are quantized\n\n**Applications:**\n- Atomic structure\n- Molecular bonding\n- Semiconductors\n- Laser physics\n- Quantum computing\n\nThe Schrödinger equation is fundamental to understanding atomic and molecular phenomena.`
};

function getDemoResponse(question) {
  const q = question.toLowerCase();
  
  for (const [keyword, response] of Object.entries(DEMO_RESPONSES)) {
    const keywords = keyword.split('|');
    if (keywords.some(kw => q.includes(kw))) {
      return response;
    }
  }
  
  return `I'd be happy to help explain that topic! However, my AI connection seems to be having issues right now.\n\nYou can try asking about:\n- Newton's Laws of Motion\n- Momentum and Collisions\n- Energy and Conservation\n- Ferromagnetism\n- Quantum Mechanics and Schrödinger equation\n\nOr explore the website's Formulae Bank, Resources, or Study Tips for more information!\n\n*Note: The chatbot AI is currently in demo mode. For full AI responses, please ensure your API key is properly configured.`;
}

const PHYSICS_SYSTEM_PROMPT = `You are an expert Physics tutor and guide for the JeetPhysics website (https://jeetphysics.com). Your role is to:

1. **Answer Physics Questions**: Explain all physics concepts, laws, formulae, interpretations, and terminologies comprehensively and accurately.
2. **Provide Formulae**: When asked for formulae, provide clear mathematical expressions with their meanings.
3. **Guide About Website**: Help students navigate the website, find resources, access study materials, and understand the curriculum structure.
4. **Study Assistance**: Offer problem-solving strategies, study tips, and learning advice for BSc Physics Honours students.
5. **Clear Explanations**: Break down complex concepts into understandable parts with analogies when helpful.

Website Content Overview:
- **12 Core Subjects**: Classical Mechanics, QM, EM, Waves & Optics, Thermal Physics, Statistical Mechanics, etc.
- **Formulae Bank**: Over 200+ key formulae across all subjects with LaTeX support
- **Resources**: NPTEL, MIT OCW, LibreTexts, WolframAlpha, PhET Simulations
- **PYQ's**: Previous Year Questions from JEE, CSIR-NET, State Exams
- **6-Semester Curriculum**: Structured learning path for BSc Physics Honours

Always:
- Be encouraging and supportive
- Provide accurate, physics-based answers
- Suggest relevant website resources when applicable
- Use clear formatting and equations when necessary
- Maintain professional but friendly tone`;

let chatHistory = [];

async function initPhysicsChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const container = document.getElementById('chatbotContainer');
  const closeBtn = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const messagesDiv = document.getElementById('chatbotMessages');

  // Toggle chatbot
  toggle.addEventListener('click', () => {
    container.classList.toggle('open');
    if (container.classList.contains('open')) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    container.classList.remove('open');
  });

  // Send message
  const sendMessage = async () => {
    const message = input.value.trim();
    if (!message) return;

    // Add user message to UI
    addMessage(message, 'user');
    
    // Add user message to history
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });
    
    input.value = '';

    // Show typing indicator
    const typingId = showTypingIndicator();

    try {
      // Get AI response
      const response = await getChatbotResponse(message);
      
      // Remove typing indicator
      removeTypingIndicator(typingId);
      
      // Add bot response
      addMessage(response, 'bot');
    } catch (error) {
      removeTypingIndicator(typingId);
      addMessage('Sorry, I encountered an error. Please try again.', 'bot');
      console.error('Chatbot error:', error);
    }
  };

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Parse and format content
    if (sender === 'bot') {
      contentDiv.innerHTML = parseMarkdown(text);
    } else {
      contentDiv.textContent = text;
    }
    
    msgDiv.appendChild(contentDiv);
    messagesDiv.appendChild(msgDiv);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }

  function showTypingIndicator() {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chatbot-message bot-message';
    msgDiv.id = 'typing-indicator';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content chatbot-typing';
    contentDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    msgDiv.appendChild(contentDiv);
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    return msgDiv.id;
  }

  function removeTypingIndicator(id) {
    const indicator = document.getElementById(id);
    if (indicator) indicator.remove();
  }
}

async function getChatbotResponse(userMessage) {
  try {
    // Use demo mode if enabled
    if (USE_DEMO_MODE) {
      const demoResponse = getDemoResponse(userMessage);
      
      // Add to chat history
      chatHistory.push({
        role: 'model',
        parts: [{ text: demoResponse }]
      });
      
      if (chatHistory.length > 20) {
        chatHistory = chatHistory.slice(-20);
      }
      
      return demoResponse;
    }

    // Try to use Gemini API
    let requestContents = [];
    
    if (chatHistory.length === 1) {
      // First message - include system prompt
      requestContents.push({
        role: 'user',
        parts: [{ 
          text: `You are an expert Physics tutor for JeetPhysics website. ${PHYSICS_SYSTEM_PROMPT}\n\nUser's question: ${userMessage}`
        }]
      });
    } else {
      // Subsequent messages - use history as is
      requestContents = chatHistory;
    }

    const requestBody = {
      contents: requestContents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024
      }
    };

    console.log('Sending request to Gemini API...');
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    const data = await response.json();
    console.log('API Response:', data);

    if (!response.ok) {
      console.error('API Error Details:', data);
      if (data.error) {
        throw new Error(`API error: ${data.error.message || data.error.code}`);
      }
      throw new Error(`API error: ${response.status}`);
    }

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid API response structure');
    }

    const botMessage = data.candidates[0].content.parts[0].text;

    // Add bot response to history
    chatHistory.push({
      role: 'model',
      parts: [{ text: botMessage }]
    });

    // Keep chat history manageable (last 20 messages)
    if (chatHistory.length > 20) {
      chatHistory = chatHistory.slice(-20);
    }

    return botMessage;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}

function parseMarkdown(text) {
  // Convert markdown-like formatting to HTML
  let html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\`(.*?)\`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  // Handle lists
  html = html.replace(/^• (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  return '<p>' + html + '</p>';
}

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

    <div class="modal-section-title">Key Formulae</div>
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
   RENDER NUMERICALS
───────────────────────────────────────── */

let currentNumCat = 'all';

function renderNumericals() {
  const grid = document.getElementById('numericalsGrid');
  const filtered = currentNumCat === 'all' ? NUMERICALS : NUMERICALS.filter(n => n.cat === currentNumCat);

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="numericals-empty">No numericals found for this category.</div>';
    return;
  }

  grid.innerHTML = filtered.map((n, i) => `
    <div class="numerical-card">
      <div class="numerical-card-body">
        <div class="numerical-card-header">
          <span class="numerical-branch" data-branch="${n.cat}">${n.branch}</span>
          <span class="numerical-difficulty ${n.difficulty}">${n.difficulty === 'easy' ? '⬤ Easy' : '⬤ Medium'}</span>
        </div>
        <div class="numerical-question">${n.question}</div>
        <div class="numerical-given">${n.given}</div>
        <button class="numerical-toggle" data-idx="${i}" aria-expanded="false">
          <i class="ph ph-caret-down"></i> Show Solution
        </button>
      </div>
      <div class="numerical-solution" id="numSol-${i}">
        <div class="solution-label">Step-by-Step Solution</div>
        <ul class="solution-steps">
          ${n.steps.map(s => `<li>${s}</li>`).join('')}
        </ul>
        <div class="solution-answer">✅ ${n.answer}</div>
      </div>
    </div>
  `).join('');

  // Toggle solution visibility
  grid.querySelectorAll('.numerical-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.idx;
      const sol = document.getElementById(`numSol-${idx}`);
      const isOpen = sol.classList.contains('open');
      sol.classList.toggle('open');
      btn.classList.toggle('open');
      btn.innerHTML = isOpen
        ? '<i class="ph ph-caret-down"></i> Show Solution'
        : '<i class="ph ph-caret-up"></i> Hide Solution';
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}

function initNumericals() {
  const catBtns = document.getElementById('numCats');
  catBtns.querySelectorAll('.num-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.querySelectorAll('.num-cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentNumCat = btn.dataset.cat;
      renderNumericals();
    });
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
  renderNumericals();
  initNumericals();
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
        const cards = e.target.querySelectorAll('.subject-card, .formula-card, .resource-card, .numerical-card, .tip-card');
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

  ['subjectsGrid', 'formulaeGrid', 'resourcesGrid', 'numericalsGrid', 'tipsGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) revealObs.observe(el);
  });

  // Initialize Physics Chatbot
  initPhysicsChatbot();
});
