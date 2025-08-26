import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
// app/layout.tsx

// import "./globals.css";
// import "./styles.css";
import "./app.css";

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
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <html lang="en" className="h-full">
        <body className="antialiased">
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ThemeProvider>
  );
}
