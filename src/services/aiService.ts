
import OpenRouter from "openrouter";

const openrouter = new OpenRouter({
  apiKey: "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",
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const response = await openrouter.chat.completions.create({
      model: "deepseek-ai/deepseek-coder-33b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      headers: {
        "HTTP-Referer": "https://replit.com",
        "X-Title": "AI Research Assistant"
      }
    });

    if (!response.choices?.[0]?.message?.content) {
      throw new Error("No response received from AI");
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I apologize, but I encountered an error processing your request. Please try again.";
  }
}
