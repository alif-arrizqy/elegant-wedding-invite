import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FooterSectionData } from "@/constant/WeddingData";
import { DecorativeDivider } from "@/components/DecorativeDivider";

export const Footer = () => {
  const coupleNames = FooterSectionData.coupleNames;
  
  return (
    <footer className="py-16 px-4 bg-gradient-to-b from-background to-gradient-romantic border-t border-border relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary" />
            </motion.div>
            <h3 className="font-script text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
              {coupleNames}
            </h3>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Heart className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary" />
            </motion.div>
          </div>
        </ScrollReveal>
        
        <DecorativeDivider variant="heart" className="my-8" />
        
        <ScrollReveal delay={0.2}>
          <div className="max-w-2xl mx-auto space-y-2">
            <p className="text-muted-foreground font-sans italic text-sm md:text-base leading-relaxed">
              "{FooterSectionData.quote}"
            </p>
            <p className="text-xs md:text-sm text-foreground/60 font-sans">
              — {FooterSectionData.quoteSource}
            </p>
          </div>

          <div className="pt-6 border-t border-border/50 space-y-1">
            <p className="text-sm md:text-sm text-foreground/70 font-sans">
              © {new Date().getFullYear()} {coupleNames}. Made with love.
            </p>
            {/* Watermark */}
            <p className="text-[10px] text-foreground/30 hover:text-foreground/60 transition-all duration-300 font-sans cursor-default">
              Designed by <a href="https://instagram.com/alif_arrizqy" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">@alif_arrizqy</a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
