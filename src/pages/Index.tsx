
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export default function Index() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I encountered an error processing your request." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="organic-shape bg-primary/20 w-72 h-72 top-0 right-0" />
      <div className="organic-shape bg-primary/20 w-96 h-96 bottom-0 left-0" />
      
      <div className="container max-w-4xl mx-auto p-4 flex flex-col min-h-screen">
        <div className="flex justify-end mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message p-4 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground ml-auto'
                  : 'bg-muted mr-auto'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bg-muted p-4 rounded-lg max-w-[80%] mr-auto">
              Thinking...
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 rounded-lg">
          <SearchBar onSearch={handleSearch} placeholder="Ask me anything..." />
        </div>
      </div>
    </div>
  );
}
