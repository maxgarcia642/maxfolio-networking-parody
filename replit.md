[replit.md](https://github.com/user-attachments/files/24398414/replit.md)
# Maxfolio

## Overview

Maxfolio is a comedic, minimalist portfolio generator website where users can create absurd, randomized personal portfolios without requiring authentication. The application generates random usernames, job titles, bios, and themes to create shareable, humorous portfolio pages. The project features a nostalgic Windows 95 aesthetic with retro UI styling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool
- **Styling**: Tailwind CSS with custom Windows 95-inspired theme
- **Routing**: React Router DOM for client-side navigation
- **UI Utilities**: clsx and tailwind-merge for conditional class handling
- **Icons**: Lucide React for icon components

### Design Patterns
- **Component-based architecture**: Standard React component structure under `/src` directory
- **Utility functions**: Generator functions in `/lib/generators.js` for randomized content creation
- **CSS-in-JS hybrid**: Tailwind utility classes combined with custom CSS in `src/index.css`

### Content Generation System
The application uses predefined arrays of words and templates to generate:
- Random usernames (prefix + noun + number pattern)
- Absurd job titles with fake responsibilities and pay rates
- Comedic bio statements
- Random visual themes (Windows 95 style and brutalist style)

### Build Configuration
- Vite configured for development on port 5000 with open host access
- PostCSS pipeline with Tailwind CSS and Autoprefixer
- Content paths configured for `/src`, `/app`, and `/components` directories

## External Dependencies

### Core Libraries
- **React/React-DOM**: UI framework
- **React Router DOM**: Client-side routing
- **Lucide React**: Icon library

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **clsx/tailwind-merge**: Class name utilities

### Build Tools
- **Vite**: Development server and bundler
- **PostCSS/Autoprefixer**: CSS processing

### Planned Integrations (from project notes)
- **Vercel**: Deployment platform
- **Supabase**: Backend database for storing generated profiles (no-auth flow)
