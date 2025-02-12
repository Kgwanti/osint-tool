
import { ResearchEngine } from '../../research_lib/src/engine';
import { InsightGenerator } from '../../research_lib/src/insights';

const researchEngine = new ResearchEngine();
const insightGenerator = new InsightGenerator();

export interface ResearchInsight {
  topic: string;
  summary: string;
  relevance: number;
  timestamp: string;
  source?: string;
}

export async function generateInsights(executive: string, industry: string): Promise<ResearchInsight[]> {
  const researchData = await researchEngine.fetchData({ 
    query: `${executive} ${industry}`,
    limit: 5
  });
  
  const insights = await insightGenerator.processData(researchData);
  
  return insights.map(insight => ({
    topic: insight.title,
    summary: insight.content,
    relevance: insight.relevanceScore,
    timestamp: new Date().toISOString(),
    source: insight.source
  }));
}
