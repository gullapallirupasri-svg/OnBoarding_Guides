import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu } from 'lucide-react';

const GeneratingAnimation = () => {
  const floatingOrbs = Array.from({ length: 6 }, (_, i) => i);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-20 px-8"
    >
      {/* Main Animation Container */}
      <div className="relative w-48 h-48 mb-8">
        {/* Central Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary-500/20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Central Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-primary-500/30"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles size={32} className="text-white" />
          </motion.div>
        </div>

        {/* Floating Orbs */}
        {floatingOrbs.map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary-400"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 80],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 80],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Orbiting Ring */}
        <motion.div
          className="absolute inset-[-10px] rounded-full border-2 border-dashed border-primary-500/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Text */}
      <motion.h3
        className="text-2xl font-bold gradient-text mb-3"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Generating Your Guide
      </motion.h3>

      <div className="flex items-center gap-6 text-surface-500 text-sm">
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        >
          <Brain size={16} className="text-primary-400" />
          Analyzing context
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          <Cpu size={16} className="text-purple-400" />
          Building sections
        </motion.div>
        <motion.div
          className="flex items-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
        >
          <Sparkles size={16} className="text-pink-400" />
          Polishing content
        </motion.div>
      </div>

      <p className="text-xs text-surface-600 mt-6">
        This may take 15-30 seconds depending on the guide length
      </p>
    </motion.div>
  );
};

export default GeneratingAnimation;
