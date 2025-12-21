import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ScrollReveal";
import { EventSectionData } from "@/constant/WeddingData";
import { DecorativeDivider } from "@/components/DecorativeDivider";

export const EventSection = () => {
  const handleOpenMaps = (mapUrl: string) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-primary rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              Acara Pernikahan
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground mb-12 font-sans text-lg leading-relaxed max-w-2xl mx-auto">
            Merupakan suatu kehormatan bagi kami apabila<br />
            Bapak/Ibu/Saudara/i berkenan hadir
          </p>
        </ScrollReveal>
        
        <DecorativeDivider variant="floral" className="mb-12" />
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Akad */}
          <ScrollReveal delay={0.3} direction="left">
            <motion.div whileHover={{ y: -5, transition: { duration: 0.3 } }}>
              <Card className="elegant-card p-8 md:p-10 hover:shadow-elegant transition-all bg-card border-border/50 h-full relative overflow-hidden">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/20" />
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-rose-light rounded-full">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Akad Nikah
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Tanggal</p>
                    <p className="text-muted-foreground font-sans">{EventSectionData.akad.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Waktu</p>
                    <p className="text-muted-foreground font-sans">{EventSectionData.akad.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Lokasi</p>
                    <p className="text-muted-foreground font-sans">
                      {EventSectionData.akad.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleOpenMaps(EventSectionData.akad.mapUrl)}
                variant="outline"
                className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Lihat di Google Maps
              </Button>
            </div>
              </Card>
            </motion.div>
          </ScrollReveal>
          
          {/* Resepsi */}
          <ScrollReveal delay={0.4} direction="right">
            <motion.div whileHover={{ y: -5, transition: { duration: 0.3 } }}>
              <Card className="elegant-card p-8 md:p-10 hover:shadow-elegant transition-all bg-card border-border/50 h-full relative overflow-hidden">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-secondary/20" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-secondary/20" />
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-sage-light rounded-full">
                <Calendar className="w-8 h-8 text-secondary" />
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Resepsi Pernikahan
              </h3>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Tanggal</p>
                    <p className="text-muted-foreground font-sans">{EventSectionData.resepsi.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Waktu</p>
                    <p className="text-muted-foreground font-sans">{EventSectionData.resepsi.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Lokasi</p>
                    <p className="text-muted-foreground font-sans">
                      {EventSectionData.resepsi.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleOpenMaps(EventSectionData.resepsi.mapUrl)}
                variant="outline"
                className="w-full mt-6 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Lihat di Google Maps
              </Button>
            </div>
              </Card>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
