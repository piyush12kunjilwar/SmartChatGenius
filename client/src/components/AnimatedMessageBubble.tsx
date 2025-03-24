import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from '@shared/schema';
import { Bot, User, Sparkles } from 'lucide-react';

interface AnimatedMessageBubbleProps {
  message: ChatMessage;
}

const AnimatedMessageBubble: React.FC<AnimatedMessageBubbleProps> = ({ message }) => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  
  useEffect(() => {
    // Reset animation state for new messages
    setAnimationCompleted(false);
  }, [message.id]);
  
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 relative`}
      initial={{ 
        opacity: 0, 
        y: 30, 
        scale: 0.9,
        x: isUser ? 40 : -40,
        rotateY: isUser ? 20 : -20,
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        x: 0,
        rotateY: 0
      }}
      transition={{ 
        type: "spring", 
        damping: 20,
        stiffness: 260,
        mass: 0.8,
        duration: 0.7
      }}
      onAnimationComplete={() => setAnimationCompleted(true)}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D perspective container */}
      <motion.div 
        className={`flex items-start max-w-3xl ${isUser ? 'flex-row-reverse' : 'flex-row'} relative`}
        animate={{
          rotateX: animationCompleted ? [0, 2, 0] : 0,
          rotateY: animationCompleted ? [0, isUser ? 3 : -3, 0] : 0,
          z: animationCompleted ? [0, 10, 0] : 0
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center'
        }}
        whileHover={{ 
          scale: 1.02,
          rotateY: isUser ? 5 : -5,
          z: 20
        }}
      >
        {/* Enhanced Avatar with 3D effects */}
        <motion.div 
          className={`flex items-center justify-center h-10 w-10 rounded-full ${
            isUser ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-purple-500 to-purple-700'
          } text-white shadow-lg mr-3 ml-3 z-10`}
          initial={{ rotate: isUser ? 45 : -45, scale: 0.8 }}
          animate={{ 
            rotate: 0, 
            scale: 1,
            boxShadow: animationCompleted 
              ? [
                  '0 4px 12px rgba(0, 0, 255, 0.2)', 
                  '0 4px 20px rgba(0, 0, 255, 0.4)',
                  '0 4px 12px rgba(0, 0, 255, 0.2)'
                ] 
              : '0 4px 12px rgba(0, 0, 255, 0.2)'
          }}
          transition={{ 
            type: "spring", 
            stiffness: 260, 
            damping: 20,
            boxShadow: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3
            }
          }}
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
          
          {/* Glowing ring around avatar */}
          <motion.div 
            className={`absolute inset-0 rounded-full ${
              isUser ? 'bg-blue-400' : 'bg-purple-400'
            } -z-10 blur-[2px] opacity-60`}
            animate={{ 
              scale: animationCompleted ? [1, 1.2, 1] : 1,
              opacity: animationCompleted ? [0.4, 0.7, 0.4] : 0.4
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Particle effects around avatar - only for AI */}
          {!isUser && animationCompleted && (
            <>
              <motion.div 
                className="absolute -top-1 -right-1 h-2 w-2 bg-purple-300 rounded-full"
                animate={{ 
                  y: [-3, 0, -3],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute top-1 -left-1 h-1.5 w-1.5 bg-purple-300 rounded-full"
                animate={{ 
                  y: [-2, 1, -2],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.7, 1.1, 0.7]
                }}
                transition={{ 
                  duration: 2.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.8
                }}
              />
              <motion.div 
                className="absolute -bottom-1 left-0 h-1.8 w-1.8 bg-purple-300 rounded-full"
                animate={{ 
                  y: [2, -1, 2],
                  opacity: [0.5, 1, 0.5],
                  scale: [0.7, 1.3, 0.7]
                }}
                transition={{ 
                  duration: 1.7,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.3
                }}
              />
            </>
          )}
        </motion.div>
        
        {/* Enhanced message bubble with 3D effects */}
        <div className={`relative ${isUser ? 'mr-2' : 'ml-2'}`}>
          {/* Glow effect behind message bubble */}
          <motion.div
            className={`absolute -inset-1.5 rounded-2xl opacity-50 blur-md ${
              isUser ? 'bg-blue-500/30' : 'bg-purple-500/30'
            }`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: animationCompleted ? [0.3, 0.5, 0.3] : 0.3,
              scale: animationCompleted ? [0.98, 1.02, 0.98] : 1
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Main message bubble with enhanced 3D styling */}
          <motion.div
            className={`p-4 rounded-2xl relative ${
              isUser 
                ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-br-none' 
                : 'bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-bl-none'
            } shadow-lg z-10`}
            initial={{ x: isUser ? 30 : -30, rotateY: isUser ? 20 : -20 }}
            animate={{ 
              x: 0,
              rotateY: 0,
              boxShadow: animationCompleted
                ? [
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    '0 15px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  ]
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              boxShadow: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 4
              }
            }}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Message content */}
            <div className="relative z-10">
              {message.content}
            </div>
            
            {/* Subtle highlight overlay for 3D lighting effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none"
              style={{
                borderTopLeftRadius: '1rem',
                borderTopRightRadius: '1rem',
                borderBottomLeftRadius: isUser ? '1rem' : '0',
                borderBottomRightRadius: isUser ? '0' : '1rem',
              }}
            />
            
            {/* Interactive particle effect for AI messages */}
            {!isUser && animationCompleted && (
              <motion.div 
                className="absolute -top-2 -right-2 text-purple-300"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Sparkles size={16} />
              </motion.div>
            )}
            
            {/* Enhanced shimmer effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl opacity-0 pointer-events-none"
              animate={{ 
                opacity: [0, 0.4, 0],
                x: isUser ? [-100, 100] : [100, -100],
                y: [-5, 5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "loop",
                repeatDelay: 3
              }}
            />
          </motion.div>
          
          {/* Enhanced 3D tail for message bubble */}
          <motion.div 
            className={`absolute ${
              isUser ? '-bottom-2 right-0' : '-bottom-2 left-0'
            } h-4 w-4 ${
              isUser ? 'bg-blue-700' : 'bg-purple-700'
            }`}
            style={{ 
              clipPath: isUser 
                ? 'polygon(0 0, 100% 0, 100% 100%)' 
                : 'polygon(0 0, 100% 0, 0 100%)',
              transformStyle: 'preserve-3d',
              zIndex: 5
            }}
          />
          
          {/* Shadow for the tail */}
          <motion.div 
            className={`absolute ${
              isUser ? '-bottom-2 right-0' : '-bottom-2 left-0'
            } h-4 w-4 bg-black/10 blur-sm`}
            style={{ 
              clipPath: isUser 
                ? 'polygon(0 0, 100% 0, 100% 100%)' 
                : 'polygon(0 0, 100% 0, 0 100%)',
              transform: 'translateZ(-1px)',
              zIndex: 4
            }}
          />
        </div>
      </motion.div>
      
      {/* Holographic light beam effects - only for AI messages */}
      {!isUser && animationCompleted && (
        <motion.div
          className="absolute -inset-6 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Horizontal beam */}
          <motion.div 
            className="w-[300%] h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent absolute top-1/2 -left-full opacity-40"
            animate={{ 
              left: ['100%', '-100%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              left: {
                repeat: Infinity,
                duration: 3,
                ease: "linear",
                repeatDelay: 5
              },
              opacity: {
                duration: 1.5,
                times: [0, 0.5, 1],
                repeat: Infinity,
                repeatDelay: 5
              }
            }}
          />
          
          {/* Additional light beams */}
          <motion.div 
            className="w-[80%] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent absolute top-[40%] -left-full opacity-30"
            animate={{ 
              left: ['100%', '-100%']
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              repeatDelay: 4,
              delay: 1
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedMessageBubble;