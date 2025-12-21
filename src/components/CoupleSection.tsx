import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CoupleSectionData } from "@/constant/WeddingData";
import { DecorativeDivider } from "@/components/DecorativeDivider";

export const CoupleSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-gradient-romantic to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              Mempelai
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground mb-16 font-sans text-lg leading-relaxed max-w-2xl mx-auto px-4">
            Dengan memohon Rahmat dan Ridho Allah SWT,<br />
            kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami
          </p>
        </ScrollReveal>
        
        <DecorativeDivider variant="heart" className="mb-12" />
        
        <div className="relative flex flex-col md:flex-row md:justify-center md:items-center gap-12 md:gap-12 lg:gap-20">
          {/* Groom */}
          <ScrollReveal delay={0.3} direction="left">
            <motion.div 
              className="flex flex-col items-center text-center space-y-6 w-full md:w-auto"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Name and details */}
              <div className="space-y-4 max-w-xs">
                <div className="relative inline-block">
                  <h3 className="font-script text-4xl md:text-5xl font-semibold text-foreground relative z-10">
                    {CoupleSectionData.groom.name}
                  </h3>
                  {/* <div className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/20 -z-0" /> */}
                </div>
                <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                  {CoupleSectionData.groom.detail}
                </p>
                {CoupleSectionData.groom.instagram && (
                  <a 
                    href={CoupleSectionData.groom.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
          
          {/* Divider with Heart - Desktop */}
          <div className="hidden md:flex md:self-center">
            <ScrollReveal delay={0.5}>
              <motion.div 
                className="relative bg-card p-6 rounded-full shadow-elegant border-2 border-primary/20"
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-12 h-12 text-primary fill-primary" />
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75" />
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Divider with Heart - Mobile */}
          <div className="md:hidden flex justify-center my-4">
            <ScrollReveal delay={0.5}>
              <motion.div 
                className="relative bg-card p-5 rounded-full shadow-elegant border-2 border-primary/20"
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-10 h-10 text-primary fill-primary" />
                <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75" />
              </motion.div>
            </ScrollReveal>
          </div>
          
          {/* Bride */}
          <ScrollReveal delay={0.4} direction="right">
            <motion.div 
              className="flex flex-col items-center text-center space-y-6 w-full md:w-auto"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Name and details */}
              <div className="space-y-4 max-w-xs">
                <div className="relative inline-block">
                  <h3 className="font-script text-4xl md:text-5xl font-semibold text-foreground relative z-10">
                    {CoupleSectionData.bride.name}
                  </h3>
                  {/* <div className="absolute -bottom-1 left-0 right-0 h-2 bg-primary/20 -z-0" /> */}
                </div>
                <p className="text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
                  {CoupleSectionData.bride.detail}
                </p>
                {CoupleSectionData.bride.instagram && (
                  <a 
                    href={CoupleSectionData.bride.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-sans text-sm hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
