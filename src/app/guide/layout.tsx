// app/guide/layout.tsx
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GuideNav } from "@/components/guide/GuideNav";
import { Sidebar } from "@/components/guide/Sidebar";

export default async function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

  // Check authentication and guide role
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "guide") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <GuideNav />

      <div className="flex h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
