/**
 * Centralized Global Navigation Component
 * JeetPhysics.in — Phase 5P-2 Static-First Architecture
 * 
 * Delivers immediate static navigation with zero network dependencies,
 * full WCAG keyboard accessibility, and deferred progressive enhancement
 * for dynamic CMS academic streams, entrance exams, and resource categories.
 */

// In-memory cache for dynamic global navigation data
let _navbarDataPromise = null;

// Progressive dynamic loader for Supabase academic service
async function getAcademicService() {
  const mod = await import('/lib/supabaseClient.js');
  return mod.AcademicService;
}

/**
 * In-memory cached getter for dynamic navbar data.
 * Does NOT execute synchronously on module evaluation.
 * Evaluated only during progressive enhancement or upon interaction.
 */
export async function getCachedNavbarData() {
  if (!_navbarDataPromise) {
    _navbarDataPromise = (async () => {
      try {
        const AcademicService = await getAcademicService();
        const [streams, resourceTypes, entranceExams] = await Promise.all([
          AcademicService.getStreams().catch(err => {
            console.warn('Navbar streams fetch failed:', err);
            return [];
          }),
          AcademicService.getResourceTypes().catch(err => {
            console.warn('Navbar resource types fetch failed:', err);
            return [];
          }),
          (typeof AcademicService.getActiveEntranceExams === 'function'
            ? AcademicService.getActiveEntranceExams()
            : Promise.resolve([])
          ).catch(err => {
            console.warn('Navbar entrance exams fetch failed:', err);
            return [];
          })
        ]);
        return {
          streams: streams || [],
          resourceTypes: resourceTypes || [],
          entranceExams: entranceExams || []
        };
      } catch (err) {
        console.warn('Dynamic navbar enhancement skipped:', err);
        return { streams: [], resourceTypes: [], entranceExams: [] };
      }
    })();
  }
  return _navbarDataPromise;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const dedicatedSlugs = [
  'previous-year-questions', 'unit-wise-notes', 'unit-wise-qna',
  'lab-manuals', 'viva-questions', 'experiment-notes',
  'study-material', 'other-resources', 'formulae-bank', 'solved-numericals'
];

/**
 * Generate complete static desktop navigation markup
 */
export function buildStaticNavbarHtml() {
  return `
    <div class="nav-inner" style="max-width: 1320px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; height: 68px; width: 100%;">
      <a href="/" class="nav-brand" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
        <div class="nav-logo-icon">⚛️</div>
        <span class="nav-logo-text">
          <span class="brand-jeet">Jeet</span><span class="brand-physics">Physics</span>
        </span>
      </a>

      <ul class="nav-links" id="globalNavLinks" role="menubar">
        <!-- 1. Subjects Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/subjects" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerSubjects">
            <span>Subjects</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerSubjects" id="menuSubjects">
            <a href="/subjects" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">📚</span>
              <strong>All Streams &amp; Subjects</strong>
            </a>
          </div>
        </li>

        <!-- 2. Semester Questions Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/previous-year-questions" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerPYQ">
            <span>Semester Questions</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerPYQ" id="menuPYQ">
            <a href="/previous-year-questions" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">📝</span>
              <strong>All Question Papers</strong>
            </a>
          </div>
        </li>

        <!-- 3. Notes Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/unit-wise-notes" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerNotes">
            <span>Notes</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerNotes" id="menuNotes">
            <a href="/unit-wise-notes" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">📖</span>
              <strong>All Unit-wise Notes</strong>
            </a>
          </div>
        </li>

        <!-- 4. Q&A Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/unit-wise-qna" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerQNA">
            <span>Q&amp;A</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerQNA" id="menuQNA">
            <a href="/unit-wise-qna" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">💡</span>
              <strong>All Unit-wise Q&amp;A</strong>
            </a>
          </div>
        </li>

        <!-- 5. Syllabus Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/syllabus" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerSyllabus">
            <span>Syllabus</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerSyllabus" id="menuSyllabus">
            <a href="/syllabus" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">📋</span>
              <strong>All University Syllabi</strong>
            </a>
          </div>
        </li>

        <!-- 6. Entrance Exams Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/entrance-exams" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerEntrance">
            <span>Entrance Exams</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerEntrance" id="menuEntrance">
            <a href="/entrance-exams" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">🎯</span>
              <strong>Explore All Entrance Exams</strong>
            </a>
          </div>
        </li>

        <!-- 7. Resources Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/resources" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerResources">
            <span>Resources</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerResources" id="menuResources">
            <a href="/resources" role="menuitem" class="dropdown-header-link">
              <span class="dropdown-icon">📁</span>
              <strong>All Resources Archive</strong>
            </a>
            <a href="/lab-manuals" role="menuitem">
              <span class="dropdown-icon">🔬</span>
              <span>Lab Manuals</span>
            </a>
            <a href="/viva-questions" role="menuitem">
              <span class="dropdown-icon">🗣️</span>
              <span>Viva Questions</span>
            </a>
            <a href="/study-material" role="menuitem">
              <span class="dropdown-icon">📚</span>
              <span>Study Material</span>
            </a>
          </div>
        </li>

        <!-- 8. Study Tools Dropdown -->
        <li class="nav-dropdown" role="none">
          <a href="/formulae-bank" class="nav-dropdown-trigger" role="menuitem" aria-haspopup="true" aria-expanded="false" id="triggerTools">
            <span>Study Tools</span>
            <svg class="nav-caret" width="11" height="11" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
          </a>
          <div class="nav-dropdown-menu" role="menu" aria-labelledby="triggerTools">
            <a href="/formulae-bank" role="menuitem">
              <span class="dropdown-icon">📐</span>
              <span>Formulae Bank</span>
            </a>
            <a href="/#tips" role="menuitem">
              <span class="dropdown-icon">💡</span>
              <span>Preparation Tips</span>
            </a>
          </div>
        </li>

        <!-- 9. Contact Anchor -->
        <li role="none">
          <a href="/#contact" role="menuitem" class="nav-link-direct">Contact</a>
        </li>

        <!-- 10. Faculty CMS CTA -->
        <li role="none" style="margin-left: 6px;">
          <a href="/admin/login.html" role="menuitem" class="nav-cms-badge" title="Faculty Content Management System">
            <svg class="nav-cms-icon" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56v24a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0Z"></path></svg>
            <span>Faculty CMS</span>
          </a>
        </li>
      </ul>

      <!-- Hamburger Button (Mobile Only) -->
      <button class="nav-hamburger" id="globalHamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="globalMobileDrawer">
        <svg class="nav-hamburger-icon" width="22" height="22" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
      </button>
    </div>
  `;
}

/**
 * Generate complete static mobile drawer markup
 */
export function buildStaticMobileDrawerHtml() {
  return `
    <div class="drawer-header">
      <a href="/" class="nav-brand" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
        <div class="nav-logo-icon" style="width: 32px; height: 32px; font-size: 0.95rem;">⚛️</div>
        <span class="nav-logo-text" style="font-size: 1.1rem;">
          <span class="brand-jeet">Jeet</span><span class="brand-physics">Physics</span>
        </span>
      </a>
      <button class="drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu">
        <svg class="nav-close-icon" width="20" height="20" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
      </button>
    </div>

    <div class="drawer-body">
      <!-- Section 1: Academics -->
      <div class="drawer-group">
        <button type="button" class="drawer-accordion-btn" aria-expanded="false">
          <span class="drawer-group-title"><span>🎓</span> Academics</span>
          <svg class="nav-accordion-caret" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </button>
        <div class="drawer-accordion-content" id="drawerAcademicsContent">
          <a href="/subjects" class="drawer-link drawer-link-lead">All Streams &amp; Subjects</a>
          <a href="/syllabus" class="drawer-link">
            <span>📋</span> All Syllabi
          </a>
        </div>
      </div>

      <!-- Section 2: Exam Archive -->
      <div class="drawer-group">
        <button type="button" class="drawer-accordion-btn" aria-expanded="false">
          <span class="drawer-group-title"><span>📝</span> Exam Archive</span>
          <svg class="nav-accordion-caret" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </button>
        <div class="drawer-accordion-content" id="drawerArchiveContent">
          <a href="/previous-year-questions" class="drawer-link drawer-link-lead">
            <span>📝</span> Previous Year Questions
          </a>
          <a href="/unit-wise-notes" class="drawer-link">
            <span>📚</span> Unit-wise Lecture Notes
          </a>
          <a href="/unit-wise-qna" class="drawer-link">
            <span>💡</span> Unit-wise Q&amp;A
          </a>
        </div>
      </div>

      <!-- Section 3: Entrance Exams -->
      <div class="drawer-group">
        <button type="button" class="drawer-accordion-btn" aria-expanded="false">
          <span class="drawer-group-title"><span>🎯</span> Entrance Exams</span>
          <svg class="nav-accordion-caret" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </button>
        <div class="drawer-accordion-content" id="drawerEntranceContent">
          <a href="/entrance-exams" class="drawer-link drawer-link-lead">All Entrance Exams</a>
        </div>
      </div>

      <!-- Section 4: Academic Resources -->
      <div class="drawer-group">
        <button type="button" class="drawer-accordion-btn" aria-expanded="false">
          <span class="drawer-group-title"><span>📁</span> Resources</span>
          <svg class="nav-accordion-caret" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </button>
        <div class="drawer-accordion-content" id="drawerResourcesContent">
          <a href="/resources" class="drawer-link drawer-link-lead">All Resources Archive</a>
          <a href="/lab-manuals" class="drawer-link"><span>🔬</span> Lab Manuals</a>
          <a href="/viva-questions" class="drawer-link"><span>🗣️</span> Viva Questions</a>
          <a href="/study-material" class="drawer-link"><span>📚</span> Study Material</a>
        </div>
      </div>

      <!-- Section 5: Study Tools -->
      <div class="drawer-group">
        <button type="button" class="drawer-accordion-btn" aria-expanded="false">
          <span class="drawer-group-title"><span>🛠️</span> Study Tools</span>
          <svg class="nav-accordion-caret" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
        </button>
        <div class="drawer-accordion-content" id="drawerToolsContent">
          <a href="/formulae-bank" class="drawer-link">
            <span>📐</span> Formulae Bank
          </a>
          <a href="/#tips" class="drawer-link">
            <span>💡</span> Study &amp; Exam Tips
          </a>
        </div>
      </div>

      <!-- Section 6: Direct Links -->
      <div class="drawer-direct-links">
        <a href="/#contact" class="drawer-direct-item">
          <span>✉️</span>
          <span>Student Guidance &amp; Contact</span>
        </a>
        <a href="/admin/login.html" class="drawer-direct-item drawer-direct-cms">
          <svg class="nav-cms-icon" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208V208Zm-80-56v24a8,8,0,0,1-16,0V152a8,8,0,0,1,16,0Z"></path></svg>
          <span>Faculty Portal &amp; CMS</span>
        </a>
      </div>
    </div>
  `;
}

/**
 * Initialize and mount the Global Navigation Bar
 * @param {string|HTMLElement} target - Selector or element for navbar container (default '#navbar')
 */
export function initGlobalNavbar(target = '#navbar') {
  const navContainer = typeof target === 'string' ? document.querySelector(target) : target;
  if (!navContainer) return;

  // 1. Static-First Render:
  // If navbar container is empty, populate it immediately with static HTML!
  if (!navContainer.querySelector('.nav-inner')) {
    navContainer.innerHTML = buildStaticNavbarHtml();
  }

  // 2. Ensure Mobile Drawer and Overlay exist
  let drawerOverlay = document.getElementById('globalDrawerOverlay');
  if (!drawerOverlay) {
    drawerOverlay = document.createElement('div');
    drawerOverlay.id = 'globalDrawerOverlay';
    drawerOverlay.className = 'drawer-overlay';
    document.body.appendChild(drawerOverlay);
  }

  let mobileDrawer = document.getElementById('globalMobileDrawer');
  if (!mobileDrawer) {
    mobileDrawer = document.createElement('div');
    mobileDrawer.id = 'globalMobileDrawer';
    mobileDrawer.className = 'mobile-drawer';
    mobileDrawer.innerHTML = buildStaticMobileDrawerHtml();
    document.body.appendChild(mobileDrawer);
  }

  // 3. Immediately wire user interactions and accessibility (NO network requests required!)
  wireDesktopDropdowns(navContainer);
  wireMobileDrawer(mobileDrawer, drawerOverlay);

  // 4. Progressive Enhancement:
  // Defer dynamic Supabase query until idle or after window load
  const runProgressiveEnhancement = () => {
    enhanceNavbarWithDynamicData(navContainer, mobileDrawer).catch(err => {
      console.warn('Navbar progressive enhancement skipped:', err);
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(runProgressiveEnhancement, { timeout: 4000 });
  } else if (document.readyState === 'complete') {
    setTimeout(runProgressiveEnhancement, 200);
  } else {
    window.addEventListener('load', () => setTimeout(runProgressiveEnhancement, 200), { once: true });
  }
}

/**
 * Progressively enrich dropdown menus with active streams, exams, and categories
 */
async function enhanceNavbarWithDynamicData(navContainer, mobileDrawer) {
  const data = await getCachedNavbarData();
  const { streams, resourceTypes, entranceExams } = data;

  const primaryKeys = ['PYQ', 'NOTES', 'Q_AND_A', 'SYLLABUS'];
  const otherResourceTypes = resourceTypes.filter(rt => {
    return !primaryKeys.includes(rt.type_key) && rt.show_in_navbar !== false;
  });

  // Enhance Subjects Menu
  const menuSubjects = navContainer.querySelector('#menuSubjects');
  if (menuSubjects && streams.length > 0 && !menuSubjects.querySelector('[data-dynamic="stream"]')) {
    const streamHtml = streams.map(s => `
      <a href="/subjects/${escapeHtml(s.slug)}" role="menuitem" data-dynamic="stream">
        <span class="dropdown-icon">${s.icon || '🎓'}</span>
        <span>${escapeHtml(s.name)}</span>
      </a>
    `).join('');
    menuSubjects.insertAdjacentHTML('beforeend', streamHtml);
  }

  // Enhance Semester Questions Menu
  const menuPYQ = navContainer.querySelector('#menuPYQ');
  if (menuPYQ && streams.length > 0 && !menuPYQ.querySelector('[data-dynamic="stream"]')) {
    const pyqHtml = streams.map(s => `
      <a href="/previous-year-questions/${escapeHtml(s.slug)}" role="menuitem" data-dynamic="stream">
        <span class="dropdown-icon">${s.icon || '🎓'}</span>
        <span>${escapeHtml(s.name)} Questions</span>
      </a>
    `).join('');
    menuPYQ.insertAdjacentHTML('beforeend', pyqHtml);
  }

  // Enhance Notes Menu
  const menuNotes = navContainer.querySelector('#menuNotes');
  if (menuNotes && streams.length > 0 && !menuNotes.querySelector('[data-dynamic="stream"]')) {
    const notesHtml = streams.map(s => `
      <a href="/unit-wise-notes/${escapeHtml(s.slug)}" role="menuitem" data-dynamic="stream">
        <span class="dropdown-icon">${s.icon || '🎓'}</span>
        <span>${escapeHtml(s.name)} Notes</span>
      </a>
    `).join('');
    menuNotes.insertAdjacentHTML('beforeend', notesHtml);
  }

  // Enhance Q&A Menu
  const menuQNA = navContainer.querySelector('#menuQNA');
  if (menuQNA && streams.length > 0 && !menuQNA.querySelector('[data-dynamic="stream"]')) {
    const qnaHtml = streams.map(s => `
      <a href="/unit-wise-qna/${escapeHtml(s.slug)}" role="menuitem" data-dynamic="stream">
        <span class="dropdown-icon">${s.icon || '🎓'}</span>
        <span>${escapeHtml(s.name)} Q&amp;A</span>
      </a>
    `).join('');
    menuQNA.insertAdjacentHTML('beforeend', qnaHtml);
  }

  // Enhance Syllabus Menu
  const menuSyllabus = navContainer.querySelector('#menuSyllabus');
  if (menuSyllabus && streams.length > 0 && !menuSyllabus.querySelector('[data-dynamic="stream"]')) {
    const sylHtml = streams.map(s => `
      <a href="/syllabus/${escapeHtml(s.slug)}" role="menuitem" data-dynamic="stream">
        <span class="dropdown-icon">${s.icon || '🎓'}</span>
        <span>${escapeHtml(s.name)} Syllabus</span>
      </a>
    `).join('');
    menuSyllabus.insertAdjacentHTML('beforeend', sylHtml);
  }

  // Enhance Entrance Exams Menu
  const menuEntrance = navContainer.querySelector('#menuEntrance');
  if (menuEntrance && entranceExams.length > 0 && !menuEntrance.querySelector('[data-dynamic="exam"]')) {
    const examHtml = entranceExams.map(ex => `
      <a href="/entrance-exams/${escapeHtml(ex.slug)}" role="menuitem" data-dynamic="exam">
        <span class="dropdown-icon">${ex.icon || '🎯'}</span>
        <span>${escapeHtml(ex.short_name || ex.name)}</span>
      </a>
    `).join('');
    menuEntrance.insertAdjacentHTML('beforeend', examHtml);
  }

  // Enhance Resources Menu
  const menuResources = navContainer.querySelector('#menuResources');
  if (menuResources && otherResourceTypes.length > 0 && !menuResources.querySelector('[data-dynamic="cat"]')) {
    const resHtml = otherResourceTypes.map(rt => {
      const url = dedicatedSlugs.includes(rt.slug) ? `/${rt.slug}` : `/resources/${rt.slug}`;
      return `
        <a href="${url}" role="menuitem" data-dynamic="cat">
          <span class="dropdown-icon">${rt.icon || '📄'}</span>
          <span>${escapeHtml(rt.display_name)}</span>
        </a>
      `;
    }).join('');
    menuResources.insertAdjacentHTML('beforeend', resHtml);
  }

  // Enhance Mobile Drawer Academics Accordion
  if (mobileDrawer && streams.length > 0) {
    const drawerAcademics = mobileDrawer.querySelector('#drawerAcademicsContent');
    if (drawerAcademics && !drawerAcademics.querySelector('[data-dynamic="stream"]')) {
      const drawerStreamHtml = streams.map(s => `
        <a href="/subjects/${escapeHtml(s.slug)}" class="drawer-link" data-dynamic="stream">
          <span>${s.icon || '🎓'}</span> ${escapeHtml(s.name)} Stream
        </a>
      `).join('');
      const allSyllabiLink = drawerAcademics.querySelector('a[href="/syllabus"]');
      if (allSyllabiLink) {
        allSyllabiLink.insertAdjacentHTML('beforebegin', drawerStreamHtml);
      } else {
        drawerAcademics.insertAdjacentHTML('beforeend', drawerStreamHtml);
      }
    }
  }

  // Enhance Mobile Drawer Entrance Accordion
  if (mobileDrawer && entranceExams.length > 0) {
    const drawerEntrance = mobileDrawer.querySelector('#drawerEntranceContent');
    if (drawerEntrance && !drawerEntrance.querySelector('[data-dynamic="exam"]')) {
      const drawerExamHtml = entranceExams.map(ex => `
        <a href="/entrance-exams/${escapeHtml(ex.slug)}" class="drawer-link" data-dynamic="exam">
          <span>${ex.icon || '🎯'}</span> ${escapeHtml(ex.short_name || ex.name)}
        </a>
      `).join('');
      drawerEntrance.insertAdjacentHTML('beforeend', drawerExamHtml);
    }
  }
}

/**
 * Desktop dropdown interaction & WCAG keyboard accessibility
 */
function wireDesktopDropdowns(navContainer) {
  const dropdowns = navContainer.querySelectorAll('.nav-dropdown');

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-dropdown-trigger');
    const menu = dd.querySelector('.nav-dropdown-menu');
    if (!trigger || !menu) return;

    // Click handler
    trigger.addEventListener('click', (e) => {
      // If clicking trigger on desktop when link has a destination, let it follow if requested,
      // or toggle if acting as menu trigger
      const isOpen = dd.classList.contains('open');
      dropdowns.forEach(other => {
        if (other !== dd) {
          other.classList.remove('open');
          const otherTrig = other.querySelector('.nav-dropdown-trigger');
          if (otherTrig) otherTrig.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Hover management
    dd.addEventListener('mouseenter', () => {
      dd.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    });

    dd.addEventListener('mouseleave', () => {
      dd.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    // Keyboard accessibility inside dropdown
    dd.addEventListener('keydown', (e) => {
      const items = Array.from(menu.querySelectorAll('a[role="menuitem"]'));
      const activeIdx = items.indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!dd.classList.contains('open')) {
          dd.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        const nextIdx = activeIdx < items.length - 1 ? activeIdx + 1 : 0;
        if (items[nextIdx]) items[nextIdx].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIdx > 0) {
          items[activeIdx - 1].focus();
        } else {
          trigger.focus();
          dd.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        trigger.focus();
      } else if (e.key === 'Tab') {
        dd.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Global click outside to close open dropdowns
  document.addEventListener('click', (e) => {
    if (!navContainer.contains(e.target)) {
      dropdowns.forEach(dd => {
        dd.classList.remove('open');
        const trig = dd.querySelector('.nav-dropdown-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/**
 * Mobile drawer interaction & touch accordion wiring
 */
function wireMobileDrawer(mobileDrawer, drawerOverlay) {
  const hamburgerBtn = document.getElementById('globalHamburger');
  const closeBtn = document.getElementById('drawerCloseBtn');
  if (!mobileDrawer || !drawerOverlay) return;

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstLink = mobileDrawer.querySelector('button, a');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openDrawer);
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeDrawer);
  }

  drawerOverlay.addEventListener('click', closeDrawer);

  // Accordion toggle inside mobile drawer
  const accordionBtns = mobileDrawer.querySelectorAll('.drawer-accordion-btn');
  accordionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const content = btn.nextElementSibling;
      if (!content) return;

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
      } else {
        btn.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  const drawerLinks = mobileDrawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeDrawer();
      if (hamburgerBtn) hamburgerBtn.focus();
    }
  });
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.querySelector('#navbar')) {
        initGlobalNavbar('#navbar');
      }
    });
  } else {
    if (document.querySelector('#navbar')) {
      initGlobalNavbar('#navbar');
    }
  }
}
