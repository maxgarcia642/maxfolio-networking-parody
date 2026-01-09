// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to save a song
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { username, song_name, notes_data, duration_ms } = data;
    
    if (!username) {
      return Response.json({ error: 'Username required' }, { status: 400 });
    }
    
    await query(
      `INSERT INTO songs (username, song_name, notes_data, duration_ms) VALUES ($1, $2, $3, $4)`,
      [username, song_name || 'Untitled Void Symphony', notes_data || '[]', duration_ms || 0]
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Song POST Error:', error);
    return Response.json({ error: 'Failed to save song' }, { status: 500 });
  }
}

/**
 * GET handler to fetch songs for a user
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (username) {
      const res = await query(
        `SELECT * FROM songs WHERE username = $1 ORDER BY created_at DESC`,
        [username]
      );
      return Response.json(res.rows);
    } else {
      const res = await query(`SELECT * FROM songs ORDER BY created_at DESC LIMIT 100`);
      return Response.json(res.rows);
    }
  } catch (error) {
    console.error('Song GET Error:', error);
    return Response.json([]);
  }
}
