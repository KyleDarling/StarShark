(async () => {
  try {
    const session =
      await StarSharkAuth.requireSession();

    if (!session) {
      return;
    }

  } catch (error) {
    location.replace(
      "/auth/login.html"
    );
  }
})();
