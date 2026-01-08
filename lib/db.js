import pg from 'pg';
const { Pool } = pg;

/**
 * DATABASE CONFIGURATION
 * This pool handles connections to your PostgreSQL instance (Supabase).
 * It uses the DATABASE_URL environment variable which should be 
 * configured in your Vercel/Supabase settings.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
});

/**
 * EXECUTOR
 * Simple wrapper for pool.query to make database calls cleaner 
 * throughout the application.
 */
export const query = (text, params) => pool.query(text, params);
