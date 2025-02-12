
import OpenRouter from "openrouter";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function generateResponse(prompt: string) {
  try {
    const response = await openrouter.chat.completions.create({
      model: "deepseek/deepseek-r1:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}
