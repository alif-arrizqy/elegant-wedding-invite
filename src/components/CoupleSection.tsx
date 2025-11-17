import { Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { CoupleSectionData } from "@/constant/WeddingData";

export const CoupleSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 bg-gradient-romantic transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Mempelai
        </h2>
        <p className="text-center text-muted-foreground mb-16 font-sans">
          Dengan memohon Rahmat dan Ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami
        </p>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Groom */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-64 h-80 mx-auto rounded-lg overflow-hidden shadow-elegant">
                <img 
                  src={CoupleSectionData.groom.img.src} 
                  alt={CoupleSectionData.groom.img.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
            </div>
            
            <div className="space-y-3">
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
          
          {/* Divider with Heart */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
            <div className="bg-card p-4 rounded-full shadow-soft">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
          </div>
          
          <div className="md:hidden flex justify-center my-8">
            <div className="bg-card p-4 rounded-full shadow-soft">
              <Heart className="w-8 h-8 text-primary fill-primary" />
            </div>
          </div>
          
          {/* Bride */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-64 h-80 mx-auto rounded-lg overflow-hidden shadow-elegant">
                <img 
                  src={CoupleSectionData.bride.img.src} 
                  alt={CoupleSectionData.bride.img.alt} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
            </div>
            
            <div className="space-y-3">
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
        </div>
      </div>
    </section>
  );
};
