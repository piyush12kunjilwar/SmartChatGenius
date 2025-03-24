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
// Flag to enable/disable mock mode (temporary until valid API key is provided)
const USE_MOCK_RESPONSES = true;

// Mock response generator
function generateMockResponse(messages: Message[]): string {
  // Get the last user message
  const lastUserMessage = [...messages].reverse().find(msg => msg.role === "user");
  
  if (!lastUserMessage) {
    return "I'm here to help. What would you like to know?";
  }
  
  const userMessage = lastUserMessage.content.toLowerCase();
  
  // Simple pattern matching for common questions
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    return "Hello! I'm your friendly AI assistant. How can I help you today?";
  } else if (userMessage.includes("how are you")) {
    return "I'm functioning well, thank you for asking! How can I assist you?";
  } else if (userMessage.includes("weather")) {
    return "I don't have access to real-time weather data. You would need to check a weather service for that information.";
  } else if (userMessage.includes("name")) {
    return "I'm an AI assistant created to help answer your questions and engage in conversation.";
  } else if (userMessage.includes("thank")) {
    return "You're welcome! Feel free to ask if you need anything else.";
  } else {
    return "That's an interesting question. In a fully functioning system, I would provide a detailed response using the OpenAI API. Currently, I'm operating in demo mode without API access.";
  }
}

export async function generateChatResponse(
  messages: Message[]
): Promise<string> {
  try {
    // If in mock mode, return a mock response
    if (USE_MOCK_RESPONSES) {
      console.log("Using mock response generator (no valid API key available)");
      return generateMockResponse(messages);
    }
    
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
