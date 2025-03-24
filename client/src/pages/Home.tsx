import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ChatInterface from "@/components/ChatInterface";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ChatMessage } from "@shared/schema";

export default function Home() {
  const [sessionId, setSessionId] = useState<string>(() => {
    // Try to get session ID from local storage or create a new one
    const storedSessionId = localStorage.getItem("chatSessionId");
    if (storedSessionId) return storedSessionId;
    
    const newSessionId = uuidv4();
    localStorage.setItem("chatSessionId", newSessionId);
    return newSessionId;
  });
  
  const { toast } = useToast();
  
  // Show status message that we're in demo mode
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Demo Mode Active",
        description: "The chatbot is running in demo mode with mock responses. Provide an OpenAI API key for full functionality.",
        duration: 5000,
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);
  
  // Query to get chat history
  const { 
    data: messages = [], 
    isLoading: isLoadingMessages,
    refetch: refetchMessages
  } = useQuery<ChatMessage[]>({
    queryKey: [`/api/chat/${sessionId}`],
    enabled: !!sessionId
  });
  
  // Mutation to send a message and get AI response
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat/completion", {
        sessionId,
        message
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/chat/${sessionId}`] });
    },
    onError: (error: any) => {
      // Check if it's an OpenAI API rate limit error
      if (error?.response?.status === 429 || error?.response?.data?.type === 'rate_limit_exceeded') {
        toast({
          title: "API Limit Exceeded",
          description: "OpenAI API quota exceeded. Please try again later or update your API key.",
          variant: "destructive"
        });
      } 
      // Check if it's an authentication error
      else if (error?.response?.status === 401 || error?.response?.data?.type === 'authentication_error') {
        toast({
          title: "Authentication Error",
          description: "Invalid OpenAI API key. Please update your API key with a valid key.",
          variant: "destructive"
        });
      }
      else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
      console.error("Error sending message:", error);
    }
  });
  
  // Mutation to clear chat history
  const clearChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", `/api/chat/${sessionId}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/chat/${sessionId}`] });
      toast({
        title: "Success",
        description: "Chat history cleared successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to clear chat history",
        variant: "destructive"
      });
      console.error("Error clearing chat:", error);
    }
  });
  
  // Reset the chat session
  const resetChat = () => {
    clearChatMutation.mutate();
  };
  
  // Handle sending a new message
  const handleSendMessage = (message: string) => {
    if (message.trim() === "") return;
    sendMessageMutation.mutate(message);
  };
  
  // Add welcome message if no messages exist yet
  useEffect(() => {
    if (!isLoadingMessages && messages && messages.length === 0) {
      // Add initial welcome message by simulating a user asking for help
      sendMessageMutation.mutate("Hello");
    }
  }, [isLoadingMessages, messages]);

  return (
    <ChatInterface
      messages={messages || []}
      isLoading={isLoadingMessages || sendMessageMutation.isPending}
      onSendMessage={handleSendMessage}
      onResetChat={resetChat}
    />
  );
}
