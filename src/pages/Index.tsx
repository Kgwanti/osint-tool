import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ExecutiveCard } from "@/components/ExecutiveCard";
import { UserProfile } from "@/components/UserProfile"; // Added import

interface Executive {
  id: number;
  name: string;
  position: string;
  company: string;
  industry: string;
  linkedin?: string;
}

export default function Index() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://0.0.0.0:3000/api/executives', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401) {
          window.location.href = '/signin';
          throw new Error('Unauthorized');
        }
        return res;
      })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setExecutives(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
        <SearchBar />
        <FilterBar />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {executives.map((executive) => (
            <ExecutiveCard key={executive.id} {...executive} />
          ))}
        </div>
        {error && <div className="text-red-500 text-center">{error}</div>}
        {executives.length === 0 && !error && (
            <div className="text-center text-gray-500 py-12">
              No executives found. Try adjusting your search criteria.
            </div>
          )}
      </div>
        <div className="space-y-4">
          <UserProfile userId={1} />
          <ActivityFeed />
          <ResearchInsights 
            executive={executives[0]?.name}
            industry={executives[0]?.industry}
          />
        </div>
      </div>
    </div>
  );
}