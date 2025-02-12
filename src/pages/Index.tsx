import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ExecutiveCard } from "@/components/ExecutiveCard";
import { UserProfile } from "@/components/UserProfile";
import { ActivityFeed } from "@/components/ActivityFeed";
import { ResearchInsights } from "@/components/ResearchInsights";
import { SavedExecutives } from "@/components/SavedExecutives";

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
  const [savedExecutives, setSavedExecutives] = useState<Executive[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Executive[]>([]);


  const handleSaveExecutive = (executive: Executive) => {
    setSavedExecutives(prev => {
      const exists = prev.some(exec => exec.id === executive.id);
      if (exists) {
        return prev.filter(exec => exec.id !== executive.id);
      }
      return [...prev, executive];
    });
  };

  const handleRemoveExecutive = (id: number) => {
    setSavedExecutives(prev => prev.filter(exec => exec.id !== id));
  };

  const handleUpdateExecutive = (updatedExecutive: Executive) => {
    setSavedExecutives(prev => 
      prev.map(exec => exec.id === updatedExecutive.id ? updatedExecutive : exec)
    );
  };

  useEffect(() => {
    fetch('/api/executives', {
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
      .then(data => {
        setExecutives(data);
        setSearchResults(data); // Initialize search results with all executives
      })
      .catch(err => setError(err.message));
  }, []);

  useEffect(() => {
    const filteredResults = executives.filter(executive => {
      const searchTermLower = searchQuery.toLowerCase();
      return (
        executive.name.toLowerCase().includes(searchTermLower) ||
        executive.position.toLowerCase().includes(searchTermLower) ||
        executive.company.toLowerCase().includes(searchTermLower) ||
        executive.industry.toLowerCase().includes(searchTermLower)
      );
    });
    setSearchResults(filteredResults);
  }, [searchQuery, executives]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <SearchBar onSearch={(query) => setSearchQuery(query)} />
          <FilterBar />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((executive) => (
              <ExecutiveCard 
                key={executive.id} 
                {...executive} 
                onSave={handleSaveExecutive}
                isSaved={savedExecutives.some(saved => saved.id === executive.id)}
              />
            ))}
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
          {searchResults.length === 0 && !error && (
              <div className="text-center text-gray-500 py-12">
                No executives found. Try adjusting your search criteria.
              </div>
            )}
        </div>
        <div className="space-y-4">
          <UserProfile userId={1} />
          <SavedExecutives 
            executives={savedExecutives}
            onRemove={handleRemoveExecutive}
            onUpdate={handleUpdateExecutive}
          />
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