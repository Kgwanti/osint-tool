import OpenRouter from "openrouter";

export async function generateResponse(prompt: string): Promise<string> {
  if (!prompt) return "Please provide a message.";

  const OPENROUTER_API_KEY = "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";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://replit.com",
        "X-Title": "Replit AI Research Assistant"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1",
        messages: [{ 
          role: "user", 
          content: prompt 
        }],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}