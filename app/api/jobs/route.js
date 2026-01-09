// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * POST handler to accept a job
 */
export async function POST(request) {
  try {
    const data = await request.json();
    const { username, job_title, company, pay } = data;
    
    if (!username || !job_title) {
      return Response.json({ error: 'Username and job title required' }, { status: 400 });
    }
    
    await query(
      `INSERT INTO accepted_jobs (username, job_title, company, pay) VALUES ($1, $2, $3, $4)`,
      [username, job_title, company || 'Unknown Corp', pay || 'Negotiable']
    );
    
    // Update user's net worth based on job pay (extract number from pay string)
    const payMatch = pay?.match(/\d+/);
    if (payMatch) {
      const payAmount = parseInt(payMatch[0]) * 1000; // Assume thousands
      try {
        await query(
          `UPDATE profiles SET net_worth = net_worth + $1 WHERE username = $2`,
          [payAmount, username]
        );
      } catch (e) {
        console.log('Could not update net worth');
      }
    }
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Job POST Error:', error);
    return Response.json({ error: 'Failed to accept job' }, { status: 500 });
  }
}

/**
 * GET handler to fetch jobs for a user
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (username) {
      const res = await query(
        `SELECT * FROM accepted_jobs WHERE username = $1 ORDER BY accepted_at DESC`,
        [username]
      );
      return Response.json(res.rows);
    } else {
      const res = await query(`SELECT * FROM accepted_jobs ORDER BY accepted_at DESC LIMIT 100`);
      return Response.json(res.rows);
    }
  } catch (error) {
    console.error('Job GET Error:', error);
    return Response.json([]);
  }
}
