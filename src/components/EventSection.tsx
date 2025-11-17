import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { EventSectionData } from "@/constant/WeddingData";

export const EventSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  const handleOpenMaps = (mapUrl: string) => {
    // window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    window.open(mapUrl, '_blank');
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Acara Pernikahan
        </h2>
        <p className="text-center text-muted-foreground mb-16 font-sans">
          Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
        </p>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Akad */}
          <Card className="p-8 shadow-soft hover:shadow-elegant transition-all bg-card border-border/50">
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
          
          {/* Resepsi */}
          <Card className="p-8 shadow-soft hover:shadow-elegant transition-all bg-card border-border/50">
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
        </div>
      </div>
    </section>
  );
};
