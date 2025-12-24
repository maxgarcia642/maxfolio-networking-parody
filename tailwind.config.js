/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- FRUTIGER AERO PALETTE ---
        aero: {
          sky: '#1098ba',   // The classic Windows 7 blue
          ocean: '#000bbe', // Deep tech blue
          grass: '#308a11', // Vibrant nature green
          lime: '#82c91e',  // Bright highlight green
          glass: 'rgba(255, 255, 255, 0.45)', // Base for glass cards
          border: 'rgba(255, 255, 255, 0.6)', // Shiny borders
        }
      },
      backgroundImage: {
        // This creates the "Glossy Reflection" on the top half of buttons/cards
        'gloss-shine': 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 51%, rgba(255,255,255,0.2) 100%)',
      },
      boxShadow: {
        // Gives elements that 3D "popped out" look
        'aero': '0 10px 30px -5px rgba(0, 11, 190, 0.3), inset 0 0 0 1px rgba(255,255,255,0.5)',
        'glow': '0 0 15px rgba(16, 152, 186, 0.6)',
      }
    },
  },
  plugins: [],
}
