// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to create a relationship
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { username, partner_name, partner_species, relationship_type } = data;
    
    if (!username || !partner_name) {
      return Response.json({ error: 'Username and partner name required' }, { status: 400 });
    }
    
    await query(
      `INSERT INTO relationships (username, partner_name, partner_species, relationship_type) VALUES ($1, $2, $3, $4)`,
      [username, partner_name, partner_species || 'Unknown Entity', relationship_type || 'Cosmic Bond']
    );
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Relationship POST Error:', error);
    return Response.json({ error: 'Failed to create relationship' }, { status: 500 });
  }
}

/**
 * GET handler to fetch relationships for a user
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (username) {
      const res = await query(
        `SELECT * FROM relationships WHERE username = $1 ORDER BY started_at DESC`,
        [username]
      );
      return Response.json(res.rows);
    } else {
      const res = await query(`SELECT * FROM relationships ORDER BY started_at DESC LIMIT 100`);
      return Response.json(res.rows);
    }
  } catch (error) {
    console.error('Relationship GET Error:', error);
    return Response.json([]);
  }
}
