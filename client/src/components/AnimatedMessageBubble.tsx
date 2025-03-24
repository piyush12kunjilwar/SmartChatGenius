import { motion } from 'framer-motion';
import { ChatMessage } from '@shared/schema';
import { Bot, User } from 'lucide-react';

interface AnimatedMessageBubbleProps {
  message: ChatMessage;
}

const AnimatedMessageBubble: React.FC<AnimatedMessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div 
        className={`flex items-start max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={`flex items-center justify-center h-8 w-8 rounded-full ${
            isUser ? 'bg-blue-600' : 'bg-purple-600'
          } text-white shadow-md mr-2 ml-2`}
          initial={{ rotate: isUser ? 25 : -25 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </motion.div>
        
        <div className={`relative ${isUser ? 'mr-2' : 'ml-2'}`}>
          <motion.div
            className={`p-3 rounded-2xl ${
              isUser 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none' 
                : 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-bl-none'
            } shadow-md`}
            initial={{ x: isUser ? 20 : -20 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {message.content}
          </motion.div>
          
          {/* Decorative elements for a more 3D feel */}
          <motion.div 
            className={`absolute ${
              isUser ? '-bottom-1 right-0' : '-bottom-1 left-0'
            } h-3 w-3 bg-gradient-to-br ${
              isUser ? 'from-blue-600 to-blue-700' : 'from-purple-600 to-purple-700'
            }`}
            style={{ 
              clipPath: isUser 
                ? 'polygon(0 0, 100% 0, 100% 100%)' 
                : 'polygon(0 0, 100% 0, 0 100%)' 
            }}
          />
          
          {/* Shimmer effect */}
          <motion.div 
            className="absolute inset-0 bg-white rounded-2xl opacity-0 pointer-events-none"
            animate={{ 
              opacity: [0, 0.1, 0],
              x: isUser ? [-20, 100] : [100, -20]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "loop",
              repeatDelay: 2
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedMessageBubble;