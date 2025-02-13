
import OpenRouter from "openrouter";

export async function generateResponse(prompt: string): Promise<string> {
  if (!prompt) return "Please provide a message.";
  
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://replit.com",
        "X-Title": "Replit AI Research Assistant"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ 
          role: "user", 
          content: prompt 
        }],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenRouter API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate response");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response content received");
    }

    return content;
  } catch (error: any) {
    console.error("Chat error:", error);
    return "I apologize, but I encountered an error processing your request. Please try again.";
  }
}
