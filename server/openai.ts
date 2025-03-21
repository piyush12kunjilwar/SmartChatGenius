import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  name?: string; // Added to be compatible with OpenAI's ChatCompletionMessageParam
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
      : [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages];

    // Convert our message format to OpenAI's expected format
    const apiMessages: ChatCompletionMessageParam[] = fullMessages.map(msg => ({
      role: msg.role as "system" | "user" | "assistant", 
      content: msg.content
    }));
    
    // Use proper typings for OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "I'm not sure how to respond to that.";
  } catch (error) {
    console.error("Error generating chat response:", error);
    
    // Re-throw the error to be handled by the router
    throw error;
  }
}

export default {
  generateChatResponse,
};
