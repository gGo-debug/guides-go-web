"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Database } from "@/database.types";

type UserRole = Database["public"]["Enums"]["user_role"];

type ActionResult = { error?: string; success?: boolean; message?: string };

export async function login(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password" };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!user) {
    return { error: "No user found" };
  }

  // Get user profile with role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { error: "Error fetching user profile" };
  }

  // Redirect based on role
  if (profile?.role === "guide") {
    redirect("/guide/dashboard");
  } else {
    redirect("/dashboard");
  }
}

export async function register(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const isGuide = formData.get("isGuide") === "on";
  const role: UserRole = isGuide ? "guide" : "user";

  if (!email || !password || !fullName) {
    return { error: "Please fill in all required fields" };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });

  if (authError) {
    return { error: authError.message };
  }

  if (!user) {
    return { error: "Failed to create user" };
  }

  // Create profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: fullName,
    email: email,
    role: role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (profileError) {
    // Cleanup auth user if profile creation fails
    await supabase.auth.admin.deleteUser(user.id);
    return { error: "Failed to create user profile" };
  }

  return {
    success: true,
    message:
      "Registration successful. Please check your email for confirmation instructions.",
  };
}

export async function logout(): Promise<ActionResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
  return { success: true };
}
