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

  return {
    data: {
      message: "User added to Supabase",
    },
  };
}

export async function authoriseWithUserDetails(userData, supabase) {
  const response = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        name: userData.name,
        avatar_url: userData.avatar,
        username: userData.username,
      },
    },
  });

  return response;
}
