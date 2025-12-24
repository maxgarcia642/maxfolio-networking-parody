import { supabase } from './supabaseClient';

/**
 * Create a new profile in the database
 * @param {Object} profileData - Profile data to insert
 * @param {string} profileData.username - Unique username
 * @param {string} profileData.job_title - Job title (max 20 words)
 * @param {string} profileData.bio - Bio text (max 50 words)
 * @param {Array} profileData.skills - Array of skills (max 3, 10 words each)
 * @param {string} profileData.photo_url - URL to uploaded photo
 * @param {string} profileData.theme - Theme name
 * @returns {Promise<Object>} Created profile or error
 */
export async function createProfile(profileData) {
  if (!supabase) {
    return { data: null, error: new Error('Database not configured') };
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating profile:', error);
    return { data: null, error };
  }
}

/**
 * Get a profile by username
 * @param {string} username - Username to fetch
 * @returns {Promise<Object>} Profile data or error
 */
export async function getProfile(username) {
  if (!supabase) {
    return { data: null, error: new Error('Database not configured') };
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return { data: null, error };
  }
}

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get random profiles for explore page
 * @param {number} limit - Number of profiles to fetch (default: 12)
 * @returns {Promise<Object>} Array of profiles or error
 */
export async function getRandomProfiles(limit = 12) {
  if (!supabase) {
    return { data: [], error: new Error('Database not configured') };
  }
  
  try {
    // Note: For true randomness at scale, consider using a better approach
    // For now, we'll get recent profiles and shuffle client-side
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit * 2); // Get more than needed for randomness

    if (error) throw error;
    
    // Shuffle and limit using Fisher-Yates
    const shuffled = shuffleArray(data || []).slice(0, limit);
    return { data: shuffled, error: null };
  } catch (error) {
    console.error('Error fetching random profiles:', error);
    return { data: [], error };
  }
}

/**
 * Upload a photo to Supabase storage
 * @param {File} file - Image file to upload
 * @param {string} username - Username for organizing storage
 * @returns {Promise<Object>} Public URL or error
 */
export async function uploadPhoto(file, username) {
  if (!supabase) {
    return { data: null, error: new Error('Database not configured') };
  }
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${username}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from('profile-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(filePath);

    return { data: publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading photo:', error);
    return { data: null, error };
  }
}

/**
 * Check if a username is available
 * @param {string} username - Username to check
 * @returns {Promise<boolean>} True if available
 */
export async function isUsernameAvailable(username) {
  if (!supabase) {
    return false;
  }
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();

    if (error) throw error;
    return !data; // Available if no data found
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}
