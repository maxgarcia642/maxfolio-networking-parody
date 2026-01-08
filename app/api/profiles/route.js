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
      return new Response(JSON.stringify({ error: 'Username and password are required' }), {
        status: 400,
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
    console.error('Database error:', error);
    
    // Check for unique constraint violation (duplicate username)
    if (error.code === '23505') {
      return new Response(JSON.stringify({ error: 'Username already exists in the mainframe. Try a different identity.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ error: 'Failed to publish profile. The void rejected your submission.' }), {
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
    console.error('Fetch error:', error);
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
