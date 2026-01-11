// Vercel compatible Serverless Route
export const dynamic = 'force-dynamic';
import { query } from '../../../lib/db';

/**
 * GET handler - Fetch recent pipeline posts with replies
 */
export async function GET(request) {
  console.log('GET /api/pipeline called');
  
  try {
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50;
    
    // Get posts
    const postsRes = await query(
      `SELECT id, username, display_name, display_emoji, content, post_type, is_blocked, created_at 
       FROM pipeline_posts 
       WHERE is_blocked = false
       ORDER BY created_at DESC 
       LIMIT $1`,
      [limit]
    );
    
    const posts = postsRes.rows;
    
    // Get replies for all posts
    let repliesMap = {};
    if (posts.length > 0) {
      try {
        const postIds = posts.map(p => p.id);
        const repliesRes = await query(
          `SELECT id, post_id, username, display_name, display_emoji, content, reply_type, side, created_at 
           FROM pipeline_replies 
           WHERE post_id = ANY($1)
           ORDER BY created_at ASC`,
          [postIds]
        );
        repliesRes.rows.forEach(reply => {
          if (!repliesMap[reply.post_id]) repliesMap[reply.post_id] = [];
          repliesMap[reply.post_id].push(reply);
        });
      } catch (e) {
        console.log('Replies table might not exist yet');
      }
    }
    
    // Combine posts with replies
    const enrichedPosts = posts.map(p => ({
      ...p,
      replies: repliesMap[p.id] || []
    }));
    
    console.log('Fetched pipeline posts:', enrichedPosts.length);
    return Response.json(enrichedPosts);
    
  } catch (error) {
    console.error('GET Error:', error.message, error.code);
    
    if (error.code === '42P01') {
      // Table doesn't exist yet
      return Response.json([]);
    }
    
    return Response.json({ error: 'Failed to fetch posts', detail: error.message }, { status: 500 });
  }
}

/**
 * POST handler - Create new post or reply
 */
export async function POST(request) {
  console.log('POST /api/pipeline called');
  
  try {
    const data = await request.json();
    const { action } = data;
    
    if (!process.env.DATABASE_URL) {
      return Response.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    // Create new post
    if (action === 'create_post') {
      const { username, display_name, display_emoji, content, post_type } = data;
      
      if (!content) {
        return Response.json({ error: 'Content is required' }, { status: 400 });
      }
      
      const result = await query(
        `INSERT INTO pipeline_posts (username, display_name, display_emoji, content, post_type) 
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [username || null, display_name, display_emoji || '😀', content, post_type || 'text']
      );
      
      // Award interactivity points if user is logged in
      if (username) {
        await addInteractivityPoints(username, 0.1);
      }
      
      console.log('Post created:', result.rows[0].id);
      return Response.json({ success: true, postId: result.rows[0].id });
    }
    
    // Create reply to post
    if (action === 'create_reply') {
      const { post_id, username, display_name, display_emoji, content, reply_type, side } = data;
      
      if (!post_id || !content) {
        return Response.json({ error: 'Post ID and content are required' }, { status: 400 });
      }
      
      const result = await query(
        `INSERT INTO pipeline_replies (post_id, username, display_name, display_emoji, content, reply_type, side) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [post_id, username || null, display_name, display_emoji || '😀', content, reply_type || 'text', side || 'left']
      );
      
      // Award interactivity points if user is logged in
      if (username) {
        await addInteractivityPoints(username, 0.1);
      }
      
      console.log('Reply created:', result.rows[0].id);
      return Response.json({ success: true, replyId: result.rows[0].id });
    }
    
    // Block a post
    if (action === 'block_post') {
      const { post_id, username } = data;
      
      if (!post_id) {
        return Response.json({ error: 'Post ID is required' }, { status: 400 });
      }
      
      await query(
        `UPDATE pipeline_posts SET is_blocked = true, blocked_at = NOW() WHERE id = $1`,
        [post_id]
      );
      
      // Award interactivity points if user is logged in
      if (username) {
        await addInteractivityPoints(username, 0.1);
      }
      
      console.log('Post blocked:', post_id);
      return Response.json({ success: true, message: 'The user is no longer with us send regards to their family tree' });
    }
    
    // $100K Interaction
    if (action === 'hundred_k_interaction') {
      const { username } = data;
      
      if (!username) {
        return Response.json({ error: 'Must be logged in for $100K interaction' }, { status: 400 });
      }
      
      // Get current net worth
      const userRes = await query(
        `SELECT net_worth FROM profiles WHERE username = $1`,
        [username]
      );
      
      if (userRes.rows.length === 0) {
        return Response.json({ error: 'User not found' }, { status: 404 });
      }
      
      const currentNetWorth = Number(userRes.rows[0].net_worth) || 0;
      const newNetWorth = currentNetWorth - 100000;
      
      // Update net worth
      await query(
        `UPDATE profiles SET net_worth = $1 WHERE username = $2`,
        [newNetWorth, username]
      );
      
      // Award interactivity points
      await addInteractivityPoints(username, 0.1);
      
      console.log('$100K interaction processed for:', username);
      return Response.json({ 
        success: true, 
        previousNetWorth: currentNetWorth,
        newNetWorth: newNetWorth,
        message: 'Thank you for your contribution to the Ecosysocietym'
      });
    }
    
    return Response.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('POST Error:', error.message, error.code);
    
    if (error.code === '42P01') {
      return Response.json({ error: 'Database tables missing. Run SUPABASE_SETUP.sql' }, { status: 500 });
    }
    
    return Response.json({ error: 'Failed to process request', detail: error.message }, { status: 500 });
  }
}

/**
 * Helper function to add interactivity points
 */
async function addInteractivityPoints(username, points) {
  try {
    await query(
      `UPDATE profiles SET interactivity_points = COALESCE(interactivity_points, 0) + $1 WHERE username = $2`,
      [points, username]
    );
  } catch (e) {
    console.log('Could not update interactivity points:', e.message);
    // Might fail if column doesn't exist yet, that's ok
  }
}
