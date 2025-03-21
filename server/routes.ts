import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import openai, { type Message } from "./openai";
import { chatCompletionSchema, insertChatMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat API routes
  const router = express.Router();

  // Get chat history
  router.get("/chat/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      const messages = await storage.getMessagesBySessionId(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  // Clear chat history
  router.delete("/chat/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({ error: "Session ID is required" });
      }

      await storage.clearChatSession(sessionId);
      res.json({ message: "Chat session cleared successfully" });
    } catch (error) {
      console.error("Error clearing chat session:", error);
      res.status(500).json({ error: "Failed to clear chat session" });
    }
  });

  // Send message and get AI response
  router.post("/chat/completion", async (req: Request, res: Response) => {
    try {
      // Validate request
      const validatedData = chatCompletionSchema.parse(req.body);
      const { sessionId, message } = validatedData;

      // Store user message
      const userMessage = await storage.createMessage({
        sessionId,
        content: message,
        role: "user",
      });

      // Get conversation history
      const chatHistory = await storage.getMessagesBySessionId(sessionId);
      
      // Convert to OpenAI message format
      const messages: Message[] = chatHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content
      }));

      // Generate AI response
      const aiResponse = await openai.generateChatResponse(messages);

      // Store AI response
      const assistantMessage = await storage.createMessage({
        sessionId,
        content: aiResponse,
        role: "assistant",
      });

      // Return both messages
      res.json({
        userMessage,
        assistantMessage
      });
    } catch (error: any) {
      console.error("Error in chat completion:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ error: validationError.message });
      }
      
      // Handle OpenAI API errors more specifically
      if (error?.error?.type === 'insufficient_quota' || error?.status === 429) {
        console.log('OpenAI API quota exceeded, returning 429 status');
        return res.status(429).json({ 
          error: "OpenAI API rate limit exceeded. Please check your API key quota.",
          type: "rate_limit_exceeded"
        });
      }
      
      res.status(500).json({ error: "Failed to process chat completion" });
    }
  });

  // Register routes
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}
