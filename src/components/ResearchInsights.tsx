
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResearchInsight {
  topic: string;
  summary: string;
  relevance: number;
  timestamp: string;
  source?: string;
}

export const ResearchInsights = ({ executive, industry }: { executive?: string; industry?: string }) => {
  const [insights, setInsights] = useState<ResearchInsight[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!executive && !industry) return;
    
    setLoading(true);
    fetch(`/api/research/insights?executive=${executive}&industry=${industry}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setInsights(data))
      .finally(() => setLoading(false));
  }, [executive, industry]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Research Insights</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center">Loading insights...</div>
        ) : (
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{insight.topic}</h3>
                  <Badge variant="secondary">
                    Relevance: {insight.relevance}%
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{insight.summary}</p>
                {insight.source && (
                  <div className="mt-2 text-xs text-gray-400">
                    Source: {insight.source}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
