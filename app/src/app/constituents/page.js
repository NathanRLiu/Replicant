import Link from "next/link";

export default function ConstituentsPage() {
  const constituents = [
    {
      id: 1,
      name: "Sarah Chen",
      age: 34,
      occupation: "Software Engineer",
      district: "District 3",
      keyIssues: ["Affordable Housing", "Public Transportation", "Tech Education"],
      sentiment: "Moderate",
      lastActive: "2 days ago"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 52,
      occupation: "Small Business Owner",
      district: "District 1",
      keyIssues: ["Business Regulations", "Local Economy", "Infrastructure"],
      sentiment: "Conservative",
      lastActive: "1 week ago"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      age: 28,
      occupation: "Teacher",
      district: "District 2",
      keyIssues: ["Education Funding", "Student Mental Health", "Teacher Salaries"],
      sentiment: "Progressive",
      lastActive: "3 days ago"
    },
    {
      id: 4,
      name: "David Thompson",
      age: 65,
      occupation: "Retired",
      district: "District 4",
      keyIssues: ["Senior Services", "Healthcare Access", "Public Safety"],
      sentiment: "Moderate",
      lastActive: "5 days ago"
    },
    {
      id: 5,
      name: "Aisha Patel",
      age: 41,
      occupation: "Healthcare Worker",
      district: "District 5",
      keyIssues: ["Healthcare Reform", "Worker Rights", "Community Health"],
      sentiment: "Progressive",
      lastActive: "1 day ago"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Constituent Agents</h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl">
            AI-powered digital twins representing diverse voices in your district. 
            These agents are built from anonymized public data and real-time sentiment analysis.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {constituents.map((constituent) => (
            <div key={constituent.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{constituent.name}</h2>
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
                  <span className="font-medium">District:</span> {constituent.district}
                </div>
                <div>
                  <span className="font-medium">Last Active:</span> {constituent.lastActive}
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium text-gray-900 mb-2">Key Issues:</h3>
                <div className="flex flex-wrap gap-2">
                  {constituent.keyIssues.map((issue, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors">
                View Details
              </button>
            </div>
          ))}
        </div>

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