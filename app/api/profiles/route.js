// Vercel compatible Edge/Serverless Route
// This ensures the route is always dynamic and not cached
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to create a new profile.
 * Expects: username, password, job, bio, skills, portfolio_url, audio_url (optional)
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { username, password, job, bio, skills, portfolio_url, audio_url } = data;
    
    // Validate required fields
    if (!username || !password) {
      return new Response(JSON.stringify({ 
        error: 'Username and password are required',
        details: 'Please fill in both username and password fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL environment variable is not set');
      return new Response(JSON.stringify({ 
        error: 'Database not configured. Contact the system administrator.',
        details: 'DATABASE_URL is missing'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Insert profile data into PostgreSQL with default balance
    await query(
      `INSERT INTO profiles (username, password, job, bio, skills, portfolio_url, audio_url, balance) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [username, password, job || '', bio || '', skills || '', portfolio_url || '', audio_url || null, 1000]
    );
    
    return new Response(JSON.stringify({ success: true, username }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database error:', error.message, error.code);
    
    // Check for unique constraint violation (duplicate username)
    if (error.code === '23505') {
      return new Response(JSON.stringify({ 
        error: 'Username already exists in the mainframe. Try a different identity.',
        details: 'Duplicate username'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Check for table not existing
    if (error.code === '42P01') {
      return new Response(JSON.stringify({ 
        error: 'Database tables not set up. Run SUPABASE_SETUP.sql in your Supabase SQL Editor.',
        details: 'Table does not exist'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Check for column not existing
    if (error.code === '42703') {
      return new Response(JSON.stringify({ 
        error: 'Database schema outdated. Run the ALTER TABLE commands from SUPABASE_SETUP.sql.',
        details: `Column error: ${error.message}`
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Connection errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return new Response(JSON.stringify({ 
        error: 'Cannot connect to database. Check DATABASE_URL in Vercel settings.',
        details: 'Connection refused or host not found'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Authentication error
    if (error.code === '28P01' || error.code === '28000') {
      return new Response(JSON.stringify({ 
        error: 'Database authentication failed. Check your password in DATABASE_URL.',
        details: 'Invalid password or authentication failed'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ 
      error: 'Failed to publish profile. The void rejected your submission.',
      details: error.message || 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * GET handler to retrieve the latest 50 profiles.
 */
export async function GET() {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      return new Response(JSON.stringify({ 
        error: 'Database not configured',
        details: 'DATABASE_URL is missing'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Fetch profiles ordered by creation date, including new fields
    const res = await query(
      `SELECT username, password, job, bio, skills, portfolio_url, audio_url, balance 
       FROM profiles 
       ORDER BY created_at DESC 
       LIMIT 50`
    );
    return new Response(JSON.stringify(res.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch error:', error.message, error.code);
    
    // Table doesn't exist
    if (error.code === '42P01') {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Column doesn't exist - return empty but don't fail
    if (error.code === '42703') {
      try {
        // Try simpler query without new columns
        const res = await query(
          `SELECT username, password, job, bio, skills, portfolio_url 
           FROM profiles 
           ORDER BY created_at DESC 
           LIMIT 50`
        );
        return new Response(JSON.stringify(res.rows.map(r => ({ ...r, balance: 1000, audio_url: null }))), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify([]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    return new Response(JSON.stringify({ error: 'Failed to fetch profiles from the void' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

/**
 * PATCH handler to update a profile's audio_url or balance
 */
export async function PATCH(request) {
  try {
    const data = await request.json();
    const { username, audio_url, balance } = data;
    
    if (!username) {
      return new Response(JSON.stringify({ error: 'Username is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramIndex = 1;
    
    if (audio_url !== undefined) {
      updates.push(`audio_url = $${paramIndex}`);
      values.push(audio_url);
      paramIndex++;
    }
    
    if (balance !== undefined) {
      updates.push(`balance = $${paramIndex}`);
      values.push(balance);
      paramIndex++;
    }
    
    if (updates.length === 0) {
      return new Response(JSON.stringify({ error: 'No fields to update' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    values.push(username);
    
    await query(
      `UPDATE profiles SET ${updates.join(', ')} WHERE username = $${paramIndex}`,
      values
    );
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Update error:', error);
    return new Response(JSON.stringify({ error: 'Failed to update profile' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
