export default function handler(req, res) {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.VITE_SUPABASE_URL;

  const anonKey =
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    return res.status(500).json({
      error: "Supabase public environment variables are missing in Vercel."
    });
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ url, anonKey });
}
