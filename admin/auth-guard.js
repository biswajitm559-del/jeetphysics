/**
 * Administrator Authentication & Session Guard
 * JeetPhysics.in — Fakir Mohan University B.Sc Physics Portal
 * Phase 4C Architecture: Supabase Auth & public.admin_users RLS Guard
 */

import { supabase, AcademicService } from '/lib/supabaseClient.js';

export const AdminAuthGuard = {
  /**
   * Evaluates current user's session and administrator authorization
   * Checks both authentication (valid session) and authorization (public.admin_users)
   *
   * @returns {Promise<{ isAuth: boolean, isAdmin: boolean, user: Object|null, error?: string }>}
   */
  async checkSession() {
    try {
      // 1. Check for active Supabase Auth session
      const { data: { session }, error: sessionErr } = await supabase.auth.getSession();

      if (sessionErr || !session || !session.user) {
        return { isAuth: false, isAdmin: false, user: null };
      }

      const user = session.user;

      // 2. Verify authorization against public.admin_users table
      // Enforced by PostgreSQL Row Level Security (RLS)
      const { data: adminRecord, error: adminErr } = await supabase
        .from('admin_users')
        .select('id, is_active')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      if (adminErr) {
        console.warn('[AdminAuthGuard] Database authorization query notice:', adminErr.message);
        return { isAuth: true, isAdmin: false, user, error: adminErr.message };
      }

      const isAdmin = adminRecord !== null && adminRecord.is_active === true;

      return {
        isAuth: true,
        isAdmin,
        user
      };
    } catch (err) {
      console.error('[AdminAuthGuard] Unexpected error during session check:', err);
      return { isAuth: false, isAdmin: false, user: null, error: err.message };
    }
  },

  /**
   * Initializes the session guard on protected administrator pages
   *
   * @param {Object} callbacks
   * @param {Function} callbacks.onAuthorized - Invoked with user object if active admin
   * @param {Function} callbacks.onAccessDenied - Invoked with user object if authenticated non-admin
   * @param {Function} [callbacks.onUnauthenticated] - Invoked if no session (defaults to redirect to login)
   */
  async requireAdmin({ onAuthorized, onAccessDenied, onUnauthenticated }) {
    const { isAuth, isAdmin, user } = await this.checkSession();

    // 1. Unauthenticated: Redirect to login
    if (!isAuth) {
      if (typeof onUnauthenticated === 'function') {
        onUnauthenticated();
      } else {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.replace(`/admin/login.html?redirect=${returnUrl}`);
      }
      return;
    }

    // 2. Authenticated but NOT an active administrator: Access Denied
    if (!isAdmin) {
      if (typeof onAccessDenied === 'function') {
        onAccessDenied(user);
      } else {
        console.warn('[AdminAuthGuard] Access Denied: User is not an active administrator.');
        window.location.replace('/admin/login.html?error=unauthorized');
      }
      return;
    }

    // 3. Authenticated and Active Administrator: Grant entry
    if (typeof onAuthorized === 'function') {
      onAuthorized(user);
    }

    // 4. Subscribe to auth state changes (handles remote logout, token expiry, token refresh)
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        console.info('[AdminAuthGuard] Session ended or signed out. Redirecting to login.');
        window.location.replace('/admin/login.html');
      } else if (event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        const recheck = await this.checkSession();
        if (!recheck.isAdmin) {
          console.warn('[AdminAuthGuard] Administrator privileges revoked. Redirecting to login.');
          window.location.replace('/admin/login.html?error=revoked');
        }
      }
    });
  },

  /**
   * Secure administrator sign out
   */
  async logout() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[AdminAuthGuard] Sign out error:', err.message);
    } finally {
      window.location.replace('/admin/login.html');
    }
  }
};

// Expose on window if running in browser
if (typeof window !== 'undefined') {
  window.AdminAuthGuard = AdminAuthGuard;
}
