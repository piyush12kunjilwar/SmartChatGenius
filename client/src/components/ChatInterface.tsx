import React, { useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import AnimatedMessageBubble from "./AnimatedMessageBubble";
import EnhancedTypingIndicator from "./EnhancedTypingIndicator";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@shared/schema";
import { motion } from "framer-motion";
import AnimatedHeader from "./AnimatedHeader";
import AnimatedBackground from "./AnimatedBackground";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onResetChat: () => void;
}

export default function ChatInterface({
  messages,
  isLoading,
  onSendMessage,
  onResetChat
}: ChatInterfaceProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="chat-container relative h-screen flex flex-col bg-white text-neutral-900 overflow-hidden">
      {/* 3D Animated Background */}
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Enhanced 3D Header */}
        <header className="bg-white bg-opacity-80 backdrop-blur-sm border-b border-neutral-200 p-4 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <AnimatedHeader isAiResponding={isLoading} />
              <motion.button 
                onClick={onResetChat}
                className="text-blue-600 hover:text-blue-800 transition-colors p-3 rounded-full hover:bg-blue-50 shadow-sm"
                aria-label="Reset chat"
                whileHover={{ scale: 1.1, rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </header>

        {/* Enhanced Messages Container with 3D effect */}
        <motion.div 
          ref={messagesContainerRef}
          className="messages-container flex-1 px-4 py-6 overflow-y-auto scroll-smooth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((message) => (
              <AnimatedMessageBubble
                key={message.id}
                message={message}
              />
            ))}

            {isLoading && (
              <EnhancedTypingIndicator />
            )}
          </div>
        </motion.div>

        {/* Enhanced Input Area */}
        <motion.div 
          className="bg-white bg-opacity-95 backdrop-blur-sm border-t border-neutral-200 p-4 shadow-lg"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="max-w-4xl mx-auto">
            <ChatInput 
              onSendMessage={onSendMessage}
              isLoading={isLoading}
            />
            <motion.div 
              className="text-xs text-neutral-500 mt-2 text-center"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Our AI assistant uses advanced 3D natural language processing to provide interactive responses.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
