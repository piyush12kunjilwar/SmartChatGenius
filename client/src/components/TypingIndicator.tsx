import React from "react";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex mb-6 items-end">
      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
        <Bot className="h-4 w-4" />
      </div>
      <div className="bg-white rounded-t-lg rounded-br-lg p-3 shadow-sm border border-neutral-200">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                delay: i * 0.2 
              }}
              className="text-lg leading-none"
            >
              •
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
