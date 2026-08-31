/**
 * Supabase Client Initialization & Academic Data API Services
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 */

import { createClient } from '@supabase/supabase-js';

// Environment variable retrieval with safe defaults for build time
const SUPABASE_URL = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_URL
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://placeholder.supabase.co';

const SUPABASE_ANON_KEY = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'placeholder-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Academic Data Service Layer for Supabase Database
 */
export const AcademicService = {
  /**
   * Fetch all 15 core papers with semester mappings
   */
  async getPapers(semesterId = null) {
    let query = supabase
      .from('papers')
      .select(`
        *,
        semesters (sem_number, label),
        units (*),
        lab_components (*),
        resource_downloads (*)
      `)
      .order('paper_code', { ascending: true });

    if (semesterId) {
      query = query.eq('semester_id', semesterId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching papers from Supabase:', error);
      return [];
    }
    return data;
  },

  /**
   * Fetch specific paper details by paper code (e.g., "Paper I", "Paper XV")
   */
  async getPaperByCode(paperCode) {
    const { data, error } = await supabase
      .from('papers')
      .select(`
        *,
        units (*),
        lab_components (*),
        resource_downloads (*),
        pyqs (*)
      `)
      .eq('paper_code', paperCode)
      .single();

    if (error) {
      console.error(`Error fetching ${paperCode}:`, error);
      return null;
    }
    return data;
  },

  /**
   * Fetch PYQs filtered by exam type (FMU, IIT-JAM, CSIR-NET, GATE, CUET)
   */
  async getPYQs(examType = 'all', paperId = null) {
    let query = supabase.from('pyqs').select('*, papers (title, paper_code)');

    if (examType !== 'all') {
      query = query.eq('exam_type', examType);
    }

    if (paperId) {
      query = query.eq('paper_id', paperId);
    }

    const { data, error } = await query.order('exam_year', { ascending: false });

    if (error) {
      console.error('Error fetching PYQs:', error);
      return [];
    }
    return data;
  },

  /**
   * Upload resource file (Syllabus PDF / PYQ PDF / Lab Manual) to Supabase Storage Bucket
   */
  async uploadResourceFile(bucketName, filePath, fileBlob) {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBlob, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error(`Error uploading to ${bucketName}:`, error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  }
};
