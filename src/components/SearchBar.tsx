
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { generateInsights } from "@/services/researchService";

interface SearchBarProps {
  onResultsFound?: (results: any[]) => void;
}

export const SearchBar = ({ onResultsFound }: SearchBarProps) => {
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSearching(true);
    
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    
    try {
      const insights = await generateInsights(query, "all");
      if (onResultsFound) {
        onResultsFound(insights);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
      <div className="relative">
        <Input
          name="search"
          placeholder="Search executives by name, company, or position..."
          className="w-full h-12 pl-4 pr-12 text-lg border-2 border-gray-200 rounded-lg focus:border-purple-300 transition-colors"
        />
        <Button 
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          disabled={isSearching}
        >
          <Search className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </form>
  );
};
