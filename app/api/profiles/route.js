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
      return Response.json({ error: 'Username and password are required' }, { status: 400 });
    }
    
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    await query(
      `INSERT INTO profiles (username, password, job, bio, skills, portfolio_url, audio_url, balance, net_worth, interactivity_points) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [username, password, job || '', bio || '', skills || '', portfolio_url || '', audio_url || null, 1000, 1000, 0]
    );
    
    console.log('Profile created:', username);
    return Response.json({ success: true, username });
    
  } catch (error) {
    console.error('POST Error:', error.message, error.code);
    
    if (error.code === '23505') {
      return Response.json({ error: 'Username already taken. Try a different one.' }, { status: 409 });
    }
    if (error.code === '42P01') {
      return Response.json({ error: 'Database table missing. Run SUPABASE_SETUP.sql' }, { status: 500 });
    }
    if (error.code === '42703') {
      // Column missing, try simpler insert
      try {
        await query(
          `INSERT INTO profiles (username, password, job, bio, skills, portfolio_url) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [data.username, data.password, data.job || '', data.bio || '', data.skills || '', data.portfolio_url || '']
        );
        return Response.json({ success: true, username: data.username });
      } catch (e) {
        return Response.json({ error: 'Failed to create profile', detail: e.message }, { status: 500 });
      }
    }
    
    return Response.json({ error: 'Failed to create profile', detail: error.message }, { status: 500 });
  }
}

/**
 * GET handler to retrieve profiles with all their stats.
 */
export async function GET() {
  console.log('GET /api/profiles called');
  
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    // Get all profiles
    const profilesRes = await query(
      `SELECT username, password, job, bio, skills, portfolio_url, audio_url, balance, net_worth, interactivity_points, created_at 
       FROM profiles 
       ORDER BY created_at DESC 
       LIMIT 50`
    );
    
    const profiles = profilesRes.rows;
    
    // Get jobs for all users
    let jobsMap = {};
    try {
      const jobsRes = await query(
        `SELECT username, job_title, company, pay, accepted_at FROM accepted_jobs ORDER BY accepted_at DESC`
      );
      jobsRes.rows.forEach(job => {
        if (!jobsMap[job.username]) jobsMap[job.username] = [];
        jobsMap[job.username].push(job);
      });
    } catch (e) {
      console.log('Jobs table might not exist yet');
    }
    
    // Get relationships for all users
    let relationshipsMap = {};
    try {
      const relRes = await query(
        `SELECT username, partner_name, partner_species, relationship_type, started_at FROM relationships ORDER BY started_at DESC`
      );
      relRes.rows.forEach(rel => {
        if (!relationshipsMap[rel.username]) relationshipsMap[rel.username] = [];
        relationshipsMap[rel.username].push(rel);
      });
    } catch (e) {
      console.log('Relationships table might not exist yet');
    }
    
    // Get songs for all users (including notes_data for counting)
    let songsMap = {};
    try {
      const songsRes = await query(
        `SELECT username, song_name, notes_data, duration_ms, created_at FROM songs ORDER BY created_at DESC`
      );
      songsRes.rows.forEach(song => {
        if (!songsMap[song.username]) songsMap[song.username] = [];
        songsMap[song.username].push(song);
      });
    } catch (e) {
      console.log('Songs table might not exist yet');
    }
    
    // Combine all data
    const enrichedProfiles = profiles.map(p => ({
      ...p,
      balance: p.balance || 1000,
      net_worth: p.net_worth || 1000,
      interactivity_points: p.interactivity_points || 0,
      jobs: jobsMap[p.username] || [],
      relationships: relationshipsMap[p.username] || [],
      songs: songsMap[p.username] || [],
      member_since: p.created_at
    }));
    
    console.log('Fetched profiles:', enrichedProfiles.length);
    return Response.json(enrichedProfiles);
    
  } catch (error) {
    console.error('GET Error:', error.message, error.code);
    
    if (error.code === '42P01') {
      return Response.json([]);
    }
    
    if (error.code === '42703') {
      // Try simpler query
      try {
        const res = await query(
          `SELECT username, password, job, bio, skills, portfolio_url, created_at FROM profiles ORDER BY created_at DESC LIMIT 50`
        );
        return Response.json(res.rows.map(r => ({ 
          ...r, 
          balance: 1000, 
          net_worth: 1000,
          interactivity_points: 0,
          jobs: [],
          relationships: [],
          songs: [],
          member_since: r.created_at
        })));
      } catch (e) {
        return Response.json([]);
      }
    }
    
    return Response.json({ error: 'Failed to fetch profiles', detail: error.message }, { status: 500 });
  }
}

/**
 * PATCH handler to update a profile
 */
export async function PATCH(request) {
  try {
    const data = await request.json();
    const { username, audio_url, balance, net_worth } = data;
    
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
    
    if (net_worth !== undefined) {
      updates.push(`net_worth = $${paramIndex}`);
      values.push(net_worth);
      paramIndex++;
    }
    
    if (updates.length === 0) {
      return Response.json({ error: 'No fields to update' }, { status: 400 });
    }
    
    values.push(username);
    
    await query(`UPDATE profiles SET ${updates.join(', ')} WHERE username = $${paramIndex}`, values);
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('PATCH Error:', error);
    return Response.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
