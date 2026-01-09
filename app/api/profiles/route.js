// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to create a new profile.
 */
export async function POST(request) {
  console.log('POST /api/profiles called');
  
  try {
    const data = await request.json();
    const { username, password, job, bio, skills, portfolio_url, audio_url } = data;
    
    if (!username || !password) {
      return Response.json({ 
        error: 'Username and password are required'
      }, { status: 400 });
    }
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return Response.json({ 
        error: 'Database not configured',
        hint: 'Add DATABASE_URL to Vercel Environment Variables'
      }, { status: 500 });
    }
    
    await query(
      `INSERT INTO profiles (username, password, job, bio, skills, portfolio_url, audio_url, balance) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [username, password, job || '', bio || '', skills || '', portfolio_url || '', audio_url || null, 1000]
    );
    
    console.log('Profile created:', username);
    return Response.json({ success: true, username });
    
  } catch (error) {
    console.error('POST Error:', error.message, error.code);
    
    if (error.code === '23505') {
      return Response.json({ 
        error: 'Username already taken. Try a different one.'
      }, { status: 409 });
    }
    
    if (error.code === '42P01') {
      return Response.json({ 
        error: 'Database table missing. Run SUPABASE_SETUP.sql in Supabase SQL Editor.',
        hint: 'Go to Supabase > SQL Editor > Run the CREATE TABLE query'
      }, { status: 500 });
    }
    
    if (error.code === '42703') {
      return Response.json({ 
        error: 'Database column missing. Run ALTER TABLE commands.',
        detail: error.message
      }, { status: 500 });
    }
    
    if (error.code === '28P01' || error.code === '28000') {
      return Response.json({ 
        error: 'Database password incorrect. Check DATABASE_URL in Vercel.',
        hint: 'Make sure you replaced [YOUR-PASSWORD] with your actual Supabase database password'
      }, { status: 500 });
    }
    
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      return Response.json({ 
        error: 'Cannot reach database server. Check DATABASE_URL host.',
        hint: 'Verify the hostname in your DATABASE_URL is correct'
      }, { status: 500 });
    }
    
    return Response.json({ 
      error: 'Failed to create profile',
      detail: error.message,
      code: error.code
    }, { status: 500 });
  }
}

/**
 * GET handler to retrieve profiles.
 */
export async function GET() {
  console.log('GET /api/profiles called');
  
  try {
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set');
      return Response.json({ 
        error: 'Database not configured',
        hint: 'Add DATABASE_URL to Vercel Environment Variables'
      }, { status: 500 });
    }
    
    const res = await query(
      `SELECT username, password, job, bio, skills, portfolio_url, audio_url, balance 
       FROM profiles 
       ORDER BY created_at DESC 
       LIMIT 50`
    );
    
    console.log('Fetched profiles:', res.rows.length);
    return Response.json(res.rows);
    
  } catch (error) {
    console.error('GET Error:', error.message, error.code);
    
    // If table doesn't exist, return empty array
    if (error.code === '42P01') {
      console.log('Table does not exist, returning empty array');
      return Response.json([]);
    }
    
    // If columns missing, try simpler query
    if (error.code === '42703') {
      console.log('Trying simpler query without new columns');
      try {
        const res = await query(
          `SELECT username, password, job, bio, skills, portfolio_url 
           FROM profiles 
           ORDER BY created_at DESC 
           LIMIT 50`
        );
        return Response.json(res.rows.map(r => ({ ...r, balance: 1000, audio_url: null })));
      } catch (e) {
        return Response.json([]);
      }
    }
    
    // Return detailed error for debugging
    return Response.json({ 
      error: 'Failed to fetch profiles',
      detail: error.message,
      code: error.code,
      hint: getErrorHint(error.code)
    }, { status: 500 });
  }
}

/**
 * PATCH handler to update a profile
 */
export async function PATCH(request) {
  try {
    const data = await request.json();
    const { username, audio_url, balance } = data;
    
    if (!username) {
      return Response.json({ error: 'Username is required' }, { status: 400 });
    }
    
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
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }
    
    values.push(username);
    
    await query(
      `UPDATE profiles SET ${updates.join(', ')} WHERE username = $${paramIndex}`,
      values
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('PATCH Error:', error);
    return Response.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

function getErrorHint(code) {
  const hints = {
    '28P01': 'Wrong database password in DATABASE_URL',
    '28000': 'Authentication failed - check DATABASE_URL credentials',
    '42P01': 'Table does not exist - run SUPABASE_SETUP.sql',
    '42703': 'Column does not exist - run ALTER TABLE commands',
    '3D000': 'Database does not exist',
    'ENOTFOUND': 'Cannot find database host - check DATABASE_URL',
    'ECONNREFUSED': 'Connection refused - database might be down',
  };
  return hints[code] || 'Check DATABASE_URL and Supabase settings';
}
