import { useState, useEffect } from "react";
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
  
  const calculateTimeLeft = (): TimeLeft => {
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
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-gradient-overlay" />
      
      <div className="relative z-10 text-center px-4 py-20">
        <div className="animate-fade-in">
          <p className="text-lg md:text-xl font-sans text-foreground/80 mb-4 tracking-wide">
            THE WEDDING OF
          </p>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
            {HeroSectionData.groomName} & {HeroSectionData.brideName}
          </h1>
          
          <div className="w-24 h-px bg-accent mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-sans text-foreground/70 mb-8">
            {HeroSectionData.weddingDate}
          </p>
          
          <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto mb-12">
            <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">
                {timeLeft.days}
              </div>
              <div className="text-xs md:text-sm font-sans text-foreground/70">Hari</div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">
                {timeLeft.hours}
              </div>
              <div className="text-xs md:text-sm font-sans text-foreground/70">Jam</div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">
                {timeLeft.minutes}
              </div>
              <div className="text-xs md:text-sm font-sans text-foreground/70">Menit</div>
            </div>
            <div className="bg-background/10 backdrop-blur-sm border border-accent/20 rounded-lg p-4">
              <div className="text-3xl md:text-4xl font-serif font-bold text-accent mb-1">
                {timeLeft.seconds}
              </div>
              <div className="text-xs md:text-sm font-sans text-foreground/70">Detik</div>
            </div>
          </div>

          {/* Welcome to guest - Dynamic based on query parameter */}
          {guestName && (
            <div className="mb-8 space-y-3">
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
            </div>
          )}

          <Button
            onClick={onOpenInvitation}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elegant font-sans text-base md:text-lg px-8 py-6 rounded-full transition-all hover:shadow-gold hover:scale-105"
          >
            Buka Undangan
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
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
      </div>
    </section>
  );
};
