
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { FilterBar } from "@/components/FilterBar";
import { ExecutiveCard } from "@/components/ExecutiveCard";

// Mock data for demonstration
const mockExecutives = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Managing Partner",
    company: "Johnson & Associates LLP",
    industry: "Law",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "Real Estate Ventures International",
    industry: "Real Estate",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  // Add more mock data as needed
];

const Index = () => {
  const [searchResults, setSearchResults] = useState(mockExecutives);
  const [filter, setFilter] = useState("");

  const handleSearch = (query: string) => {
    const results = mockExecutives.filter(
      (exec) =>
        exec.name.toLowerCase().includes(query.toLowerCase()) ||
        exec.company.toLowerCase().includes(query.toLowerCase()) ||
        exec.position.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleFilter = (industryFilter: string) => {
    setFilter(industryFilter);
    const filtered = mockExecutives.filter(
      (exec) => exec.industry.toLowerCase() === industryFilter
    );
    setSearchResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-serif text-4xl font-bold text-gray-900">
            Executive Intelligence
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover key executives in real estate and law firms. Access comprehensive profiles and professional networks.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <SearchBar onSearch={handleSearch} />
            <FilterBar onFilterChange={handleFilter} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.map((executive) => (
              <ExecutiveCard key={executive.id} {...executive} />
            ))}
          </div>

          {searchResults.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No executives found. Try adjusting your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
