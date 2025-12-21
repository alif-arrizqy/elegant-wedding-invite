import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DecorativeDividerProps {
  variant?: "heart" | "floral";
  className?: string;
}

export const DecorativeDivider = ({ variant = "heart", className = "" }: DecorativeDividerProps) => {
  return (
    <div className={`floral-divider ${className}`}>
      <div className="flex items-center w-full gap-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 2
          }}
          className="mx-2 md:mx-4"
        >
          {variant === "heart" ? (
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent absolute -top-1 -right-1" />
            </div>
          )}
        </motion.div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  );
};

