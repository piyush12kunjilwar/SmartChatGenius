import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  };

  // Update textarea height when message changes
  useEffect(() => {
    autoResizeTextarea();
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end space-x-2">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border border-neutral-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
          placeholder="Type your message..."
          rows={1}
          disabled={isLoading}
        />
        <button
          type="button"
          disabled={isLoading}
          className="absolute right-3 bottom-3 text-neutral-400 hover:text-neutral-600 transition-colors disabled:opacity-50"
          aria-label="Attach file"
        >
          <Paperclip className="h-5 w-5" />
        </button>
      </div>
      <motion.div
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 transition-colors p-0"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </Button>
      </motion.div>
    </form>
  );
}
