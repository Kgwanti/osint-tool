
import { FirecrawlApp } from '@mendable/firecrawl-js';
import { deepResearch } from '../../research_lib/lib/deep-research/deep-research';
import { createModel } from '../../research_lib/lib/deep-research/ai/providers';

export interface ResearchInsight {
  topic: string;
  summary: string;
  relevance: number;
  timestamp: string;
  source?: string;
}

export async function generateInsights(executive: string, industry: string): Promise<ResearchInsight[]> {
  const model = createModel({
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY
  });

  const query = `Research about ${executive} in the ${industry} industry`;
  const research = await deepResearch({
    query,
    breadth: 3,
    depth: 2,
    model,
    firecrawlKey: process.env.FIRECRAWL_KEY
  });
  
  return research.learnings.map(learning => ({
    topic: "Research Finding",
    summary: learning,
    relevance: 90,
    timestamp: new Date().toISOString(),
    source: "AI Research"
  }));
}
