"use client";
import { useState, useEffect } from "react";

export default function PolicyInput({ district }) {
  const [mounted, setMounted] = useState(false);
  const [constituents, setConstituents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [policyText, setPolicyText] = useState("");

  useEffect(() => {
    setMounted(true);
    // Generate constituents for this district on page load
    generateConstituents();
  }, [district]);

  const generateConstituents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-constituents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ district }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate constituents");
      }

      setConstituents(data.constituents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePolicySubmit = async (e) => {
    e.preventDefault();
    if (!policyText.trim()) return;

    // For now, just log the policy text
    console.log("Policy submitted:", policyText);
    // TODO: Add policy analysis functionality
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Policy Input Form */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Policy Analysis</h2>
        <form onSubmit={handlePolicySubmit} className="space-y-4">
          <div>
            <label htmlFor="policy" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Policy Text or Upload Document
            </label>
            <textarea
              id="policy"
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
              placeholder="Paste policy text here or describe a proposed policy..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!policyText.trim()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analyze Constituent Reactions
            </button>
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Upload Document
            </button>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mb-8">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Generating constituent agents for {district}...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Constituents Display */}
      {constituents && constituents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6">
            Constituent Agents for {district}
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {constituents.map((constituent) => (
              <div key={constituent.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{constituent.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    constituent.sentiment === 'Progressive' ? 'bg-blue-100 text-blue-800' :
                    constituent.sentiment === 'Conservative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {constituent.sentiment}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Age:</span> {constituent.age}
                  </div>
                  <div>
                    <span className="font-medium">Occupation:</span> {constituent.occupation}
                  </div>
                  <div>
                    <span className="font-medium">Income:</span> ${constituent.income.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-medium">District:</span> {constituent.district}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Issues:</h4>
                  <div className="space-y-2">
                    {constituent.keyIssues.map((issue, index) => (
                      <p key={index} className="text-sm text-gray-700 leading-relaxed">
                        • {issue}
                      </p>
                    ))}
                  </div>
                </div>

                <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                  View Policy Reaction
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
} 