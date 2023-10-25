export async function authoriseWithProvider(provider, supabase) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      queryParams: {
        prompt: "consent",
      },
    },
  });

  if (error) return error;
}

export async function authoriseWithUserDetails(data, supabase) {
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        avatar: data.avatar,
        username: data.username,
      },
    },
  });

  if (error) return error;
}
