[DEPLOYMENT_GUIDE.md](https://github.com/user-attachments/files/24398405/DEPLOYMENT_GUIDE.md)[# Maxfolio: Deployment & Technical Guide

## Overview
Maxfolio is a comedic, minimalist portfolio generator with a nostalgic Windows 95/Vista/Wii hybrid aesthetic. It is built using React (Vite/Next.js hybrid style) and PostgreSQL.

---

## 🛠️ Deployment Instructions

### 1. Supabase Setup (PostgreSQL Database)
- Create a new project on [Supabase](https://supabase.com).
- Go to the **SQL Editor** and run the following to initialize your schema:
```sql
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    job TEXT NOT NULL,
    bio TEXT,
    skills TEXT,
    portfolio_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
- Go to **Project Settings > Database** and copy your **Connection String (URI)**. It should look like `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`.

### 2. Vercel Setup (Frontend + API)
- Connect your GitHub repository to [Vercel](https://vercel.com).
- During the import process, add these **Environment Variables**:
  - `DATABASE_URL`: Your Supabase connection string.
  - `PGHOST`: Your Supabase host (e.g., `db.xxxx.supabase.co`).
  - `PGPORT`: `5432`.
  - `PGUSER`: `postgres`.
  - `PGPASSWORD`: Your Supabase project password.
  - `PGDATABASE`: `postgres`.
- Deploy! Vercel will handle the React build and Serverless API routes automatically.

---

## 📂 Code Logic & Documentation

### 🧙 Meta-Comedic Generators (`lib/generators.js`)
- This file is the "brain" of the comedy. It uses massive arrays of tech-jargon and absurd nouns to generate profile data.
- **`generateJob()`**: Creates a full listing with randomized titles (e.g., "Sub-atomic Janitor"), companies, and perks ("Free bagels every other leap year").
- **`generateBio()`**: Combines intros, roles, and "topics" (e.g., "pioneer of quantum bagel toasting") for unique user identities.

### 🌐 Serverless API (`app/api/profiles/route.js`)
- **`POST`**: Receives profile data from the Wizard and executes an `INSERT` into the PostgreSQL database.
- **`GET`**: Fetches the latest 50 profiles for the "Active Users" tab.
- **Persistence**: Using `force-dynamic` ensures that user data is always fresh and never cached by the edge.

### 📉 Economy Matrix v4.0 (`app/explore/page.jsx`)
- **Left-Leaning Jitter**: The market graph logic uses an HTML5 Canvas to simulate a volatile market.
- **Temporal Chaos**: The X-axis displays randomized months and years ranging from -999,999 to +1,500,000, updated in real-time via the animation loop.

### 🎮 Wii Landing Page (`app/page.jsx`)
- Implements a Wii Channel-style grid using Tailwind CSS.
- **Central Time Clock**: Uses a `useEffect` interval to keep an accurate clock synced to US Central Time.

---

## 🧪 GitHub Readiness
1. Ensure `.env` is in your `.gitignore`.
2. All logic is self-contained in `src/` and `app/`.
3. The `package.json` includes all necessary dependencies for a smooth build.
Uploading DEPLOYMENT_GUIDE.md…]()
