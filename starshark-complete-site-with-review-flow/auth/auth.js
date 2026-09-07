window.StarSharkAuth = (() => {
  let clientPromise;

  async function getClient() {
    if (clientPromise) return clientPromise;

    clientPromise = (async () => {
      if (!window.supabase) {
        throw new Error("Supabase library did not load.");
      }

      const response = await fetch("/api/config", {
        cache: "no-store"
      });

      const config = await response.json();

      if (!response.ok) {
        throw new Error(
          config.error ||
          "Could not load Supabase configuration."
        );
      }

      return window.supabase.createClient(
        config.url,
        config.anonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );
    })();

    return clientPromise;
  }

  async function requireSession() {
    const sb = await getClient();

    const { data, error } =
      await sb.auth.getSession();

    if (error || !data.session) {
      const next = encodeURIComponent(
        location.pathname + location.search
      );

      location.replace(
        "/auth/login.html?next=" + next
      );

      return null;
    }

    return data.session;
  }

  async function signOut() {
    const sb = await getClient();

    await sb.auth.signOut();

    location.replace(
      "/auth/login.html"
    );
  }

  return {
    getClient,
    requireSession,
    signOut
  };
})();
