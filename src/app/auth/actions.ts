"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Database } from "@/database.types";

type UserRole = Database["public"]["Enums"]["user_role"];

type ActionResult = {
  error?: string;
  success?: boolean;
  message?: string;
  redirect?: string;
};

// auth/actions.ts
export async function login(formData: FormData): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password" };
  }

  const supabase = await createClient();

  try {
    // Authenticate user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!user) throw new Error("No user found");

    // Get user's profile from profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, is_verified")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile) throw new Error("No profile found");

    // Handle guide flow
    if (profile.role === "guide") {
      // Check guide profile status
      const { data: guideProfile, error: guideError } = await supabase
        .from("guide_profiles")
        .select("status, bio")
        .eq("id", user.id)
        .single();

      if (guideError) throw guideError;

      // If no bio, redirect to onboarding
      if (!guideProfile?.bio) {
        return {
          success: true,
          redirect: "/guide/onboarding",
        };
      }

      // Guide verified and onboarded
      return {
        success: true,
        redirect: "/guide/dashboard",
      };
    }

    // Regular user flow
    return {
      success: true,
      redirect: "/dashboard",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to sign in",
    };
  }
}

// auth/actions.ts
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

  try {
    // Sign up user - Supabase will automatically create the profile
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

    if (authError) throw authError;
    if (!user) throw new Error("No user returned from auth signup");

    // If user is a guide, update their role and create their guide profile
    if (isGuide) {
      // Update role in profiles table
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ role: "guide" })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Create guide profile
      const { error: guideError } = await supabase
        .from("guide_profiles")
        .insert({
          id: user.id,
          status: "pending",
        });

      if (guideError) throw guideError;

      return {
        success: true,
        redirect: "/guide/onboarding",
        message: "Please complete your guide profile to get started.",
      };
    }

    return {
      success: true,
      redirect: "/dashboard",
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to register user",
    };
  }
}

export async function logout(): Promise<ActionResult> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return {
    success: true,
    redirect: "/",
  };
}
