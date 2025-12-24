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
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-aero': 'linear-gradient(135deg, #a2d9ff 0%, #ffffff 50%, #b6f0ce 100%)',
      },
      boxShadow: {
        // Gives elements that 3D "popped out" look
        'aero': '0 10px 30px -5px rgba(0, 11, 190, 0.3), inset 0 0 0 1px rgba(255,255,255,0.5)',
        'glow': '0 0 15px rgba(16, 152, 186, 0.6)',
        'glow-lg': '0 0 30px rgba(16, 152, 186, 0.5), 0 0 60px rgba(16, 152, 186, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(16, 152, 186, 0.3)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'slideInUp': 'slideInUp 0.5s ease-out',
        'slideInDown': 'slideInDown 0.5s ease-out',
        'slideInLeft': 'slideInLeft 0.5s ease-out',
        'slideInRight': 'slideInRight 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(16, 152, 186, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(16, 152, 186, 0.6), 0 0 40px rgba(16, 152, 186, 0.3)' },
        },
      },
      transitionDelay: {
        '0': '0ms',
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '1000': '1000ms',
      },
    },
  },
  plugins: [],
}
