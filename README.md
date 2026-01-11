# 🎮 Maxfolio

A comedic, minimalist portfolio generator with a nostalgic Windows 95/Vista/Wii hybrid aesthetic. Create absurd, randomized personal portfolios and share them with the void!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ecf8e)

## ✨ Features

- 🎲 **Random Profile Generator** - Generate chaotic usernames, jobs, bios, and skills
- 💼 **Career-Void-Link** - Browse absurd job listings that expire in real-time
- 💹 **Economy Matrix** - Watch a chaotic market graph with temporal instability
- ❤️ **Matchmaker** - Find love among sentient toasters and quantum entities
- 🖼️ **Windows 95 Aesthetic** - Authentic retro UI with modern interactions
- More!

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works!)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/maxgarcia642/maxfolio-website.git
   cd maxfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase DATABASE_URL
   ```

4. **Set up the database**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and run the contents of `SUPABASE_SETUP.sql`

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/maxgarcia642/maxfolio-website)

### Manual Deployment

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com/new)
3. Add the following environment variable:
   - `DATABASE_URL`: Your Supabase PostgreSQL connection string
4. Deploy!

### Getting Your DATABASE_URL

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Project Settings** → **Database**
4. Copy the **Connection string (URI)** under "Connection string"
5. Replace `[YOUR-PASSWORD]` with your database password

## 📁 Project Structure

```
maxfolio/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (serverless functions)
│   │   ├── jobs/         # Job acceptance endpoint
│   │   └── profiles/     # Profile CRUD endpoint
│   ├── create/           # Profile creation wizard
│   ├── explore/          # Main exploration hub
│   ├── p/[username]/     # Public profile pages
│   ├── globals.css       # Global styles (Win95 theme)
│   ├── layout.js         # Root layout
│   └── page.jsx          # Home page (Wii-style menu)
├── components/            # Reusable React components
├── lib/                   # Utilities and database
│   ├── db.js             # PostgreSQL connection
│   ├── generators.js     # Random content generators
│   └── supabase.jsx      # Supabase client (optional)
├── SUPABASE_SETUP.sql    # Database schema
└── DEPLOYMENT_GUIDE.md   # Detailed deployment docs
```

## 🎨 The Aesthetic

Maxfolio combines three nostalgic design languages:

- **Windows 95**: Beveled buttons, gray backgrounds, pixel-perfect borders
- **Windows Vista**: Glossy gradients, glass effects, blue title bars
- **Nintendo Wii**: Rounded corners, floating elements, playful animations

## 🔧 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Deployment**: [Vercel](https://vercel.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📝 API Endpoints

### `POST /api/profiles`
Create a new profile
```json
{
  "username": "CosmicBanana42",
  "password": "abc123!",
  "job": "Senior Void Architect",
  "bio": "A chaotic expert in...",
  "skills": "Napping, Scrolling",
  "portfolio_url": "https://void.net/~user"
}
```

### `GET /api/profiles`
Fetch the latest 50 profiles

### `POST /api/jobs`
Accept a job listing
```json
{
  "username": "CosmicBanana42",
  "job_title": "Lead Chaos Engineer",
  "pay": "$999k exposure points"
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to provide feedback.

## 📄 License

MIT License - feel free to use this for your own chaotic purposes!

---

*Built with existential dread and caffeine ☕*
