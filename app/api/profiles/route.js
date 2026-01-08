// Vercel compatible Edge/Serverless Route
// This ensures the route is always dynamic and not cached
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to create a new profile.
 * Expects: username, password, job, bio, skills, portfolio_url
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { username, password, job, bio, skills, portfolio_url } = data;
    
    // Insert profile data into PostgreSQL
    await query(
      'INSERT INTO profiles (username, password, job, bio, skills, portfolio_url) VALUES ($1, $2, $3, $4, $5, $6)',
      [username, password, job, bio, skills, portfolio_url]
    );
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ error: 'Failed to publish profile. Username might be taken or system chaos happened.' }), {
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
    // Fetch profiles ordered by creation date
    const res = await query('SELECT username, password, job, bio, skills, portfolio_url FROM profiles ORDER BY created_at DESC LIMIT 50');
    return new Response(JSON.stringify(res.rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch profiles' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
