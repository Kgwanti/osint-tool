
import OpenRouter from "openrouter";

const openrouter = new OpenRouter({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await openrouter.chat.completions.create({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      headers: {
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AI Research Assistant",
        "Content-Type": "application/json"
      }
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response format from AI service");
    }

    return response.choices[0].message.content;
  } catch (error: any) {
    console.error("AI Service Error:", error?.response?.data || error.message);
    if (error?.response?.status === 401) {
      return "Authentication error. Please check your API key.";
    }
    return "I apologize, but I encountered an error. Please try again.";
  }
}
