import { motion } from "motion/react";

export function CircleDot() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="var(--amber-a10)"
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <motion.circle cx="12" cy="12" r="10" />
      <motion.circle 
        cx="12" 
        cy="12" 
        r="1" 
        initial={{ scale: 1 }} 
        animate={{ scale: [1, 5, 1] }} 
        transition={{ 
          // repeat: Infinity, 
          duration: 4, 
          ease: ["easeInOut"] 
        }} 
      />
    </motion.svg>
  );
}

export default CircleDot;
