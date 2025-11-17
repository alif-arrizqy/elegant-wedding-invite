import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onOpenInvitation: () => void;
}

export const HeroSection = ({ onOpenInvitation }: HeroSectionProps) => {
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
            Alexander & Isabella
          </h1>
          
          <div className="w-24 h-px bg-accent mx-auto mb-8" />
          
          <p className="text-xl md:text-2xl font-sans text-foreground/70 mb-12">
            25 Desember 2024
          </p>
          
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
