import groomImage from "@/assets/groom.jpg";
import brideImage from "@/assets/bride.jpg";
import { Heart } from "lucide-react";

export const CoupleSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-romantic">
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
                  src={groomImage} 
                  alt="Alexander - Mempelai Pria" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-serif text-3xl font-bold text-foreground">
                Alexander Jonathan
              </h3>
              <p className="text-muted-foreground font-sans">
                Putra dari Bapak Robert & Ibu Maria
              </p>
              <p className="text-sm text-muted-foreground font-sans italic">
                "Cinta sejati adalah ketika dua jiwa menjadi satu"
              </p>
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
                  src={brideImage} 
                  alt="Isabella - Mempelai Wanita" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-accent rounded-full" />
            </div>
            
            <div className="space-y-3">
              <h3 className="font-serif text-3xl font-bold text-foreground">
                Isabella Rose
              </h3>
              <p className="text-muted-foreground font-sans">
                Putri dari Bapak Michael & Ibu Catherine
              </p>
              <p className="text-sm text-muted-foreground font-sans italic">
                "Bersama kita lebih kuat, bersama kita lebih indah"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
