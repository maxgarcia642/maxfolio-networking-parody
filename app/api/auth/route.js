// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to authenticate a user
 */
export async function POST(request) {
  console.log('POST /api/auth called');
  
  try {
    const data = await request.json();
    const { username, password } = data;
    
    if (!username || !password) {
      return Response.json({ error: 'Username and password are required' }, { status: 400 });
    }
    
    // Find user by username
    const res = await query(
      `SELECT username, password, job, bio, skills, portfolio_url, audio_url, balance, net_worth, created_at 
       FROM profiles 
       WHERE username = $1`,
      [username]
    );
    
    if (res.rows.length === 0) {
      return Response.json({ error: 'User not found in the mainframe' }, { status: 404 });
    }
    
    const user = res.rows[0];
    
    // Check password (plain text comparison since this is a fun/demo app)
    if (user.password !== password) {
      return Response.json({ error: 'Invalid passcode. Access denied.' }, { status: 401 });
    }
    
    // Get user's jobs
    let jobs = [];
    try {
      const jobsRes = await query(
        `SELECT job_title, company, pay, accepted_at FROM accepted_jobs WHERE username = $1 ORDER BY accepted_at DESC`,
        [username]
      );
      jobs = jobsRes.rows;
    } catch (e) { console.log('Could not fetch jobs'); }
    
    // Get user's relationships
    let relationships = [];
    try {
      const relRes = await query(
        `SELECT partner_name, partner_species, relationship_type, started_at FROM relationships WHERE username = $1 ORDER BY started_at DESC`,
        [username]
      );
      relationships = relRes.rows;
    } catch (e) { console.log('Could not fetch relationships'); }
    
    // Get user's songs (including notes_data for counting)
    let songs = [];
    try {
      const songsRes = await query(
        `SELECT song_name, notes_data, duration_ms, created_at FROM songs WHERE username = $1 ORDER BY created_at DESC`,
        [username]
      );
      songs = songsRes.rows;
    } catch (e) { console.log('Could not fetch songs'); }
    
    // Return user data (excluding password from response for security theater)
    return Response.json({
      success: true,
      user: {
        username: user.username,
        job: user.job,
        bio: user.bio,
        skills: user.skills,
        portfolio_url: user.portfolio_url,
        audio_url: user.audio_url,
        balance: user.balance || 1000,
        net_worth: user.net_worth || 1000,
        member_since: user.created_at,
        jobs,
        relationships,
        songs
      }
    });
    
  } catch (error) {
    console.error('Auth Error:', error.message, error.code);
    return Response.json({ error: 'Authentication system malfunction', detail: error.message }, { status: 500 });
  }
}
