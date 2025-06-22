"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConstituentForm() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateConstituents = async (e) => {
    e.preventDefault();
    if (!district.trim()) return;

    setLoading(true);
    setError("");

    try {
      // Redirect to the district page instead of generating here
      const encodedDistrict = encodeURIComponent(district.trim());
      router.push(`/constituents/${encodedDistrict}`);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
              Enter District Name
            </label>
            <input
              type="text"
              id="district"
              placeholder="e.g., District 3, Berkeley Hills, Downtown Oakland"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled
            />
          </div>
          <div className="flex items-end">
            <button
              disabled
              className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
            >
              Generate Agents
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* District Input Form */}
      <div className="mb-12 p-6 bg-gray-50 rounded-lg">
        <form onSubmit={generateConstituents} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
              Enter District Name
            </label>
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="e.g., District 3, Berkeley Hills, Downtown Oakland"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading || !district.trim()}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Redirecting..." : "Generate Agents"}
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>
    </>
  );
} 