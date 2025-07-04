import Link from "next/link";
import ConstituentForm from "./ConstituentForm";

export default function ConstituentsPage() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Constituent Agents</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl">
            Generate AI-powered digital twins representing diverse voices in your district. 
            Enter a district name below to create representative constituent agents.
          </p>
        </header>

        {/* Dynamic Constituent Form */}
        <ConstituentForm />

        {/* Info Section */}
        <div className="mt-16 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">About These Agents</h2>
          <p className="text-gray-700 leading-relaxed">
            These constituent agents are AI-generated representations based on anonymized demographic data, 
            voting patterns, and public sentiment analysis. They help public officials understand the diverse 
            perspectives and priorities within their districts without compromising individual privacy.
          </p>
        </div>
      </div>
    </main>
  );
} 