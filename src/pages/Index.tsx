import React, { useRef, useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;

const Index = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInteraction = () => {
    setScore(prev => prev + 10 * streak);
    setStreak(prev => prev + 1);
    if (score > level * 1000) {
      setLevel(prev => prev + 1);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`
        },
        body: JSON.stringify({ message: query })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I encountered an error processing your request." 
      }]);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="organic-shape w-96 h-96 top-0 right-0" />
      <div className="organic-shape w-[30rem] h-[30rem] bottom-0 left-0" />

      <AnimatedBackground />
      <div className="container max-w-4xl mx-auto p-4 flex flex-col min-h-screen relative">
        <div className="fixed top-4 right-4 flex gap-4 z-50">
          <div className="bg-primary/10 backdrop-blur-lg rounded-xl p-3 animate-glow">
            <span className="shimmer-text">Score: {score}</span>
          </div>
          <div className="bg-primary/10 backdrop-blur-lg rounded-xl p-3 animate-tilt-bounce">
            <span className="shimmer-text">Level {level}</span>
          </div>
          <div className="bg-primary/10 backdrop-blur-lg rounded-xl p-3">
            <span className="shimmer-text">Streak: {streak}🔥</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-float">
            AI Research Assistant
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="rounded-full"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4 scroll-smooth">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message p-4 rounded-2xl max-w-[80%] hover-scale messages-transition floating-element parallax-scroll ${
                message.role === 'user'
                  ? 'bg-primary/5 text-primary ml-auto'
                  : 'bg-muted/50 mr-auto'
              }`}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="chat-message bg-muted/50 p-4 rounded-2xl max-w-[80%] mr-auto flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse" />
              Thinking...
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-background/50 backdrop-blur-xl p-4 rounded-2xl">
          <SearchBar onSearch={handleSearch} placeholder="Ask me anything..." />
        </div>
      </div>
    </div>
  );
};

export default Index;