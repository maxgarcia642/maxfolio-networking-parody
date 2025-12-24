Not functional and broken, but still was interesting trying to work it out.
Maybe it can be reused as something by the general public.
# 🌊 Maximiliano Garcia | Frutiger Aero Portfolio - Database Test

A high-performance, skeuomorphic web experience built with **Next.js 14**. This project transitions from a static HTML site to a dynamic React application, strictly adhering to the **Frutiger Aero** aesthetic: gloss, glassmorphism, and vibrant nature-tech gradients.

## 🚀 Live Demo
**Hosted on Vercel:** [Your-Vercel-Link-Here.vercel.app]

## 🎨 Design Language: Frutiger Aero
This portfolio revives the 2004–2013 "Aero" era using modern CSS:
- **Glossy UI:** Custom `.aero-card` classes with multi-stop reflective gradients.
- **Glassmorphism:** Heavy use of `backdrop-blur` and high-contrast white borders.
- **Vibrant Palette:** Sky Blue (#1098ba) and Grass Green (#308a11) accents.

## 🛠️ Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Liquid smooth transitions)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## ✨ Key Features
- **Floating Glass Navbar:** Interactive pill-shaped navigation with spring-physics animations.
- **Dynamic Utilities Dashboard:** Tabbed interface for Finance (Stock tracking), Music (Vinyl/Discogs agent), and Engineering tools.
- **Programming Terminal:** A styled code-browser section pulling raw data from my GitHub repositories.
- **Pixel Art Studio:** A React-based 16x16 drawing canvas (In-Progress).

## 📁 Project Structure
```text
├── app/
│   ├── globals.css      # Custom Aero gloss & background logic
│   ├── layout.js       # Global shell and fonts
│   └── page.js         # Master homepage composition
├── components/
│   ├── Navbar.jsx      # Glossy navigation logic
│   └── Utilities.jsx   # Tabbed dashboard logic
└── public/
    └── assets/         # Storage for Resume.pdf and Project PDFs
