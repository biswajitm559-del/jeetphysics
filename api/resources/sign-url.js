/**
 * GET /api/resources/sign-url?file_id=<file_id>&redirect=<true|false>
 * Secure Serverless API Endpoint for Academic PDF Resource Delivery
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 *
 * Runs in Vercel Serverless Node.js environment.
 * The Supabase Service Role key is strictly server-only.
 */

import { createClient } from '@supabase/supabase-js';

// Server-side environment variables (Never exposed to client)
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fjqrgbrfvydokwqbbstb.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// UUID validation regex (Standard 8-4-4-4-12 hex format)
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Expiration time for signed URLs (in seconds)
const SIGNED_URL_EXPIRATION_SECONDS = 300;

/**
 * Main API Handler
 */
export default async function handler(req, res) {
  // 1. Set security and cache headers
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Content-Type', 'application/json');

  // 2. Validate HTTP method (Only GET supported)
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Only GET is supported.'
    });
  }

  // 3. Validate input parameters (file_id required, strictly UUID)
  const { file_id, redirect } = req.query || {};

  if (!file_id || typeof file_id !== 'string' || !UUID_REGEX.test(file_id.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Invalid or missing file_id parameter. Must be a valid UUID.'
    });
  }

  const cleanFileId = file_id.trim();

  // 4. Verify server configuration
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error('[sign-url] Critical server error: SUPABASE_SERVICE_ROLE_KEY is not configured in environment.');
    return res.status(500).json({
      success: false,
      error: 'Internal server configuration error.'
    });
  }

  try {
    // 5. Initialize dedicated server-side admin client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

    // 6. Resolve file record and parent resource from database
    // The storage_path MUST come from this verified database row, NEVER from client input
    const { data: fileRecord, error: dbError } = await supabaseAdmin
      .from('resource_files')
      .select(`
        id,
        resource_id,
        storage_bucket,
        storage_path,
        original_filename,
        mime_type,
        file_size_bytes,
        resources (
          id,
          publication_status,
          is_active,
          paper_id,
          resource_type
        )
      `)
      .eq('id', cleanFileId)
      .maybeSingle();

    if (dbError) {
      console.error('[sign-url] Database resolution error:', dbError.message);
      return res.status(500).json({
        success: false,
        error: 'Database resolution failed.'
      });
    }

    if (!fileRecord || !fileRecord.resources) {
      return res.status(404).json({
        success: false,
        error: 'Resource file not found.'
      });
    }

    // 7. Verify storage bucket (Must strictly be academic-resources)
    if (fileRecord.storage_bucket !== 'academic-resources') {
      console.warn(`[sign-url] Access denied for unauthorized bucket: "${fileRecord.storage_bucket}"`);
      return res.status(403).json({
        success: false,
        error: 'Access denied: unauthorized storage bucket.'
      });
    }

    const resource = fileRecord.resources;

    // 8. Authorization evaluation
    const isPubliclyAvailable = resource.is_active === true && resource.publication_status === 'PUBLISHED';

    if (!isPubliclyAvailable) {
      // Resource is DRAFT, ARCHIVED, or inactive.
      // Access requires an authenticated active administrator.
      const authHeader = req.headers['authorization'] || req.headers['Authorization'];

      if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          success: false,
          error: 'Authentication required to access unpublished resource.'
        });
      }

      const token = authHeader.substring(7).trim();
      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'Authentication token missing from Bearer header.'
        });
      }

      // Verify token with Supabase Auth
      const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
      if (authError || !user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired authentication session.'
        });
      }

      // Verify admin membership in public.admin_users table
      const { data: adminRecord, error: adminErr } = await supabaseAdmin
        .from('admin_users')
        .select('id, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (adminErr || !adminRecord) {
        return res.status(403).json({
          success: false,
          error: 'Administrator privileges required to access unpublished resource.'
        });
      }
    }

    // 9. Generate short-lived signed URL (300 seconds)
    const { data: signedData, error: signError } = await supabaseAdmin.storage
      .from('academic-resources')
      .createSignedUrl(fileRecord.storage_path, SIGNED_URL_EXPIRATION_SECONDS);

    if (signError || !signedData?.signedUrl) {
      console.error('[sign-url] Storage signed URL generation failed:', signError?.message);
      return res.status(500).json({
        success: false,
        error: 'Failed to generate signed download URL.'
      });
    }

    // 10. Redirect mode (if ?redirect=true requested)
    if (redirect === 'true') {
      res.writeHead(307, {
        Location: signedData.signedUrl,
        'Cache-Control': 'no-store'
      });
      return res.end();
    }

    // 11. Standard JSON response
    return res.status(200).json({
      success: true,
      signedUrl: signedData.signedUrl,
      original_filename: fileRecord.original_filename,
      mime_type: fileRecord.mime_type,
      file_size_bytes: fileRecord.file_size_bytes,
      expiresIn: SIGNED_URL_EXPIRATION_SECONDS
    });

  } catch (err) {
    console.error('[sign-url] Unhandled internal exception:', err.message);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred.'
    });
  }
}
