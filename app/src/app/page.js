import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <header className="mb-16">
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Replicant
          </h1>
          <p className="mt-4 text-xl max-w-xl">
            A civic intelligence engine for public officials. Create representative digital twins of your constituents using open data and real-time sentiment.
          </p>
          <div className="mt-8">
            <Link 
              href="/constituents" 
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              View Constituent Agents →
            </Link>
          </div>
        </header>

        <section className="grid gap-12 md:grid-cols-2">
          <div className="border-t border-black pt-8">
            <h2 className="text-2xl font-semibold">Constituent Modeling</h2>
            <p className="mt-2 text-base text-gray-800">
              Generate anonymized population twins per district using public voter files, census data, and sentiment analysis.
            </p>
          </div>

          <div className="border-t border-black pt-8">
            <h2 className="text-2xl font-semibold">Realtime Sentiment</h2>
            <p className="mt-2 text-base text-gray-800">
              Track Reddit, city council minutes, and local forums to monitor issues as they emerge—before they become headlines.
            </p>
          </div>

          <div className="border-t border-black pt-8">
            <h2 className="text-2xl font-semibold">Privacy by Design</h2>
            <p className="mt-2 text-base text-gray-800">
              No tracking. No cookies. No re-identification. MirrorPopuli builds district models, not user profiles.
            </p>
          </div>

          <div className="border-t border-black pt-8">
            <h2 className="text-2xl font-semibold">Built for Impact</h2>
            <p className="mt-2 text-base text-gray-800">
              Lightweight tooling for offices with zero time. Works on phone, desktop, or a rep's inbox.
            </p>
          </div>
        </section>

        <footer className="mt-24 border-t border-black pt-8 text-sm text-gray-500">
          <p>Made with ❤️ at UC Berkeley AI Hackathon 2025</p>
        </footer>
      </div>
    </main>
  );
}
