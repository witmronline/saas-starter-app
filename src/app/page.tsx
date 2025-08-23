import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center sm:text-left">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-6">
              Organize Your Notes Smarter with{" "}
              <span className="text-primary">AI</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A modern SaaS app that helps you capture, summarize, and organize
              your thoughts — powered by AI.
            </p>
            <div className="flex gap-4 justify-center sm:justify-start">
              <Button asChild size="lg">
                <Link href="/signup">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-full h-[300px] lg:h-[400px]">
            <Image
              src="/dashboard-preview.png"
              alt="App screenshot"
              fill
              className="object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why choose us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">AI Summarizer</h3>
              <p className="text-gray-600">
                Instantly generate key points and summaries from your notes.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Organized Folders</h3>
              <p className="text-gray-600">
                Keep everything tidy with smart tags and folders.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Cloud Sync</h3>
              <p className="text-gray-600">
                Access your notes anywhere, on any device — always in sync.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">
          Join today and experience a smarter way to manage your notes.
        </p>
        <Button asChild size="lg">
          <Link href="/signup">Start Free Trial</Link>
        </Button>
      </section>
    </div>
  );
}
