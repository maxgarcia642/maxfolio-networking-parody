'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { generateUsername, generateJobTitles, generateTheme, validateWordCount, getWordCount, sanitizeUsername } from '../../lib/generators';
import { createProfile, uploadPhoto, isUsernameAvailable } from '../../lib/supabase';
import { Sparkles, Upload, Loader2 } from 'lucide-react';

export default function CreatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [username, setUsername] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState(['', '', '']);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [theme, setTheme] = useState(null);
  
  // Suggestions
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  
  useEffect(() => {
    // Generate initial suggestions
    setJobTitleSuggestions(generateJobTitles());
    setTheme(generateTheme());
  }, []);
  
  const handleGenerateUsername = () => {
    setUsername(generateUsername());
  };
  
  const handleJobTitleSuggestion = (suggestion) => {
    setJobTitle(suggestion);
  };
  
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image must be less than 5MB');
        return;
      }
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };
  
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setSkills(newSkills);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Validation
      if (!username.trim()) {
        throw new Error('Username is required');
      }
      
      if (!jobTitle.trim()) {
        throw new Error('Job title is required');
      }
      
      if (!validateWordCount(jobTitle, 20)) {
        throw new Error('Job title must be 20 words or less');
      }
      
      if (!bio.trim()) {
        throw new Error('Bio is required');
      }
      
      if (!validateWordCount(bio, 50)) {
        throw new Error('Bio must be 50 words or less');
      }
      
      // Validate skills
      const filledSkills = skills.filter(s => s.trim());
      if (filledSkills.length === 0) {
        throw new Error('At least one skill is required');
      }
      
      for (const skill of filledSkills) {
        if (!validateWordCount(skill, 10)) {
          throw new Error('Each skill must be 10 words or less');
        }
      }
      
      // Check username availability
      const available = await isUsernameAvailable(username);
      if (!available) {
        throw new Error('Username is already taken. Try another!');
      }
      
      // Upload photo if provided
      let photoUrl = '';
      if (photoFile) {
        const { data, error: uploadError } = await uploadPhoto(photoFile, username);
        if (uploadError) throw new Error('Failed to upload photo');
        photoUrl = data;
      }
      
      // Create profile
      const profileData = {
        username: username.trim(),
        job_title: jobTitle.trim(),
        bio: bio.trim(),
        skills: filledSkills,
        photo_url: photoUrl,
        theme: theme.name,
      };
      
      const { data, error: createError } = await createProfile(profileData);
      if (createError) throw createError;
      
      // Success! Redirect to profile
      router.push(`/p/${username}`);
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again!');
      setLoading(false);
    }
  };
  
  return (
    <main className="min-h-screen pb-20">
      <Navbar />
      
      <section className="pt-32 px-4 max-w-3xl mx-auto">
        <div className="aero-card p-8 bg-white/40 backdrop-blur-xl">
          <h1 className="text-4xl font-extrabold text-aero-ocean mb-2 flex items-center gap-3">
            <Sparkles /> Create Your Maxfolio
          </h1>
          <p className="text-slate-600 mb-8">
            Fill in the chaos below. Remember: it's permanent! No edits allowed. 🎭
          </p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Username *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(sanitizeUsername(e.target.value))}
                  className="flex-1 px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aero-ocean"
                  placeholder="cosmic-banana-47"
                  required
                />
                <button
                  type="button"
                  onClick={handleGenerateUsername}
                  className="px-4 py-2 bg-aero-ocean text-white rounded-xl font-bold hover:bg-aero-sky transition-colors"
                >
                  🎲 Random
                </button>
              </div>
            </div>
            
            {/* Job Title */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Job Title * (Max 20 words) - {getWordCount(jobTitle)}/20
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aero-ocean"
                placeholder="Professional Sock Matcher"
                required
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {jobTitleSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleJobTitleSuggestion(suggestion)}
                    className="text-xs px-3 py-1 bg-aero-sky/20 text-aero-ocean rounded-full hover:bg-aero-sky/40 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setJobTitleSuggestions(generateJobTitles())}
                  className="text-xs px-3 py-1 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-colors"
                >
                  ↻ More
                </button>
              </div>
            </div>
            
            {/* Bio */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Bio * (Max 50 words) - {getWordCount(bio)}/50
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aero-ocean h-24"
                placeholder="I match socks professionally and occasionally pretend to understand JavaScript..."
                required
              />
            </div>
            
            {/* Skills */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Skills * (Max 3 skills, 10 words each)
              </label>
              {skills.map((skill, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(idx, e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-aero-ocean mb-2"
                  placeholder={`Skill ${idx + 1} (${getWordCount(skill)}/10 words)`}
                />
              ))}
            </div>
            
            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Photo (Optional, max 5MB)
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                {photoPreview ? (
                  <div className="space-y-4">
                    <img src={photoPreview} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto" />
                    <button
                      type="button"
                      onClick={() => { setPhotoFile(null); setPhotoPreview(''); }}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="mx-auto mb-2 text-slate-400" size={32} />
                    <span className="text-slate-600">Click to upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            
            {/* Theme Preview */}
            {theme && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Your Random Theme: {theme.name}
                </label>
                <div className="flex gap-2">
                  <div 
                    className="w-16 h-16 rounded-xl shadow-md" 
                    style={{ backgroundColor: theme.primary }}
                  />
                  <div 
                    className="w-16 h-16 rounded-xl shadow-md" 
                    style={{ backgroundColor: theme.secondary }}
                  />
                  <div 
                    className="w-16 h-16 rounded-xl shadow-md" 
                    style={{ backgroundColor: theme.bg }}
                  />
                </div>
              </div>
            )}
            
            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-gradient-to-b from-aero-sky to-aero-ocean text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Your Chaos...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Create Maxfolio
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
