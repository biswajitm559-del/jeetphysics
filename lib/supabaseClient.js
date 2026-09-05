/**
 * Supabase Client Initialization & Academic Data API Services
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 * Phase 4A Architecture: Normalized Academic Service Layer
 */

import { createClient } from '@supabase/supabase-js';

// Environment variable retrieval with production defaults
const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL)
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://fjqrgbrfvydokwqbbstb.supabase.co';

const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcXJnYnJmdnlkb2t3cWJic3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNzUxNTYsImV4cCI6MjEwMzc1MTE1Nn0.o1mPUmI59d-oZujo9S-EsKaWbrod3q9FRU76b313e5o';

// Client-safe Supabase instance using anon key.
// Note: Service Role Key is strictly forbidden in browser/client code.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Academic Data Service Layer
 * Interacts with the normalized, CMS-driven Phase 2 & 3 Supabase schema
 */
export const AcademicService = {
  // ==========================================================================
  // 1. SUBJECTS
  // ==========================================================================

  /**
   * Fetch all active academic subjects
   * @returns {Promise<Array>} List of active subjects
   */
  async getSubjects() {
    const { data, error } = await supabase
      .from('subjects')
      .select('id, slug, name, description, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching subjects:', error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch a single subject by its unique slug
   * @param {string} subjectSlug - e.g. 'physics'
   * @returns {Promise<Object|null>} Subject record or null
   */
  async getSubjectBySlug(subjectSlug) {
    const { data, error } = await supabase
      .from('subjects')
      .select('id, slug, name, description, display_order')
      .eq('slug', subjectSlug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching subject "${subjectSlug}":`, error.message);
      return null;
    }
    return data;
  },

  // ==========================================================================
  // 2. SEMESTERS
  // ==========================================================================

  /**
   * Fetch all active semesters for a subject
   * @param {string} subjectSlug - Default: 'physics'
   * @returns {Promise<Array>} Semesters sorted by semester_number
   */
  async getSemesters(subjectSlug = 'physics') {
    const { data, error } = await supabase
      .from('semesters')
      .select(`
        id,
        semester_number,
        slug,
        name,
        display_order,
        subjects!inner (
          id,
          slug,
          name
        )
      `)
      .eq('subjects.slug', subjectSlug)
      .eq('is_active', true)
      .order('semester_number', { ascending: true });

    if (error) {
      console.error(`Error fetching semesters for "${subjectSlug}":`, error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Resolve a semester strictly scoped under its parent subject
   * @param {string} subjectSlug - e.g. 'physics'
   * @param {string} semesterSlug - e.g. 'semester-i'
   * @returns {Promise<Object|null>} Semester record with parent subject or null
   */
  async getSemesterBySlug(subjectSlug, semesterSlug) {
    const { data, error } = await supabase
      .from('semesters')
      .select(`
        id,
        semester_number,
        slug,
        name,
        display_order,
        subjects!inner (
          id,
          slug,
          name
        )
      `)
      .eq('subjects.slug', subjectSlug)
      .eq('slug', semesterSlug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error resolving semester "${semesterSlug}" under "${subjectSlug}":`, error.message);
      return null;
    }
    return data;
  },

  // ==========================================================================
  // 3. PAPERS
  // ==========================================================================

  /**
   * Fetch all active papers (both THEORY and LAB) for a given semester
   * Ordered by display_order so Theory papers are paired with Practical labs
   * @param {string} subjectSlug - e.g. 'physics'
   * @param {string} semesterSlug - e.g. 'semester-i'
   * @returns {Promise<Array>} List of papers with semester and subject info
   */
  async getPapersBySemester(subjectSlug, semesterSlug) {
    const { data, error } = await supabase
      .from('papers')
      .select(`
        id,
        paper_code,
        slug,
        name,
        paper_type,
        description,
        credits,
        marks,
        display_order,
        semesters!inner (
          id,
          slug,
          name,
          semester_number,
          subjects!inner (
            id,
            slug,
            name
          )
        )
      `)
      .eq('semesters.slug', semesterSlug)
      .eq('semesters.subjects.slug', subjectSlug)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error(`Error fetching papers for ${subjectSlug}/${semesterSlug}:`, error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Resolve a paper strictly through its full hierarchical lineage:
   * subject.slug -> semester.slug -> paper.slug
   * Never query by paper_slug alone.
   * @param {string} subjectSlug - e.g. 'physics'
   * @param {string} semesterSlug - e.g. 'semester-iv'
   * @param {string} paperSlug - e.g. 'paper-8-analog-systems'
   * @returns {Promise<Object|null>} Paper record with verified semester and subject
   */
  async getPaperBySlug(subjectSlug, semesterSlug, paperSlug) {
    const { data, error } = await supabase
      .from('papers')
      .select(`
        id,
        paper_code,
        slug,
        name,
        paper_type,
        description,
        credits,
        marks,
        display_order,
        is_active,
        semesters!inner (
          id,
          slug,
          name,
          semester_number,
          subjects!inner (
            id,
            slug,
            name
          )
        )
      `)
      .eq('slug', paperSlug)
      .eq('semesters.slug', semesterSlug)
      .eq('semesters.subjects.slug', subjectSlug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error resolving paper ${subjectSlug}/${semesterSlug}/${paperSlug}:`, error.message);
      return null;
    }
    return data;
  },

  // ==========================================================================
  // 4. RESOURCE TYPES (CMS-DRIVEN CONFIGURATION LAYER)
  // ==========================================================================

  /**
   * Fetch all active resource types configured in the database
   * UI controls (chips, tabs, form fields) consume this dynamically
   * @returns {Promise<Array>} List of resource type configurations
   */
  async getResourceTypes() {
    const { data, error } = await supabase
      .from('resource_types')
      .select(`
        id,
        type_key,
        slug,
        display_name,
        description,
        icon,
        category,
        applicable_paper_type,
        requires_unit,
        requires_exam_year,
        display_order,
        show_on_paper,
        show_in_navbar,
        is_active
      `)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching resource types:', error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch a single active resource type configuration by its URL slug
   * @param {string} slug - e.g. 'previous-year-questions', 'unit-wise-notes'
   * @returns {Promise<Object|null>} Resource type configuration record or null
   */
  async getResourceTypeBySlug(slug) {
    const { data, error } = await supabase
      .from('resource_types')
      .select(`
        id,
        type_key,
        slug,
        display_name,
        description,
        icon,
        category,
        applicable_paper_type,
        requires_unit,
        requires_exam_year,
        display_order,
        show_on_paper,
        show_in_navbar,
        is_active
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching resource type "${slug}":`, error.message);
      return null;
    }
    return data;
  },

  // ==========================================================================
  // 5. RESOURCES & ATTACHED FILES (STUDENT READ ACCESS)
  // ==========================================================================

  /**
   * Fetch all active published resources for a paper, optionally filtered by type_key
   * Includes file metadata records from resource_files
   * @param {string} paperId - UUID of the paper
   * @param {string|null} typeKey - Optional resource_type filter (e.g. 'PYQ', 'NOTES')
   * @returns {Promise<Array>} Published resources with file metadata
   */
  async getPublishedResources(paperId, typeKey = null) {
    let query = supabase
      .from('resources')
      .select(`
        id,
        paper_id,
        resource_type,
        title,
        description,
        unit_number,
        unit_name,
        exam_year,
        display_order,
        publication_status,
        created_at,
        resource_files (
          id,
          storage_bucket,
          storage_path,
          original_filename,
          mime_type,
          file_size_bytes,
          file_version,
          is_primary
        )
      `)
      .eq('paper_id', paperId)
      .eq('is_active', true)
      .eq('publication_status', 'PUBLISHED')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (typeKey) {
      query = query.eq('resource_type', typeKey);
    }

    const { data, error } = await query;
    if (error) {
      console.error(`Error fetching resources for paper ${paperId}:`, error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch the single published authoritative syllabus resource for a paper
   * Rendered directly inside the paper page's embedded PDF viewer
   * @param {string} paperId - UUID of the paper
   * @returns {Promise<Object|null>} Published syllabus resource with file or null
   */
  async getPublishedSyllabus(paperId) {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        id,
        paper_id,
        resource_type,
        title,
        description,
        publication_status,
        resource_files (
          id,
          storage_bucket,
          storage_path,
          original_filename,
          mime_type,
          file_size_bytes,
          file_version,
          is_primary
        )
      `)
      .eq('paper_id', paperId)
      .eq('resource_type', 'SYLLABUS')
      .eq('publication_status', 'PUBLISHED')
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching syllabus for paper ${paperId}:`, error.message);
      return null;
    }
    return data;
  },

  // ==========================================================================
  // 6. SECURE FILE DELIVERY (SIGNED URL)
  // ==========================================================================

  /**
   * Request a short-lived signed URL from the serverless API endpoint
   * Passes the user's Supabase Auth token if logged in (enables admin draft access)
   * @param {string} fileId - UUID of the resource_file record
   * @returns {Promise<{signedUrl: string, original_filename: string, mime_type: string, file_size_bytes: number}>}
   */
  async fetchSignedUrl(fileId) {
    if (!fileId) throw new Error('file_id is required to fetch signed URL');

    const headers = {};
    const { data: { session } } = await supabase.auth.getSession();
    if (session && session.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`/api/resources/sign-url?file_id=${encodeURIComponent(fileId)}`, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${response.status}: Failed to generate signed URL`);
    }

    return await response.json();
  },

  // ==========================================================================
  // 7. AUTHENTICATION & ADMIN VERIFICATION
  // ==========================================================================

  /**
   * Check whether the currently authenticated user is an active administrator
   * Verifies against public.admin_users table (enforced via database RLS)
   * @returns {Promise<boolean>} True if active admin, false otherwise
   */
  async checkIsAdmin() {
    const { data: { user }, error: userErr } = await supabase.auth.getUser();
    if (userErr || !user) return false;

    const { data, error } = await supabase
      .from('admin_users')
      .select('id, is_active')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) return false;
    return true;
  },

  /**
   * Sign in administrator with email and password
   * @param {string} email
   * @param {string} password
   */
  async signInAdmin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
    return data;
  },

  /**
   * Sign out current administrator session
   */
  async signOutAdmin() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // ==========================================================================
  // 8. ADMIN RESOURCE UPLOAD & MANAGEMENT (AUTH SESSION + STORAGE RLS)
  // ==========================================================================

  /**
   * Upload an academic file and register its resource metadata
   * Uses the authenticated administrator's browser Supabase client.
   * Cleans up uploaded storage object if database record insertion fails.
   *
   * @param {Object} params
   * @param {string} params.paperId - UUID of the paper
   * @param {string} params.resourceType - type_key (e.g. 'SYLLABUS', 'PYQ', 'NOTES')
   * @param {string} params.title - Resource title
   * @param {string} [params.description] - Optional description
   * @param {number} [params.unitNumber] - Required if resource_type requires_unit
   * @param {string} [params.unitName] - Required if resource_type requires_unit
   * @param {number} [params.examYear] - Required if resource_type requires_exam_year
   * @param {string} [params.publicationStatus='DRAFT'] - 'DRAFT' | 'PUBLISHED'
   * @param {File} params.file - PDF File object (max 50 MB)
   */
  async uploadAcademicResource({
    paperId,
    resourceType,
    title,
    description = null,
    unitNumber = null,
    unitName = null,
    examYear = null,
    publicationStatus = 'DRAFT',
    file
  }) {
    // 1. Client validation
    if (!file) throw new Error('File is required');
    if (file.type !== 'application/pdf') throw new Error('Only PDF files are permitted');
    if (file.size > 52428800) throw new Error('File size exceeds the 50 MB maximum limit');

    // 2. Generate secure, collision-free storage path
    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `papers/${paperId}/${resourceType.toLowerCase()}/${timestamp}_${sanitizedFilename}`;

    // 3. Upload file to private academic-resources bucket (guarded by Storage RLS)
    const { data: storageData, error: storageErr } = await supabase.storage
      .from('academic-resources')
      .upload(storagePath, file, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (storageErr) {
      console.error('Storage upload failed:', storageErr.message);
      throw new Error(`Storage upload error: ${storageErr.message}`);
    }

    let createdResourceId = null;

    try {
      // 4. Insert resource metadata record into public.resources
      const { data: resourceData, error: resourceErr } = await supabase
        .from('resources')
        .insert([
          {
            paper_id: paperId,
            resource_type: resourceType,
            title,
            description,
            unit_number: unitNumber,
            unit_name: unitName,
            exam_year: examYear,
            publication_status: publicationStatus,
            is_active: true
          }
        ])
        .select('id')
        .single();

      if (resourceErr) throw resourceErr;
      createdResourceId = resourceData.id;

      // 5. Insert attachment record into public.resource_files
      const { data: fileData, error: fileErr } = await supabase
        .from('resource_files')
        .insert([
          {
            resource_id: createdResourceId,
            storage_bucket: 'academic-resources',
            storage_path: storagePath,
            original_filename: file.name,
            mime_type: file.type,
            file_size_bytes: file.size,
            file_version: 1,
            is_primary: true
          }
        ])
        .select('id')
        .single();

      if (fileErr) throw fileErr;

      return {
        resourceId: createdResourceId,
        fileId: fileData.id,
        storagePath
      };

    } catch (dbErr) {
      console.error('Database registration failed. Rolling back storage file...', dbErr.message);
      // Clean up orphaned storage file
      await supabase.storage.from('academic-resources').remove([storagePath]);

      // Clean up resource if created before file insert failed
      if (createdResourceId) {
        await supabase.from('resources').delete().eq('id', createdResourceId);
      }

      throw new Error(`Database registration error: ${dbErr.message}`);
    }
  },

  /**
   * Fetch all resources for a paper for administrative management (Admin only)
   * Retrieves all publication statuses (DRAFT, PUBLISHED, ARCHIVED)
   * @param {string} paperId - UUID of the paper
   * @param {string|null} typeKey - Optional resource_type filter
   * @returns {Promise<Array>} List of resource records
   */
  /**
   * Validate PDF file: checks size (max 50MB), extension, MIME type
   * @param {File|Blob|Uint8Array|Buffer} fileOrBytes
   * @param {string} [filename]
   */
  validatePdf(fileOrBytes, filename = '') {
    if (!fileOrBytes) {
      throw new Error('No file provided for validation');
    }

    const size = fileOrBytes.size !== undefined ? fileOrBytes.size : fileOrBytes.length;
    const name = filename || fileOrBytes.name || '';

    if (size <= 0) {
      throw new Error('File is empty (0 bytes)');
    }
    if (size > 52428800) { // 50 * 1024 * 1024
      throw new Error(`File size (${(size / (1024 * 1024)).toFixed(2)} MB) exceeds the 50 MB maximum limit`);
    }

    if (name && !name.toLowerCase().endsWith('.pdf')) {
      throw new Error(`File "${name}" does not have a .pdf extension`);
    }

    if (fileOrBytes.type && fileOrBytes.type !== 'application/pdf' && fileOrBytes.type !== 'application/x-pdf') {
      throw new Error(`Invalid MIME type: ${fileOrBytes.type}. Only PDF files are permitted.`);
    }

    return true;
  },

  /**
   * Validate %PDF- magic byte signature
   * @param {Uint8Array|Buffer} bytes
   */
  validatePdfSignature(bytes) {
    if (!bytes || bytes.length < 5) {
      throw new Error('File is too small to be a valid PDF');
    }
    const isMagic = bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46 && bytes[4] === 0x2D;
    if (!isMagic) {
      throw new Error('Invalid file format: Missing "%PDF-" file header signature');
    }
    return true;
  },

  /**
   * PDF structural and object-stream optimization using pdf-lib
   * Packs cross-reference tables and uncompressed indirect objects into PDF 1.5 Object Streams.
   * Completely preserves text objects, mathematical equations, vector graphics, and searchability without rasterization.
   * Note: This performs structural/object-stream compression only; it does not downsample or recompress embedded raster images.
   * If savings < 5% (or optimization fails), safely retains the original file byte-for-byte.
   *
   * @param {Uint8Array|ArrayBuffer|Buffer} inputBytes
   * @param {Object} [options]
   * @param {number} [options.thresholdPercent=5.0]
   * @returns {Promise<{
   *   selectedBytes: Uint8Array,
   *   wasOptimized: boolean,
   *   originalSize: number,
   *   optimizedSize: number,
   *   savedBytes: number,
   *   savedPercent: number,
   *   error?: string
   * }>}
   */
  async optimizePdf(inputBytes, options = {}) {
    const threshold = options.thresholdPercent !== undefined ? options.thresholdPercent : 5.0;

    let rawBytes;
    if (inputBytes instanceof Uint8Array) {
      rawBytes = inputBytes;
    } else if (inputBytes instanceof ArrayBuffer) {
      rawBytes = new Uint8Array(inputBytes);
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(inputBytes)) {
      rawBytes = new Uint8Array(inputBytes.buffer, inputBytes.byteOffset, inputBytes.byteLength);
    } else {
      throw new Error('optimizePdf expects Uint8Array, ArrayBuffer, or Buffer');
    }

    AcademicService.validatePdfSignature(rawBytes);
    const originalSize = rawBytes.length;

    try {
      let PDFDocumentClass = null;
      if (typeof window !== 'undefined' && window.PDFLib && window.PDFLib.PDFDocument) {
        PDFDocumentClass = window.PDFLib.PDFDocument;
      } else {
        try {
          const mod = await import('pdf-lib');
          PDFDocumentClass = mod.PDFDocument || mod.default?.PDFDocument;
        } catch (e) {
          if (typeof window !== 'undefined' && window.PDFDocument) {
            PDFDocumentClass = window.PDFDocument;
          }
        }
      }

      if (!PDFDocumentClass) {
        console.warn('[AcademicService.optimizePdf] pdf-lib not available, retaining original file.');
        return {
          selectedBytes: rawBytes,
          wasOptimized: false,
          originalSize,
          optimizedSize: originalSize,
          savedBytes: 0,
          savedPercent: 0,
          error: 'pdf-lib not available in environment'
        };
      }

      const pdfDoc = await PDFDocumentClass.load(rawBytes, { ignoreEncryption: true });
      const pageCount = pdfDoc.getPageCount();
      if (pageCount === 0) {
        throw new Error('PDF document has zero pages');
      }

      const optimizedBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
      });

      AcademicService.validatePdfSignature(optimizedBytes);

      const optimizedSize = optimizedBytes.length;
      const savedBytes = originalSize - optimizedSize;
      const savedPercent = savedBytes > 0 ? parseFloat(((savedBytes / originalSize) * 100).toFixed(2)) : 0;

      if (savedBytes > 0 && savedPercent >= threshold) {
        return {
          selectedBytes: optimizedBytes,
          wasOptimized: true,
          originalSize,
          optimizedSize,
          savedBytes,
          savedPercent,
          pageCount
        };
      } else {
        return {
          selectedBytes: rawBytes,
          wasOptimized: false,
          originalSize,
          optimizedSize,
          savedBytes: 0,
          savedPercent: 0,
          pageCount
        };
      }
    } catch (optErr) {
      console.warn('[AcademicService.optimizePdf] Optimization fell back to original PDF:', optErr.message);
      return {
        selectedBytes: rawBytes,
        wasOptimized: false,
        originalSize,
        optimizedSize: originalSize,
        savedBytes: 0,
        savedPercent: 0,
        error: optErr.message
      };
    }
  },

  /**
   * Upload binary data to Supabase Storage.
   * - For files <= 6 MB: Uses standard Supabase Storage upload.
   * - For files > 6 MB: Uses Supabase Resumable Upload (TUS 1.0.0 protocol).
   *   If a TUS upload fails or is interrupted:
   *   1. The active TUS session is terminated via HTTP DELETE on uploadUrl.
   *   2. Any partial object at storagePath is cleaned up via storage.remove([storagePath]).
   *   3. Automatic standard-upload fallback is disabled for > 6 MB files to eliminate
   *      "Asset Already Exists" (409) collisions and corrupted partial objects.
   *   4. An explicit error is thrown so the administrator can retry cleanly.
   *
   * @param {string} storagePath - Destination path within academic-resources
   * @param {Uint8Array} fileBytes - Binary PDF data
   * @param {string} [mimeType='application/pdf']
   * @returns {Promise<{ data: Object|null, error: Error|null, uploadType: 'standard'|'resumable-tus' }>}
   */
  async uploadFileToStorage(storagePath, fileBytes, mimeType = 'application/pdf') {
    const isLargeFile = fileBytes.length > 6 * 1024 * 1024; // > 6 MB threshold

    if (isLargeFile) {
      let uploadUrl = null;
      let authToken = SUPABASE_ANON_KEY;

      try {
        const { data: sessionData } = await supabase.auth.getSession();
        authToken = sessionData?.session?.access_token || SUPABASE_ANON_KEY;

        const toBase64 = (str) => {
          if (typeof btoa !== 'undefined') return btoa(str);
          if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
          return '';
        };

        const metadata = [
          `bucketName ${toBase64('academic-resources')}`,
          `objectName ${toBase64(storagePath)}`,
          `contentType ${toBase64(mimeType)}`
        ].join(',');

        // 1. Initiate TUS upload session
        const initRes = await fetch(`${SUPABASE_URL}/storage/v1/upload/resumable`, {
          method: 'POST',
          headers: {
            'Upload-Length': fileBytes.length.toString(),
            'Upload-Metadata': metadata,
            'Tus-Resumable': '1.0.0',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${authToken}`
          }
        });

        if (initRes.status !== 201) {
          const errBody = await initRes.text().catch(() => '');
          throw new Error(`TUS session allocation rejected (HTTP ${initRes.status}): ${errBody || initRes.statusText}`);
        }

        uploadUrl = initRes.headers.get('Location');
        if (!uploadUrl) {
          throw new Error('TUS session initiated but server did not return Location header');
        }

        // 2. Stream/Upload file payload via PATCH
        const patchRes = await fetch(uploadUrl, {
          method: 'PATCH',
          headers: {
            'Tus-Resumable': '1.0.0',
            'Upload-Offset': '0',
            'Content-Type': 'application/offset+octet-stream',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${authToken}`
          },
          body: fileBytes
        });

        if (patchRes.status === 204 || patchRes.status === 200) {
          return {
            data: { path: storagePath, fullPath: `academic-resources/${storagePath}` },
            error: null,
            uploadType: 'resumable-tus'
          };
        } else {
          const patchErr = await patchRes.text().catch(() => '');
          throw new Error(`TUS data transmission failed (HTTP ${patchRes.status}): ${patchErr || patchRes.statusText}`);
        }

      } catch (tusErr) {
        console.error('[Storage] Resumable TUS upload failed:', tusErr.message);

        // Terminate TUS session on server to prevent orphaned lock/session
        if (uploadUrl) {
          try {
            await fetch(uploadUrl, {
              method: 'DELETE',
              headers: {
                'Tus-Resumable': '1.0.0',
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${authToken}`
              }
            }).catch(() => null);
          } catch (_) {}
        }

        // Clean up any partial storage object at storagePath
        try {
          await supabase.storage.from('academic-resources').remove([storagePath]).catch(() => null);
        } catch (_) {}

        // Explicitly reject: do NOT fall back to standard upload for files > 6 MB
        // to eliminate "Asset Already Exists" (409) collisions and corrupted partial objects.
        throw new Error(`Resumable upload failed: ${tusErr.message}. Storage cleanup completed. Please retry the upload.`);
      }
    }

    // Standard upload for <= 6 MB
    const { data, error } = await supabase.storage
      .from('academic-resources')
      .upload(storagePath, fileBytes, {
        contentType: mimeType,
        upsert: false
      });

    return {
      data,
      error,
      uploadType: 'standard'
    };
  },

  /**
   * Upload an academic PDF file and register attachment metadata in resource_files (Phase 5C-2)
   * Enforces:
   * - Pre-validation (max 50 MB, %PDF- signature)
   * - Structural stream optimization via pdf-lib
   * - Automatic next file_version calculation
   * - Single primary file enforcement
   * - Atomic compensating rollback on database failure
   *
   * @param {Object} params
   * @param {string} params.resourceId - UUID of existing public.resources record
   * @param {File|Blob|Uint8Array|Buffer} params.file - PDF file or buffer
   * @param {string} [params.filename] - Original filename (if file is buffer/blob)
   * @param {boolean|null} [params.isPrimary=null] - Whether this file is primary
   * @returns {Promise<Object>} Created resource_files record + optimization stats
   */
  async uploadResourceFile({
    resourceId,
    file,
    filename = null,
    isPrimary = null
  }) {
    if (!resourceId) throw new Error('resource_id is required');
    if (!file) throw new Error('File is required');

    // 1. Resolve parent resource from database
    const { data: resource, error: resErr } = await supabase
      .from('resources')
      .select('id, paper_id, resource_type, publication_status')
      .eq('id', resourceId)
      .maybeSingle();

    if (resErr) {
      throw new Error(`Database error resolving resource: ${resErr.message}`);
    }
    if (!resource) {
      throw new Error(`Resource "${resourceId}" not found. Cannot attach file to a non-existent resource.`);
    }

    const originalFilename = filename || file.name || 'document.pdf';

    // 2. Validate PDF format and size (max 50 MB)
    AcademicService.validatePdf(file, originalFilename);

    let rawBytes;
    if (file.arrayBuffer) {
      const buffer = await file.arrayBuffer();
      rawBytes = new Uint8Array(buffer);
    } else if (file instanceof Uint8Array) {
      rawBytes = file;
    } else if (file instanceof ArrayBuffer) {
      rawBytes = new Uint8Array(file);
    } else if (typeof Buffer !== 'undefined' && Buffer.isBuffer(file)) {
      rawBytes = new Uint8Array(file.buffer, file.byteOffset, file.byteLength);
    } else {
      throw new Error('Unsupported file object format');
    }

    AcademicService.validatePdfSignature(rawBytes);

    // 3. Structural stream optimization
    const optResult = await AcademicService.optimizePdf(rawBytes);
    const finalBytes = optResult.selectedBytes;
    const finalSize = finalBytes.length;

    // 4. Query existing files for version & primary calculation
    const { data: existingFiles, error: fetchErr } = await supabase
      .from('resource_files')
      .select('id, file_version, is_primary')
      .eq('resource_id', resourceId);

    if (fetchErr) {
      throw new Error(`Failed to query existing resource files: ${fetchErr.message}`);
    }

    const currentVersions = (existingFiles || []).map(f => f.file_version);
    const maxVersion = currentVersions.length > 0 ? Math.max(...currentVersions) : 0;
    const nextVersion = maxVersion + 1;

    let targetIsPrimary;
    if (isPrimary === null || isPrimary === undefined) {
      targetIsPrimary = (existingFiles || []).length === 0;
    } else {
      targetIsPrimary = Boolean(isPrimary);
    }

    // 5. Generate deterministic, collision-safe storage path
    const timestamp = Date.now();
    const sanitizedFilename = originalFilename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `papers/${resource.paper_id}/${resourceId}/v${nextVersion}_${timestamp}_${sanitizedFilename}`;

    // 6. Upload final PDF to private Supabase Storage bucket (with automatic TUS resumable upload for > 6 MB)
    const { data: storageData, error: storageErr, uploadType } = await AcademicService.uploadFileToStorage(
      storagePath,
      finalBytes,
      'application/pdf'
    );

    if (storageErr) {
      console.error('Storage upload failed:', storageErr.message);
      throw new Error(`Storage upload error: ${storageErr.message}`);
    }

    // 7. Insert metadata into public.resource_files with rollback guarantee
    try {
      if (targetIsPrimary && existingFiles && existingFiles.some(f => f.is_primary)) {
        await supabase
          .from('resource_files')
          .update({ is_primary: false })
          .eq('resource_id', resourceId);
      }

      const { data: fileData, error: fileErr } = await supabase
        .from('resource_files')
        .insert([
          {
            resource_id: resourceId,
            storage_bucket: 'academic-resources',
            storage_path: storagePath,
            original_filename: originalFilename,
            mime_type: 'application/pdf',
            file_size_bytes: finalSize,
            file_version: nextVersion,
            is_primary: targetIsPrimary
          }
        ])
        .select()
        .single();

      if (fileErr) throw fileErr;

      return {
        file: fileData,
        optimization: {
          wasOptimized: optResult.wasOptimized,
          originalSize: optResult.originalSize,
          optimizedSize: optResult.optimizedSize,
          savedBytes: optResult.savedBytes,
          savedPercent: optResult.savedPercent
        },
        uploadType: uploadType || 'standard'
      };

    } catch (dbErr) {
      console.error('Database registration failed. Rolling back Storage object...', dbErr.message);
      await supabase.storage.from('academic-resources').remove([storagePath]);
      throw new Error(`Database registration error (storage rolled back): ${dbErr.message}`);
    }
  },

  /**
   * Fetch all attached files for a resource (Admin management view)
   * Ordered by file_version DESC
   * @param {string} resourceId - UUID of the resource
   * @returns {Promise<Array>} List of resource_files records
   */
  async getResourceFilesForAdmin(resourceId) {
    if (!resourceId) return [];

    const { data, error } = await supabase
      .from('resource_files')
      .select(`
        id,
        resource_id,
        storage_bucket,
        storage_path,
        original_filename,
        mime_type,
        file_size_bytes,
        file_version,
        is_primary,
        created_at
      `)
      .eq('resource_id', resourceId)
      .order('file_version', { ascending: false });

    if (error) {
      console.error(`Error fetching files for resource ${resourceId}:`, error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Replace an existing resource file safely (Phase 5C-2)
   * Uploads new file as next version v(n+1), marks it primary, registers metadata,
   * and ONLY THEN removes the old file and storage object.
   * If the new upload fails, the old file remains completely untouched.
   *
   * @param {Object} params
   * @param {string} params.resourceId - UUID of the resource
   * @param {string} params.oldFileId - UUID of the old resource_files record
   * @param {File|Blob|Uint8Array|Buffer} params.file - New PDF file
   * @param {string} [params.filename] - Filename
   * @returns {Promise<Object>} Result of uploadResourceFile
   */
  async replaceResourceFile({ resourceId, oldFileId, file, filename = null }) {
    if (!resourceId) throw new Error('resourceId is required');
    if (!oldFileId) throw new Error('oldFileId is required');
    if (!file) throw new Error('New file is required for replacement');

    const { data: oldFile, error: fetchErr } = await supabase
      .from('resource_files')
      .select('id, storage_path')
      .eq('id', oldFileId)
      .eq('resource_id', resourceId)
      .maybeSingle();

    if (fetchErr || !oldFile) {
      throw new Error(`Existing file record "${oldFileId}" not found for resource "${resourceId}"`);
    }

    const uploadResult = await AcademicService.uploadResourceFile({
      resourceId,
      file,
      filename,
      isPrimary: true
    });

    try {
      await AcademicService.deleteResourceFile(oldFileId);
    } catch (delErr) {
      console.warn(`[replaceResourceFile] Old file ${oldFileId} removal notice:`, delErr.message);
    }

    return uploadResult;
  },

  /**
   * Delete a single physical file and its database record (Phase 5C-2)
   * The parent Resource metadata record remains intact.
   * Enforces safe deletion order: deletes Storage object first, then metadata.
   *
   * @param {string} fileId - UUID of the resource_files record
   * @returns {Promise<boolean>} True on success
   */
  async deleteResourceFile(fileId) {
    if (!fileId) throw new Error('fileId is required');

    const { data: fileRecord, error: fetchErr } = await supabase
      .from('resource_files')
      .select('id, resource_id, storage_path, is_primary')
      .eq('id', fileId)
      .maybeSingle();

    if (fetchErr) throw fetchErr;
    if (!fileRecord) {
      throw new Error(`File record "${fileId}" not found`);
    }

    // 1. Delete physical storage object from bucket
    const { error: storageErr } = await supabase.storage
      .from('academic-resources')
      .remove([fileRecord.storage_path]);

    if (storageErr) {
      console.error('Storage deletion failed:', storageErr.message);
      throw new Error(`Storage file deletion failed: ${storageErr.message}. Database record was NOT deleted.`);
    }

    // 2. Delete metadata row from resource_files
    const { error: dbErr } = await supabase
      .from('resource_files')
      .delete()
      .eq('id', fileId);

    if (dbErr) {
      console.error('Database metadata deletion failed:', dbErr.message);
      throw dbErr;
    }

    // 3. Promote latest remaining version to primary if needed
    if (fileRecord.is_primary) {
      const { data: remainingFiles } = await supabase
        .from('resource_files')
        .select('id, file_version')
        .eq('resource_id', fileRecord.resource_id)
        .order('file_version', { ascending: false })
        .limit(1);

      if (remainingFiles && remainingFiles.length > 0) {
        await supabase
          .from('resource_files')
          .update({ is_primary: true })
          .eq('id', remainingFiles[0].id);
      }
    }

    return true;
  },

  /**
   * Set a specific file version as primary for a resource
   * @param {string} resourceId - UUID of the resource
   * @param {string} fileId - UUID of the resource_file to set as primary
   */
  async setPrimaryResourceFile(resourceId, fileId) {
    if (!resourceId || !fileId) throw new Error('resourceId and fileId are required');

    await supabase
      .from('resource_files')
      .update({ is_primary: false })
      .eq('resource_id', resourceId);

    const { data, error } = await supabase
      .from('resource_files')
      .update({ is_primary: true })
      .eq('id', fileId)
      .eq('resource_id', resourceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Fetch all resources for a paper for administrative management (Admin only)
   * Retrieves all publication statuses (DRAFT, PUBLISHED, ARCHIVED) along with attached resource_files
   * @param {string} paperId - UUID of the paper
   * @param {string|null} typeKey - Optional resource_type filter
   * @returns {Promise<Array>} List of resource records with resource_files array
   */
  async getAdminResourcesByPaper(paperId, typeKey = null) {
    if (!paperId) return [];
    let query = supabase
      .from('resources')
      .select(`
        id,
        paper_id,
        resource_type,
        title,
        description,
        unit_number,
        unit_name,
        exam_year,
        display_order,
        publication_status,
        is_active,
        created_at,
        updated_at,
        resource_files (
          id,
          storage_bucket,
          storage_path,
          original_filename,
          mime_type,
          file_size_bytes,
          file_version,
          is_primary,
          created_at
        )
      `)
      .eq('paper_id', paperId);

    if (typeKey) {
      query = query.eq('resource_type', typeKey);
    }

    const { data, error } = await query
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error(`Error fetching admin resources for paper ${paperId}:`, error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new resource metadata record (Admin only - Metadata Management)
   * Inserts into public.resources without file attachment (Phase 5C-1)
   * Normalizes unit and exam_year according to resource type rules
   * Defaults to publication_status = 'DRAFT' and is_active = true
   *
   * @param {Object} params
   * @param {string} params.paperId - UUID of the paper
   * @param {string} params.resourceType - type_key (e.g. 'PYQ', 'NOTES')
   * @param {string} params.title - Resource title
   * @param {string} [params.description] - Optional description
   * @param {number} [params.unitNumber] - Unit number (1-10)
   * @param {string} [params.unitName] - Unit title
   * @param {number} [params.examYear] - Exam year (1990-2050)
   * @param {number} [params.displayOrder=0] - Display order
   * @param {string} [params.publicationStatus='DRAFT'] - 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
   * @returns {Promise<Object>} Created resource record
   */
  async createResourceMetadata({
    paperId,
    resourceType,
    title,
    description = null,
    unitNumber = null,
    unitName = null,
    examYear = null,
    displayOrder = 0,
    publicationStatus = 'DRAFT'
  }) {
    if (!paperId) throw new Error('Paper selection is required');
    if (!resourceType) throw new Error('Resource type selection is required');
    if (!title || !title.trim()) throw new Error('Resource title is required');

    const payload = {
      paper_id: paperId,
      resource_type: resourceType,
      title: title.trim(),
      description: description && description.trim() ? description.trim() : null,
      unit_number: unitNumber !== null && unitNumber !== '' && !isNaN(unitNumber) ? parseInt(unitNumber, 10) : null,
      unit_name: unitName && unitName.trim() ? unitName.trim() : null,
      exam_year: examYear !== null && examYear !== '' && !isNaN(examYear) ? parseInt(examYear, 10) : null,
      display_order: parseInt(displayOrder, 10) || 0,
      publication_status: ['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(publicationStatus) ? publicationStatus : 'DRAFT',
      is_active: true
    };

    const { data, error } = await supabase
      .from('resources')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error('Error creating resource metadata record:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing resource metadata record (Admin only - Metadata Management)
   * Updates public.resources record (preserves paper_id and resource_type identity)
   *
   * @param {string} resourceId - UUID of the resource
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated resource record
   */
  async updateResourceMetadata(resourceId, updates) {
    if (!resourceId) throw new Error('Resource ID is required');

    const payload = {};
    if (updates.title !== undefined) {
      if (!updates.title || !updates.title.trim()) throw new Error('Resource title cannot be empty');
      payload.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      payload.description = updates.description && updates.description.trim() ? updates.description.trim() : null;
    }
    if (updates.unitNumber !== undefined) {
      payload.unit_number = updates.unitNumber !== null && updates.unitNumber !== '' && !isNaN(updates.unitNumber)
        ? parseInt(updates.unitNumber, 10)
        : null;
    }
    if (updates.unitName !== undefined) {
      payload.unit_name = updates.unitName && updates.unitName.trim() ? updates.unitName.trim() : null;
    }
    if (updates.examYear !== undefined) {
      payload.exam_year = updates.examYear !== null && updates.examYear !== '' && !isNaN(updates.examYear)
        ? parseInt(updates.examYear, 10)
        : null;
    }
    if (updates.displayOrder !== undefined) {
      payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    }
    if (updates.publicationStatus !== undefined) {
      if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(updates.publicationStatus)) {
        throw new Error(`Invalid publication status: ${updates.publicationStatus}`);
      }
      payload.publication_status = updates.publicationStatus;
    }
    if (updates.isActive !== undefined) {
      payload.is_active = Boolean(updates.isActive);
    }
    payload.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('resources')
      .update(payload)
      .eq('id', resourceId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating resource metadata ${resourceId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete a resource and its associated storage files (Admin only)
   * @param {string} resourceId - UUID of the resource
   */
  async deleteResource(resourceId) {
    // 1. Fetch file storage paths for cleanup
    const { data: files } = await supabase
      .from('resource_files')
      .select('storage_path')
      .eq('resource_id', resourceId);

    // 2. Delete database record (CASCADE deletes resource_files)
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', resourceId);

    if (error) throw error;

    // 3. Remove physical files from storage
    if (files && files.length > 0) {
      const paths = files.map(f => f.storage_path);
      await supabase.storage.from('academic-resources').remove(paths);
    }

    return true;
  },

  /**
   * Toggle publication status of a resource (Admin only)
   * @param {string} resourceId - UUID of the resource
   * @param {'DRAFT'|'PUBLISHED'|'ARCHIVED'} newStatus
   */
  async setResourcePublicationStatus(resourceId, newStatus) {
    if (!['DRAFT', 'PUBLISHED', 'ARCHIVED'].includes(newStatus)) {
      throw new Error(`Invalid publication status: ${newStatus}`);
    }

    const { data, error } = await supabase
      .from('resources')
      .update({ publication_status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', resourceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ==========================================================================
  // 9. STUDENT GUIDANCE QUERIES (CONTACT FORM INTEGRATION)
  // ==========================================================================

  /**
   * Submit student guidance query directly into Supabase student_queries table
   * Preserved from existing implementation
   */
  async submitStudentQuery({ name, email, college, queryText }) {
    const { data, error } = await supabase
      .from('student_queries')
      .insert([
        {
          student_name: name,
          email: email,
          college_name: college || 'Fakir Mohan University affiliated college',
          query_text: queryText,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error('Error submitting query:', error.message);
      throw error;
    }
    return data;
  }
};

// Expose globally for browser script tags if window is present
if (typeof window !== 'undefined') {
  window.supabaseClient = supabase;
  window.AcademicService = AcademicService;
}
