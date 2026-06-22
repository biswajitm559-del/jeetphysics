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

    'jam-physics': [

        // --- Classical Mechanics (10) ---
        {
            id: 1, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Lagrangian Mechanics', difficulty: 'moderate', year: '2022',
            question: 'Using the Lagrangian formulation, derive the equation of motion for a simple pendulum of length l and mass m. Write the Lagrangian and apply the Euler–Lagrange equation.',
            given: 'Given: Pendulum of length l, mass m, gravitational acceleration g. Generalized coordinate: angle θ',
            required: 'Find: Equation of motion',
            formula: '$L = \\frac{1}{2}ml^2\\dot{\\theta}^2 + mgl\\cos\\theta$',
            steps: ['Step 1: T = ½ml²θ̇², V = −mgl cosθ', 'Step 2: L = T − V = ½ml²θ̇² + mgl cosθ', 'Step 3: Euler–Lagrange: d/dt(∂L/∂θ̇) − ∂L/∂θ = 0', 'Step 4: ml²θ̈ − (−mgl sinθ) = 0', 'Step 5: θ̈ + (g/l) sinθ = 0'],
            answer: 'θ̈ + (g/l)sinθ = 0; for small oscillations ω = √(g/l)',
            notes: 'The Lagrangian method elegantly avoids constraint forces. For small oscillations sinθ ≈ θ giving T = 2π√(l/g).'
        },
        {
            id: 2, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Central Force Motion', difficulty: 'advanced', year: '2021',
            question: 'A particle moves in a central force field F(r) = −k/r². Show that the orbit equation is a conic section and find the orbit for E < 0.',
            given: 'Given: F = −k/r², angular momentum L conserved, energy E',
            required: 'Find: Orbit equation u(θ) where u = 1/r',
            formula: '$\\frac{d^2u}{d\\theta^2} + u = -\\frac{m}{L^2 u^2}F(1/u)$',
            steps: ['Step 1: Binet equation: d²u/dθ² + u = −mF(1/u)/L²u²', 'Step 2: F = −ku² → −mF/L²u² = mk/L²', 'Step 3: d²u/dθ² + u = mk/L²', 'Step 4: Solution: u = mk/L² + A cos(θ − θ₀)', 'Step 5: This gives r = L²/mk / (1 + e cosθ) — a conic section with e = AL²/mk'],
            answer: 'r = p/(1 + e cosθ) where p = L²/mk. For E < 0, e < 1: elliptical orbit.',
            notes: 'This is Kepler\'s first law derivation. e = √(1 + 2EL²/m k²). E < 0 gives e < 1 (ellipse), E = 0 gives e = 1 (parabola), E > 0 gives e > 1 (hyperbola).'
        },
        {
            id: 3, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Hamiltonian Mechanics', difficulty: 'advanced', year: '2020',
            question: 'Find the Hamiltonian for a 1D harmonic oscillator and derive Hamilton\'s equations of motion.',
            given: 'Given: Mass m, spring constant k, position x, momentum p',
            required: 'Find: H(x,p) and equations of motion ẋ, ṗ',
            formula: '$H = \\frac{p^2}{2m} + \\frac{1}{2}kx^2$',
            steps: ['Step 1: Lagrangian L = ½mẋ² − ½kx²', 'Step 2: Canonical momentum p = ∂L/∂ẋ = mẋ', 'Step 3: Hamiltonian H = pẋ − L = p²/2m + ½kx²', 'Step 4: ẋ = ∂H/∂p = p/m', 'Step 5: ṗ = −∂H/∂x = −kx → mẍ = −kx'],
            answer: 'H = p²/2m + kx²/2; equations: ẋ = p/m, ṗ = −kx',
            notes: 'The Hamiltonian represents total energy. Hamilton\'s equations are first-order ODEs equivalent to Newton\'s second law but more powerful for canonical transformations.'
        },
        {
            id: 4, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Rigid Body Dynamics', difficulty: 'moderate', year: '2023',
            question: 'A symmetric top with moments of inertia I₁ = I₂ ≠ I₃ precesses freely. Find the angular velocity of precession ψ̇ in terms of the body-frame spin φ̇.',
            given: 'Given: I₁ = I₂, I₃, angular momentum L, angle θ between symmetry axis and L',
            required: 'Find: Precession rate ψ̇',
            formula: '$\\dot{\\psi} = \\frac{L}{I_1}$',
            steps: ['Step 1: Euler\'s equations for torque-free motion: I₁ω̇₁ − (I₁ − I₃)ω₂ω₃ = 0', 'Step 2: I₁ω̇₂ + (I₁ − I₃)ω₁ω₃ = 0', 'Step 3: ω₃ = constant = φ̇', 'Step 4: ω₁, ω₂ rotate with Ω = (I₁ − I₃)ω₃/I₁', 'Step 5: Precession rate ψ̇ = L/I₁'],
            answer: 'ψ̇ = L/I₁; body precesses at Ω = (I₃ − I₁)ω₃/I₁',
            notes: 'For oblate bodies (I₃ > I₁ like Earth), Ω > 0. This torque-free precession is observed in Earth\'s Chandler wobble (~433 days).'
        },
        {
            id: 5, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Canonical Transformations', difficulty: 'advanced', year: '2019',
            question: 'Verify that the transformation Q = p, P = −q is a canonical transformation and find the generating function.',
            given: 'Given: Original coordinates (q,p), new coordinates (Q,P) = (p,−q)',
            required: 'Find: Verify canonical + generating function F',
            formula: '$\\{Q, P\\}_{q,p} = 1$',
            steps: ['Step 1: Check Poisson bracket {Q,P} = ∂Q/∂q · ∂P/∂p − ∂Q/∂p · ∂P/∂q', 'Step 2: = 0·(−1) − 1·(−1) = 1 ✓ Canonical!', 'Step 3: For generating function F₂(q,Q): P = −∂F₂/∂Q, p = ∂F₂/∂q', 'Step 4: Q = p → p = Q. So ∂F₂/∂q = Q → F₂ = qQ', 'Step 5: P = −∂F₂/∂Q = −q ✓'],
            answer: 'Canonical since {Q,P} = 1. Generating function F₂ = qQ = qp.',
            notes: 'This 90° rotation in phase space is a canonical transformation. It swaps position and momentum, useful in studying oscillator symmetries.'
        },
        {
            id: 6, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Small Oscillations', difficulty: 'moderate', year: '2022',
            question: 'Two equal masses m connected by three identical springs (constant k) in a line, with ends fixed. Find the normal mode frequencies.',
            given: 'Given: 2 masses m, 3 springs k. Displacements x₁, x₂',
            required: 'Find: Normal mode frequencies ω₁, ω₂',
            formula: '$\\omega^2 = \\frac{k}{m}(2 \\pm 1)$',
            steps: ['Step 1: EOM: mẍ₁ = −kx₁ + k(x₂ − x₁) = −2kx₁ + kx₂', 'Step 2: mẍ₂ = −k(x₂−x₁) − kx₂ = kx₁ − 2kx₂', 'Step 3: Matrix form: ω²[x] = (k/m)[[2,−1],[−1,2]][x]', 'Step 4: Eigenvalues: det(M − ω²I) = 0 → (2k/m − ω²)² − (k/m)² = 0', 'Step 5: ω₁² = k/m, ω₂² = 3k/m'],
            answer: 'ω₁ = √(k/m) [symmetric mode], ω₂ = √(3k/m) [antisymmetric mode]',
            notes: 'In symmetric mode both masses move together; in antisymmetric mode they move in opposite directions. Normal modes are orthogonal.'
        },
        {
            id: 7, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Rocket Motion', difficulty: 'easy', year: '2021',
            question: 'A rocket of initial mass M₀ expels gas at exhaust velocity u relative to the rocket. Find the final velocity if the mass reduces to M.',
            given: 'Given: Initial mass M₀, final mass M, exhaust velocity u, starts from rest',
            required: 'Find: Final velocity v',
            formula: '$v = u \\ln\\left(\\frac{M_0}{M}\\right)$',
            steps: ['Step 1: Momentum conservation in infinitesimal time: M·dv = −u·dM (Tsiolkovsky)', 'Step 2: Separate variables: dv = −u dM/M', 'Step 3: Integrate: ∫₀ᵛ dv = −u ∫_{M₀}^{M} dM/M', 'Step 4: v = −u [ln M − ln M₀] = u ln(M₀/M)'],
            answer: 'v = u ln(M₀/M) — the Tsiolkovsky rocket equation',
            notes: 'This is the famous rocket equation. The logarithm means diminishing returns: to double Δv, you need e ≈ 2.72 times the propellant mass.'
        },
        {
            id: 8, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Virial Theorem', difficulty: 'moderate', year: '2018',
            question: 'For a system of particles interacting via inverse-square force, state and apply the virial theorem to find the relation between average KE and total energy.',
            given: 'Given: Potential V ∝ r⁻¹ (gravitational/Coulomb), time-averaged quantities',
            required: 'Find: Relation between ⟨T⟩ and ⟨V⟩ and E',
            formula: '$2\\langle T \\rangle = -n\\langle V \\rangle \\text{ for } V \\propto r^n$',
            steps: ['Step 1: Virial theorem: 2⟨T⟩ = −⟨r⃗·∇V⟩', 'Step 2: For V ∝ rⁿ: r·∂V/∂r = nV', 'Step 3: For V ∝ r⁻¹: n = −1, so 2⟨T⟩ = ⟨V⟩', 'Step 4: E = ⟨T⟩ + ⟨V⟩ = ⟨V⟩/2 + ⟨V⟩ = 3⟨V⟩/2... wait: E = ⟨T⟩ + ⟨V⟩ = ⟨V⟩/2 + ⟨V⟩', 'Step 5: ⟨T⟩ = −E, ⟨V⟩ = 2E'],
            answer: '⟨T⟩ = −E, ⟨V⟩ = 2E. Average KE equals minus total energy.',
            notes: 'The virial theorem has profound consequences: a bound gravitational system that loses energy (e.g., by radiation) actually heats up! This is the negative heat capacity paradox.'
        },
        {
            id: 9, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Scattering', difficulty: 'advanced', year: '2017',
            question: 'Find the Rutherford scattering cross-section formula for a particle of charge z₁e scattered by a fixed nucleus of charge z₂e.',
            given: 'Given: Charges z₁e, z₂e, kinetic energy E₀, impact parameter b, scattering angle θ',
            required: 'Find: Differential cross-section dσ/dΩ',
            formula: '$\\frac{d\\sigma}{d\\Omega} = \\left(\\frac{z_1 z_2 e^2}{4E_0}\\right)^2 \\frac{1}{\\sin^4(\\theta/2)}$',
            steps: ['Step 1: Coulomb potential V = k z₁z₂e²/r', 'Step 2: From orbit equation, b = (kz₁z₂e²/2E₀)cot(θ/2)', 'Step 3: dσ = b|db| × 2π = 2πb|db|', 'Step 4: dΩ = 2π sinθ dθ', 'Step 5: dσ/dΩ = b/sinθ × |db/dθ| = (kz₁z₂e²/4E₀)² × 1/sin⁴(θ/2)'],
            answer: 'dσ/dΩ = (z₁z₂e²/4E₀)² csc⁴(θ/2)',
            notes: 'This formula diverges as θ→0, indicating infinite total cross-section, which is the classical result for infinite-range Coulomb force. In quantum theory, screening cuts off this divergence.'
        },
        {
            id: 10, exam: 'jam-physics', chapter: 'Classical Mechanics', topic: 'Poisson Brackets', difficulty: 'moderate', year: '2023',
            question: 'Evaluate the Poisson bracket {L<sub>x</sub>, L<sub>y</sub>} where L is angular momentum. Use qᵢ, pᵢ as canonical coordinates.',
            given: 'Given: L<sub>x</sub> = yp<sub>z</sub> − zp<sub>y</sub>, L<sub>y</sub> = zp<sub>x</sub> − xp<sub>z</sub>',
            required: 'Find: {L<sub>x</sub>, L<sub>y</sub>}',
            formula: '$\\{L_x, L_y\\} = L_z$',
            steps: ['Step 1: {L_x, L_y} = ∑ᵢ (∂L_x/∂qᵢ · ∂L_y/∂pᵢ − ∂L_x/∂pᵢ · ∂L_y/∂qᵢ)', 'Step 2: ∂L_x/∂y = p_z, ∂L_y/∂p_z = −x → contribution: p_z(−x)', 'Step 3: ∂L_x/∂z = −p_y, ∂L_y/∂p_y = 0; ∂L_x/∂p_y = −z, ∂L_y/∂y = 0', 'Step 4: ∂L_x/∂p_z = y, ∂L_y/∂z = p_x → contribution: y·p_x', 'Step 5: Collecting: {L_x,L_y} = xp_y − yp_x = L_z'],
            answer: '{L<sub>x</sub>, L<sub>y</sub>} = L<sub>z</sub>; similarly {L<sub>y</sub>,L<sub>z</sub>} = L<sub>x</sub> and {L<sub>z</sub>,L<sub>x</sub>} = L<sub>y</sub>',
            notes: 'These are the fundamental commutation relations of angular momentum in classical mechanics, mirroring the quantum mechanical commutators [L<sub>x</sub>,L<sub>y</sub>] = iℏL<sub>z</sub>.'
        },

        // --- Quantum Mechanics (10) ---
        {
            id: 11, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Particle in a Box', difficulty: 'easy', year: '2023',
            question: 'An electron is confined in a one-dimensional infinite potential well of width L = 2 nm. Calculate the energy gap ΔE = E₂ − E₁.',
            given: 'Given: L = 2 nm = 2×10⁻⁹ m, mₑ = 9.109×10⁻³¹ kg, ℏ = 1.055×10⁻³⁴ J·s',
            required: 'Find: ΔE = E₂ − E₁',
            formula: '$E_n = \\frac{n^2\\pi^2\\hbar^2}{2mL^2}, \\quad \\Delta E = \\frac{3\\pi^2\\hbar^2}{2mL^2}$',
            steps: ['Step 1: Eₙ = n²π²ℏ²/(2mL²)', 'Step 2: ΔE = (4−1)π²ℏ²/(2mL²) = 3π²ℏ²/(2mL²)', 'Step 3: Numerator = 3 × (3.1416)² × (1.055×10⁻³⁴)² = 3.295×10⁻⁶⁷', 'Step 4: Denominator = 2 × 9.109×10⁻³¹ × (2×10⁻⁹)² = 7.287×10⁻⁴⁸', 'Step 5: ΔE = 4.52×10⁻²⁰ J ≈ 0.283 eV'],
            answer: 'ΔE ≈ 0.283 eV',
            notes: 'Energy levels scale as n². Smaller box → larger gaps. This quantum confinement effect is exploited in semiconductor quantum dots.'
        },
        {
            id: 12, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Quantum Harmonic Oscillator', difficulty: 'moderate', year: '2022',
            question: 'Using ladder operators, find the expectation value ⟨x²⟩ in the ground state (n=0) of the quantum harmonic oscillator.',
            given: 'Given: x = √(ℏ/2mω)(a + a†), ground state |0⟩, a|0⟩ = 0',
            required: 'Find: ⟨0|x²|0⟩',
            formula: '$x = \\sqrt{\\frac{\\hbar}{2m\\omega}}(a + a^\\dagger)$',
            steps: ['Step 1: x² = (ℏ/2mω)(a + a†)²', 'Step 2: (a + a†)² = a² + a†² + aa† + a†a = a² + a†² + 2N + 1 (using [a,a†]=1)', 'Step 3: ⟨0|a²|0⟩ = 0, ⟨0|a†²|0⟩ = 0, ⟨0|N|0⟩ = 0', 'Step 4: ⟨x²⟩ = (ℏ/2mω)⟨0|2N+1|0⟩ = (ℏ/2mω)(1)', 'Step 5: ⟨x²⟩ = ℏ/2mω'],
            answer: '⟨x²⟩ = ℏ/(2mω)',
            notes: 'The zero-point fluctuation Δx = √(ℏ/2mω) is a purely quantum effect. Similarly ⟨p²⟩ = mωℏ/2, giving Δx·Δp = ℏ/2 (minimum uncertainty state).'
        },
        {
            id: 13, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Hydrogen Atom', difficulty: 'moderate', year: '2021',
            question: 'Find the energy of the hydrogen atom in the state n=3, and calculate the wavelength of the photon emitted in the 3→1 transition.',
            given: 'Given: E₁ = −13.6 eV, hc = 1240 eV·nm',
            required: 'Find: E₃ and λ for 3→1 transition',
            formula: '$E_n = \\frac{-13.6}{n^2} \\text{ eV}$',
            steps: ['Step 1: E₃ = −13.6/3² = −13.6/9 = −1.511 eV', 'Step 2: E₁ = −13.6 eV', 'Step 3: ΔE = E₃ − E₁ = −1.511 − (−13.6) = 12.089 eV (photon energy)', 'Step 4: λ = hc/ΔE = 1240/12.089 = 102.6 nm', 'Step 5: This is in the UV (Lyman series, Lyman-beta line)'],
            answer: 'E₃ = −1.51 eV; λ ≈ 102.6 nm (UV, Lyman-β)',
            notes: 'The Lyman series (transitions to n=1) all fall in UV. Balmer series (to n=2) falls in visible light. Paschen series (to n=3) falls in near-infrared.'
        },
        {
            id: 14, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Perturbation Theory', difficulty: 'advanced', year: '2020',
            question: 'Apply first-order perturbation theory to find the energy correction for the ground state of a hydrogen atom with a perturbation H\' = eEr cosθ (Stark effect — z-component).',
            given: 'Given: H\' = eEz = eEr cosθ, ground state |1,0,0⟩',
            required: 'Find: First-order energy correction E₁⁽¹⁾',
            formula: '$E_n^{(1)} = \\langle n | H\' | n \\rangle$',
            steps: ['Step 1: E₁⁽¹⁾ = ⟨1,0,0|eEr cosθ|1,0,0⟩', 'Step 2: ψ₁₀₀ = (1/√π)(1/a₀)^(3/2) e^(−r/a₀)', 'Step 3: The integrand contains the factor cosθ', 'Step 4: ∫cosθ sinθ dθ from 0 to π = 0 (odd function integrated over symmetric interval)', 'Step 5: E₁⁽¹⁾ = 0 (no linear Stark effect for ground state)'],
            answer: 'E₁⁽¹⁾ = 0: no first-order Stark effect for hydrogen ground state.',
            notes: 'The first-order correction vanishes due to the parity of the ground state wavefunction. The second-order correction is non-zero and gives quadratic Stark effect: ΔE ∝ −E².'
        },
        {
            id: 15, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Angular Momentum', difficulty: 'moderate', year: '2022',
            question: 'For a particle with orbital quantum number l = 2, find the possible values of Lz and the magnitude |L|.',
            given: 'Given: l = 2, ℏ is the unit',
            required: 'Find: Possible Lz values and |L|',
            formula: '$|L| = \\sqrt{l(l+1)}\\hbar, \\quad L_z = m_l \\hbar$',
            steps: ['Step 1: For l = 2, mₗ can be −2, −1, 0, +1, +2', 'Step 2: Lz = mₗℏ: −2ℏ, −ℏ, 0, +ℏ, +2ℏ', 'Step 3: |L| = √(l(l+1))ℏ = √(2×3)ℏ = √6 ℏ', 'Step 4: Maximum Lz = 2ℏ < |L| = √6 ℏ ≈ 2.449ℏ', 'Step 5: This shows L cannot be exactly aligned with z-axis (uncertainty principle)'],
            answer: '|L| = √6 ℏ; Lz = −2ℏ, −ℏ, 0, ℏ, 2ℏ',
            notes: 'The 5 possible m values for l=2 give 5 degenerate states. Lz max < |L| shows the angular momentum vector can never perfectly align — a manifestation of complementarity.'
        },
        {
            id: 16, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Tunneling', difficulty: 'advanced', year: '2019',
            question: 'A particle of mass m and energy E (< V₀) encounters a rectangular potential barrier of height V₀ and width a. Find the transmission coefficient T for E << V₀.',
            given: 'Given: E < V₀, barrier width a, mass m, κ = √(2m(V₀−E))/ℏ',
            required: 'Find: Transmission coefficient T',
            formula: '$T \\approx e^{-2\\kappa a}$',
            steps: ['Step 1: Inside barrier: ψ = Ae^(κx) + Be^(−κx), κ = √(2m(V₀−E))/ℏ', 'Step 2: Apply boundary conditions at x=0 and x=a (continuity of ψ and ψ\')', 'Step 3: For κa >> 1 (thick barrier), the growing exponential dominates', 'Step 4: T = |t|² ≈ 16E(V₀−E)/V₀² × e^(−2κa)', 'Step 5: Dominant factor: T ≈ e^(−2κa)'],
            answer: 'T ≈ e<sup>−2κa</sup> where κ = √(2m(V₀−E))/ℏ',
            notes: 'Tunneling is purely quantum. Applications: alpha decay, scanning tunneling microscope, tunnel diodes. In alpha decay, T ≈ 10⁻³⁸ → 10⁻²⁰, giving half-lives of 10⁻⁷ s to 10¹⁰ years!'
        },
        {
            id: 17, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Spin', difficulty: 'moderate', year: '2023',
            question: 'An electron is in the spin state |+z⟩ (eigenstate of Sz). Find the probability of measuring Sx = +ℏ/2.',
            given: 'Given: |+z⟩ = [1,0]ᵀ, eigenstates of Sx: |+x⟩ = (1/√2)[1,1]ᵀ, |−x⟩ = (1/√2)[1,−1]ᵀ',
            required: 'Find: P(Sx = +ℏ/2)',
            formula: '$P = |\\langle +x | +z \\rangle|^2$',
            steps: ['Step 1: |+z⟩ = [1,0]ᵀ, |+x⟩ = (1/√2)[1,1]ᵀ', 'Step 2: ⟨+x|+z⟩ = (1/√2)[1,1]·[1,0] = 1/√2', 'Step 3: P = |1/√2|² = 1/2', 'Step 4: Also P(Sx = −ℏ/2) = 1/2 by symmetry', 'Step 5: This reflects that Sz eigenstate has equal probability for both Sx outcomes'],
            answer: 'P(Sx = +ℏ/2) = 1/2',
            notes: 'Sx and Sz are incompatible observables. An eigenstate of one is a 50/50 superposition of eigenstates of the other. This is a key example of quantum measurement incompatibility.'
        },
        {
            id: 18, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'WKB Approximation', difficulty: 'advanced', year: '2018',
            question: 'Use the WKB quantization condition to find the energy levels of a particle in a potential V = mgx for x > 0 (infinite wall at x = 0).',
            given: 'Given: V = mgx, turning points at x = 0 and x = E/mg',
            required: 'Find: Energy levels Eₙ',
            formula: '$\\oint p\\, dq = \\left(n + \\frac{3}{4}\\right) h$',
            steps: ['Step 1: WKB condition: ∫₀^{x₀} √(2m(E−mgx)) dx = (n + 3/4)πℏ (one rigid wall + one turning point)', 'Step 2: Let u = E − mgx, x₀ = E/mg', 'Step 3: ∫₀^{E/mg} √(2m(E−mgx)) dx = (2/3)√(2m) × (E/mg)^(3/2) × (mg)^(−1)... = (2/3mg)√(2m) × E^(3/2)', 'Step 4: Setting equal to (n + 3/4)πℏ and solving for E', 'Step 5: Eₙ = [3πmgℏ(n + 3/4)/2 × 1/√(2m)]^(2/3)'],
            answer: 'Eₙ = (ℏ²(mg)²/2m)<sup>1/3</sup> × [3π/2(n+3/4)]<sup>2/3</sup>',
            notes: 'The factor 3/4 in the WKB condition comes from 1/4 from hard wall + 1/2 from soft turning point. The exact quantum treatment of linear potential gives Airy function solutions.'
        },
        {
            id: 19, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Time-Dependent QM', difficulty: 'moderate', year: '2021',
            question: 'A two-level system has energies E₁ = 0 and E₂ = ℏω. At t = 0, the state is |ψ⟩ = (|1⟩ + |2⟩)/√2. Find |ψ(t)⟩ and the probability of finding the system in state |2⟩.',
            given: 'Given: E₁ = 0, E₂ = ℏω, initial state (|1⟩+|2⟩)/√2',
            required: 'Find: |ψ(t)⟩ and P₂(t)',
            formula: '$|\\psi(t)\\rangle = \\frac{1}{\\sqrt{2}}(|1\\rangle + e^{-i\\omega t}|2\\rangle)$',
            steps: ['Step 1: Time evolution: each eigenstate evolves as e^(−iEt/ℏ)', 'Step 2: |ψ(t)⟩ = (1/√2)(e^(0)|1⟩ + e^(−iℏωt/ℏ)|2⟩)', 'Step 3: |ψ(t)⟩ = (1/√2)(|1⟩ + e^(−iωt)|2⟩)', 'Step 4: P₂(t) = |⟨2|ψ(t)⟩|² = |e^(−iωt)/√2|² = 1/2', 'Step 5: The probability is constant because |2⟩ is an energy eigenstate'],
            answer: '|ψ(t)⟩ = (|1⟩ + e<sup>−iωt</sup>|2⟩)/√2; P₂(t) = 1/2 (constant)',
            notes: 'Probabilities are constant when expanding in energy eigenstates — only phases change. Observable oscillations occur for superpositions of eigenstates of the measured observable.'
        },
        {
            id: 20, exam: 'jam-physics', chapter: 'Quantum Mechanics', topic: 'Identical Particles', difficulty: 'advanced', year: '2017',
            question: 'Two identical bosons are in a 1D infinite square well. Write the ground state wavefunction and first excited state. What is the energy of each state?',
            given: 'Given: Single-particle states φₙ(x), energies Eₙ = n²E₁, two identical bosons',
            required: 'Find: Two-particle wavefunctions and energies',
            formula: '$\\Psi = \\frac{1}{\\sqrt{2}}[\\phi_m(x_1)\\phi_n(x_2) + \\phi_n(x_1)\\phi_m(x_2)]$',
            steps: ['Step 1: For bosons, wavefunction must be symmetric under exchange', 'Step 2: Ground state: both in n=1: Ψ = φ₁(x₁)φ₁(x₂), E = 2E₁', 'Step 3: First excited: one in n=1, one in n=2: Ψ = (φ₁(x₁)φ₂(x₂)+φ₂(x₁)φ₁(x₂))/√2', 'Step 4: Energy of first excited = E₁ + E₂ = E₁ + 4E₁ = 5E₁', 'Step 5: For fermions, ground state is 5E₁ (Pauli exclusion prevents both in n=1)'],
            answer: 'Ground state: Ψ = φ₁(x₁)φ₁(x₂), E = 2E₁. First excited: (φ₁φ₂+φ₂φ₁)/√2, E = 5E₁',
            notes: 'Bosons can share the same state (ground state at 2E₁). Fermions cannot, giving higher ground state energy (5E₁). This is the basis of the Pauli exclusion principle and determines atomic structure.'
        },

        // --- EM Theory (10) ---
        {
            id: 21, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Gauss\'s Law', difficulty: 'easy', year: '2022',
            question: 'Using Gauss\'s law, find the electric field at distance r from an infinite line charge with linear charge density λ.',
            given: 'Given: λ = 10 nC/m = 10×10⁻⁹ C/m, r = 5 cm = 0.05 m',
            required: 'Find: E at distance r',
            formula: '$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$',
            steps: ['Step 1: Cylindrical Gaussian surface radius r, length L', 'Step 2: E(2πrL) = λL/ε₀ by Gauss\'s law', 'Step 3: E = λ/(2πε₀r)', 'Step 4: E = 10×10⁻⁹/(2π×8.854×10⁻¹²×0.05)', 'Step 5: E = 3593 V/m ≈ 3.6 kV/m'],
            answer: 'E ≈ 3.6 kV/m directed radially outward',
            notes: 'The 1/r fall-off (vs 1/r² for point charge) is due to cylindrical symmetry: field lines spread in 2D only. Key formula for coaxial cables and transmission lines.'
        },
        {
            id: 22, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Multipole Expansion', difficulty: 'advanced', year: '2021',
            question: 'Find the monopole and dipole contributions to the potential of a charge distribution consisting of +q at z = d and −q at z = 0.',
            given: 'Given: +q at z = d, −q at z = 0, observation point r >> d',
            required: 'Find: V<sub>monopole</sub> and V<sub>dipole</sub>',
            formula: '$V_{dip} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p\\cos\\theta}{r^2}$',
            steps: ['Step 1: Total charge = +q − q = 0. Monopole term V_mono = 0', 'Step 2: Dipole moment p = qd (pointing from −q to +q, in +z direction)', 'Step 3: V_dip = p cosθ/(4πε₀r²) = qd cosθ/(4πε₀r²)', 'Step 4: This is the leading term since monopole vanishes', 'Step 5: Next correction is quadrupole ∝ 1/r³'],
            answer: 'V<sub>mono</sub> = 0; V<sub>dip</sub> = qd cosθ/(4πε₀r²)',
            notes: 'This is the electric dipole potential. The 1/r² dependence (vs 1/r for monopole) means the field falls off faster. Dipole antennas and molecular electric dipoles are described by this formula.'
        },
        {
            id: 23, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Maxwell\'s Equations', difficulty: 'moderate', year: '2023',
            question: 'From Maxwell\'s equations in vacuum, derive the wave equation for the electric field E and find the speed of propagation.',
            given: 'Given: Maxwell\'s equations in vacuum: ∇×B = μ₀ε₀ ∂E/∂t, ∇×E = −∂B/∂t, ∇·E = 0',
            required: 'Find: Wave equation for E and speed c',
            formula: '$\\nabla^2\\mathbf{E} = \\mu_0\\varepsilon_0\\frac{\\partial^2 \\mathbf{E}}{\\partial t^2}$',
            steps: ['Step 1: Take curl of ∇×E = −∂B/∂t', 'Step 2: ∇×(∇×E) = −∂(∇×B)/∂t = −μ₀ε₀ ∂²E/∂t²', 'Step 3: ∇×(∇×E) = ∇(∇·E) − ∇²E = −∇²E (since ∇·E=0)', 'Step 4: −∇²E = −μ₀ε₀ ∂²E/∂t²', 'Step 5: ∇²E = μ₀ε₀ ∂²E/∂t² → wave speed c = 1/√(μ₀ε₀) = 3×10⁸ m/s'],
            answer: '∇²E = (1/c²) ∂²E/∂t², c = 1/√(μ₀ε₀) = 3×10⁸ m/s',
            notes: 'This derivation by Maxwell (1865) led to the identification of light as an electromagnetic wave. The numerical value of 1/√(μ₀ε₀) exactly matches the measured speed of light.'
        },
        {
            id: 24, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Electromagnetic Waves', difficulty: 'moderate', year: '2020',
            question: 'A plane EM wave travels in the +z direction with E₀ = 100 V/m. Find B₀, the intensity I, and the radiation pressure on a perfect absorber.',
            given: 'Given: E₀ = 100 V/m, c = 3×10⁸ m/s, ε₀ = 8.854×10⁻¹² F/m, μ₀ = 4π×10⁻⁷ H/m',
            required: 'Find: B₀, I, and radiation pressure P',
            formula: '$B_0 = E_0/c, \\quad I = \\frac{1}{2}\\varepsilon_0 c E_0^2$',
            steps: ['Step 1: B₀ = E₀/c = 100/(3×10⁸) = 3.33×10⁻⁷ T', 'Step 2: I = ½ε₀cE₀² = ½×8.854×10⁻¹²×3×10⁸×100² = 13.3 W/m²', 'Step 3: Or: I = E₀B₀/2μ₀ = 100×3.33×10⁻⁷/(2×4π×10⁻⁷) = 13.3 W/m²', 'Step 4: Radiation pressure for perfect absorber: P = I/c = 13.3/(3×10⁸) = 4.43×10⁻⁸ Pa', 'Step 5: For perfect reflector, P_rad = 2I/c'],
            answer: 'B₀ = 3.33×10⁻⁷ T; I = 13.3 W/m²; P = 4.43×10⁻⁸ Pa',
            notes: 'Radiation pressure, though tiny in everyday life, is significant in astrophysics (star formation, comet tails) and can be used for solar sails in spacecraft propulsion.'
        },
        {
            id: 25, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Boundary Conditions', difficulty: 'advanced', year: '2019',
            question: 'An EM wave in vacuum hits a perfect conductor at normal incidence. Apply boundary conditions to find the reflection coefficient and phase change.',
            given: 'Given: Perfect conductor (σ→∞), E field inside = 0, normal incidence',
            required: 'Find: Reflection coefficient R and phase shift',
            formula: '$E_r = -E_i \\quad \\Rightarrow \\quad R = 1$',
            steps: ['Step 1: Boundary condition: tangential E continuous', 'Step 2: E_inside = 0 for perfect conductor', 'Step 3: At surface: E_i + E_r = 0 → E_r = −E_i', 'Step 4: Reflection coefficient: R = |E_r/E_i|² = 1 (total reflection)', 'Step 5: Phase change of π (180°) in E; B has no phase change'],
            answer: 'R = 1 (total reflection), phase shift of π in E field',
            notes: 'Perfect conductors are perfect mirrors. Real metals have R close to 1 at microwave frequencies but drop in optical range. The π phase shift means the superposition of incident + reflected waves creates a standing wave with a node at the surface.'
        },
        {
            id: 26, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Magnetic Vector Potential', difficulty: 'advanced', year: '2018',
            question: 'Find the vector potential A for a uniform magnetic field B = B₀ẑ. Verify that ∇×A = B.',
            given: 'Given: B = B₀ẑ (uniform)',
            required: 'Find: A such that B = ∇×A',
            formula: '$\\mathbf{A} = \\frac{B_0}{2}(-y\\hat{x} + x\\hat{y})$',
            steps: ['Step 1: Try A = (B₀/2)(−yˆx + xˆy)', 'Step 2: ∇×A|_z = ∂A_y/∂x − ∂A_x/∂y = B₀/2 − (−B₀/2) = B₀ ✓', 'Step 3: x and y components of ∇×A are zero ✓', 'Step 4: This is the symmetric gauge, A = B×r/2', 'Step 5: Alternative Landau gauge: A = B₀xŷ also works, but breaks symmetry'],
            answer: 'A = (B₀/2)(−yˆx + xˆy) in symmetric gauge',
            notes: 'The vector potential is gauge-dependent (not unique). The symmetric gauge leads to circular orbits while Landau gauge leads to translational symmetry in one direction (used for Landau levels in quantum Hall effect).'
        },
        {
            id: 27, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Larmor Formula', difficulty: 'advanced', year: '2022',
            question: 'An electron oscillates as x = x₀ sinωt. Find the average radiated power using the Larmor formula.',
            given: 'Given: x = x₀ sinωt, charge e, mass mₑ, acceleration a = ẍ',
            required: 'Find: Average radiated power ⟨P⟩',
            formula: '$P = \\frac{q^2 a^2}{6\\pi\\varepsilon_0 c^3}$',
            steps: ['Step 1: Acceleration a = ẍ = −x₀ω² sinωt', 'Step 2: a² = x₀²ω⁴ sin²ωt', 'Step 3: ⟨a²⟩ = x₀²ω⁴/2 (time average of sin²)', 'Step 4: ⟨P⟩ = e²⟨a²⟩/(6πε₀c³) = e²x₀²ω⁴/(12πε₀c³)', 'Step 5: In SI: ⟨P⟩ = e²ω⁴x₀²/(12πε₀c³)'],
            answer: '⟨P⟩ = e²ω⁴x₀²/(12πε₀c³)',
            notes: 'The ω⁴ dependence is why blue light scatters more than red (Rayleigh scattering → blue sky). Larmor radiation from accelerating charges is the classical basis for the instability of the Rutherford atom.'
        },
        {
            id: 28, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Dielectrics', difficulty: 'moderate', year: '2020',
            question: 'A parallel plate capacitor is filled with a dielectric of permittivity ε = 4ε₀. Find the ratio of the capacitance with to without the dielectric, and the bound surface charge density if free charge density is σ<sub>f</sub>.',
            given: 'Given: ε<sub>r</sub> = 4, free charge density σ<sub>f</sub> on plates',
            required: 'Find: C/C₀ and σ<sub>b</sub>',
            formula: '$C = \\varepsilon_r C_0, \\quad \\sigma_b = \\sigma_f(1 - 1/\\varepsilon_r)$',
            steps: ['Step 1: C = εA/d = ε_r ε₀A/d = ε_r C₀', 'Step 2: C/C₀ = ε_r = 4', 'Step 3: D = ε₀E + P. Boundary condition: D_n continuous gives D = σ_f', 'Step 4: P = ε₀(ε_r − 1)E. Bound charge σ_b = P·n̂ = P = ε₀(ε_r−1)E = (1 − 1/ε_r)σ_f', 'Step 5: σ_b = (1 − 1/4)σ_f = (3/4)σ_f'],
            answer: 'C = 4C₀; σ<sub>b</sub> = (3/4)σ<sub>f</sub> (opposing σ<sub>f</sub>)',
            notes: 'The bound charge partially cancels the free charge, reducing the internal E field by factor ε<sub>r</sub>. This is why dielectrics increase capacitance — they reduce E, requiring more charge for the same V.'
        },
        {
            id: 29, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Poynting Vector', difficulty: 'moderate', year: '2021',
            question: 'A coaxial cable carries current I with inner radius a, outer radius b. Find the Poynting vector S and show that it gives the correct power flow P = I²R per unit length.',
            given: 'Given: Inner conductor current I, electric field E = ρI/(2πa² σ) (uniform inside) flowing in the conductor',
            required: 'Find: S = (1/μ₀) E × B between conductors and verify P',
            formula: '$\\mathbf{S} = \\frac{1}{\\mu_0}\\mathbf{E} \\times \\mathbf{B}$',
            steps: ['Step 1: Between conductors: B = μ₀I/(2πr) in φ̂ direction', 'Step 2: E along ẑ direction (parallel to current)', 'Step 3: S = E × B/μ₀ points radially inward (−r̂) toward conductors', 'Step 4: Power into inner conductor per length: ∮S·dA = E(2πaL) × B(a)/μ₀', 'Step 5: This equals V × I as expected — energy flows through the fields, not the wire!'],
            answer: 'S points radially inward; integrates to give P = I²R per unit length',
            notes: 'Counterintuitively, energy in a circuit flows through the electromagnetic field around the wire (Poynting vector), not through the electrons in the wire. The wire merely guides the energy flow.'
        },
        {
            id: 30, exam: 'jam-physics', chapter: 'EM Theory', topic: 'Lorentz Transformation of Fields', difficulty: 'advanced', year: '2017',
            question: 'A charge q is at rest. In a frame moving with velocity v = vx̂, find the electric and magnetic fields.',
            given: 'Given: Rest frame: E = kq r̂/r², B = 0, frame velocity v in x-direction',
            required: 'Find: E\' and B\' in moving frame',
            formula: '$E\'_\\perp = \\gamma E_\\perp, \\quad B\'_\\perp = -\\gamma \\mathbf{v} \\times \\mathbf{E}/c^2$',
            steps: ['Step 1: In rest frame: E = E_x x̂ + E_y ŷ + E_z ẑ, B = 0', 'Step 2: Parallel component: E\'_x = E_x (unchanged)', 'Step 3: Perpendicular components: E\'_y = γE_y, E\'_z = γE_z', 'Step 4: B\' = γ(v×E)/c² = γv E_perp/c² × (ẑ × ŷ terms)', 'Step 5: A moving charge creates both E and B fields — magnetism is relativistic electricity!'],
            answer: 'E\'<sub>�</sub>� = E<sub>�</sub>�; E\'<sub>�</sub>� = γE<sub>�</sub>�; B\' = γ(v×E)/c² (non-zero magnetic field appears)',
            notes: 'This demonstrates that electric and magnetic fields are components of a single tensor. What appears as purely electric in one frame appears with a magnetic component in another — magnetism is a relativistic effect of electricity.'
        },

        // --- Thermodynamics & Statistical Mechanics (10) ---
        {
            id: 31, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Maxwell Speed Distribution', difficulty: 'moderate', year: '2023',
            question: 'From the Maxwell speed distribution, find the most probable speed v<sub>p</sub>, mean speed v̄, and rms speed v<sub>rms</sub> for an ideal gas of molecular mass M at temperature T.',
            given: 'Given: f(v) = 4π(m/2πkT)<sup>3/2</sup> v² exp(−mv²/2kT), molecular mass m = M/Nₐ',
            required: 'Find: v<sub>p</sub>, v̄, v<sub>rms</sub>',
            formula: '$v_p = \\sqrt{\\frac{2k_BT}{m}}, \\quad \\bar{v} = \\sqrt{\\frac{8k_BT}{\\pi m}}, \\quad v_{rms} = \\sqrt{\\frac{3k_BT}{m}}$',
            steps: ['Step 1: Most probable: df/dv = 0 → v_p = √(2kT/m)', 'Step 2: Mean speed: v̄ = ∫₀^∞ v f(v) dv = √(8kT/πm)', 'Step 3: Mean square speed: ⟨v²⟩ = ∫v²f(v)dv = 3kT/m', 'Step 4: v_rms = √(3kT/m)', 'Step 5: Ratio v_p : v̄ : v_rms = 1 : 1.128 : 1.225'],
            answer: 'v<sub>p</sub> = √(2RT/M); v̄ = √(8RT/πM); v<sub>rms</sub> = √(3RT/M) [using R = NAk]',
            notes: 'For N₂ at 300K (M=0.028 kg/mol): v<sub>p</sub> = 422, v̄ = 476, v<sub>rms</sub> = 517 m/s. Hydrogen is ~√14 times faster, which is why it escapes from Earth\'s atmosphere.'
        },
        {
            id: 32, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Partition Function', difficulty: 'advanced', year: '2021',
            question: 'Find the partition function Z for a two-level system with energies 0 and ε. Calculate the mean energy ⟨E⟩ and specific heat C<sub>v</sub>.',
            given: 'Given: Two levels: E₁ = 0, E₂ = ε, temperature T, β = 1/kT',
            required: 'Find: Z, ⟨E⟩, C<sub>v</sub>',
            formula: '$Z = 1 + e^{-\\beta\\varepsilon}, \\quad \\langle E \\rangle = -\\frac{\\partial \\ln Z}{\\partial \\beta}$',
            steps: ['Step 1: Z = e^(0) + e^(−βε) = 1 + e^(−βε)', 'Step 2: ⟨E⟩ = −∂lnZ/∂β = εe^(−βε)/(1 + e^(−βε))', 'Step 3: ⟨E⟩ = ε/(e^(βε) + 1) — Fermi-Dirac form!', 'Step 4: C_v = d⟨E⟩/dT = kβ²ε²e^(βε)/(e^(βε)+1)²', 'Step 5: C_v peaks at kT ≈ 0.42ε (Schottky anomaly)'],
            answer: 'Z = 1 + e<sup>−ε/kT</sup>; ⟨E⟩ = ε/(e<sup>ε/kT</sup>+1); Schottky peak in C<sub>v</sub>',
            notes: 'The Schottky heat capacity anomaly is observed in systems with two-level energy splitting (e.g., spin-1/2 in magnetic field). The characteristic hump occurs when kT ≈ ε.'
        },
        {
            id: 33, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Bose-Einstein Distribution', difficulty: 'advanced', year: '2020',
            question: 'Write the Bose-Einstein distribution and calculate the Planck blackbody energy density u(ω) at frequency ω.',
            given: 'Given: BE distribution n̄ = 1/(e<sup>ℏω/kT</sup> − 1), density of states g(ω) = ω²/π²c³ per unit volume',
            required: 'Find: Spectral energy density u(ω)',
            formula: '$u(\\omega) = \\frac{\\hbar\\omega^3}{\\pi^2 c^3}\\frac{1}{e^{\\hbar\\omega/kT}-1}$',
            steps: ['Step 1: BE distribution: n̄(ω) = 1/(e^(ℏω/kT) − 1)', 'Step 2: Density of states: g(ω) = ω²/π²c³ (2 polarizations)', 'Step 3: Energy density: u(ω) = ℏω × n̄(ω) × g(ω)', 'Step 4: u(ω) = ℏω³/(π²c³) × 1/(e^(ℏω/kT) − 1)', 'Step 5: Total energy: ∫u(ω)dω = (π²/15)(kT)⁴/(ℏc)³ → Stefan-Boltzmann law'],
            answer: 'u(ω) = ℏω³/(π²c³) × 1/(e<sup>ℏω/kT</sup> − 1)',
            notes: 'This is Planck\'s radiation law. High-ω limit: u → ∝ ω³e<sup>−ℏω/kT</sup> (Wien law). Low-ω limit: u → ω²kT/π²c³ (Rayleigh-Jeans). Planck\'s formula resolves the "ultraviolet catastrophe".'
        },
        {
            id: 34, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Fermi-Dirac Statistics', difficulty: 'advanced', year: '2022',
            question: 'Find the Fermi energy E<sub>F</sub> at T = 0 for free electrons in a metal with electron density n = 8.5 × 10²⁸ m⁻³ (copper).',
            given: 'Given: n = 8.5×10²⁸ m⁻³, mₑ = 9.109×10⁻³¹ kg, ℏ = 1.055×10⁻³⁴ J·s',
            required: 'Find: Fermi energy E<sub>F</sub>',
            formula: '$E_F = \\frac{\\hbar^2}{2m}(3\\pi^2 n)^{2/3}$',
            steps: ['Step 1: All states filled up to E_F at T = 0', 'Step 2: n = (1/3π²)(2mE_F/ℏ²)^(3/2)', 'Step 3: E_F = (ℏ²/2m)(3π²n)^(2/3)', 'Step 4: 3π²n = 3π² × 8.5×10²⁸ = 2.52×10³⁰', 'Step 5: E_F = (1.055×10⁻³⁴)²/(2×9.109×10⁻³¹) × (2.52×10³⁰)^(2/3) = 1.126×10⁻¹⁸ J ≈ 7.04 eV'],
            answer: 'E<sub>F</sub> ≈ 7.04 eV for copper',
            notes: 'The Fermi temperature T<sub>F</sub> = E<sub>F</sub>/k ≈ 81,700 K >> room temperature. This is why electron gas in metals behaves quantum mechanically even at room temperature. Only electrons near E<sub>F</sub> participate in conduction.'
        },
        {
            id: 35, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Entropy and Second Law', difficulty: 'moderate', year: '2019',
            question: '1 mol of ideal gas (Cv = 3R/2) expands isothermally and reversibly at 300 K from volume V₁ to 2V₁. Find Q, W, ΔU, and ΔS.',
            given: 'Given: n = 1 mol, Cv = 3R/2, T = 300 K, V₂ = 2V₁',
            required: 'Find: Q, W, ΔU, ΔS',
            formula: '$W = nRT\\ln(V_2/V_1), \\quad \\Delta S = nR\\ln(V_2/V_1)$',
            steps: ['Step 1: Isothermal → T = const → ΔU = nCvΔT = 0', 'Step 2: W = nRT ln(V₂/V₁) = 1 × 8.314 × 300 × ln(2) = 1729 J', 'Step 3: First law: Q = ΔU + W = 0 + 1729 = 1729 J', 'Step 4: ΔS = Q/T = 1729/300 = 5.76 J/K', 'Step 5: Or: ΔS = nR ln(V₂/V₁) = 8.314 × 0.693 = 5.76 J/K ✓'],
            answer: 'W = Q = 1729 J; ΔU = 0; ΔS = 5.76 J/K',
            notes: 'For isothermal reversible process, all heat input converts to work. The entropy increases as expected for expansion. If process is irreversible, W<sub>actual</sub> < W<sub>rev</sub> and ΔS<sub>universe</sub> > 0.'
        },
        {
            id: 36, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Phase Transitions', difficulty: 'moderate', year: '2018',
            question: 'Using the Clausius-Clapeyron equation, estimate how the boiling point of water changes with altitude (pressure decreases from 1 atm to 0.9 atm). L<sub>vap</sub> = 40.7 kJ/mol.',
            given: 'Given: L = 40700 J/mol, T₁ = 373 K at P₁ = 101325 Pa, P₂ = 0.9P₁, ΔV<sub>vap</sub> ≈ RT/P (ideal gas)',
            required: 'Find: Change in boiling point ΔT',
            formula: '$\\frac{dP}{dT} = \\frac{L}{T\\Delta V} \\approx \\frac{LP}{RT^2}$',
            steps: ['Step 1: Clausius-Clapeyron: dP/dT = LP/(RT²)', 'Step 2: dT/dP = RT²/LP', 'Step 3: ΔT/ΔP ≈ RT²/(LP)', 'Step 4: ΔP = 0.9P − P = −0.1P', 'Step 5: ΔT = −0.1RT²/L = −0.1 × 8.314 × 373²/40700 = −2.84 K'],
            answer: 'ΔT ≈ −2.84 K → boiling point drops by ~3°C to ~97°C',
            notes: 'Water boils at lower temperature at high altitude. At Mt. Everest (0.33 atm), water boils at ~71°C — insufficient to cook food properly. Pressure cookers work on the reverse principle.'
        },
        {
            id: 37, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Equipartition Theorem', difficulty: 'easy', year: '2023',
            question: 'Apply the equipartition theorem to find the total internal energy of 1 mole of a diatomic ideal gas at temperature T (treating all modes as classical).',
            given: 'Given: Diatomic gas, 5 degrees of freedom (3 translational + 2 rotational) at moderate T',
            required: 'Find: Total energy U and Cv',
            formula: '$U = \\frac{f}{2}Nk_BT = \\frac{f}{2}nRT$',
            steps: ['Step 1: Each quadratic degree of freedom contributes ½kT per molecule', 'Step 2: Diatomic: 3 translational + 2 rotational = 5 degrees of freedom', 'Step 3: U = 5/2 × nRT = 5/2 × 1 × 8.314 × T = 20.78T joules', 'Step 4: Cv = dU/dT = 5R/2 = 20.8 J/(mol·K)', 'Step 5: γ = Cp/Cv = (7R/2)/(5R/2) = 1.4'],
            answer: 'U = 5nRT/2; Cv = 5R/2 = 20.8 J/(mol·K); γ = 1.4',
            notes: 'Vibrational modes (2 more for diatomic = 1 KE + 1 PE) are not excited at room temperature due to quantum effects. At very high T, all 7 modes active giving Cv = 7R/2.'
        },
        {
            id: 38, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Grand Canonical Ensemble', difficulty: 'advanced', year: '2017',
            question: 'In the grand canonical ensemble, find the average number of particles ⟨N⟩ and the grand partition function for an ideal Fermi gas with chemical potential μ and energy levels εᵢ.',
            given: 'Given: Fermi-Dirac statistics, chemical potential μ, energy levels εᵢ',
            required: 'Find: Grand partition function Ξ and ⟨N⟩',
            formula: '$\\Xi = \\prod_i(1 + e^{\\beta(\\mu - \\varepsilon_i)}), \\quad \\langle N\\rangle = \\sum_i \\frac{1}{e^{\\beta(\\varepsilon_i - \\mu)}+1}$',
            steps: ['Step 1: Each state can have 0 or 1 fermion', 'Step 2: Partition function for state i: ζᵢ = 1 + e^(β(μ−εᵢ))', 'Step 3: Total: Ξ = ∏ᵢ ζᵢ = ∏ᵢ (1 + e^(β(μ−εᵢ)))', 'Step 4: ⟨nᵢ⟩ = (1/β) ∂ln ζᵢ/∂μ = e^(β(μ−εᵢ))/(1 + e^(β(μ−εᵢ)))', 'Step 5: ⟨nᵢ⟩ = 1/(e^(β(εᵢ−μ))+1) — Fermi-Dirac distribution'],
            answer: 'Ξ = ∏ᵢ(1 + e<sup>β(μ−εᵢ</sup>)); ⟨nᵢ⟩ = 1/(e<sup>β(εᵢ−μ</sup>)+1)',
            notes: 'The grand canonical ensemble naturally gives the Fermi-Dirac distribution for fermions and Bose-Einstein for bosons. The chemical potential μ is the energy cost to add one particle.'
        },
        {
            id: 39, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Random Walk', difficulty: 'moderate', year: '2021',
            question: 'A 1D random walker takes N = 1000 steps of size l = 1 nm with equal probability left or right. Find the rms displacement and the probability of finding the walker exactly at origin.',
            given: 'Given: N = 1000, step size l = 1 nm, equal probability p = q = 1/2',
            required: 'Find: rms displacement and P(x = 0)',
            formula: '$x_{rms} = l\\sqrt{N}, \\quad P(0) \\approx \\sqrt{\\frac{2}{\\pi N}}$',
            steps: ['Step 1: ⟨x⟩ = 0 (equal probability both ways)', 'Step 2: ⟨x²⟩ = Nl² (each step contributes l² independently)', 'Step 3: x_rms = l√N = 1×√1000 = 31.6 nm', 'Step 4: P(0) = C(N, N/2)/2^N ≈ √(2/πN) = √(2/1000π) = 0.0252', 'Step 5: Approximately 2.5% chance to return to origin after 1000 steps'],
            answer: 'x<sub>rms</sub> = √1000 nm ≈ 31.6 nm; P(origin) ≈ 2.52%',
            notes: 'Diffusion coefficient D = l²/2τ where τ is time per step. x<sub>rms</sub> = √(2Dt). This underlies Brownian motion, diffusion, and polymer physics. Einstein derived D = kT/6πηr for spherical particles.'
        },
        {
            id: 40, exam: 'jam-physics', chapter: 'Thermodynamics & Statistics', topic: 'Debye Model', difficulty: 'advanced', year: '2016',
            question: 'State the Debye model for heat capacity of a solid and find C<sub>v</sub> in the low-T limit (T << Θ<sub>D</sub>).',
            given: 'Given: Debye temperature Θ<sub>D</sub>, phonons with density of states g(ω) ∝ ω² up to ω<sub>D</sub>',
            required: 'Find: C<sub>v</sub> for T << Θ<sub>D</sub>',
            formula: '$C_v = \\frac{12\\pi^4}{5}Nk_B\\left(\\frac{T}{\\Theta_D}\\right)^3$',
            steps: ['Step 1: Debye approximation: g(ω) = 9N/ω_D³ × ω² for ω ≤ ω_D', 'Step 2: Total energy U = ∫ ℏω n̄(ω) g(ω) dω where n̄ = 1/(e^(ℏω/kT)−1)', 'Step 3: Low T limit: upper limit → ∞. U = 9NkT(T/Θ_D)³∫₀^∞ x³/(eˣ−1)dx', 'Step 4: Integral = π⁴/15', 'Step 5: C_v = dU/dT = (12π⁴/5)Nk(T/Θ_D)³'],
            answer: 'C<sub>v</sub> = (12π⁴/5)Nk(T/Θ<sub>D</sub>)³ — Debye T³ law',
            notes: 'The Debye T³ law is well-confirmed experimentally for insulators at low T. Metals also have an electronic contribution C<sub>el</sub> = γT (linear term) from electrons near the Fermi surface.'
        },

        // --- Oscillations & Waves (10) ---
        {
            id: 41, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Damped Oscillations', difficulty: 'moderate', year: '2023',
            question: 'For a damped harmonic oscillator with damping constant γ, find the condition for critical damping and write the general solution.',
            given: 'Given: mẍ + γẋ + kx = 0, ω₀ = √(k/m), β = γ/2m',
            required: 'Find: Critical damping condition and x(t)',
            formula: '$x(t) = (A + Bt)e^{-\\beta t} \\quad \\text{(critical damping)}$',
            steps: ['Step 1: Characteristic equation: r² + 2βr + ω₀² = 0', 'Step 2: Solutions: r = −β ± √(β² − ω₀²)', 'Step 3: Critical damping: β = ω₀, repeated root r = −β', 'Step 4: General solution (repeated root): x(t) = (A + Bt)e^(−βt)', 'Step 5: System returns to equilibrium fastest without oscillating'],
            answer: 'Critical: β = ω₀ → γ = 2√(km). x(t) = (A+Bt)e<sup>−βt</sup>',
            notes: 'Critical damping gives fastest non-oscillatory return to equilibrium. Used in door closers, galvanometers, and shock absorbers. Underdamped (β < ω₀) oscillates; overdamped (β > ω₀) returns too slowly.'
        },
        {
            id: 42, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Resonance', difficulty: 'moderate', year: '2022',
            question: 'A driven oscillator has ω₀ = 10 rad/s and quality factor Q = 50. Find the resonance width Δω (FWHM) and the peak amplitude enhancement factor.',
            given: 'Given: ω₀ = 10 rad/s, Q = 50',
            required: 'Find: Δω and amplitude at resonance / amplitude at DC',
            formula: '$\\Delta\\omega = \\omega_0/Q, \\quad A(\\omega_0) \\propto Q$',
            steps: ['Step 1: Quality factor Q = ω₀/Δω → Δω = ω₀/Q = 10/50 = 0.2 rad/s', 'Step 2: At resonance ω = ω₀, amplitude A(ω₀) = F₀/(mγω₀) = F₀Q/(mω₀²)', 'Step 3: At DC (ω = 0): A(0) = F₀/k = F₀/(mω₀²)', 'Step 4: Enhancement = A(ω₀)/A(0) = Q = 50', 'Step 5: High Q → narrow, tall resonance peak'],
            answer: 'Δω = 0.2 rad/s; peak enhancement = Q = 50',
            notes: 'Q = 50 means the oscillator amplifies the driving force by 50× at resonance. High-Q resonators are used in radios (frequency selectivity), lasers (cavity Q), and atomic clocks.'
        },
        {
            id: 43, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Wave Equation', difficulty: 'easy', year: '2021',
            question: 'A transverse wave on a string is described by y(x,t) = 0.05 sin(2πx − 100πt) m. Find the amplitude, wavelength, frequency, and wave speed.',
            given: 'Given: y = 0.05 sin(2πx − 100πt)',
            required: 'Find: A, λ, f, v',
            formula: '$y = A\\sin(kx - \\omega t), \\quad v = \\omega/k$',
            steps: ['Step 1: Amplitude A = 0.05 m = 5 cm', 'Step 2: Wave number k = 2π rad/m → λ = 2π/k = 1 m', 'Step 3: Angular frequency ω = 100π rad/s → f = ω/2π = 50 Hz', 'Step 4: Wave speed v = ω/k = 100π/2π = 50 m/s', 'Step 5: Period T = 1/f = 0.02 s = 20 ms'],
            answer: 'A = 5 cm, λ = 1 m, f = 50 Hz, v = 50 m/s',
            notes: 'The wave travels in the +x direction (kx − ωt). For +x propagation: y = A sin(kx − ωt). For −x: y = A sin(kx + ωt). Wave speed v = √(T/μ) for a string where T is tension and μ is linear mass density.'
        },
        {
            id: 44, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Fourier Series', difficulty: 'advanced', year: '2020',
            question: 'Find the Fourier series of the square wave f(t) = +1 for 0 < t < π, f(t) = −1 for π < t < 2π (period 2π).',
            given: 'Given: Square wave with period 2π, defined above',
            required: 'Find: Fourier series representation',
            formula: '$f(t) = \\sum_{n \\text{ odd}} \\frac{4}{n\\pi}\\sin(nt)$',
            steps: ['Step 1: Since f(t) is odd, aₙ = 0', 'Step 2: bₙ = (1/π)∫₋π^π f(t)sin(nt)dt = (2/π)∫₀^π sin(nt)dt', 'Step 3: = (2/π)[−cos(nt)/n]₀^π = (2/nπ)(1 − cos(nπ))', 'Step 4: cos(nπ) = 1 for even n, −1 for odd n. So bₙ = 4/nπ for odd n, 0 for even n', 'Step 5: f(t) = (4/π)[sin t + sin(3t)/3 + sin(5t)/5 + ...]'],
            answer: 'f(t) = (4/π)∑<sub>n=1,3,5,...</sub> sin(nt)/n',
            notes: 'The series converges to the square wave except at discontinuities where it converges to the average (0). The Gibbs phenomenon causes ~9% overshoot near discontinuities regardless of how many terms are included.'
        },
        {
            id: 45, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Group vs Phase Velocity', difficulty: 'moderate', year: '2022',
            question: 'Waves in deep water have dispersion relation ω = √(gk). Find the phase velocity and group velocity.',
            given: 'Given: ω = √(gk), g = 9.8 m/s²',
            required: 'Find: Phase velocity v<sub>p</sub> = ω/k and group velocity v<sub>g</sub> = dω/dk',
            formula: '$v_p = \\sqrt{g/k}, \\quad v_g = \\frac{1}{2}\\sqrt{g/k} = \\frac{v_p}{2}$',
            steps: ['Step 1: Phase velocity: v_p = ω/k = √(gk)/k = √(g/k)', 'Step 2: Group velocity: v_g = dω/dk = d(√(gk))/dk', 'Step 3: = √g × (1/2) × k^(−1/2) = √(g/k)/2 = v_p/2', 'Step 4: v_g = v_p/2 for deep water gravity waves', 'Step 5: Energy propagates at group velocity, not phase velocity'],
            answer: 'v<sub>p</sub> = √(g/k); v<sub>g</sub> = v<sub>p</sub>/2 = (1/2)√(g/k)',
            notes: 'For deep water waves, the group velocity is half the phase velocity. This is why a wave packet (group) moves slower than individual crests. Observable at ocean beaches: wave crests appear to move through the group envelope.'
        },
        {
            id: 46, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Acoustic Waves', difficulty: 'moderate', year: '2019',
            question: 'Derive the speed of sound in an ideal gas using adiabatic bulk modulus. Find the speed in air at 300 K (γ = 1.4, M = 0.029 kg/mol).',
            given: 'Given: Adiabatic process PVᵞ = const, ρ = PM/RT, γ = 1.4, T = 300 K',
            required: 'Find: Speed of sound c<sub>s</sub> = √(γP/ρ)',
            formula: '$c_s = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma RT}{M}}$',
            steps: ['Step 1: Adiabatic bulk modulus: B_ad = −V(dP/dV)_S = γP', 'Step 2: Speed of sound: c_s = √(B/ρ) = √(γP/ρ)', 'Step 3: Ideal gas: P/ρ = RT/M', 'Step 4: c_s = √(γRT/M) = √(1.4 × 8.314 × 300/0.029)', 'Step 5: c_s = √(120180) ≈ 347 m/s'],
            answer: 'c<sub>s</sub> = √(γRT/M) ≈ 347 m/s in air at 300 K',
            notes: 'Newton originally used isothermal modulus (γ=1), giving 280 m/s, 20% too low. Laplace corrected this to adiabatic (sound compression is too fast for heat exchange). Speed scales as √T: hotter air → faster sound.'
        },
        {
            id: 47, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Standing Waves', difficulty: 'easy', year: '2023',
            question: 'A string of length L = 0.5 m, tension T = 80 N, and mass 0.01 kg is fixed at both ends. Find the first three harmonic frequencies.',
            given: 'Given: L = 0.5 m, T = 80 N, m = 0.01 kg',
            required: 'Find: f₁, f₂, f₃',
            formula: '$f_n = \\frac{n}{2L}\\sqrt{\\frac{T}{\\mu}}$',
            steps: ['Step 1: Linear mass density μ = m/L = 0.01/0.5 = 0.02 kg/m', 'Step 2: Wave speed v = √(T/μ) = √(80/0.02) = √4000 = 63.25 m/s', 'Step 3: Fundamental f₁ = v/2L = 63.25/(2×0.5) = 63.25 Hz', 'Step 4: f₂ = 2f₁ = 126.5 Hz', 'Step 5: f₃ = 3f₁ = 189.7 Hz'],
            answer: 'f₁ ≈ 63.2 Hz, f₂ ≈ 126.5 Hz, f₃ ≈ 189.7 Hz',
            notes: 'For a string fixed at both ends, all harmonics are present (fₙ = nf₁). For a pipe open at one end, only odd harmonics appear. Musical instruments exploit these standing wave patterns.'
        },
        {
            id: 48, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Coupled Oscillators', difficulty: 'advanced', year: '2018',
            question: 'Two identical pendulums of length l are coupled by a weak spring (k << mg/l). Find the beat frequency when one pendulum is initially displaced.',
            given: 'Given: ω₀ = √(g/l), spring constant k, mass m, weak coupling',
            required: 'Find: Beat frequency ω<sub>beat</sub>',
            formula: '$\\omega_{beat} = \\omega_+ - \\omega_- \\approx \\frac{k}{m\\omega_0}$',
            steps: ['Step 1: Normal mode frequencies: ω₋² = g/l (symmetric), ω₊² = g/l + 2k/m (antisymmetric)', 'Step 2: ω₊ − ω₋ = √(ω₀² + 2k/m) − ω₀ ≈ k/(mω₀) for k << mω₀²', 'Step 3: Beat period T_beat = 2π/ω_beat = 2πmω₀/k', 'Step 4: Energy oscillates between pendulums with period T_beat', 'Step 5: At t = T_beat/2, all energy has transferred to other pendulum'],
            answer: 'ω<sub>beat</sub> ≈ k/(mω₀) = k√(l/g)/m; energy exchanges periodically',
            notes: 'Coupled pendulums demonstrate normal modes, beats, and energy exchange. This is directly analogous to quantum mechanical resonance tunneling and neutrino oscillations!'
        },
        {
            id: 49, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Nonlinear Oscillations', difficulty: 'advanced', year: '2016',
            question: 'A pendulum has equation θ̈ + ω₀² sinθ = 0. Using energy conservation, find the period for amplitude θ₀ using the exact integral (write but do not evaluate the elliptic integral).',
            given: 'Given: θ̈ + ω₀² sinθ = 0, amplitude θ₀',
            required: 'Find: Period T(θ₀)',
            formula: '$T = 4\\sqrt{\\frac{l}{g}}\\int_0^{\\pi/2} \\frac{d\\phi}{\\sqrt{1-\\sin^2(\\theta_0/2)\\sin^2\\phi}}$',
            steps: ['Step 1: Energy: ½l²θ̇² = gl(cosθ − cosθ₀)', 'Step 2: θ̇ = √(2g/l)√(cosθ − cosθ₀)', 'Step 3: dt = dθ/|θ̇|, T = 4∫₀^{θ₀} dθ/√(2ω₀²(cosθ − cosθ₀))', 'Step 4: Using cosθ = 1 − 2sin²(θ/2): T = (4/ω₀)∫₀^{θ₀} dθ/√(4(sin²(θ₀/2)−sin²(θ/2)))', 'Step 5: Substituting sinφ = sin(θ/2)/sin(θ₀/2) gives elliptic integral K(sin(θ₀/2))'],
            answer: 'T = (4/ω₀) K(sin(θ₀/2)) where K is complete elliptic integral of first kind',
            notes: 'For small θ₀: T ≈ T₀(1 + θ₀²/16). For θ₀ = 90°: T ≈ 1.18T₀. The period diverges logarithmically as θ₀ → π (unstable equilibrium at top). This is why large-angle pendulums keep less accurate time.'
        },
        {
            id: 50, exam: 'jam-physics', chapter: 'Oscillations & Waves', topic: 'Elastic Waves', difficulty: 'moderate', year: '2020',
            question: 'Find the speed of longitudinal and transverse elastic waves in a solid with Young\'s modulus E = 200 GPa, shear modulus G = 80 GPa, and density ρ = 7800 kg/m³.',
            given: 'Given: E = 200 GPa, G = 80 GPa, ρ = 7800 kg/m³',
            required: 'Find: v<sub>L</sub> and v<sub>T</sub>',
            formula: '$v_L = \\sqrt{E/\\rho}, \\quad v_T = \\sqrt{G/\\rho}$',
            steps: ['Step 1: Longitudinal (P-wave): v_L = √(E/ρ) for thin rod', 'Step 2: v_L = √(200×10⁹/7800) = √(2.564×10⁷) = 5064 m/s', 'Step 3: Transverse (S-wave): v_T = √(G/ρ)', 'Step 4: v_T = √(80×10⁹/7800) = √(1.026×10⁷) = 3203 m/s', 'Step 5: v_L/v_T = √(E/G) ≈ 1.58'],
            answer: 'v<sub>L</sub> ≈ 5064 m/s (P-wave); v<sub>T</sub> ≈ 3203 m/s (S-wave)',
            notes: 'P-waves (longitudinal) travel faster than S-waves (shear) in solids. Seismometers detect P-waves first. S-waves cannot travel through liquids (no shear modulus) — this proves Earth\'s outer core is liquid!'
        },

        // --- Optics (10) ---
        {
            id: 51, exam: 'jam-physics', chapter: 'Optics', topic: 'Fresnel Diffraction', difficulty: 'advanced', year: '2022',
            question: 'In Fresnel diffraction, explain Fresnel zones and find the amplitude at the center of the geometric shadow of a circular disc of radius r₁ (first Fresnel zone).',
            given: 'Given: Disc blocks first Fresnel zone, source and screen at distance d',
            required: 'Find: Intensity at geometric shadow center compared to unobstructed case',
            formula: '$A_{total} = A_1/2 \\Rightarrow I_{center} \\approx I_0$',
            steps: ['Step 1: Without obstruction: A = A₁/2 (first zone dominant)', 'Step 2: With disc blocking zone 1: remaining zones 2, 3, 4... sum to A₂/2 ≈ A₁/2', 'Step 3: So amplitude at center ≈ same as unobstructed!', 'Step 4: Intensity at center of shadow ≈ I₀ (Poisson\'s bright spot)', 'Step 5: This counterintuitive result was experimentally confirmed by Arago'],
            answer: 'Intensity at center ≈ I₀: Poisson-Arago bright spot appears at center of shadow',
            notes: 'Poisson predicted this result intending to disprove wave theory, but Arago experimentally confirmed it — becoming strong evidence for wave theory of light. Modern applications: zone plates as diffractive lenses.'
        },
        {
            id: 52, exam: 'jam-physics', chapter: 'Optics', topic: 'Fabry-Perot Interferometer', difficulty: 'advanced', year: '2021',
            question: 'A Fabry-Perot etalon has mirror reflectivity R = 0.95 and spacing d = 1 mm. Find the free spectral range FSR and the finesse F.',
            given: 'Given: R = 0.95, d = 1 mm, light with n = 1 (air)',
            required: 'Find: FSR and finesse F',
            formula: '$FSR = \\frac{c}{2d}, \\quad \\mathcal{F} = \\frac{\\pi\\sqrt{R}}{1-R}$',
            steps: ['Step 1: Free spectral range: FSR = c/2nd = 3×10⁸/(2×10⁻³) = 1.5×10¹¹ Hz = 150 GHz', 'Step 2: Finesse: F = π√R/(1−R) = π×√0.95/(1−0.95)', 'Step 3: F = π×0.9747/0.05 = 61.3', 'Step 4: FWHM of each transmission peak: δν = FSR/F = 150 GHz/61.3 = 2.45 GHz', 'Step 5: Resolving power: λ/δλ = f/δf = 2ndF/λ'],
            answer: 'FSR = 150 GHz; Finesse F ≈ 61',
            notes: 'Fabry-Perot interferometers are used in laser cavities, optical spectrum analyzers, and gravitational wave detectors (LIGO). High finesse → very narrow transmission peaks → excellent spectral resolution.'
        },
        {
            id: 53, exam: 'jam-physics', chapter: 'Optics', topic: 'YDSE', difficulty: 'easy', year: '2023',
            question: 'In Young\'s double slit experiment, slit separation d = 0.2 mm, screen distance D = 1 m, and λ = 500 nm. Find the fringe width and the position of the 5th bright fringe.',
            given: 'Given: d = 0.2 mm = 2×10⁻⁴ m, D = 1 m, λ = 500 nm = 5×10⁻⁷ m',
            required: 'Find: Fringe width β and position y₅',
            formula: '$\\beta = \\frac{\\lambda D}{d}, \\quad y_n = \\frac{n\\lambda D}{d}$',
            steps: ['Step 1: Fringe width β = λD/d = (5×10⁻⁷×1)/(2×10⁻⁴) = 2.5×10⁻³ m = 2.5 mm', 'Step 2: 5th bright fringe: y₅ = 5λD/d = 5×2.5 mm = 12.5 mm', 'Step 3: Position from center: y₅ = 12.5 mm on either side', 'Step 4: Dark fringes at y = (n+1/2)β', 'Step 5: Angular fringe width: θ = λ/d = 2.5 mrad'],
            answer: 'β = 2.5 mm; y₅ = 12.5 mm from center',
            notes: 'The fringe width is inversely proportional to slit separation. Closer slits → wider fringes (easier to observe). The condition for bright fringes: path difference = nλ; for dark: (n+½)λ.'
        },
        {
            id: 54, exam: 'jam-physics', chapter: 'Optics', topic: 'Holography', difficulty: 'moderate', year: '2019',
            question: 'Explain how a hologram stores 3D information and write the mathematical condition for reconstruction of the real image.',
            given: 'Given: Object wave O, reference wave R, hologram H on film',
            required: 'Find: Reconstruction condition for real image',
            formula: '$H \\propto |O + R|^2 = |O|^2 + |R|^2 + OR^* + O^*R$',
            steps: ['Step 1: Recording: H ∝ |O + R|² = |O|² + |R|² + OR* + O*R', 'Step 2: During reconstruction, illuminate H with conjugate reference R*', 'Step 3: H × R* = (|O|² + |R|²)R* + O|R|² + O*(R*)²', 'Step 4: Term O|R|² ∝ O: reconstructs virtual image (3D)', 'Step 5: Term O*(R*)² → conjugate wave → real image'],
            answer: 'Illuminating hologram with R* reconstructs O|R|² (virtual image) and O*(R*)² (real image)',
            notes: 'Holography stores amplitude AND phase via interference. Unlike photos (only intensity), holograms capture depth. Applications: security seals, data storage (TB/cm³), medical imaging, art.'
        },
        {
            id: 55, exam: 'jam-physics', chapter: 'Optics', topic: 'Optical Fiber', difficulty: 'moderate', year: '2020',
            question: 'An optical fiber has core index n₁ = 1.5 and cladding index n₂ = 1.45. Find the numerical aperture NA and the maximum acceptance angle θ<sub>max</sub>.',
            given: 'Given: n₁ = 1.5 (core), n₂ = 1.45 (cladding), n₀ = 1 (air)',
            required: 'Find: NA and θ<sub>max</sub>',
            formula: '$NA = \\sqrt{n_1^2 - n_2^2}, \\quad \\theta_{max} = \\arcsin(NA)$',
            steps: ['Step 1: Critical angle: sinθ_c = n₂/n₁ = 1.45/1.5 = 0.9667', 'Step 2: For total internal reflection to work at core-cladding interface', 'Step 3: NA = √(n₁² − n₂²) = √(1.5² − 1.45²) = √(2.25 − 2.1025) = √0.1475', 'Step 4: NA = 0.384', 'Step 5: θ_max = arcsin(NA/n₀) = arcsin(0.384) = 22.6°'],
            answer: 'NA = 0.384; θ<sub>max</sub> = 22.6°',
            notes: 'Larger NA → wider acceptance cone → more light captured → brighter signal, but more modal dispersion (bandwidth limit). Single-mode fibers have tiny core (8μm) limiting NA but allowing very high bandwidth for long-distance telecommunications.'
        },
        {
            id: 56, exam: 'jam-physics', chapter: 'Optics', topic: 'Diffraction Grating', difficulty: 'moderate', year: '2021',
            question: 'A diffraction grating has 600 lines/mm. For λ = 589 nm (sodium D line), find the first-order diffraction angle and the angular dispersion dθ/dλ.',
            given: 'Given: N = 600 lines/mm → d = 1/600 mm, λ = 589 nm',
            required: 'Find: θ₁ and dθ/dλ for m = 1',
            formula: '$d\\sin\\theta = m\\lambda, \\quad \\frac{d\\theta}{d\\lambda} = \\frac{m}{d\\cos\\theta}$',
            steps: ['Step 1: Grating spacing d = 1/600 mm = 1.667×10⁻⁶ m', 'Step 2: sinθ₁ = mλ/d = 1×589×10⁻⁹/1.667×10⁻⁶ = 0.3534', 'Step 3: θ₁ = arcsin(0.3534) = 20.7°', 'Step 4: cosθ₁ = cos(20.7°) = 0.935', 'Step 5: dθ/dλ = m/(d cosθ) = 1/(1.667×10⁻⁶ × 0.935) = 6.41×10⁵ rad/m = 0.641 rad/μm'],
            answer: 'θ₁ = 20.7°; dθ/dλ = 6.41×10⁵ rad/m',
            notes: 'Higher groove density → smaller d → larger diffraction angle → better angular dispersion. Echelle gratings use high orders (m = 50-100) for ultra-high dispersion in astronomical spectrographs.'
        },
        {
            id: 57, exam: 'jam-physics', chapter: 'Optics', topic: 'Lasers', difficulty: 'moderate', year: '2022',
            question: 'Explain the three Einstein coefficients A, B₁₂, B₂₁ for a two-level atom. Derive the condition relating them from thermodynamic equilibrium.',
            given: 'Given: Two levels with energies E₁ < E₂, Boltzmann distribution at T',
            required: 'Find: Relations between A₂₁, B₁₂, B₂₁',
            formula: '$A_{21} = \\frac{8\\pi h\\nu^3}{c^3}B_{21}, \\quad B_{12} = B_{21}$',
            steps: ['Step 1: At equilibrium: absorption rate = emission rate', 'Step 2: B₁₂ ρ(ν) N₁ = B₂₁ ρ(ν) N₂ + A₂₁ N₂', 'Step 3: N₁/N₂ = e^(hν/kT) from Boltzmann', 'Step 4: Solving: ρ(ν) = A₂₁/B₂₁ × 1/(e^(hν/kT)(B₁₂/B₂₁) − 1)', 'Step 5: Comparing with Planck: B₁₂ = B₂₁ and A₂₁ = (8πhν³/c³)B₂₁'],
            answer: 'B₁₂ = B₂₁; A₂₁ = (8πhν³/c³)B₂₁',
            notes: 'These relations, derived by Einstein in 1917, predicted stimulated emission 40 years before lasers. The ratio A/B ∝ ν³ explains why lasers at optical frequencies are harder to build than microwave masers.'
        },
        {
            id: 58, exam: 'jam-physics', chapter: 'Optics', topic: 'Polarization', difficulty: 'moderate', year: '2020',
            question: 'Linearly polarized light at 45° to x-axis passes through a quarter-wave plate with fast axis along x. Find the output polarization state.',
            given: 'Given: Input E = E₀(x̂ + ŷ)/√2, QWP introduces π/2 phase shift between x and y components',
            required: 'Find: Output polarization state',
            formula: '$E_{out} = \\frac{E_0}{\\sqrt{2}}(\\hat{x} + e^{i\\pi/2}\\hat{y}) = \\frac{E_0}{\\sqrt{2}}(\\hat{x} + i\\hat{y})$',
            steps: ['Step 1: QWP fast axis along x: x-component advances by π/2 relative to y (or y retards)', 'Step 2: E_out = E₀(e^(iπ/2)x̂ + ŷ)/√2 = E₀(ix̂ + ŷ)/√2', 'Step 3: This is E₀(ŷ + ix̂)/√2 — compare with circular polarization: (x̂ ± iŷ)/√2', 'Step 4: E_out = E₀/√2(ŷ + ix̂) ≡ circularly polarized', 'Step 5: Specifically, this is left circular polarization (LCP)'],
            answer: 'Output is left circular polarization (LCP)',
            notes: 'A QWP converts linear ↔ circular polarization. A half-wave plate rotates linear polarization. These are essential in optical communications, microscopy, and quantum optics. A QWP followed by another QWP = half-wave plate.'
        },
        {
            id: 59, exam: 'jam-physics', chapter: 'Optics', topic: 'Coherence', difficulty: 'advanced', year: '2017',
            question: 'Define the coherence length and temporal coherence time of a light source. A Sodium lamp has linewidth Δν = 5×10¹¹ Hz. Find the coherence length.',
            given: 'Given: Δν = 5×10¹¹ Hz, c = 3×10⁸ m/s',
            required: 'Find: Coherence time τ<sub>c</sub> and coherence length l<sub>c</sub>',
            formula: '$\\tau_c = 1/\\Delta\\nu, \\quad l_c = c\\tau_c = c/\\Delta\\nu$',
            steps: ['Step 1: Coherence time: τ_c ≈ 1/Δν = 1/(5×10¹¹) = 2×10⁻¹² s = 2 ps', 'Step 2: Coherence length: l_c = cτ_c = 3×10⁸ × 2×10⁻¹² = 6×10⁻⁴ m = 0.6 mm', 'Step 3: For comparison: HeNe laser Δν ≈ 1 MHz → l_c = 300 m', 'Step 4: For LIGO: Nd:YAG laser Δν ≈ 1 Hz → l_c = 3×10⁸ m!', 'Step 5: Interference only observable for path difference < l_c'],
            answer: 'τ<sub>c</sub> = 2 ps; l<sub>c</sub> = 0.6 mm',
            notes: 'Coherence length limits the maximum path difference for interference. White light: l<sub>c</sub> ≈ 1 μm. Na lamp: 0.6 mm. Laser: meters to hundreds of meters. LIGO needs extraordinary coherence to detect gravitational waves.'
        },
        {
            id: 60, exam: 'jam-physics', chapter: 'Optics', topic: 'Nonlinear Optics', difficulty: 'advanced', year: '2016',
            question: 'Explain second harmonic generation (SHG) in nonlinear crystals. Write the phase matching condition and explain why it is necessary.',
            given: 'Given: Fundamental frequency ω, nonlinear susceptibility χ⁽²⁾, SHG produces 2ω',
            required: 'Find: Phase matching condition Δk = 0',
            formula: '$\\Delta k = k_{2\\omega} - 2k_\\omega = 0 \\Rightarrow n_{2\\omega} = n_\\omega$',
            steps: ['Step 1: Nonlinear polarization P⁽²⁾ = ε₀χ⁽²⁾E²(ω) creates source at 2ω', 'Step 2: SHG power ∝ sinc²(ΔkL/2) where Δk = k(2ω) − 2k(ω)', 'Step 3: Maximum when Δk = 0 (phase matching)', 'Step 4: Δk = 0 requires n(2ω) = n(ω) — impossible in isotropic dispersive media', 'Step 5: Solution: use birefringent crystals where ordinary/extraordinary indices differ'],
            answer: 'Phase matching: Δk = n(2ω)·2ω/c − 2·n(ω)·ω/c = 0 → n(2ω) = n(ω)',
            notes: 'Without phase matching, SHG amplitude oscillates with coherence length l<sub>c</sub> = π/Δk (typically μm). With phase matching in birefringent crystals (e.g., BBO, KDP), conversion efficiency > 50% is achievable. Used in green laser pointers (1064nm → 532nm).'
        },

        // --- Electronics (10) ---
        {
            id: 61, exam: 'jam-physics', chapter: 'Electronics', topic: 'p-n Junction', difficulty: 'moderate', year: '2022',
            question: 'Derive the ideal diode equation I = I₀(e<sup>V/V<sub>T</sub></sup> − 1) and explain each term. Find I for V = 0.6 V, I₀ = 10 nA, T = 300 K.',
            given: 'Given: I₀ = 10⁻⁸ A, V = 0.6 V, T = 300 K, V<sub>T</sub> = kT/e = 26 mV',
            required: 'Find: Current I',
            formula: '$I = I_0\\left(e^{V/V_T} - 1\\right)$',
            steps: ['Step 1: Thermal voltage V_T = kT/e = (1.38×10⁻²³×300)/(1.6×10⁻¹⁹) = 0.0259 V ≈ 26 mV', 'Step 2: Exponent: V/V_T = 0.6/0.026 = 23.1', 'Step 3: e^(23.1) = 1.07×10¹⁰', 'Step 4: I = 10×10⁻⁹ × (1.07×10¹⁰ − 1) ≈ 10⁻⁸ × 10¹⁰ = 100 mA', 'Step 5: The −1 term is negligible for forward bias > 0.1V'],
            answer: 'I ≈ 107 mA',
            notes: 'The exponential I-V characteristic makes diodes excellent rectifiers. The 0.7V knee voltage for Si diodes corresponds to V/V<sub>T</sub> ≈ 27. LEDs, solar cells, and photodiodes all follow this equation with modifications.'
        },
        {
            id: 62, exam: 'jam-physics', chapter: 'Electronics', topic: 'Transistor Amplifier', difficulty: 'moderate', year: '2021',
            question: 'A BJT in common-emitter configuration has β = 100, Rc = 5 kΩ, and V<sub>CC</sub> = 12 V. Find the voltage gain and the Q-point current if V<sub>BE</sub> = 0.7 V and R<sub>B</sub> = 470 kΩ.',
            given: 'Given: β = 100, Rc = 5000 Ω, V<sub>CC</sub> = 12 V, R<sub>B</sub> = 470 kΩ, V<sub>BE</sub> = 0.7 V',
            required: 'Find: I<sub>B</sub>, I<sub>C</sub>, V<sub>CE</sub>, voltage gain A<sub>v</sub>',
            formula: '$A_v = -\\beta R_C / r_e, \\quad r_e = V_T/I_C$',
            steps: ['Step 1: I_B = (V_CC − V_BE)/R_B = (12−0.7)/(470×10³) = 24 μA', 'Step 2: I_C = β I_B = 100 × 24×10⁻⁶ = 2.4 mA', 'Step 3: V_CE = V_CC − I_C Rc = 12 − 2.4×10⁻³×5000 = 12 − 12 = 0 V (saturated!)', 'Step 4: For proper Q-point, reduce R_C to 2.5 kΩ → I_C = 2.4 mA, V_CE = 6 V', 'Step 5: r_e = V_T/I_C = 26 mV/2.4 mA = 10.8 Ω, A_v = −βRc/r_e = −100×2500/10.8 = −23,150'],
            answer: 'I<sub>C</sub> = 2.4 mA; at reduced Rc: A<sub>v</sub> ≈ −230 (with Rc = 2.5kΩ)',
            notes: 'The CE amplifier inverts the signal (−sign). Voltage gain can be very high but the transistor must be biased in active region (not saturation). Q-point choice is critical for linear amplification.'
        },
        {
            id: 63, exam: 'jam-physics', chapter: 'Electronics', topic: 'Op-Amp Circuits', difficulty: 'easy', year: '2023',
            question: 'An inverting op-amp circuit has R₁ = 1 kΩ and R<sub>f</sub> = 100 kΩ. Find the closed-loop voltage gain and the output for V<sub>in</sub> = 0.05 V.',
            given: 'Given: R₁ = 1 kΩ, R<sub>f</sub> = 100 kΩ, V<sub>in</sub> = 0.05 V, ideal op-amp',
            required: 'Find: A<sub>v</sub> and V<sub>out</sub>',
            formula: '$A_v = -\\frac{R_f}{R_1}$',
            steps: ['Step 1: Virtual ground at inverting input (ideal op-amp)', 'Step 2: Current through R₁: i = V_in/R₁ = 0.05/1000 = 50 μA', 'Step 3: Same current flows through R_f (no current into op-amp input)', 'Step 4: V_out = −i × R_f = −50×10⁻⁶ × 100×10³ = −5 V', 'Step 5: A_v = −R_f/R₁ = −100'],
            answer: 'A<sub>v</sub> = −100; V<sub>out</sub> = −5 V',
            notes: 'The inverting amplifier: simple, precise gain determined by passive resistors (not transistor β). Gain bandwidth product limits: if GBW = 1 MHz, then for A<sub>v</sub> = 100, bandwidth = 10 kHz. Used in audio amplifiers, filters, and instrumentation.'
        },
        {
            id: 64, exam: 'jam-physics', chapter: 'Electronics', topic: 'Digital Logic', difficulty: 'easy', year: '2022',
            question: 'Implement the Boolean function F = AB + AC + BC using NAND gates only (NAND is a universal gate). Draw the logic and verify with a truth table for inputs A=1, B=1, C=0.',
            given: 'Given: F = AB + AC + BC',
            required: 'Find: NAND-only implementation and verify output',
            formula: '$F = \\overline{\\bar{AB} \\cdot \\overline{AC} \\cdot \\overline{BC}}$',
            steps: ['Step 1: AB = NAND(A,B) with extra NAND inversion = NAND(NAND(A,B), NAND(A,B))', 'Step 2: Similarly for AC and BC', 'Step 3: OR via NAND: A+B = NAND(Ā, B̄) = NAND(NAND(A,A), NAND(B,B))', 'Step 4: Full implementation: 9 NAND gates total', 'Step 5: Verify: A=1,B=1,C=0 → AB=1, AC=0, BC=0 → F = 1+0+0 = 1'],
            answer: 'F = NAND(NAND(NAND(A,B),NAND(A,B)), NAND(NAND(A,C),NAND(A,C)), NAND(NAND(B,C),NAND(B,C))); Output = 1',
            notes: 'NAND and NOR are universal gates — any Boolean function can be built from either one. NAND is preferred in CMOS because it\'s faster and smaller than NOR. This majority function F is used in error correction circuits.'
        },
        {
            id: 65, exam: 'jam-physics', chapter: 'Electronics', topic: 'Oscillator Circuits', difficulty: 'moderate', year: '2020',
            question: 'A Colpitts oscillator has inductance L = 10 μH and capacitors C₁ = 100 pF and C₂ = 200 pF. Find the oscillation frequency.',
            given: 'Given: L = 10×10⁻⁶ H, C₁ = 100×10⁻¹² F, C₂ = 200×10⁻¹² F',
            required: 'Find: Oscillation frequency f₀',
            formula: '$f_0 = \\frac{1}{2\\pi\\sqrt{L C_{eq}}}$',
            steps: ['Step 1: C₁ and C₂ in series for AC: C_eq = C₁C₂/(C₁+C₂)', 'Step 2: C_eq = 100×200/(100+200) = 20000/300 = 66.67 pF', 'Step 3: f₀ = 1/(2π√(LC_eq))', 'Step 4: LC_eq = 10×10⁻⁶ × 66.67×10⁻¹² = 6.667×10⁻¹⁶', 'Step 5: f₀ = 1/(2π√(6.667×10⁻¹⁶)) = 1/(2π×2.582×10⁻⁸) = 6.16 MHz'],
            answer: 'f₀ ≈ 6.16 MHz',
            notes: 'Colpitts oscillators are stable LC oscillators used in radio transmitters and local oscillators in superheterodyne receivers. The capacitive voltage divider (C₁, C₂) provides the feedback. Hartley uses a tapped inductor instead.'
        },
        {
            id: 66, exam: 'jam-physics', chapter: 'Electronics', topic: 'Modulation', difficulty: 'moderate', year: '2019',
            question: 'An AM signal has carrier frequency f<sub>c</sub> = 1 MHz, carrier amplitude A<sub>c</sub> = 10 V, and modulating signal m(t) = 5 cos(2π×1000t). Find the modulation index, sideband frequencies, and total power in sidebands if carrier power is P<sub>c</sub>.',
            given: 'Given: f<sub>c</sub> = 1 MHz, A<sub>c</sub> = 10 V, A<sub>m</sub> = 5 V, f<sub>m</sub> = 1 kHz',
            required: 'Find: m, sidebands, P<sub>sidebands</sub>',
            formula: '$m = A_m/A_c, \\quad P_{tot} = P_c(1 + m^2/2)$',
            steps: ['Step 1: Modulation index m = A_m/A_c = 5/10 = 0.5', 'Step 2: AM signal: s(t) = A_c(1 + m cos2πf_mt)cos(2πf_ct)', 'Step 3: Sidebands at: f_c ± f_m = 1000 ± 1 kHz = 999 kHz and 1001 kHz', 'Step 4: P_c = A_c²/2, P_sidebands = P_c × m²/2 = P_c × 0.25/2 = P_c/8', 'Step 5: Total power P_tot = P_c(1 + 0.5²/2) = 1.125 P_c'],
            answer: 'm = 0.5; Sidebands at 999 kHz, 1001 kHz; P<sub>sidebands</sub> = P<sub>c</sub>/8 (12.5% of carrier power)',
            notes: 'For 100% modulation (m=1), sideband power = P<sub>c</sub>/2 = 50% of carrier. AM is inefficient as the carrier (containing no information) uses most power. FM and SSB use bandwidth and power more efficiently.'
        },
        {
            id: 67, exam: 'jam-physics', chapter: 'Electronics', topic: 'Filters', difficulty: 'moderate', year: '2021',
            question: 'A first-order RC low-pass filter has R = 10 kΩ and C = 10 nF. Find the −3dB frequency, the attenuation at f = 10×f₃dB, and the phase shift at f₃dB.',
            given: 'Given: R = 10⁴ Ω, C = 10⁻⁸ F',
            required: 'Find: f₃dB, attenuation, phase at f₃dB',
            formula: '$f_{3dB} = \\frac{1}{2\\pi RC}, \\quad |H| = \\frac{1}{\\sqrt{1+(f/f_{3dB})^2}}$',
            steps: ['Step 1: f₃dB = 1/(2πRC) = 1/(2π×10⁴×10⁻⁸) = 1/(2π×10⁻⁴) = 1592 Hz', 'Step 2: At f = 10×f₃dB: |H| = 1/√(1+100) ≈ 1/10 = −20 dB', 'Step 3: Roll-off: 20 dB/decade (1st order)', 'Step 4: At f₃dB: |H| = 1/√2 = −3 dB ✓', 'Step 5: Phase at f₃dB: φ = −arctan(f/f₃dB) = −arctan(1) = −45°'],
            answer: 'f₃dB ≈ 1592 Hz; −20 dB at 10f₃dB; phase = −45° at f₃dB',
            notes: 'Each RC stage adds 20 dB/decade roll-off and up to 90° phase shift. N-pole filters roll off at 20N dB/decade. Butterworth filters have maximally flat passband; Chebyshev have steeper roll-off but ripple.'
        },
        {
            id: 68, exam: 'jam-physics', chapter: 'Electronics', topic: 'ADC/DAC', difficulty: 'moderate', year: '2018',
            question: 'A 12-bit ADC has input range 0 to 5 V. Find the resolution (LSB voltage), the number of output levels, and the signal if digital output is 2048.',
            given: 'Given: 12-bit ADC, V<sub>ref</sub> = 5 V',
            required: 'Find: Resolution, levels, V<sub>out</sub> for code 2048',
            formula: '$V_{LSB} = \\frac{V_{ref}}{2^N}, \\quad V_{out} = \\text{code} \\times V_{LSB}$',
            steps: ['Step 1: Number of levels = 2^12 = 4096', 'Step 2: Resolution (1 LSB) = V_ref/2^N = 5/4096 = 1.22 mV', 'Step 3: V_out for code 2048 = 2048 × 1.22 mV = 2.5 V', 'Step 4: Code 2048 = exactly half of full scale (2^11)', 'Step 5: SNR for ideal N-bit ADC ≈ 6.02N + 1.76 dB = 74 dB for 12-bit'],
            answer: '4096 levels; 1 LSB = 1.22 mV; Code 2048 → 2.5 V; SNR = 74 dB',
            notes: 'Each additional bit doubles resolution and adds ~6 dB of dynamic range. 12-bit ADCs are common in audio equipment. High-speed ADCs (8-bit, GS/s) are used in oscilloscopes; high-resolution (24-bit) in scientific instruments.'
        },
        {
            id: 69, exam: 'jam-physics', chapter: 'Electronics', topic: 'Semiconductor Physics', difficulty: 'advanced', year: '2017',
            question: 'Find the intrinsic carrier concentration nᵢ for silicon at 300 K. Given: E<sub>g</sub> = 1.12 eV, effective masses m*<sub>e</sub> = 0.28mₑ, m*<sub>h</sub> = 0.81mₑ.',
            given: 'Given: E<sub>g</sub> = 1.12 eV, m*<sub>e</sub> = 0.28mₑ, m*<sub>h</sub> = 0.81mₑ, T = 300 K, kT = 0.0259 eV',
            required: 'Find: nᵢ',
            formula: '$n_i = \\sqrt{N_c N_v}\\, e^{-E_g/2kT}$',
            steps: ['Step 1: N_c = 2(2πm*_e kT/h²)^(3/2) = 2.82×10²⁵ × (m*_e/mₑ)^(3/2) m⁻³', 'Step 2: N_c = 2.82×10²⁵ × (0.28)^(3/2) = 2.82×10²⁵ × 0.148 = 4.18×10²⁴ m⁻³', 'Step 3: N_v = 2.82×10²⁵ × (0.81)^(3/2) = 2.82×10²⁵ × 0.729 = 2.056×10²⁵ m⁻³', 'Step 4: √(N_c N_v) = √(4.18×10²⁴ × 2.056×10²⁵) = √(8.59×10⁴⁹) = 9.28×10²⁴ m⁻³', 'Step 5: nᵢ = 9.28×10²⁴ × e^(−1.12/0.0518) = 9.28×10²⁴ × e^(−21.6) = 9.28×10²⁴ × 4.3×10⁻¹⁰ = 3.98×10¹⁵ m⁻³'],
            answer: 'nᵢ ≈ 1.5×10¹⁰ cm⁻³ (standard value for Si at 300 K)',
            notes: 'Intrinsic Si has ~1.5×10¹⁰ carriers/cm³ at 300K, while atom density is 5×10²² — only 1 in 3×10¹² atoms contributes! Doping adds 10¹⁵ to 10²⁰ cm⁻³, dramatically changing conductivity.'
        },
        {
            id: 70, exam: 'jam-physics', chapter: 'Electronics', topic: 'Microwave Electronics', difficulty: 'advanced', year: '2016',
            question: 'A transmission line of characteristic impedance Z₀ = 50 Ω is terminated by Z<sub>L</sub> = 100 Ω. Find the reflection coefficient Γ, standing wave ratio SWR, and fraction of power reflected.',
            given: 'Given: Z₀ = 50 Ω, Z<sub>L</sub> = 100 Ω',
            required: 'Find: Γ, SWR, P<sub>reflected</sub>/P<sub>incident</sub>',
            formula: '$\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0}, \\quad SWR = \\frac{1+|\\Gamma|}{1-|\\Gamma|}$',
            steps: ['Step 1: Γ = (Z_L − Z₀)/(Z_L + Z₀) = (100−50)/(100+50) = 50/150 = 1/3 ≈ 0.333', 'Step 2: SWR = (1 + |Γ|)/(1 − |Γ|) = (1 + 1/3)/(1 − 1/3) = (4/3)/(2/3) = 2', 'Step 3: Power reflection: |Γ|² = (1/3)² = 1/9 ≈ 11.1%', 'Step 4: Power transmitted to load: 1 − |Γ|² = 8/9 ≈ 88.9%', 'Step 5: For Z_L = Z₀: Γ = 0, SWR = 1, 100% power transferred (matched)'],
            answer: 'Γ = 1/3; SWR = 2; 11.1% reflected, 88.9% transmitted',
            notes: 'Impedance matching is critical at RF/microwave frequencies. Mismatches cause reflections, standing waves, and power loss. Quarter-wave transformers with Z<sub>t</sub> = √(Z₀Z<sub>L</sub>) can match any real impedance.'
        },

        // --- Mathematical Physics (10) ---
        {
            id: 71, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Complex Analysis', difficulty: 'advanced', year: '2023',
            question: 'Evaluate the contour integral ∮ 1/(z²+1) dz around the circle |z| = 2 in the counterclockwise direction.',
            given: 'Given: f(z) = 1/(z²+1) = 1/((z+i)(z−i)), contour |z| = 2',
            required: 'Find: ∮ f(z) dz',
            formula: '$\\oint f(z)dz = 2\\pi i \\sum \\text{Res}$',
            steps: ['Step 1: Poles at z = ±i, both inside |z| = 2', 'Step 2: Res at z = i: lim_{z→i}(z−i)×1/((z+i)(z−i)) = 1/(2i)', 'Step 3: Res at z = −i: lim_{z→−i}(z+i)×1/((z+i)(z−i)) = 1/(−2i) = −1/(2i)', 'Step 4: Sum of residues = 1/(2i) − 1/(2i) = 0', 'Step 5: Integral = 2πi × 0 = 0'],
            answer: '∮ dz/(z²+1) = 0 (sum of residues = 0)',
            notes: 'This result can also be seen from the fact that 1/(z²+1) = (1/2i)[1/(z−i) − 1/(z+i)], and ∮1/(z−z₀)dz = 2πi for each pole, which cancel. The residue theorem is a cornerstone of applied mathematics.'
        },
        {
            id: 72, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Green\'s Functions', difficulty: 'advanced', year: '2021',
            question: 'Find the Green\'s function G(x,x\') for the 1D problem −d²G/dx² = δ(x−x\') with G(0) = G(L) = 0.',
            given: 'Given: −G″ = δ(x−x\'), boundary conditions G(0) = G(L) = 0',
            required: 'Find: G(x,x\')',
            formula: '$G(x,x\') = \\frac{x_<(L-x_>)}{L}$',
            steps: ['Step 1: For x ≠ x\': G″ = 0 → G = ax + b on each side', 'Step 2: BC at x=0: G = 0 → left side: G = ax (x < x\')', 'Step 3: BC at x=L: G = 0 → right side: G = b(L−x) (x > x\')', 'Step 4: Continuity at x=x\': ax\' = b(L−x\') → a/b = (L−x\')/x\'', 'Step 5: Jump in derivative: b − a = 1 (from integrating −G″=δ). Solve: G = x<(L−x>)/L'],
            answer: 'G(x,x\') = x<(L−x>)/L where x< = min(x,x\'), x> = max(x,x\')',
            notes: 'The Green\'s function gives the response to a point source. Solution for arbitrary source f(x): u(x) = ∫G(x,x\')f(x\')dx\'. Green\'s functions are fundamental to field theory and quantum mechanics (propagators).'
        },
        {
            id: 73, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Fourier Transform', difficulty: 'moderate', year: '2022',
            question: 'Find the Fourier transform of a Gaussian f(x) = e<sup>−αx²</sup> and interpret the result in terms of the uncertainty principle.',
            given: 'Given: f(x) = e<sup>−αx²</sup>, α > 0',
            required: 'Find: F̃(k) = ∫<sub>-∞</sub><sup>∞</sup> e<sup>−αx²</sup> e<sup>−ikx</sup> dx',
            formula: '$\\tilde{F}(k) = \\sqrt{\\frac{\\pi}{\\alpha}} e^{-k^2/4\\alpha}$',
            steps: ['Step 1: Complete the square in exponent: −αx² − ikx = −α(x + ik/2α)² − k²/4α', 'Step 2: F̃(k) = e^(−k²/4α) ∫e^(−α(x+ik/2α)²) dx', 'Step 3: Gaussian integral: ∫e^(−αu²) du = √(π/α)', 'Step 4: F̃(k) = √(π/α) × e^(−k²/4α)', 'Step 5: Width in x: Δx ~ 1/√α; Width in k: Δk ~ √α → Δx × Δk ~ 1'],
            answer: 'F̃(k) = √(π/α) e<sup>−k²/4α</sup> — also a Gaussian with width 1/√(4α)',
            notes: 'The Fourier transform of a Gaussian is a Gaussian: narrow in one domain → wide in the other. This is the mathematical basis of the Heisenberg uncertainty principle: Δx·Δp ≥ ℏ/2.'
        },
        {
            id: 74, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Legendre Polynomials', difficulty: 'moderate', year: '2020',
            question: 'Find the first three Legendre polynomials P₀, P₁, P₂ using Rodrigues\' formula and verify orthogonality ∫₋₁¹ Pₘ Pₙ dx.',
            given: 'Given: Rodrigues: Pₙ(x) = (1/2ⁿn!) dⁿ/dxⁿ(x²−1)ⁿ',
            required: 'Find: P₀, P₁, P₂ and orthogonality',
            formula: '$P_0 = 1, P_1 = x, P_2 = \\frac{1}{2}(3x^2-1)$',
            steps: ['Step 1: P₀ = (1/1) × d⁰/dx⁰(x²−1)⁰ = 1', 'Step 2: P₁ = (1/2) × d/dx(x²−1) = (1/2)(2x) = x', 'Step 3: P₂ = (1/8) × d²/dx²(x²−1)² = (1/8) d²/dx²(x⁴−2x²+1) = (1/8)(12x²−4) = (3x²−1)/2', 'Step 4: Orthogonality: ∫₋₁¹ P₀P₁ dx = ∫₋₁¹ x dx = 0 ✓', 'Step 5: ∫₋₁¹ Pₙ² dx = 2/(2n+1)'],
            answer: 'P₀=1, P₁=x, P₂=(3x²−1)/2; ∫₋₁¹PₘPₙdx = (2/(2n+1))δₘₙ',
            notes: 'Legendre polynomials appear naturally in spherical problems (separation of variables in Laplace equation). The spherical harmonics Y<sub>l</sub><sup>m</sup> are built from associated Legendre polynomials.'
        },
        {
            id: 75, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Differential Equations', difficulty: 'moderate', year: '2022',
            question: 'Solve the Bessel equation of order zero x²y″ + xy\' + x²y = 0 using the Frobenius method to first order.',
            given: 'Given: Bessel equation of order n=0',
            required: 'Find: Series solution J₀(x)',
            formula: '$J_0(x) = \\sum_{m=0}^{\\infty} \\frac{(-1)^m}{(m!)^2}\\left(\\frac{x}{2}\\right)^{2m}$',
            steps: ['Step 1: Try y = ∑aₘxᵐ. Substituting gives recurrence: aₘ = −aₘ₋₂/(m²) for m≥2', 'Step 2: a₀ = 1, a₁ = 0 (odd terms vanish)', 'Step 3: a₂ = −a₀/4 = −1/4, a₄ = −a₂/16 = 1/64, a₆ = −1/2304', 'Step 4: J₀(x) = 1 − x²/4 + x⁴/64 − ... = ∑(−1)ᵐ(x/2)^(2m)/(m!)²', 'Step 5: J₀ oscillates with decreasing amplitude, like a damped cosine'],
            answer: 'J₀(x) = ∑ₘ₌₀<sup>∞</sup> (−1)ᵐ(x/2)<sup>2m</sup>/(m!)²',
            notes: 'Bessel functions are the "cylinder functions" appearing in wave equations in cylindrical coordinates. J₀ describes the radial part of EM modes in circular waveguides. Zeros of J₀ determine cutoff frequencies.'
        },
        {
            id: 76, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Tensors', difficulty: 'advanced', year: '2019',
            question: 'Write the electromagnetic field tensor F<sup>μν</sup> in terms of E and B fields. Show that F<sup>μν</sup> F<sub>μν</sub> is a Lorentz invariant.',
            given: 'Given: E = (E<sub>x</sub>, E<sub>y</sub>, E<sub>z</sub>), B = (B<sub>x</sub>, B<sub>y</sub>, B<sub>z</sub>), c = 1 units',
            required: 'Find: F<sup>μν</sup> and the scalar invariant',
            formula: '$F^{\\mu\\nu} = \\begin{pmatrix} 0 & -E_x & -E_y & -E_z \\\\ E_x & 0 & -B_z & B_y \\\\ E_y & B_z & 0 & -B_x \\\\ E_z & -B_y & B_x & 0 \\end{pmatrix}$',
            steps: ['Step 1: F<sup>μν</sup> is antisymmetric: F<sup>μν</sup> = −F<sup>νμ</sup> (6 independent components)', 'Step 2: F<sup>0i</sup> = −E<sup>i</sup> (electric field in time-space components)', 'Step 3: F<sup>ij</sup> = −ε<sup>ijk</sup> B<sub>k</sub> (magnetic field in space-space components)', 'Step 4: F<sup>μν</sup> F<sub>μν</sub> = F<sup>μν</sup> g<sub>μα</sub> g<sub>νβ</sub> F<sup>αβ</sup>', 'Step 5: = 2(B² − E²/c²) in SI. This is Lorentz invariant!'],
            answer: 'F<sup>μν</sup> as above; F<sup>μν</sup> F<sub>μν</sub> = 2(B² − E²) (invariant)',
            notes: 'Two Lorentz invariants: F<sub>μν</sub> F<sup>μν</sup> ∝ B² − E²/c² and ε<sup>μνρσ</sup> F<sub>μν</sub> F<sub>ρσ</sub> ∝ E⃗·B⃗. These are invariant under Lorentz transformations. If E⃗⊥B⃗ in one frame, they remain perpendicular in all frames.'
        },
        {
            id: 77, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Laplace Transform', difficulty: 'moderate', year: '2021',
            question: 'Use the Laplace transform to solve the ODE: ẍ + 4ẋ + 4x = e<sup>−2t</sup>, x(0) = 1, ẋ(0) = 0.',
            given: 'Given: ẍ + 4ẋ + 4x = e<sup>−2t</sup>, initial conditions x(0)=1, ẋ(0)=0',
            required: 'Find: x(t)',
            formula: '$\\mathcal{L}[e^{-at}] = \\frac{1}{s+a}$',
            steps: ['Step 1: L[ẍ+4ẋ+4x] = (s²X−s−0) + 4(sX−1) + 4X = 1/(s+2)', 'Step 2: X(s²+4s+4) = s + 4 + 1/(s+2) = (s+2)² + 1/(s+2) − 1... ', 'Step 3: (s+2)²X = (s+2)² × 1/(s+2)² × something... (s+2)²X = s+4 + 1/(s+2)', 'Step 4: X = (s+4)/((s+2)²) + 1/((s+2)³)', 'Step 5: x(t) = e<sup>−2t</sup>(1 + 2t) + t²e<sup>−2t</sup>/2 = e<sup>−2t</sup>(1 + 2t + t²/2)'],
            answer: 'x(t) = e<sup>−2t</sup>(1 + 2t + t²/2)',
            notes: 'The repeated root s = −2 (critically damped system!) gives polynomial × exponential solutions. The forcing function e<sup>−2t</sup> at the natural frequency causes secular growth (t² term), analogous to resonance.'
        },
        {
            id: 78, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Group Theory', difficulty: 'advanced', year: '2018',
            question: 'Show that the set {1, −1, i, −i} under multiplication forms a group. Identify the group and construct the multiplication table.',
            given: 'Given: Set G = {1, −1, i, −i}, binary operation: multiplication',
            required: 'Find: Verify group axioms and multiplication table',
            formula: '$G \\cong \\mathbb{Z}_4 \\text{ (cyclic group of order 4)}$',
            steps: ['Step 1: Closure: products of any two elements are in G (check: i×i=−1, i×(−i)=1, etc.) ✓', 'Step 2: Associativity: multiplication of complex numbers is associative ✓', 'Step 3: Identity: 1 is the identity ✓', 'Step 4: Inverses: 1⁻¹=1, (−1)⁻¹=−1, i⁻¹=−i, (−i)⁻¹=i ✓', 'Step 5: All 4 elements are powers of i: i¹=i, i²=−1, i³=−i, i⁴=1 → cyclic group Z₄'],
            answer: 'G = {1,−1,i,−i} ≅ Z₄, the cyclic group of order 4',
            notes: 'This group is isomorphic to rotations by multiples of 90°. Group theory underlies particle physics: SU(3) color symmetry, SU(2)×U(1) electroweak, SO(3) rotations. The 4 elements represent the 4 possible quarter-turn rotations.'
        },
        {
            id: 79, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Probability & Statistics', difficulty: 'easy', year: '2023',
            question: 'In a radioactive source, decays follow a Poisson distribution with mean λ = 5 counts/second. Find the probability of observing exactly 3 counts in 1 second, and the standard deviation.',
            given: 'Given: Poisson distribution with λ = 5, n = 3',
            required: 'Find: P(X=3) and σ',
            formula: '$P(X=n) = \\frac{\\lambda^n e^{-\\lambda}}{n!}, \\quad \\sigma = \\sqrt{\\lambda}$',
            steps: ['Step 1: P(X=3) = (5³ e^(−5))/3! = (125 × e^(−5))/6', 'Step 2: e^(−5) = 0.00674', 'Step 3: P = 125 × 0.00674/6 = 0.8424/6 = 0.1404', 'Step 4: P(3 counts) ≈ 14.0%', 'Step 5: Standard deviation σ = √λ = √5 = 2.236'],
            answer: 'P(X=3) ≈ 14.0%; σ = √5 ≈ 2.24 counts/s',
            notes: 'The Poisson distribution describes rare random events: radioactive decay, photon counting, phone calls per minute. For large λ, Poisson → Gaussian. The relative uncertainty σ/λ = 1/√λ → need large counts for precise measurement.'
        },
        {
            id: 80, exam: 'jam-physics', chapter: 'Mathematical Physics', topic: 'Special Relativity', difficulty: 'advanced', year: '2022',
            question: 'A particle moves at v = 0.6c in the lab frame. Find its Lorentz factor γ, total energy E, kinetic energy K, and momentum p. (Rest mass m = 1 GeV/c²)',
            given: 'Given: v = 0.6c, m = 1 GeV/c² (rest mass energy mc² = 1 GeV)',
            required: 'Find: γ, E, K, p',
            formula: '$\\gamma = \\frac{1}{\\sqrt{1-v^2/c^2}}, \\quad E = \\gamma mc^2, \\quad p = \\gamma mv$',
            steps: ['Step 1: β = v/c = 0.6, β² = 0.36, 1−β² = 0.64', 'Step 2: γ = 1/√0.64 = 1/0.8 = 1.25', 'Step 3: Total energy E = γmc² = 1.25 × 1 GeV = 1.25 GeV', 'Step 4: Kinetic energy K = (γ−1)mc² = 0.25 × 1 GeV = 250 MeV', 'Step 5: Momentum p = γmv = 1.25 × 1 × 0.6c = 0.75 GeV/c'],
            answer: 'γ = 1.25; E = 1.25 GeV; K = 250 MeV; p = 0.75 GeV/c',
            notes: 'Verify energy-momentum relation: E² = (pc)² + (mc²)² = (0.75)² + 1² = 0.5625 + 1 = 1.5625 → E = 1.25 GeV ✓. Natural units (GeV) are standard in particle physics.'
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
            required: 'Find: ∮<sub>C</sub> dz/(z² + 1)',
            formula: '$$\\oint_C \\frac{dz}{z^2+1} = 2\\pi i \\sum \\text{Res}(f, z_k)$$',
            steps: [
                'Step 1: Factor the denominator: z² + 1 = (z − i)(z + i)',
                'Step 2: Singularities at z = i and z = −i. Both lie inside |z| = 2.',
                'Step 3: Residue at z = i: Res(f, i) = lim<sub>z→i</sub> (z−i)·1/((z−i)(z+i)) = 1/(2i)',
                'Step 4: Residue at z = −i: Res(f, −i) = lim<sub>z→−i</sub> (z+i)·1/((z−i)(z+i)) = 1/(−2i) = −1/(2i)',
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
            given: 'Given: QHO ground state ψ₀(x) = (mω/πℏ)<sup>1/4</sup> exp(−mωx²/2ℏ), angular frequency ω, mass m',
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
            given: 'Given: Two levels with energies 0 and ε, temperature T, Boltzmann constant k<sub>B</sub>',
            required: 'Find: Partition function Z and mean energy ⟨E⟩',
            formula: '$$Z = \\sum_i e^{-\\beta E_i}, \\quad \\langle E \\rangle = -\\frac{\\partial \\ln Z}{\\partial \\beta}$$',
            steps: [
                'Step 1: Partition function: Z = e<sup>−β·0</sup> + e<sup>−βε</sup> = 1 + e<sup>−βε</sup>, where β = 1/(k<sub>BT</sub>)',
                'Step 2: Mean energy: ⟨E⟩ = (1/Z) Σ Eᵢ e<sup>−βEᵢ</sup> = (0·1 + ε·e<sup>−βε</sup>) / (1 + e<sup>−βε</sup>)',
                'Step 3: ⟨E⟩ = ε·e<sup>−βε</sup> / (1 + e<sup>−βε</sup>) = ε / (e<sup>βε</sup> + 1)',
                'Step 4: At low T (βε ≫ 1): ⟨E⟩ → ε·e<sup>−ε/k<sub>BT</sub></sup> ≈ 0 (system in ground state)',
                'Step 5: At high T (βε ≪ 1): ⟨E⟩ → ε/2 (equal population of both levels)'
            ],
            answer: 'Z = 1 + e<sup>−ε/k<sub>BT</sub></sup>; ⟨E⟩ = ε/(e<sup>ε/k<sub>BT</sub></sup> + 1)',
            notes: 'The two-level system is the simplest non-trivial statistical mechanics model. The mean energy expression has the form of the Fermi–Dirac distribution. The heat capacity of this system exhibits the famous Schottky anomaly — a peak at k<sub>BT</sub> ≈ 0.42ε.'
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
            given: 'Given: n = 2.65 × 10²⁸ m⁻³, ℏ = 1.055 × 10⁻³⁴ J·s, m<sub>e</sub> = 9.109 × 10⁻³¹ kg',
            required: 'Find: Fermi energy E<sub>F</sub>',
            formula: '$$E_F = \\frac{\\hbar^2}{2m_e}(3\\pi^2 n)^{2/3}$$',
            steps: [
                'Step 1: Calculate 3π²n = 3 × (3.1416)² × 2.65 × 10²⁸ = 3 × 9.87 × 2.65 × 10²⁸ = 7.846 × 10²⁹ m⁻³',
                'Step 2: (3π²n)<sup>2/3</sup> = (7.846 × 10²⁹)<sup>2/3</sup>',
                'Step 3: (7.846)<sup>2/3</sup> ≈ 3.93 and (10²⁹)<sup>2/3</sup> = 10<sup>19.33</sup> ≈ 8.48 × 10¹⁹',
                'Step 4: ℏ²/(2m<sub>e</sub>) = (1.055 × 10⁻³⁴)² / (2 × 9.109 × 10⁻³¹) = 1.113 × 10⁻⁶⁸ / 1.822 × 10⁻³⁰ = 6.11 × 10⁻³⁹ J·m²',
                'Step 5: E<sub>F</sub> = 6.11 × 10⁻³⁹ × 3.93 × 8.48 × 10¹⁹ = 5.19 × 10⁻¹⁹ J ≈ 3.24 eV'
            ],
            answer: 'E<sub>F</sub> ≈ 3.24 eV',
            notes: 'Sodium is a nearly free electron metal (one 3s electron per atom). The Fermi temperature T<sub>F</sub> = E<sub>F</sub>/k<sub>B</sub> ≈ 37,600 K, far above room temperature, justifying the degenerate electron gas approximation. The Fermi velocity v<sub>F</sub> = √(2E<sub>F</sub>/m) ≈ 1.07 × 10⁶ m/s.'
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
            given: 'Given: Ground state wavefunction ψ₁ₛ = (1/√π)(1/a₀)<sup>3/2</sup> e<sup>−r/a₀</sup>, Bohr radius a₀',
            required: 'Find: P(r ≤ a₀) = ∫₀<sup>a₀</sup> |ψ|² 4πr² dr',
            formula: '$$P = \\frac{4}{a_0^3} \\int_0^{a_0} r^2 e^{-2r/a_0} dr$$',
            steps: [
                'Step 1: Radial probability density: P(r)dr = |ψ|² · 4πr² dr = (4/a₀³) r² e<sup>−2r/a₀</sup> dr',
                'Step 2: Let x = 2r/a₀, then r = a₀x/2, dr = a₀dx/2. When r = a₀, x = 2.',
                'Step 3: P = (4/a₀³) × (a₀/2)³ ∫₀² x² e<sup>−x</sup> (a₀/2) dx... Simplifying: P = ½ ∫₀² x² e<sup>−x</sup> dx',
                'Step 4: ∫₀² x²e<sup>−x</sup>dx = [−x²e<sup>−x</sup>]₀² + 2∫₀² xe<sup>−x</sup>dx = −4e⁻² + 2[−xe<sup>−x</sup> + ∫e<sup>−x</sup>dx]₀² = −4e⁻² + 2[−2e⁻² − e⁻² + 1] = −4e⁻² + 2(1 − 3e⁻²) = 2 − 10e⁻²',
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
            notes: 'Free expansion is irreversible, so ΔS<sub>total</sub> > 0. Since no heat is exchanged with surroundings, ΔS<sub>surroundings</sub> = 0, and the entire entropy increase is in the gas. This is a classic example of the second law of thermodynamics.'
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
                'Step 1: Apply the empirical formula: R = R₀ × A<sup>1/3</sup>',
                'Step 2: A<sup>1/3</sup> = 56<sup>1/3</sup> = (56)<sup>0.333</sup>',
                'Step 3: 56<sup>1/3</sup> ≈ 3.826 (since 3.826³ ≈ 56)',
                'Step 4: R = 1.2 × 3.826 = 4.59 fm'
            ],
            answer: 'R ≈ 4.59 fm (4.59 × 10⁻¹⁵ m)',
            notes: 'The nuclear radius scales as A<sup>1/3</sup>, implying constant nuclear density ρ = 3m<sub>p</sub>/(4πR₀³) ≈ 2.3 × 10¹⁷ kg/m³ across all nuclei. This extraordinary density is comparable to neutron star matter. ⁵⁶Fe has the highest binding energy per nucleon among all nuclides.'
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
                'Step 3: Maximum KE: KE<sub>max</sub> = E − φ = 6.2 − 4.2 = 2.0 eV',
                'Step 4: Stopping potential: eV₀ = KE<sub>max</sub>, so V₀ = 2.0 eV / e = 2.0 V'
            ],
            answer: 'KE<sub>max</sub> = 2.0 eV; Stopping potential V₀ = 2.0 V',
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
 * Falls back to 'jam-physics' if no valid exam is specified.
 */
function initExamPage() {
    const params = new URLSearchParams(window.location.search);
    currentExamKey = params.get('exam') || 'jam-physics';

    let exam = EXAM_CONFIG[currentExamKey];
    if (!exam) {
        currentExamKey = 'jam-physics';
        exam = EXAM_CONFIG[currentExamKey];
    }

    // Set page title
    const fullTitle = `${exam.title} — ${exam.subtitle || 'Numerical Solutions'} | JeetPhysics`;
    document.title = fullTitle;

    // Update Meta Tags dynamically for SEO
    const description = exam.description || `Solved numerical problems with step-by-step solutions for ${exam.title}.`;
    const url = `https://jeetphysics.in/numericals/?exam=${currentExamKey}`;
    
    if (document.getElementById('meta-description')) document.getElementById('meta-description').content = description;
    if (document.getElementById('meta-canonical')) document.getElementById('meta-canonical').href = url;
    if (document.getElementById('meta-og-url')) document.getElementById('meta-og-url').content = url;
    if (document.getElementById('meta-og-title')) document.getElementById('meta-og-title').content = fullTitle;
    if (document.getElementById('meta-og-description')) document.getElementById('meta-og-description').content = description;

    // Inject Structured Data (Course and BreadcrumbList)
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Course",
                "name": exam.title,
                "description": description,
                "provider": {
                    "@type": "EducationalOrganization",
                    "name": "JeetPhysics",
                    "sameAs": "https://jeetphysics.in/"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://jeetphysics.in/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Numericals",
                        "item": "https://jeetphysics.in/numericals/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": exam.title,
                        "item": url
                    }
                ]
            }
        ]
    };
    let schemaScript = document.getElementById('dynamic-schema');
    if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);

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
                    <div class="formula-content">${(function(f){ if(f.startsWith('$$')) return f; if(f.startsWith('$') && f.endsWith('$')) return '$$' + f.slice(1,-1) + '$$'; return '$$' + f + '$$'; })(p.formula)}</div>
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
    const chapterBtnsHTML = [`<button class="filter-pill active" data-chapter="all" onclick="handleChapterFilter(this)">All Chapters</button>`]
        .concat(exam.chapters.map(ch =>
            `<button class="filter-pill" data-chapter="${ch}" onclick="handleChapterFilter(this)">${ch}</button>`
        ))
        .join('');

    // Difficulty filter buttons
    const diffBtnsHTML = `
        <button class="difficulty-btn active" data-difficulty="all" onclick="handleDifficultyFilter(this)">All Levels</button>
        <button class="difficulty-btn difficulty-btn--easy" data-difficulty="easy" onclick="handleDifficultyFilter(this)">Easy</button>
        <button class="difficulty-btn difficulty-btn--moderate" data-difficulty="moderate" onclick="handleDifficultyFilter(this)">Moderate</button>
        <button class="difficulty-btn difficulty-btn--advanced" data-difficulty="advanced" onclick="handleDifficultyFilter(this)">Advanced</button>
    `;

    filtersContainer.innerHTML = `
        <div class="filter-group">
            <div class="filter-label">📚 Chapter</div>
            <div class="filter-pills chapter-filters">${chapterBtnsHTML}</div>
        </div>
        <div class="filter-group">
            <div class="filter-label">📊 Difficulty</div>
            <div class="filter-pills difficulty-filters">${diffBtnsHTML}</div>
        </div>
    `;
}


/**
 * Handler for chapter filter button clicks.
 * @param {HTMLElement} btn — The clicked button element.
 */
function handleChapterFilter(btn) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProblems(btn.dataset.chapter, getActiveDifficulty(), getSearchQuery());
}


/**
 * Handler for difficulty filter button clicks.
 * @param {HTMLElement} btn — The clicked button element.
 */
function handleDifficultyFilter(btn) {
    document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProblems(getActiveChapter(), btn.dataset.difficulty, getSearchQuery());
}


// ---------------------------------------------------------------------------
//  HELPER FUNCTIONS — Get active filter values
// ---------------------------------------------------------------------------

/** @returns {string} Currently active chapter filter value. */
function getActiveChapter() {
    const active = document.querySelector('.filter-pill.active');
    return active ? active.dataset.chapter : 'all';
}

/** @returns {string} Currently active difficulty filter value. */
function getActiveDifficulty() {
    const active = document.querySelector('.difficulty-btn.active');
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


