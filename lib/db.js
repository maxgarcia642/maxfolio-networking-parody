import pg from 'pg';
const { Pool } = pg;

/**
 * DATABASE CONFIGURATION
 * This pool handles connections to your PostgreSQL instance (Supabase).
 */

const connectionString = process.env.DATABASE_URL || '';

// Log connection info (without password) for debugging
if (connectionString) {
  const safeUrl = connectionString.replace(/:([^@]+)@/, ':***@');
  console.log('Database URL configured:', safeUrl);
} else {
  console.error('DATABASE_URL environment variable is not set!');
}

// Create pool with SSL always enabled for Supabase
const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

/**
 * EXECUTOR - Query wrapper with detailed error logging
 */
export const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query OK', { duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error('DATABASE ERROR:', {
      message: error.message,
      code: error.code,
      detail: error.detail,
      hint: error.hint,
      query: text.substring(0, 100)
    });
    throw error;
  }
};
