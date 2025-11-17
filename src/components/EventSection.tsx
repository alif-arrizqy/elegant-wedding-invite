import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const EventSection = () => {
  const handleOpenMaps = (location: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  return (
    <section className="py-20 px-4 bg-background">
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
                    <p className="text-muted-foreground font-sans">Rabu, 25 Desember 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Waktu</p>
                    <p className="text-muted-foreground font-sans">08.00 - 10.00 WIB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Lokasi</p>
                    <p className="text-muted-foreground font-sans">
                      Masjid Al-Ikhlas<br />
                      Jl. Merdeka No. 123, Jakarta Pusat
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleOpenMaps('Masjid Al-Ikhlas Jl. Merdeka No. 123, Jakarta Pusat')}
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
                    <p className="text-muted-foreground font-sans">Rabu, 25 Desember 2024</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Waktu</p>
                    <p className="text-muted-foreground font-sans">11.00 - 14.00 WIB</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Lokasi</p>
                    <p className="text-muted-foreground font-sans">
                      Grand Ballroom Hotel Mulia<br />
                      Jl. Asia Afrika No. 8, Jakarta Pusat
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleOpenMaps('Grand Ballroom Hotel Mulia Jl. Asia Afrika No. 8, Jakarta Pusat')}
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
