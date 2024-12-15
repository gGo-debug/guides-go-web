"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  bio: string;
  location: string;
  experience_years: string;
  specialties: string;
  languages: string;
  website: string;
}

export default function GuideOnboarding() {
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    bio: "",
    location: "",
    experience_years: "",
    specialties: "",
    languages: "English", // Default value
    website: "",
  });

  // Check if guide profile exists when component mounts
  useEffect(() => {
    const checkGuideProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("guide_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          // PGRST116 means no rows returned
          throw error;
        }

        // If profile exists, populate form
        if (data) {
          setFormData({
            bio: data.bio || "",
            location: data.location || "",
            experience_years: data.experience_years?.toString() || "",
            specialties: Array.isArray(data.specialties)
              ? data.specialties.join(", ")
              : "",
            languages: Array.isArray(data.languages)
              ? data.languages.join(", ")
              : "English",
            website: data.website || "",
          });
        }
      } catch (err) {
        console.error("Error checking guide profile:", err);
      }
    };

    checkGuideProfile();
  }, [user, supabase]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!user) throw new Error("No authenticated user found");

      // Validate form data
      if (!formData.bio.trim()) throw new Error("Bio is required");
      if (!formData.location.trim()) throw new Error("Location is required");
      if (!formData.experience_years)
        throw new Error("Years of experience is required");
      if (!formData.specialties.trim())
        throw new Error("Specialties are required");
      if (!formData.languages.trim()) throw new Error("Languages are required");

      // First check if guide profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from("guide_profiles")
        .select("id")
        .eq("id", user.id)
        .single();

      if (checkError && checkError.code !== "PGRST116") throw checkError;

      const guideData = {
        id: user.id,
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        experience_years: parseInt(formData.experience_years),
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        languages: formData.languages.split(",").map((l) => l.trim()),
        website: formData.website.trim() || null,
        status: "pending_review",
      };

      let guideError;
      if (!existingProfile) {
        // Insert new profile
        const { error } = await supabase
          .from("guide_profiles")
          .insert([guideData]);
        guideError = error;
      } else {
        // Update existing profile
        const { error } = await supabase
          .from("guide_profiles")
          .update(guideData)
          .eq("id", user.id);
        guideError = error;
      }

      if (guideError) throw guideError;

      // Update the main profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          is_verified: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) throw profileError;

      // Redirect to the dashboard
      router.push("/guide/dashboard");
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Guide Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about your experience..."
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where are you based?"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Years of Experience</label>
              <Input
                name="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Specialties (comma-separated)
              </label>
              <Input
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                placeholder="Hiking, Rock Climbing, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Languages (comma-separated)
              </label>
              <Input
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                placeholder="English, French, etc."
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Website (optional)</label>
              <Input
                name="website"
                type="url"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
