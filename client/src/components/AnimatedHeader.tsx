import { motion } from 'framer-motion';
import RobotModel from './RobotModel';

interface AnimatedHeaderProps {
  isAiResponding: boolean;
}

const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({ isAiResponding }) => {
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-center w-full py-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Glowing backdrop for robot */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/10 to-blue-500/5 rounded-xl z-0" />
      
      {/* Enhanced background effects */}
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-xl opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 70% 50%, rgba(124, 58, 237, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            'radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.1) 0%, rgba(0, 0, 0, 0) 70%)'
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 items-center w-full max-w-4xl mx-auto relative z-10">
        {/* Large 3D Robot - Takes up more space now */}
        <motion.div 
          className="h-60 w-full relative col-span-1 md:order-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: 1,
            opacity: 1,
            rotateY: isAiResponding ? [0, 360] : 0
          }}
          transition={{ 
            duration: 2, 
            repeat: isAiResponding ? Infinity : 0,
            ease: "linear",
            opacity: { duration: 0.5 }
          }}
        >
          <RobotModel isActive={isAiResponding} />
        </motion.div>
        
        {/* Left Column Text */}
        <motion.div
          className="flex flex-col items-end justify-center pr-4 space-y-3 md:order-1 col-span-1 mt-4 md:mt-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
            animate={{
              width: isAiResponding ? [20, 80, 20] : 20
            }}
            transition={{
              duration: 2,
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse"
            }}
          />
          
          <motion.h2 
            className="text-2xl font-bold text-right text-blue-600"
            animate={{ 
              opacity: isAiResponding ? [0.7, 1] : 0.9,
            }}
            transition={{ 
              duration: 1, 
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            Advanced
          </motion.h2>
          
          <motion.div 
            className="text-sm text-gray-600 text-right"
            animate={{
              y: isAiResponding ? [0, -2, 0] : 0
            }}
            transition={{
              duration: 2,
              repeat: isAiResponding ? Infinity : 0
            }}
          >
            Neural Network
            <br />
            Machine Learning
            <br />
            Pattern Recognition
          </motion.div>
        </motion.div>
        
        {/* Right Column Text */}
        <motion.div
          className="flex flex-col items-start justify-center pl-4 space-y-3 md:order-3 col-span-1 mt-4 md:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.div 
            className="h-1 w-20 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
            animate={{
              width: isAiResponding ? [20, 80, 20] : 20
            }}
            transition={{
              duration: 2,
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse"
            }}
          />
          
          <motion.h2 
            className="text-2xl font-bold text-purple-600"
            animate={{ 
              opacity: isAiResponding ? [0.7, 1] : 0.9,
            }}
            transition={{ 
              duration: 1, 
              repeat: isAiResponding ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            Intelligence
          </motion.h2>
          
          <motion.div 
            className="text-sm text-gray-600"
            animate={{
              y: isAiResponding ? [0, -2, 0] : 0
            }}
            transition={{
              duration: 2,
              repeat: isAiResponding ? Infinity : 0
            }}
          >
            Natural Language
            <br />
            Contextual Memory
            <br />
            Adaptive Learning
          </motion.div>
        </motion.div>
      </div>
      
      {/* Central Title */}
      <motion.div 
        className="text-center mt-4 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: isAiResponding ? ['0% center', '100% center', '0% center'] : '0% center',
            scale: isAiResponding ? [1, 1.02, 1] : 1,
          }}
          transition={{ 
            duration: isAiResponding ? 5 : 0, 
            repeat: isAiResponding ? Infinity : 0,
            repeatType: "reverse"
          }}
          style={{
            backgroundSize: '200% auto'
          }}
        >
          AI Assistant
        </motion.h1>
        
        <motion.p 
          className="mt-2 text-lg text-gray-600"
          animate={{ 
            opacity: isAiResponding ? [0.7, 1] : 0.9
          }}
          transition={{ 
            duration: 1, 
            repeat: isAiResponding ? Infinity : 0,
            repeatType: "reverse" 
          }}
        >
          {isAiResponding 
            ? "Processing request..." 
            : "Ask me anything!"}
        </motion.p>
      </motion.div>
      
      {/* Enhanced bottom border with pulsing effect */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent"
        animate={{
          opacity: [0.3, 0.9, 0.3],
          scaleX: [0.8, 1, 0.8],
          backgroundPosition: ['0% center', '100% center', '0% center'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          backgroundSize: '200% auto'
        }}
      />
    </motion.div>
  );
};

export default AnimatedHeader;