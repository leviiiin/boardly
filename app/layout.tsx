import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SupabaseProvider from "@/supabase/SupabaseProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Boardly — Project Management Tool",
  description: "Boardly is a modern task management application designed to streamline team workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full scroll-smooth">
        <body
          className={`${inter.variable} h-full font-sans bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary`}
        >
          <SupabaseProvider>
            {children}
          </SupabaseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
