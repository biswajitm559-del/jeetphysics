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
  // 1. ACADEMIC STREAMS
  // ==========================================================================

  /**
   * Fetch all active academic streams
   * @returns {Promise<Array>} List of active streams sorted by display_order
   */
  async getStreams() {
    const { data, error } = await supabase
      .from('academic_streams')
      .select('id, slug, name, description, icon, display_order, is_active')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching academic streams:', error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch a single active stream by its slug
   * @param {string} streamSlug - e.g. 'science', 'arts', 'commerce'
   * @returns {Promise<Object|null>} Stream record or null
   */
  async getStreamBySlug(streamSlug) {
    if (!streamSlug) return null;
    const { data, error } = await supabase
      .from('academic_streams')
      .select('id, slug, name, description, icon, display_order, is_active')
      .eq('slug', streamSlug.trim().toLowerCase())
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error(`Error fetching stream "${streamSlug}":`, error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch all academic streams for administrative management (Admin only)
   * @returns {Promise<Array>} List of all streams (active and inactive)
   */
  async getAllStreamsForAdmin() {
    const { data, error } = await supabase
      .from('academic_streams')
      .select('id, slug, name, description, icon, display_order, is_active, created_at, updated_at')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching all streams for admin:', error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new academic stream (Admin only)
   */
  async createStream({ name, slug, description = null, icon = '🎓', displayOrder = 0, isActive = true }) {
    if (!name || !name.trim()) throw new Error('Stream name is required');
    if (!slug || !slug.trim()) throw new Error('Stream slug is required');

    const { data, error } = await supabase
      .from('academic_streams')
      .insert([{
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description && description.trim() ? description.trim() : null,
        icon: icon || '🎓',
        display_order: parseInt(displayOrder, 10) || 0,
        is_active: Boolean(isActive)
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating academic stream:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing academic stream (Admin only)
   */
  async updateStream(streamId, updates) {
    if (!streamId) throw new Error('Stream ID is required');

    const payload = { updated_at: new Date().toISOString() };
    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.trim()) throw new Error('Stream name cannot be empty');
      payload.name = updates.name.trim();
    }
    if (updates.slug !== undefined) {
      if (!updates.slug || !updates.slug.trim()) throw new Error('Stream slug cannot be empty');
      payload.slug = updates.slug.trim().toLowerCase();
    }
    if (updates.description !== undefined) {
      payload.description = updates.description && updates.description.trim() ? updates.description.trim() : null;
    }
    if (updates.icon !== undefined) payload.icon = updates.icon;
    if (updates.displayOrder !== undefined) payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    if (updates.isActive !== undefined) payload.is_active = Boolean(updates.isActive);

    const { data, error } = await supabase
      .from('academic_streams')
      .update(payload)
      .eq('id', streamId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating stream ${streamId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete an academic stream safely (Admin only)
   * Enforces dependency check: blocks deletion if subjects exist
   */
  async deleteStream(streamId) {
    if (!streamId) throw new Error('Stream ID is required');

    const { count, error: countErr } = await supabase
      .from('subjects')
      .select('id', { count: 'exact', head: true })
      .eq('stream_id', streamId);

    if (countErr) throw countErr;
    if (count > 0) {
      throw new Error(`Cannot delete stream: ${count} subject(s) depend on it. Please deactivate the stream (set is_active = false) instead.`);
    }

    const { error } = await supabase
      .from('academic_streams')
      .delete()
      .eq('id', streamId);

    if (error) {
      console.error(`Error deleting stream ${streamId}:`, error.message);
      throw error;
    }
    return true;
  },

  // ==========================================================================
  // 2. SUBJECTS
  // ==========================================================================

  /**
   * Fetch all active academic subjects, optionally filtered by academic stream slug
   * @param {string|null} streamSlug - Optional stream slug (e.g. 'science')
   * @returns {Promise<Array>} List of active subjects with parent stream info
   */
  async getSubjects(streamSlug = null) {
    let query = supabase
      .from('subjects')
      .select(`
        id,
        slug,
        name,
        description,
        display_order,
        stream_id,
        is_active,
        academic_streams!inner (
          id,
          slug,
          name,
          is_active
        )
      `)
      .eq('is_active', true)
      .eq('academic_streams.is_active', true)
      .order('display_order', { ascending: true });

    if (streamSlug) {
      query = query.eq('academic_streams.slug', streamSlug.trim().toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching subjects:', error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Fetch a single subject scoped strictly under its academic stream
   * Supports backward-compatible single-argument call: getSubjectBySlug(subjectSlug)
   * @param {string} streamSlugOrSubjectSlug - Stream slug (or subject slug for legacy 1-arg calls)
   * @param {string} [subjectSlug] - Subject slug (if 2 args passed)
   * @returns {Promise<Object|null>} Subject record with parent stream info or null
   */
  async getSubjectBySlug(streamSlugOrSubjectSlug, subjectSlug) {
    let sSlug = streamSlugOrSubjectSlug;
    let subSlug = subjectSlug;

    // Backward-compatible fallback: single argument passed
    if (!subjectSlug && streamSlugOrSubjectSlug) {
      subSlug = streamSlugOrSubjectSlug;
      sSlug = null;
    }
    if (!subSlug) return null;

    let query = supabase
      .from('subjects')
      .select(`
        id,
        slug,
        name,
        description,
        display_order,
        stream_id,
        is_active,
        academic_streams!inner (
          id,
          slug,
          name,
          is_active
        )
      `)
      .eq('slug', subSlug.trim().toLowerCase())
      .eq('is_active', true)
      .eq('academic_streams.is_active', true);

    if (sSlug) {
      query = query.eq('academic_streams.slug', sSlug.trim().toLowerCase());
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error(`Error fetching subject "${subSlug}" in stream "${sSlug || 'any'}":`, error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch all subjects for administrative management (Admin only)
   * @param {string|null} streamId - Optional stream UUID filter
   * @returns {Promise<Array>} List of subjects with parent stream
   */
  async getAllSubjectsForAdmin(streamId = null) {
    let query = supabase
      .from('subjects')
      .select(`
        id,
        stream_id,
        slug,
        name,
        description,
        display_order,
        is_active,
        created_at,
        updated_at,
        academic_streams!inner (
          id,
          slug,
          name
        )
      `)
      .order('display_order', { ascending: true });

    if (streamId) {
      query = query.eq('stream_id', streamId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching subjects for admin:', error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new subject scoped under a stream (Admin only)
   */
  async createSubject({ streamId, name, slug, description = null, displayOrder = 0, isActive = true }) {
    if (!streamId) throw new Error('Parent stream selection is required');
    if (!name || !name.trim()) throw new Error('Subject name is required');
    if (!slug || !slug.trim()) throw new Error('Subject slug is required');

    const { data, error } = await supabase
      .from('subjects')
      .insert([{
        stream_id: streamId,
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        description: description && description.trim() ? description.trim() : null,
        display_order: parseInt(displayOrder, 10) || 0,
        is_active: Boolean(isActive)
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating subject:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing subject (Admin only)
   */
  async updateSubject(subjectId, updates) {
    if (!subjectId) throw new Error('Subject ID is required');

    const payload = { updated_at: new Date().toISOString() };
    if (updates.streamId !== undefined) payload.stream_id = updates.streamId;
    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.trim()) throw new Error('Subject name cannot be empty');
      payload.name = updates.name.trim();
    }
    if (updates.slug !== undefined) {
      if (!updates.slug || !updates.slug.trim()) throw new Error('Subject slug cannot be empty');
      payload.slug = updates.slug.trim().toLowerCase();
    }
    if (updates.description !== undefined) {
      payload.description = updates.description && updates.description.trim() ? updates.description.trim() : null;
    }
    if (updates.displayOrder !== undefined) payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    if (updates.isActive !== undefined) payload.is_active = Boolean(updates.isActive);

    const { data, error } = await supabase
      .from('subjects')
      .update(payload)
      .eq('id', subjectId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating subject ${subjectId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete a subject safely (Admin only)
   * Enforces dependency check: blocks deletion if semesters exist
   */
  async deleteSubject(subjectId) {
    if (!subjectId) throw new Error('Subject ID is required');

    const { count, error: countErr } = await supabase
      .from('semesters')
      .select('id', { count: 'exact', head: true })
      .eq('subject_id', subjectId);

    if (countErr) throw countErr;
    if (count > 0) {
      throw new Error(`Cannot delete subject: ${count} semester(s) depend on it. Please deactivate the subject (set is_active = false) instead.`);
    }

    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', subjectId);

    if (error) {
      console.error(`Error deleting subject ${subjectId}:`, error.message);
      throw error;
    }
    return true;
  },

  // ==========================================================================
  // 3. SEMESTERS
  // ==========================================================================

  /**
   * Fetch all active semesters for a subject, with full parent lineage verification
   * Supports both (streamSlug, subjectSlug) and legacy (subjectSlug)
   * @param {string} streamSlugOrSubjectSlug - Stream slug (or subject slug for legacy 1-arg calls)
   * @param {string} [subjectSlug] - Subject slug
   * @returns {Promise<Array>} Semesters sorted by semester_number
   */
  async getSemesters(streamSlugOrSubjectSlug, subjectSlug) {
    let sSlug = streamSlugOrSubjectSlug;
    let subSlug = subjectSlug;

    if (!subjectSlug && streamSlugOrSubjectSlug) {
      subSlug = streamSlugOrSubjectSlug;
      sSlug = null;
    }
    if (!subSlug) subSlug = 'physics';

    let query = supabase
      .from('semesters')
      .select(`
        id,
        semester_number,
        slug,
        name,
        display_order,
        is_active,
        subjects!inner (
          id,
          slug,
          name,
          academic_streams!inner (
            id,
            slug,
            name
          )
        )
      `)
      .eq('subjects.slug', subSlug.trim().toLowerCase())
      .eq('is_active', true)
      .order('semester_number', { ascending: true });

    if (sSlug) {
      query = query.eq('subjects.academic_streams.slug', sSlug.trim().toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching semesters for "${sSlug ? sSlug + '/' : ''}${subSlug}":`, error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Resolve a semester strictly scoped under its parent subject and stream
   * Supports both (streamSlug, subjectSlug, semesterSlug) and legacy (subjectSlug, semesterSlug)
   * @param {string} streamSlugOrSubjectSlug
   * @param {string} subjectSlugOrSemesterSlug
   * @param {string} [semesterSlug]
   * @returns {Promise<Object|null>} Semester record with parent subject and stream or null
   */
  async getSemesterBySlug(streamSlugOrSubjectSlug, subjectSlugOrSemesterSlug, semesterSlug) {
    let sSlug = streamSlugOrSubjectSlug;
    let subSlug = subjectSlugOrSemesterSlug;
    let semSlug = semesterSlug;

    // Backward-compatible fallback: (subjectSlug, semesterSlug)
    if (!semesterSlug && streamSlugOrSubjectSlug && subjectSlugOrSemesterSlug) {
      subSlug = streamSlugOrSubjectSlug;
      semSlug = subjectSlugOrSemesterSlug;
      sSlug = null;
    }
    if (!subSlug || !semSlug) return null;

    let query = supabase
      .from('semesters')
      .select(`
        id,
        semester_number,
        slug,
        name,
        display_order,
        is_active,
        subjects!inner (
          id,
          slug,
          name,
          academic_streams!inner (
            id,
            slug,
            name
          )
        )
      `)
      .eq('subjects.slug', subSlug.trim().toLowerCase())
      .eq('slug', semSlug.trim().toLowerCase())
      .eq('is_active', true);

    if (sSlug) {
      query = query.eq('subjects.academic_streams.slug', sSlug.trim().toLowerCase());
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error(`Error resolving semester "${semSlug}" under "${sSlug ? sSlug + '/' : ''}${subSlug}":`, error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch all semesters for administrative management (Admin only)
   * @param {string|null} subjectId - Optional subject UUID filter
   */
  async getAllSemestersForAdmin(subjectId = null) {
    let query = supabase
      .from('semesters')
      .select(`
        id,
        subject_id,
        semester_number,
        slug,
        name,
        display_order,
        is_active,
        created_at,
        updated_at,
        subjects!inner (
          id,
          slug,
          name,
          academic_streams!inner (
            id,
            slug,
            name
          )
        )
      `)
      .order('semester_number', { ascending: true });

    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching semesters for admin:', error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new semester scoped under a subject (Admin only)
   */
  async createSemester({ subjectId, semesterNumber, name, slug, displayOrder = 0, isActive = true }) {
    if (!subjectId) throw new Error('Parent subject selection is required');
    if (!semesterNumber || isNaN(semesterNumber)) throw new Error('Valid semester number (1-12) is required');
    if (!name || !name.trim()) throw new Error('Semester name is required');
    if (!slug || !slug.trim()) throw new Error('Semester slug is required');

    const semNum = parseInt(semesterNumber, 10);
    const { data, error } = await supabase
      .from('semesters')
      .insert([{
        subject_id: subjectId,
        semester_number: semNum,
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        display_order: parseInt(displayOrder, 10) || semNum,
        is_active: Boolean(isActive)
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating semester:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing semester (Admin only)
   */
  async updateSemester(semesterId, updates) {
    if (!semesterId) throw new Error('Semester ID is required');

    const payload = { updated_at: new Date().toISOString() };
    if (updates.semesterNumber !== undefined) payload.semester_number = parseInt(updates.semesterNumber, 10);
    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.trim()) throw new Error('Semester name cannot be empty');
      payload.name = updates.name.trim();
    }
    if (updates.slug !== undefined) {
      if (!updates.slug || !updates.slug.trim()) throw new Error('Semester slug cannot be empty');
      payload.slug = updates.slug.trim().toLowerCase();
    }
    if (updates.displayOrder !== undefined) payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    if (updates.isActive !== undefined) payload.is_active = Boolean(updates.isActive);

    const { data, error } = await supabase
      .from('semesters')
      .update(payload)
      .eq('id', semesterId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating semester ${semesterId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete a semester safely (Admin only)
   * Enforces dependency check: blocks deletion if papers exist
   */
  async deleteSemester(semesterId) {
    if (!semesterId) throw new Error('Semester ID is required');

    const { count, error: countErr } = await supabase
      .from('papers')
      .select('id', { count: 'exact', head: true })
      .eq('semester_id', semesterId);

    if (countErr) throw countErr;
    if (count > 0) {
      throw new Error(`Cannot delete semester: ${count} paper(s) depend on it. Please deactivate the semester (set is_active = false) instead.`);
    }

    const { error } = await supabase
      .from('semesters')
      .delete()
      .eq('id', semesterId);

    if (error) {
      console.error(`Error deleting semester ${semesterId}:`, error.message);
      throw error;
    }
    return true;
  },

  // ==========================================================================
  // 4. PAPERS
  // ==========================================================================

  /**
   * Fetch all active papers for a given semester with complete parent lineage
   * Supports both (streamSlug, subjectSlug, semesterSlug) and legacy (subjectSlug, semesterSlug)
   * @param {string} streamSlugOrSubjectSlug
   * @param {string} subjectSlugOrSemesterSlug
   * @param {string} [semesterSlug]
   * @returns {Promise<Array>} List of papers ordered by display_order
   */
  async getPapersBySemester(streamSlugOrSubjectSlug, subjectSlugOrSemesterSlug, semesterSlug) {
    let sSlug = streamSlugOrSubjectSlug;
    let subSlug = subjectSlugOrSemesterSlug;
    let semSlug = semesterSlug;

    if (!semesterSlug && streamSlugOrSubjectSlug && subjectSlugOrSemesterSlug) {
      subSlug = streamSlugOrSubjectSlug;
      semSlug = subjectSlugOrSemesterSlug;
      sSlug = null;
    }
    if (!subSlug || !semSlug) return [];

    let query = supabase
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
            name,
            academic_streams!inner (
              id,
              slug,
              name
            )
          )
        )
      `)
      .eq('semesters.slug', semSlug.trim().toLowerCase())
      .eq('semesters.subjects.slug', subSlug.trim().toLowerCase())
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (sSlug) {
      query = query.eq('semesters.subjects.academic_streams.slug', sSlug.trim().toLowerCase());
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching papers for ${sSlug ? sSlug + '/' : ''}${subSlug}/${semSlug}:`, error.message);
      return [];
    }
    return data || [];
  },

  /**
   * Resolve a paper strictly through its full hierarchical lineage:
   * stream.slug -> subject.slug -> semester.slug -> paper.slug
   * Supports both (streamSlug, subjectSlug, semesterSlug, paperSlug) and legacy (subjectSlug, semesterSlug, paperSlug)
   * @param {string} streamSlugOrSubjectSlug
   * @param {string} subjectSlugOrSemesterSlug
   * @param {string} semesterSlugOrPaperSlug
   * @param {string} [paperSlug]
   * @returns {Promise<Object|null>} Paper record with verified lineage or null
   */
  async getPaperBySlug(streamSlugOrSubjectSlug, subjectSlugOrSemesterSlug, semesterSlugOrPaperSlug, paperSlug) {
    let sSlug = streamSlugOrSubjectSlug;
    let subSlug = subjectSlugOrSemesterSlug;
    let semSlug = semesterSlugOrPaperSlug;
    let pSlug = paperSlug;

    // Backward-compatible fallback: (subjectSlug, semesterSlug, paperSlug)
    if (!paperSlug && streamSlugOrSubjectSlug && subjectSlugOrSemesterSlug && semesterSlugOrPaperSlug) {
      subSlug = streamSlugOrSubjectSlug;
      semSlug = subjectSlugOrSemesterSlug;
      pSlug = semesterSlugOrPaperSlug;
      sSlug = null;
    }
    if (!subSlug || !semSlug || !pSlug) return null;

    let query = supabase
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
            name,
            academic_streams!inner (
              id,
              slug,
              name
            )
          )
        )
      `)
      .eq('slug', pSlug.trim().toLowerCase())
      .eq('semesters.slug', semSlug.trim().toLowerCase())
      .eq('semesters.subjects.slug', subSlug.trim().toLowerCase())
      .eq('is_active', true);

    if (sSlug) {
      query = query.eq('semesters.subjects.academic_streams.slug', sSlug.trim().toLowerCase());
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.error(`Error resolving paper ${sSlug ? sSlug + '/' : ''}${subSlug}/${semSlug}/${pSlug}:`, error.message);
      return null;
    }
    return data;
  },

  /**
   * Fetch all papers for administrative management (Admin only)
   * @param {string|null} semesterId - Optional semester UUID filter
   */
  async getAllPapersForAdmin(semesterId = null) {
    let query = supabase
      .from('papers')
      .select(`
        id,
        subject_id,
        semester_id,
        paper_code,
        slug,
        name,
        paper_type,
        description,
        credits,
        marks,
        display_order,
        is_active,
        created_at,
        updated_at,
        semesters!inner (
          id,
          slug,
          name,
          semester_number,
          subjects!inner (
            id,
            slug,
            name,
            academic_streams!inner (
              id,
              slug,
              name
            )
          )
        )
      `)
      .order('display_order', { ascending: true });

    if (semesterId) {
      query = query.eq('semester_id', semesterId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching papers for admin:', error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new paper scoped under a semester (Admin only)
   */
  async createPaper({ subjectId, semesterId, paperCode, name, slug, paperType = 'THEORY', description = null, credits = null, marks = null, displayOrder = 0, isActive = true }) {
    if (!subjectId) throw new Error('Parent subject ID is required');
    if (!semesterId) throw new Error('Parent semester ID is required');
    if (!paperCode || !paperCode.trim()) throw new Error('Paper code is required');
    if (!name || !name.trim()) throw new Error('Paper name is required');
    if (!slug || !slug.trim()) throw new Error('Paper slug is required');
    if (!['THEORY', 'LAB'].includes(paperType)) throw new Error('Paper type must be THEORY or LAB');

    const { data, error } = await supabase
      .from('papers')
      .insert([{
        subject_id: subjectId,
        semester_id: semesterId,
        paper_code: paperCode.trim(),
        name: name.trim(),
        slug: slug.trim().toLowerCase(),
        paper_type: paperType,
        description: description && description.trim() ? description.trim() : null,
        credits: credits !== null && credits !== '' && !isNaN(credits) ? parseInt(credits, 10) : null,
        marks: marks !== null && marks !== '' && !isNaN(marks) ? parseInt(marks, 10) : null,
        display_order: parseInt(displayOrder, 10) || 0,
        is_active: Boolean(isActive)
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating paper:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing paper (Admin only)
   */
  async updatePaper(paperId, updates) {
    if (!paperId) throw new Error('Paper ID is required');

    const payload = { updated_at: new Date().toISOString() };
    if (updates.paperCode !== undefined) {
      if (!updates.paperCode || !updates.paperCode.trim()) throw new Error('Paper code cannot be empty');
      payload.paper_code = updates.paperCode.trim();
    }
    if (updates.name !== undefined) {
      if (!updates.name || !updates.name.trim()) throw new Error('Paper name cannot be empty');
      payload.name = updates.name.trim();
    }
    if (updates.slug !== undefined) {
      if (!updates.slug || !updates.slug.trim()) throw new Error('Paper slug cannot be empty');
      payload.slug = updates.slug.trim().toLowerCase();
    }
    if (updates.paperType !== undefined) {
      if (!['THEORY', 'LAB'].includes(updates.paperType)) throw new Error('Paper type must be THEORY or LAB');
      payload.paper_type = updates.paperType;
    }
    if (updates.description !== undefined) {
      payload.description = updates.description && updates.description.trim() ? updates.description.trim() : null;
    }
    if (updates.credits !== undefined) {
      payload.credits = updates.credits !== null && updates.credits !== '' && !isNaN(updates.credits) ? parseInt(updates.credits, 10) : null;
    }
    if (updates.marks !== undefined) {
      payload.marks = updates.marks !== null && updates.marks !== '' && !isNaN(updates.marks) ? parseInt(updates.marks, 10) : null;
    }
    if (updates.displayOrder !== undefined) payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    if (updates.isActive !== undefined) payload.is_active = Boolean(updates.isActive);

    const { data, error } = await supabase
      .from('papers')
      .update(payload)
      .eq('id', paperId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating paper ${paperId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete a paper safely (Admin only)
   * Enforces dependency check: blocks deletion if resources exist
   */
  async deletePaper(paperId) {
    if (!paperId) throw new Error('Paper ID is required');

    const { count, error: countErr } = await supabase
      .from('resources')
      .select('id', { count: 'exact', head: true })
      .eq('paper_id', paperId);

    if (countErr) throw countErr;
    if (count > 0) {
      throw new Error(`Cannot delete paper: ${count} resource(s) depend on it. Please deactivate the paper (set is_active = false) instead.`);
    }

    const { error } = await supabase
      .from('papers')
      .delete()
      .eq('id', paperId);

    if (error) {
      console.error(`Error deleting paper ${paperId}:`, error.message);
      throw error;
    }
    return true;
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

  /**
   * Fetch all resource types for administrative management (Admin only)
   * @returns {Promise<Array>} List of all resource types (active and inactive)
   */
  async getAllResourceTypesForAdmin() {
    const { data, error } = await supabase
      .from('resource_types')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching resource types for admin:', error.message);
      throw error;
    }
    return data || [];
  },

  /**
   * Create a new resource type configuration (Admin only)
   */
  async createResourceType({
    typeKey,
    slug,
    displayName,
    description = null,
    icon = '📄',
    category = 'GENERAL',
    applicablePaperType = 'BOTH',
    requiresUnit = false,
    requiresExamYear = false,
    displayOrder = 0,
    showOnPaper = true,
    showInNavbar = false,
    isActive = true
  }) {
    if (!typeKey || !typeKey.trim()) throw new Error('Resource type key is required');
    if (!slug || !slug.trim()) throw new Error('Resource type slug is required');
    if (!displayName || !displayName.trim()) throw new Error('Display name is required');

    const { data, error } = await supabase
      .from('resource_types')
      .insert([{
        type_key: typeKey.trim().toUpperCase(),
        slug: slug.trim().toLowerCase(),
        display_name: displayName.trim(),
        description: description && description.trim() ? description.trim() : null,
        icon: icon || '📄',
        category: category || 'GENERAL',
        applicable_paper_type: applicablePaperType || 'BOTH',
        requires_unit: Boolean(requiresUnit),
        requires_exam_year: Boolean(requiresExamYear),
        display_order: parseInt(displayOrder, 10) || 0,
        show_on_paper: Boolean(showOnPaper),
        show_in_navbar: Boolean(showInNavbar),
        is_active: Boolean(isActive)
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating resource type:', error.message);
      throw error;
    }
    return data;
  },

  /**
   * Update an existing resource type configuration (Admin only)
   * Database integrity triggers protect against modifying structural rules when resources exist
   */
  async updateResourceType(typeId, updates) {
    if (!typeId) throw new Error('Resource Type ID is required');

    const payload = { updated_at: new Date().toISOString() };
    if (updates.displayName !== undefined) payload.display_name = updates.displayName.trim();
    if (updates.description !== undefined) payload.description = updates.description && updates.description.trim() ? updates.description.trim() : null;
    if (updates.icon !== undefined) payload.icon = updates.icon;
    if (updates.category !== undefined) payload.category = updates.category;
    if (updates.applicablePaperType !== undefined) payload.applicable_paper_type = updates.applicablePaperType;
    if (updates.requiresUnit !== undefined) payload.requires_unit = Boolean(updates.requiresUnit);
    if (updates.requiresExamYear !== undefined) payload.requires_exam_year = Boolean(updates.requiresExamYear);
    if (updates.displayOrder !== undefined) payload.display_order = parseInt(updates.displayOrder, 10) || 0;
    if (updates.showOnPaper !== undefined) payload.show_on_paper = Boolean(updates.showOnPaper);
    if (updates.showInNavbar !== undefined) payload.show_in_navbar = Boolean(updates.showInNavbar);
    if (updates.isActive !== undefined) payload.is_active = Boolean(updates.isActive);
    if (updates.slug !== undefined) payload.slug = updates.slug.trim().toLowerCase();

    const { data, error } = await supabase
      .from('resource_types')
      .update(payload)
      .eq('id', typeId)
      .select()
      .single();

    if (error) {
      console.error(`Error updating resource type ${typeId}:`, error.message);
      throw error;
    }
    return data;
  },

  /**
   * Delete a resource type safely (Admin only)
   * Blocks deletion if resources depend on it
   */
  async deleteResourceType(typeId) {
    if (!typeId) throw new Error('Resource Type ID is required');

    const { data: rt, error: fetchErr } = await supabase
      .from('resource_types')
      .select('type_key')
      .eq('id', typeId)
      .maybeSingle();

    if (fetchErr) throw fetchErr;
    if (rt) {
      const { count, error: countErr } = await supabase
        .from('resources')
        .select('id', { count: 'exact', head: true })
        .eq('resource_type', rt.type_key);

      if (countErr) throw countErr;
      if (count > 0) {
        throw new Error(`Cannot delete resource type "${rt.type_key}": ${count} resource(s) depend on it. Please deactivate the resource type (set is_active = false) instead.`);
      }
    }

    const { error } = await supabase
      .from('resource_types')
      .delete()
      .eq('id', typeId);

    if (error) {
      console.error(`Error deleting resource type ${typeId}:`, error.message);
      throw error;
    }
    return true;
  },

  /**
   * Authoritative Resource Visibility Rule:
   * Query active published resource types for a paper.
   * Returns an Array of type_key strings (e.g. ['SYLLABUS', 'PYQ']) that have
   * at least one active, published resource record for this paper.
   * Used by paper page to calculate which resource buttons/cards to display.
   * @param {string} paperId - UUID of the paper
   * @returns {Promise<string[]>} Array of type_key strings
   */
  async getPublishedResourceTypesForPaper(paperId) {
    if (!paperId) return [];
    const { data, error } = await supabase
      .from('resources')
      .select('resource_type')
      .eq('paper_id', paperId)
      .eq('is_active', true)
      .eq('publication_status', 'PUBLISHED');

    if (error) {
      console.error(`Error fetching published resource types for paper ${paperId}:`, error.message);
      return [];
    }
    return Array.from(new Set((data || []).map(r => r.resource_type)));
  },

  /**
   * Consolidated Resource Visibility Service:
   * Returns the FINAL list of visible resource types for a paper.
   * Encapsulates all 5 authoritative visibility rules:
   * 1. resource_types.is_active = true
   * 2. resource_types.show_on_paper = true
   * 3. resource_types.applicable_paper_type matches 'BOTH' or paper.paper_type
   * 4. Excludes 'SYLLABUS' (dedicated official syllabus viewer on paper page)
   * 5. Paper has at least 1 published, active resource in that category (count > 0)
   *
   * Each returned resource type object is enriched with:
   * - published_count: number of active published resources for this paper
   *
   * @param {string} paperId - UUID of the paper
   * @param {string|null} [paperType=null] - Optional paper_type ('THEORY', 'LAB', 'BOTH')
   * @returns {Promise<Array>} Array of visible resource type objects with published_count
   */
  async getVisibleResourceTypesForPaper(paperId, paperType = null) {
    if (!paperId) return [];

    let pType = paperType;
    if (!pType) {
      const { data: paperData, error: paperError } = await supabase
        .from('papers')
        .select('paper_type')
        .eq('id', paperId)
        .maybeSingle();
      if (!paperError && paperData) {
        pType = paperData.paper_type;
      }
    }

    const [typesRes, resourcesRes] = await Promise.all([
      supabase
        .from('resource_types')
        .select('*')
        .eq('is_active', true)
        .eq('show_on_paper', true)
        .order('display_order', { ascending: true }),
      supabase
        .from('resources')
        .select('id, resource_type')
        .eq('paper_id', paperId)
        .eq('is_active', true)
        .eq('publication_status', 'PUBLISHED')
    ]);

    if (typesRes.error) {
      console.error(`Error fetching resource types for visibility check:`, typesRes.error.message);
      return [];
    }

    const resourceTypes = typesRes.data || [];
    const publishedResources = resourcesRes.data || [];

    const countsByType = {};
    publishedResources.forEach(r => {
      countsByType[r.resource_type] = (countsByType[r.resource_type] || 0) + 1;
    });

    return resourceTypes
      .filter(rt => {
        if (rt.type_key === 'SYLLABUS') return false;
        if (pType && rt.applicable_paper_type !== 'BOTH' && rt.applicable_paper_type !== pType) {
          return false;
        }
        const count = countsByType[rt.type_key] || 0;
        return count > 0;
      })
      .map(rt => ({
        ...rt,
        published_count: countsByType[rt.type_key] || 0
      }));
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
        is_active,
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
