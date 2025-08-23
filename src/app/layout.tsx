import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// app/layout.tsx

import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "@fontsource/inter"; // Inter Variable font

export const metadata: Metadata = {
  title: "SaaS Starter",
  description: "A clean SaaS template built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <html lang="en" className="h-full">
        <body className="antialiased">
          <Header />
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
