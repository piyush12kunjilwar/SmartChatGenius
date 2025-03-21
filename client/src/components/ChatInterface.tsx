import React, { useEffect, useRef } from "react";
import { Bot, RefreshCw, Paperclip, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@shared/schema";
import { motion } from "framer-motion";

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
    <div className="chat-container h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 p-4 shadow-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white"
            >
              <Bot className="h-5 w-5" />
            </motion.div>
            <div>
              <h1 className="font-semibold text-lg">AI Assistant</h1>
              <div className="flex items-center text-xs text-neutral-500">
                <span className="flex h-2 w-2 relative mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-500"></span>
                </span>
                Online
              </div>
            </div>
          </div>
          <div>
            <button 
              onClick={onResetChat}
              className="text-neutral-500 hover:text-neutral-700 transition-colors p-2 rounded-full hover:bg-neutral-100"
              aria-label="Reset chat"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="messages-container flex-1 px-4 py-6 overflow-y-auto bg-neutral-50 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}

          {isLoading && (
            <TypingIndicator />
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-neutral-200 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput 
            onSendMessage={onSendMessage}
            isLoading={isLoading}
          />
          <div className="text-xs text-neutral-400 mt-2 text-center">
            Our AI assistant uses natural language processing to provide helpful responses.
          </div>
        </div>
      </div>
    </div>
  );
}
