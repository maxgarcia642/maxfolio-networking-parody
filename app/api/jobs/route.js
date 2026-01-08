// Vercel compatible Edge/Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

export async function POST(request) {
  try {
    const data = await request.json();
    const { username, job_title, pay } = data;
    
    await query(
      'INSERT INTO accepted_jobs (username, job_title, pay) VALUES ($1, $2, $3)',
      [username, job_title, pay]
    );
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to accept job' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
