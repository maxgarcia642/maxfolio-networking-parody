import pg from 'pg';
const { Pool } = pg;

/**
 * DATABASE CONFIGURATION
 * This pool handles connections to your PostgreSQL instance (Supabase).
 * It uses the DATABASE_URL environment variable which should be 
 * configured in your Vercel/Supabase settings.
 */

const connectionString = process.env.DATABASE_URL || '';

if (!connectionString) {
  console.error('DATABASE_URL environment variable is not set!');
}

// Create pool with SSL always enabled for Supabase
const pool = new Pool({
  connectionString: connectionString,
  // Supabase REQUIRES SSL - always enable it
  ssl: {
    rejectUnauthorized: false
  },
  // Connection pool settings optimized for serverless
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors gracefully
pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

/**
 * EXECUTOR
 * Simple wrapper for pool.query to make database calls cleaner 
 * throughout the application. Includes better error logging.
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query executed', { text: text.substring(0, 50), duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('Database query error:', {
      message: error.message,
      code: error.code,
      query: text.substring(0, 100)
    });
    throw error;
  }
};
