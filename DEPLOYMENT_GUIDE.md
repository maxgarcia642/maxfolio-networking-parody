# Deployment Guide: Replit to Vercel + Supabase

## 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of `SUPABASE_SETUP.sql` found in this project.
4. Go to **Project Settings > API** and copy your `Project URL` and `service_role` key (or `anon` key if you set up RLS).

## 2. Environment Variables
In Vercel (and locally in Replit), set the following:
- `DATABASE_URL`: Your Supabase connection string (Found in Settings > Database).

## 3. Vercel Deployment
1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Vercel will automatically detect the Next.js/Vite project.
3. Add the `DATABASE_URL` to Vercel's Environment Variables.
4. Deploy!

## 4. Code Adjustments
The current API routes in `app/api/` are designed for standard Node.js environments. Vercel's Serverless Functions will handle these automatically if you use the Next.js structure. If using pure Vite, you may need a small `vercel.json` for routing.
