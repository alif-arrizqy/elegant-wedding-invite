import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CoupleSectionData } from "@/constant/WeddingData";

export const CoupleSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-romantic">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Mempelai
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground mb-16 font-sans">
            Dengan memohon Rahmat dan Ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami
          </p>
        </ScrollReveal>
        
        <div className="relative flex flex-col md:flex-row md:justify-center md:items-center gap-12 md:gap-8 lg:gap-16">
          {/* Groom */}
          <ScrollReveal delay={0.3} direction="left">
            <div className="flex flex-col items-center text-center space-y-6 w-full md:w-auto">
              <div className="relative">
                <div className="relative w-72 h-[360px] rounded-lg overflow-hidden shadow-elegant">
                  <img 
                    src={CoupleSectionData.groom.img.src} 
                    alt={CoupleSectionData.groom.img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
              </div>
              
              <div className="space-y-3 pt-4 max-w-xs">
                <h3 className="font-serif text-3xl font-bold text-foreground">
                  {CoupleSectionData.groom.name}
                </h3>
                <p className="text-muted-foreground font-sans">
                  {CoupleSectionData.groom.detail}
                </p>
                {CoupleSectionData.groom.instagram && (
                  <a 
                    href={CoupleSectionData.groom.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
          
          {/* Divider with Heart - Desktop */}
          <div className="hidden md:flex md:self-start md:mt-[180px]">
            <ScrollReveal delay={0.5}>
              <motion.div 
                className="bg-card p-5 rounded-full shadow-elegant"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-primary fill-primary" />
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Divider with Heart - Mobile */}
          <div className="md:hidden flex justify-center my-6">
            <ScrollReveal delay={0.5}>
              <motion.div 
                className="bg-card p-4 rounded-full shadow-elegant"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-8 h-8 text-primary fill-primary" />
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Bride */}
          <ScrollReveal delay={0.4} direction="right">
            <div className="flex flex-col items-center text-center space-y-6 w-full md:w-auto">
              <div className="relative">
                <div className="relative w-72 h-[360px] rounded-lg overflow-hidden shadow-elegant">
                  <img 
                    src={CoupleSectionData.bride.img.src} 
                    alt={CoupleSectionData.bride.img.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
              </div>
              
              <div className="space-y-3 pt-4 max-w-xs">
                <h3 className="font-serif text-3xl font-bold text-foreground">
                  {CoupleSectionData.bride.name}
                </h3>
                <p className="text-muted-foreground font-sans">
                  {CoupleSectionData.bride.detail}
                </p>
                {CoupleSectionData.bride.instagram && (
                  <a 
                    href={CoupleSectionData.bride.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
