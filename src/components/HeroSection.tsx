import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";
import { HeroSectionData } from "@/constant/WeddingData";

interface HeroSectionProps {
  onOpenInvitation: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection = ({ onOpenInvitation }: HeroSectionProps) => {
  const [guestName, setGuestName] = useState<string>("");
  const weddingDate = HeroSectionData.countDownWeddingDate.getTime();
  
  // Get guest name dari URL query parameter
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const guest = searchParams.get('guest');
    if (guest) {
      // Convert URL-encoded name (john-noel -> John Noel)
      const decodedName = decodeURIComponent(guest).replace(/-/g, ' ', ).replace(/\b\w/g, c => c.toUpperCase());
      setGuestName(decodedName);
    }
  }, []);
  
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [weddingDate]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10 text-center px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-6"
          >
            <p className="text-sm md:text-base font-sans text-foreground/70 mb-2 tracking-[0.3em] uppercase letter-spacing-wider">
              Undangan Pernikahan
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-px bg-primary/30" />
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div className="w-6 h-px bg-primary/30" />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-foreground leading-none mb-4">
              {HeroSectionData.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6 md:w-8 md:h-8 text-accent" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
            <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-foreground leading-none">
              {HeroSectionData.brideName}
            </h1>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="w-8 h-px bg-primary/50" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-16 md:w-24 h-px bg-primary/50" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="w-8 h-px bg-primary/50" />
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl font-serif italic text-foreground/80 mb-8 tracking-wide"
          >
            {HeroSectionData.weddingDate}
          </motion.p>
          
          <motion.div 
            className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12"
            variants={itemVariants}
          >
            {[
              { value: timeLeft.days, label: "Hari" },
              { value: timeLeft.hours, label: "Jam" },
              { value: timeLeft.minutes, label: "Menit" },
              { value: timeLeft.seconds, label: "Detik" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                variants={countdownVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-lg p-4"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <motion.div 
                  className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1"
                  key={item.value}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.value}
                </motion.div>
                <div className="text-xs md:text-sm font-sans text-foreground/70">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Welcome to guest - Dynamic based on query parameter */}
          {guestName && (
            <motion.div 
              variants={itemVariants}
              className="mb-8 space-y-3"
            >
              <p className="text-lg md:text-xl font-sans text-foreground/80">
                Kepada:
              </p>
              <p className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                {guestName}
              </p>
              <p className="text-lg md:text-xl font-sans text-foreground/70 leading-relaxed">
                Dengan hormat kami mengundang Anda untuk menghadiri<br />
                acara pernikahan kami.
              </p>
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <motion.button
              onClick={onOpenInvitation}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant font-sans text-base md:text-lg px-8 py-6 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Buka Undangan
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg 
          className="w-6 h-6 text-foreground/50" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};
