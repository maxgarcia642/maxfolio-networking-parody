/**
 * Supabase Client Configuration
 * 
 * This file provides the Supabase client for direct API access if needed.
 * Currently, the app uses direct PostgreSQL connections via lib/db.js,
 * but this client can be used for Supabase-specific features like
 * realtime subscriptions, auth, or storage in the future.
 */

// Note: For this app, we use direct PostgreSQL connections via the pg library
// in lib/db.js. The Supabase client below is available for future enhancements.

// If you want to use the Supabase JS client directly:
// 1. Install: npm install @supabase/supabase-js
// 2. Uncomment the code below:

/*
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
*/

// For now, export a placeholder
export const supabaseConfig = {
  info: 'Using direct PostgreSQL connection via DATABASE_URL'
};
