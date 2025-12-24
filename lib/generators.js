// Random generators for Maxfolio chaos!

const adjectives = [
  'cosmic', 'professional', 'digital', 'quantum', 'mysterious', 'ancient',
  'modern', 'virtual', 'electric', 'magnetic', 'frozen', 'blazing',
  'silent', 'loud', 'tiny', 'mega', 'ultra', 'hyper', 'super', 'epic'
];

const nouns = [
  'banana', 'potato', 'wizard', 'ninja', 'dragon', 'penguin',
  'robot', 'unicorn', 'narwhal', 'taco', 'waffle', 'pickle',
  'muffin', 'cookie', 'bagel', 'donut', 'toast', 'burrito', 'pizza', 'sushi'
];

const jobTitles = [
  'Professional Sock Matcher',
  'Chief Vibe Officer',
  'Senior Meme Analyst',
  'Lead Nap Coordinator',
  'Director of Cat Videos',
  'VP of Procrastination',
  'Senior Snack Tester',
  'Chief Chaos Engineer',
  'Lead Coffee Consumer',
  'Professional Daydreamer',
  'Senior Pencil Sharpener',
  'Director of Unnecessary Meetings',
  'VP of Air Guitar',
  'Chief Bubble Wrap Popper',
  'Lead Plant Whisperer',
  'Senior WiFi Troubleshooter',
  'Professional Couch Warmer',
  'Director of Desk Naps',
  'Chief Snooze Button Presser',
  'Lead Rubber Duck Debugger'
];

const themes = [
  { name: 'sunset', primary: '#ff6b6b', secondary: '#ffd93d', bg: '#fff5e6' },
  { name: 'ocean', primary: '#4ecdc4', secondary: '#1a535c', bg: '#e8f5f7' },
  { name: 'forest', primary: '#95e1d3', secondary: '#38ada9', bg: '#f0fff4' },
  { name: 'lavender', primary: '#a29bfe', secondary: '#6c5ce7', bg: '#f5f3ff' },
  { name: 'peach', primary: '#fab1a0', secondary: '#fd79a8', bg: '#fff0f0' },
  { name: 'mint', primary: '#55efc4', secondary: '#00b894', bg: '#f0fff9' },
  { name: 'bubblegum', primary: '#fd79a8', secondary: '#e84393', bg: '#fff0f6' },
  { name: 'cyber', primary: '#00cec9', secondary: '#0984e3', bg: '#e8f8f8' },
];

/**
 * Generate a random username in format: adjective-noun-number
 * @returns {string} Random username like "cosmic-banana-47"
 */
export function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 100);
  return `${adj}-${noun}-${num}`;
}

/**
 * Fisher-Yates shuffle algorithm for proper randomization
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
 * Generate an array of 5 random silly job titles
 * @returns {string[]} Array of job title suggestions
 */
export function generateJobTitles() {
  const shuffled = shuffleArray(jobTitles);
  return shuffled.slice(0, 5);
}

/**
 * Generate a random theme (color palette)
 * @returns {Object} Theme object with name and colors
 */
export function generateTheme() {
  return themes[Math.floor(Math.random() * themes.length)];
}

/**
 * Generate a URL-safe slug from username
 * @param {string} username - The username to convert
 * @returns {string} URL-safe slug
 */
export function generateSlug(username) {
  return username
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Validate word count in a string
 * @param {string} text - Text to validate
 * @param {number} maxWords - Maximum allowed words
 * @returns {boolean} True if within limit
 */
export function validateWordCount(text, maxWords) {
  if (!text || text.trim() === '') return true;
  const wordCount = text.trim().split(/\s+/).length;
  return wordCount <= maxWords;
}

/**
 * Get word count from text
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
export function getWordCount(text) {
  if (!text || text.trim() === '') return 0;
  return text.trim().split(/\s+/).length;
}

/**
 * Sanitize username to be URL-safe
 * @param {string} username - Username to sanitize
 * @returns {string} Sanitized username (lowercase, alphanumeric and hyphens only)
 */
export function sanitizeUsername(username) {
  return username.toLowerCase().replace(/[^a-z0-9-]/g, '');
}
