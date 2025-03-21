import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "sk-your-api-key"
});

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

const SYSTEM_PROMPT = `You are a helpful AI assistant. Respond to user queries in a natural, conversational manner. 
You should be friendly, helpful, and concise. If you don't know the answer to something, be honest about it.
Maintain context from the conversation history.`;

/**
 * Generate a response from OpenAI based on the conversation history
 */
export async function generateChatResponse(
  messages: Message[]
): Promise<string> {
  try {
    // Add system message at the beginning if not present
    const fullMessages = messages[0]?.role === "system" 
      ? [...messages] 
      : [{ role: "system", content: SYSTEM_PROMPT }, ...messages];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: fullMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    return "I'm sorry, I encountered an error while processing your request. Please try again later.";
  }
}

export default {
  generateChatResponse,
};
