/**
 * Protected Online PDF Viewer Controller (Phase 5C-3)
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 *
 * Implements a hardened, canvas-based academic document viewer powered by
 * pinned, self-hosted PDF.js (v3.11.174).
 *
 * Deterrent Features:
 * - Canvas-only rendering (no browser-native <object> or <iframe>)
 * - Zero download buttons, zero print buttons, zero raw URLs in DOM
 * - Keyboard shortcut interception (Ctrl/Cmd + S, P, C)
 * - Context menu (right-click) suppression
 * - user-select: none CSS styling
 * - Subtle generic watermark: "JeetPhysics.in — Academic Resource — Online Access"
 * - High-DPI canvas scaling for mathematical equations and circuit diagrams
 * - Short-lived token management with on-demand session refresh
 * - Responsive mobile zoom & touch navigation
 */

import { AcademicService } from './supabaseClient.js';

const PDFJS_SCRIPT_SRC = '/vendor/pdfjs/pdf.min.js';
const PDFJS_WORKER_SRC = '/vendor/pdfjs/pdf.worker.min.js';

let pdfjsLoadingPromise = null;

/**
 * Ensure pinned self-hosted PDF.js is loaded
 */
async function ensurePdfJsLoaded() {
  if (window.pdfjsLib) {
    if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
    }
    return window.pdfjsLib;
  }

  if (pdfjsLoadingPromise) return pdfjsLoadingPromise;

  pdfjsLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PDFJS_SCRIPT_SRC;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
        resolve(window.pdfjsLib);
      } else {
        reject(new Error('Failed to initialize PDF.js from local vendor bundle'));
      }
    };
    script.onerror = () => reject(new Error(`Failed to load ${PDFJS_SCRIPT_SRC}`));
    document.head.appendChild(script);
  });

  return pdfjsLoadingPromise;
}

/**
 * Global Toast Notification for Blocked Shortcuts
 */
let activeToastTimeout = null;
function showProtectionToast(message = 'Printing, saving, and copying are disabled on this protected document.') {
  let toast = document.getElementById('pvGlobalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'pvGlobalToast';
    toast.className = 'pv-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="ph ph-shield-warning" style="font-size: 1.1rem;"></i><span>${message}</span>`;
  toast.classList.add('show');

  if (activeToastTimeout) clearTimeout(activeToastTimeout);
  activeToastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/**
 * Protected Viewer Instance Class
 */
export class ProtectedViewerInstance {
  constructor({ container, fileId, title = 'Academic Document', isModal = false, onClose = null }) {
    this.container = container;
    this.fileId = fileId;
    this.title = title;
    this.isModal = isModal;
    this.onClose = onClose;

    this.pdfDoc = null;
    this.currentPage = 1;
    this.totalPages = 0;
    this.scale = 1.25;
    this.currentRenderTask = null;
    this.isDestroyed = false;

    this.boundKeyDownHandler = this.handleKeyDown.bind(this);
    this.boundContextMenuHandler = (e) => e.preventDefault();

    this.init();
  }

  init() {
    this.buildMarkup();
    this.bindEvents();
    this.loadDocument();
  }

  buildMarkup() {
    this.container.innerHTML = `
      <div class="protected-pdf-viewer" id="pvRoot_${this.fileId}" tabindex="0">
        <!-- Top Toolbar -->
        <header class="pv-toolbar">
          <div class="pv-toolbar-left">
            <div class="pv-doc-title" title="${this.escapeHtml(this.title)}">
              <i class="ph ph-file-pdf" style="color: var(--blue-400, #60a5fa);"></i>
              <span>${this.escapeHtml(this.title)}</span>
            </div>
            <span class="pv-doc-badge">PROTECTED</span>
          </div>

          <!-- Page Navigation -->
          <div class="pv-toolbar-center">
            <button class="pv-btn pv-btn-prev" title="Previous Page (Left Arrow)">
              <i class="ph ph-caret-left"></i>
            </button>
            <div class="pv-page-control">
              <span>Page</span>
              <input type="number" class="pv-page-input" min="1" value="1" />
              <span>of <span class="pv-total-pages">—</span></span>
            </div>
            <button class="pv-btn pv-btn-next" title="Next Page (Right Arrow)">
              <i class="ph ph-caret-right"></i>
            </button>
          </div>

          <!-- Zoom & Actions -->
          <div class="pv-toolbar-right">
            <button class="pv-btn pv-btn-zoom-out" title="Zoom Out (-)">
              <i class="ph ph-magnifying-glass-minus"></i>
            </button>
            <span class="pv-zoom-label">125%</span>
            <button class="pv-btn pv-btn-zoom-in" title="Zoom In (+)">
              <i class="ph ph-magnifying-glass-plus"></i>
            </button>
            <button class="pv-btn pv-btn-fit-width" title="Fit to Container Width">
              <i class="ph ph-arrows-out-line-horizontal"></i>
              <span>Fit Width</span>
            </button>
            ${this.isModal ? `
              <button class="pv-btn pv-btn-close" title="Close Viewer (Esc)">
                <i class="ph ph-x"></i>
                <span>Close</span>
              </button>
            ` : ''}
          </div>
        </header>

        <!-- Viewport Area -->
        <main class="pv-viewport">
          <div class="pv-canvas-wrapper">
            <canvas class="pv-canvas"></canvas>
            <!-- Watermark Overlay -->
            <div class="pv-watermark-overlay" aria-hidden="true">
              <div class="pv-watermark-line">JeetPhysics.in — Academic Resource — Online Access</div>
              <div class="pv-watermark-line">JeetPhysics.in — Academic Resource — Online Access</div>
              <div class="pv-watermark-line">JeetPhysics.in — Academic Resource — Online Access</div>
              <div class="pv-watermark-line">JeetPhysics.in — Academic Resource — Online Access</div>
            </div>
          </div>

          <!-- Loading State Overlay -->
          <div class="pv-overlay-state pv-state-loading">
            <div class="pv-spinner"></div>
            <div class="pv-state-title">Loading Academic Document</div>
            <p class="pv-state-desc">Authorizing and preparing document pages for high-fidelity reading...</p>
          </div>

          <!-- Error / Expiry State Overlay -->
          <div class="pv-overlay-state pv-state-error" style="display: none;">
            <i class="ph ph-lock-key" style="font-size: 2.4rem; color: #fca5a5;"></i>
            <div class="pv-state-title" id="pvErrorTitle">Access Authorization Expired</div>
            <p class="pv-state-desc" id="pvErrorDesc">The temporary viewing authorization token has expired or is unavailable.</p>
            <button class="pv-btn pv-btn-refresh-session" style="padding: 8px 16px; background: var(--blue-600, #2563eb); border-color: var(--blue-500, #3b82f6); color: #fff;">
              <i class="ph ph-arrows-clockwise"></i>
              <span>Refresh Authorization Session</span>
            </button>
          </div>
        </main>

        <!-- Security Notice Footer -->
        <footer class="pv-footer-notice">
          <span><i class="ph ph-shield-check"></i> Protected Online Reading Mode • Casual download/print restricted</span>
          <span>Fakir Mohan University NEP 2020 Physics Curriculum</span>
        </footer>
      </div>
    `;

    // Cache element references
    this.root = this.container.querySelector('.protected-pdf-viewer');
    this.viewport = this.container.querySelector('.pv-viewport');
    this.canvas = this.container.querySelector('.pv-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.loadingOverlay = this.container.querySelector('.pv-state-loading');
    this.errorOverlay = this.container.querySelector('.pv-state-error');
    this.errorTitle = this.container.querySelector('#pvErrorTitle');
    this.errorDesc = this.container.querySelector('#pvErrorDesc');
    this.btnRefreshSession = this.container.querySelector('.pv-btn-refresh-session');

    this.btnPrev = this.container.querySelector('.pv-btn-prev');
    this.btnNext = this.container.querySelector('.pv-btn-next');
    this.pageInput = this.container.querySelector('.pv-page-input');
    this.totalPagesSpan = this.container.querySelector('.pv-total-pages');

    this.btnZoomOut = this.container.querySelector('.pv-btn-zoom-out');
    this.btnZoomIn = this.container.querySelector('.pv-btn-zoom-in');
    this.btnFitWidth = this.container.querySelector('.pv-btn-fit-width');
    this.zoomLabel = this.container.querySelector('.pv-zoom-label');

    if (this.isModal) {
      this.btnClose = this.container.querySelector('.pv-btn-close');
    }
  }

  bindEvents() {
    // Navigation
    this.btnPrev.addEventListener('click', () => this.prevPage());
    this.btnNext.addEventListener('click', () => this.nextPage());

    this.pageInput.addEventListener('change', () => {
      const val = parseInt(this.pageInput.value, 10);
      if (!isNaN(val) && val >= 1 && val <= this.totalPages) {
        this.goToPage(val);
      } else {
        this.pageInput.value = this.currentPage;
      }
    });

    // Zoom
    this.btnZoomOut.addEventListener('click', () => this.zoomOut());
    this.btnZoomIn.addEventListener('click', () => this.zoomIn());
    this.btnFitWidth.addEventListener('click', () => this.fitToWidth());

    // Refresh Token Session
    this.btnRefreshSession.addEventListener('click', () => {
      this.loadDocument();
    });

    // Modal Close
    if (this.isModal && this.btnClose) {
      this.btnClose.addEventListener('click', () => this.destroy());
    }

    // Protection Deterrents
    this.root.addEventListener('contextmenu', this.boundContextMenuHandler);
    window.addEventListener('keydown', this.boundKeyDownHandler, true);

    // Mobile Swipe Handling
    let touchStartX = 0;
    let touchStartY = 0;

    this.viewport.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    this.viewport.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        // Horizontal swipe threshold 60px and dominant over vertical
        if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          if (deltaX < 0) {
            this.nextPage();
          } else {
            this.prevPage();
          }
        }
      }
    }, { passive: true });
  }

  handleKeyDown(e) {
    if (this.isDestroyed) return;

    // Check if target is inside this viewer or if modal is open
    const isInside = (e.target && this.root.contains(e.target)) || this.root.contains(document.activeElement) || this.isModal;

    // Intercept Save, Print, Copy shortcuts
    const isCtrlOrCmd = e.ctrlKey || e.metaKey;
    const key = (e.key || '').toLowerCase();

    if (isCtrlOrCmd && (key === 's' || key === 'p' || key === 'c')) {
      if (isInside) {
        e.preventDefault();
        e.stopPropagation();
        const action = key === 's' ? 'Saving' : key === 'p' ? 'Printing' : 'Copying';
        showProtectionToast(`${action} is disabled on this protected academic document.`);
        return false;
      }
    }

    // Modal Escape
    if (this.isModal && key === 'escape') {
      e.preventDefault();
      this.destroy();
      return;
    }

    // Page navigation via arrow keys when viewport is focused
    if (isInside && !isCtrlOrCmd) {
      if (key === 'arrowleft' || key === 'pageup') {
        e.preventDefault();
        this.prevPage();
      } else if (key === 'arrowright' || key === 'pagedown') {
        e.preventDefault();
        this.nextPage();
      }
    }
  }

  async loadDocument() {
    this.showLoading(true);
    this.showError(false);

    try {
      // 1. Ensure local pinned PDF.js library is ready
      const pdfjs = await ensurePdfJsLoaded();

      // 2. Request short-lived signed URL from serverless endpoint (Vercel bypassed for binary)
      const signData = await AcademicService.fetchSignedUrl(this.fileId);
      if (!signData || !signData.signedUrl) {
        throw new Error('Server did not return a valid signed download token.');
      }

      // 3. Load PDF via PDF.js worker
      // Data flows directly from Supabase Storage -> Student Browser
      const loadingTask = pdfjs.getDocument({
        url: signData.signedUrl,
        withCredentials: false,
        disableRange: true // Buffer document to prevent post-expiry chunk re-fetches
      });

      this.pdfDoc = await loadingTask.promise;
      this.totalPages = this.pdfDoc.numPages;

      this.totalPagesSpan.textContent = this.totalPages;
      this.pageInput.max = this.totalPages;
      this.pageInput.value = this.currentPage;

      this.showLoading(false);
      await this.renderPage(this.currentPage);

    } catch (err) {
      console.error('[ProtectedViewer] Document load error:', err);
      this.showLoading(false);
      this.showError(true, 'Access Authorization Expired or Unavailable', err.message);
    }
  }

  async renderPage(pageNumber) {
    if (!this.pdfDoc || this.isDestroyed) return;

    // Cancel active render task if user rapidly switches pages
    if (this.currentRenderTask) {
      try {
        this.currentRenderTask.cancel();
      } catch (_) {}
      this.currentRenderTask = null;
    }

    try {
      const page = await this.pdfDoc.getPage(pageNumber);

      // High-DPI screen adjustment for mathematical equation clarity
      const dpr = window.devicePixelRatio || 1;
      const viewport = page.getViewport({ scale: this.scale });

      this.canvas.width = Math.floor(viewport.width * dpr);
      this.canvas.height = Math.floor(viewport.height * dpr);
      this.canvas.style.width = Math.floor(viewport.width) + 'px';
      this.canvas.style.height = Math.floor(viewport.height) + 'px';

      const renderContext = {
        canvasContext: this.ctx,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : null
      };

      this.currentRenderTask = page.render(renderContext);
      await this.currentRenderTask.promise;
      this.currentRenderTask = null;

      // Update UI state
      this.currentPage = pageNumber;
      this.pageInput.value = pageNumber;
      this.btnPrev.disabled = (this.currentPage <= 1);
      this.btnNext.disabled = (this.currentPage >= this.totalPages);
      this.zoomLabel.textContent = `${Math.round(this.scale * 100)}%`;

    } catch (err) {
      if (err && err.name === 'RenderingCancelledException') {
        // Normal cancellation on rapid navigation
        return;
      }
      console.error(`[ProtectedViewer] Render page ${pageNumber} error:`, err);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      return this.renderPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      return this.renderPage(this.currentPage + 1);
    }
  }

  goToPage(num) {
    if (num >= 1 && num <= this.totalPages) {
      return this.renderPage(num);
    }
  }

  zoomIn() {
    if (this.scale < 3.0) {
      this.scale = parseFloat((this.scale + 0.25).toFixed(2));
      this.renderPage(this.currentPage);
    }
  }

  zoomOut() {
    if (this.scale > 0.5) {
      this.scale = parseFloat((this.scale - 0.25).toFixed(2));
      this.renderPage(this.currentPage);
    }
  }

  async fitToWidth() {
    if (!this.pdfDoc) return;
    try {
      const page = await this.pdfDoc.getPage(this.currentPage);
      const unscaledViewport = page.getViewport({ scale: 1.0 });
      const availableWidth = this.viewport.clientWidth - 48; // padding margin
      if (availableWidth > 100 && unscaledViewport.width > 0) {
        this.scale = parseFloat((availableWidth / unscaledViewport.width).toFixed(2));
        await this.renderPage(this.currentPage);
      }
    } catch (e) {
      console.warn('[ProtectedViewer] Fit to width error:', e);
    }
  }

  showLoading(show) {
    if (this.loadingOverlay) {
      this.loadingOverlay.style.display = show ? 'flex' : 'none';
    }
  }

  showError(show, title = '', desc = '') {
    if (this.errorOverlay) {
      if (show) {
        if (title) this.errorTitle.textContent = title;
        if (desc) this.errorDesc.textContent = desc;
        this.errorOverlay.style.display = 'flex';
      } else {
        this.errorOverlay.style.display = 'none';
      }
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  destroy() {
    this.isDestroyed = true;

    if (this.currentRenderTask) {
      try { this.currentRenderTask.cancel(); } catch (_) {}
    }

    window.removeEventListener('keydown', this.boundKeyDownHandler, true);

    if (this.onClose) {
      this.onClose();
    }

    if (this.container && this.container.parentNode && this.isModal) {
      this.container.parentNode.removeChild(this.container);
    } else if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

/**
 * Mount an inline Protected Viewer into a page container (e.g. syllabus in paper.html)
 */
export function mountProtectedViewer(containerElement, { fileId, title }) {
  if (!containerElement) throw new Error('Target container element is required');
  return new ProtectedViewerInstance({
    container: containerElement,
    fileId,
    title,
    isModal: false
  });
}

/**
 * Open a Fullscreen Modal Protected Viewer (e.g. for Resource cards in resource.html)
 */
export function openProtectedViewerModal({ fileId, title }) {
  // Close any existing modal
  const existingModal = document.querySelector('.pv-modal-overlay');
  if (existingModal) {
    existingModal.remove();
  }

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'pv-modal-overlay';

  const modalContainer = document.createElement('div');
  modalContainer.className = 'pv-modal-container';
  modalOverlay.appendChild(modalContainer);
  document.body.appendChild(modalOverlay);

  // Close when clicking outside modal
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      viewerInstance.destroy();
    }
  });

  const viewerInstance = new ProtectedViewerInstance({
    container: modalContainer,
    fileId,
    title,
    isModal: true,
    onClose: () => {
      if (modalOverlay.parentNode) {
        modalOverlay.parentNode.removeChild(modalOverlay);
      }
    }
  });

  return viewerInstance;
}
