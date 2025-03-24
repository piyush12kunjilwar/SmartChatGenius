import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import RobotModel from './RobotModel';

interface AnimatedHeaderProps {
  isAiResponding: boolean;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ isAiResponding }) => {
  return (
    <motion.div 
      className="relative flex flex-col items-center mb-8 w-full py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-xl z-0" />
      
      <div className="flex items-center justify-center space-x-4 relative z-10">
        <motion.div 
          className="h-20 w-20 relative"
          animate={{ 
            rotateY: isAiResponding ? [0, 360] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: isAiResponding ? Infinity : 0,
            ease: "linear"
          }}
        >
          <RobotModel isActive={isAiResponding} />
        </motion.div>
        
        <motion.div
          className="flex flex-col items-start space-y-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{ 
              scale: isAiResponding ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5, 
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            AI Assistant
          </motion.h1>
          
          <motion.p 
            className="text-gray-500 text-sm"
            animate={{ 
              opacity: isAiResponding ? [0.6, 1] : 0.8
            }}
            transition={{ 
              duration: 0.8, 
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse" 
            }}
          >
            {isAiResponding 
              ? "Thinking..." 
              : "Ask me anything!"}
          </motion.p>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scaleX: [0.9, 1, 0.9]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.div>
  );
};

export default AnimatedHeader;