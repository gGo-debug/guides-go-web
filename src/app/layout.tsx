import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingCTA } from "@/components/layout/FloatingCTA";

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Enhanced metadata configuration
export const metadata: Metadata = {
  title: {
    default: "GuidesGo - Turn Every Adventure into a Social Quest",
    template: "%s | GuidesGo",
  },
  description:
    "Discover unforgettable outdoor adventures with local guides across Canada, tailored just for you. Available now on iOS and Android.",
  keywords: [
    "adventure platform",
    "travel guides",
    "social exploration",
    "adventure quests",
    "travel rewards",
    "local guides",
  ],
  authors: [{ name: "GuidesGo" }],
  creator: "GuidesGo",
  publisher: "GuidesGo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://guidesgo.com",
    siteName: "GuidesGo",
    title: "GuidesGo - Adventure Platform",
    description:
      "Discover unforgettable outdoor adventures with local guides across Canada, tailored just for you.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GuidesGo Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GuidesGo - Adventure Platform",
    description:
      "Discover unforgettable outdoor adventures with local guides across Canada, tailored just for you.",
    images: ["/twitter-image.jpg"],
    creator: "@guidesgo",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/Logo.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased bg-white`}
      >
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
