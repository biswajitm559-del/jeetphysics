/**
 * Supabase Client Initialization & Academic Data API Services
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_URL)
  ? process.env.NEXT_PUBLIC_SUPABASE_URL
  : 'https://fjqrgbrfvydokwqbbstb.supabase.co';

const SUPABASE_ANON_KEY = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcXJnYnJmdnlkb2t3cWJic3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNzUxNTYsImV4cCI6MjEwMzc1MTE1Nn0.o1mPUmI59d-oZujo9S-EsKaWbrod3q9FRU76b313e5o';

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
      query = query.eq('semester_num', semesterId);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('Supabase fetch notice (using fallback dataset):', error.message);
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
      console.warn(`Supabase notice for ${paperCode}:`, error.message);
      return null;
    }
    return data;
  },

  /**
   * Submit student guidance query directly into Supabase student_queries table
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
      console.error('Error submitting query:', error);
      throw error;
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
