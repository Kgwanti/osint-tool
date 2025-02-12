
import OpenRouter from "openrouter";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generateResponse(prompt: string) {
  try {
    const response = await openrouter.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      headers: {
        "HTTP-Referer": "https://replit.com",
        "X-Title": "Executive Research Assistant"
      }
    });

    return response.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
}
