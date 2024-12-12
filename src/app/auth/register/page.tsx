"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    const result = await register(formData);
    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccessMessage(
        result.message ||
          "Registration successful. Please check your email for confirmation instructions."
      );
      // Optionally, redirect after a delay
      setTimeout(() => router.push("/auth/login"), 5000);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an account</h2>
          <p className="mt-2 text-gray-600">
            Join our community of adventurers
          </p>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-sm">
              {error}
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 text-green-500 p-4 rounded-md text-sm">
              {successMessage}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1"
              />
            </div>

            <div className="flex items-center">
              <input
                id="isGuide"
                name="isGuide"
                type="checkbox"
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label
                htmlFor="isGuide"
                className="ml-2 block text-sm text-gray-700"
              >
                Register as a Guide
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          <div className="text-center text-sm">
            <Link
              href="/auth/login"
              className="text-primary hover:text-primary/80"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
