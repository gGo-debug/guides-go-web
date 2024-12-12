import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: async (name: string) => {
          const cookieStore = await cookies();
          const cookie = cookieStore.get(name);
          return cookie?.value;
        },
        set: async (name: string, value: string, options: CookieOptions) => {
          const cookieStore = await cookies();
          try {
            cookieStore.set(name, value, options);
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove: async (name: string, options: CookieOptions) => {
          const cookieStore = await cookies();
          try {
            cookieStore.set(name, "", { ...options, maxAge: 0 });
          } catch (error) {
            // The `remove` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      auth: {
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    }
  );
}
