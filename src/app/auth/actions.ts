"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password" };
  }

  const { data, error } = await (
    await supabase
  ).auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // After successful login, check if user is a guide
  const { data: profile } = await (await supabase)
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profile?.role === "guide") {
    redirect("/guide/dashboard");
  } else {
    redirect("/dashboard");
  }
}

export async function register(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const isGuide = formData.get("isGuide") === "on";

  if (!email || !password || !fullName) {
    return { error: "Please fill in all required fields" };
  }

  const { data, error } = await (
    await supabase
  ).auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: isGuide ? "guide" : "user",
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Create profile record
    const { error: profileError } = await (await supabase)
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name: fullName,
        email: email,
        role: isGuide ? "guide" : "user",
      });

    if (profileError) {
      return { error: profileError.message };
    }

    if (isGuide) {
      redirect("/guide/onboarding");
    } else {
      redirect("/dashboard");
    }
  }

  return { error: "An unexpected error occurred" };
}
