import React from "react";
import { format } from "date-fns";
import { Bot } from "lucide-react";
import { ChatMessage } from "@shared/schema";
import { motion } from "framer-motion";

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const formattedTime = format(new Date(message.timestamp), "h:mm a");
  
  // Format message content with markdown-like syntax highlighting
  const formatContent = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  // Animation variants
  const variants = {
    initial: { 
      opacity: 0, 
      y: 10,
      x: isUser ? 5 : -5 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      className={`flex mb-6 items-end ${isUser ? "flex-row-reverse" : ""}`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div 
        className={`p-3 shadow-sm ${
          isUser 
            ? "bg-primary text-white rounded-t-lg rounded-bl-lg"
            : "bg-white rounded-t-lg rounded-br-lg border border-neutral-200"
        }`}
        style={{ maxWidth: "85%" }}
      >
        <div 
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <div className="text-right mt-1">
          <span className={`text-xs ${
            isUser ? "text-primary-200" : "text-neutral-400"
          }`}>
            {formattedTime}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
