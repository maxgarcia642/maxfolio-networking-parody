import pg from 'pg';
const { Pool } = pg;

/**
 * DATABASE CONFIGURATION
 * This pool handles connections to your PostgreSQL instance (Supabase).
 * It uses the DATABASE_URL environment variable which should be 
 * configured in your Vercel/Supabase settings.
 */

// Parse the connection string to check if it's Supabase
const connectionString = process.env.DATABASE_URL || '';
const isSupabase = connectionString.includes('supabase');

const pool = new Pool({
  connectionString: connectionString,
  // Always use SSL for Supabase connections (required)
  ssl: isSupabase || connectionString.includes('sslmode=require') ? {
    rejectUnauthorized: false
  } : undefined,
  // Connection pool settings optimized for serverless
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors gracefully
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

/**
 * EXECUTOR
 * Simple wrapper for pool.query to make database calls cleaner 
 * throughout the application.
 */
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};
