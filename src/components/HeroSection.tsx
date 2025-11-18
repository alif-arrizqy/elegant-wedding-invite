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
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl font-sans text-foreground/80 mb-4 tracking-wide"
          >
            THE WEDDING OF
          </motion.p>
          
          <motion.h1 
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight"
          >
            {HeroSectionData.groomName} & {HeroSectionData.brideName}
          </motion.h1>
          
          <motion.div 
            variants={itemVariants}
            className="w-24 h-px bg-accent mx-auto mb-8" 
          />
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl font-sans text-foreground/70 mb-8"
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
