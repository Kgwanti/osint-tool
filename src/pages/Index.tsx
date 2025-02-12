import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";

export default function Index() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/research/insights', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.summary || "I couldn't find relevant information." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error processing your request." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto p-4 flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-[80%] ${
              message.role === 'user'
                ? 'bg-primary text-primary-foreground ml-auto'
                : 'bg-muted mr-auto'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-muted p-4 rounded-lg max-w-[80%] mr-auto">
            Thinking...
          </div>
        )}
      </div>
      <div className="sticky bottom-0 bg-background p-4">
        <SearchBar onSearch={handleSearch} placeholder="Ask me anything..." />
      </div>
    </div>
  );
}