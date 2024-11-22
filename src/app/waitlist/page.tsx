import { Metadata } from "next";
import WaitlistForm from "@/components/waitlist/WaitlistForm";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Join the Waitlist - Guides GO",
  description: "Be among the first to experience the future of adventure. Sign up for early access to Guides GO.",
};

export default function WaitlistPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <WaitlistForm />
    </main>
  );
}