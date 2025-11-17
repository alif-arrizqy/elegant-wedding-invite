import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Heart } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

export const RsvpSection = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: "Sarah & Michael",
      message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. ❤️",
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: 2,
      name: "Jessica",
      message: "Congratulations! Wishing you both a lifetime of love and happiness together! 💕",
      timestamp: new Date(Date.now() - 172800000)
    },
    {
      id: 3,
      name: "Ryan & Lisa",
      message: "Bahagia selalu untuk kalian berdua. May your love story be filled with beautiful moments!",
      timestamp: new Date(Date.now() - 259200000)
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error("Mohon lengkapi nama dan ucapan");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newWish: Wish = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: new Date()
    };
    
    setWishes([newWish, ...wishes]);
    toast.success("Ucapan berhasil dikirim! Terima kasih ❤️");
    setName("");
    setMessage("");
    setIsSubmitting(false);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffDays === 0) return "Hari ini";
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 bg-background transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Ucapan & Doa
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-sans">
          Kirimkan ucapan dan doa terbaik untuk kami
        </p>
        
        <Card className="p-8 shadow-elegant border-border/50 mb-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-sans">
                Nama
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border focus:ring-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground font-sans">
                Ucapan & Doa
              </Label>
              <Textarea
                id="message"
                placeholder="Tulis ucapan dan doa terbaik Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border-border focus:ring-primary min-h-[120px] resize-none"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-gold transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Mengirim..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Ucapan
                </>
              )}
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-semibold text-center text-foreground mb-6 flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary" />
            Ucapan dari Tamu
            <Heart className="w-5 h-5 text-primary fill-primary" />
          </h3>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {wishes.map((wish, index) => (
              <Card 
                key={wish.id} 
                className="p-6 shadow-soft border-border/50 hover:shadow-elegant transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-romantic flex items-center justify-center">
                    <span className="text-primary-foreground font-serif font-semibold">
                      {wish.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-sans font-semibold text-foreground">
                        {wish.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(wish.timestamp)}
                      </span>
                    </div>
                    <p className="text-muted-foreground font-sans leading-relaxed">
                      {wish.message}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
