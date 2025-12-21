import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useWishes } from "@/hooks/useWishes";
import { DecorativeDivider } from "@/components/DecorativeDivider";

export const RsvpSection = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { wishes, isLoading, error, submitWish } = useWishes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      toast.error("Mohon lengkapi nama dan ucapan");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await submitWish(name, message);
      toast.success("Ucapan berhasil dikirim! Terima kasih ❤️");
      setName("");
      setMessage("");
    } catch (err) {
      toast.error("Gagal mengirim ucapan. Silakan coba lagi.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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
    <section className="py-24 px-4 bg-gradient-romantic relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="font-script text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">
              Ucapan & Doa
            </h2>
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground mb-12 font-sans text-lg leading-relaxed">
            Kirimkan ucapan dan doa terbaik untuk kami
          </p>
        </ScrollReveal>
        
        <DecorativeDivider variant="heart" className="mb-12" />
        
        <ScrollReveal delay={0.3}>
          <Card className="elegant-card p-8 md:p-10 border-border/50 mb-12 relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/20" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/20" />
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
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
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="space-y-4">
            <h3 className="font-script text-3xl md:text-4xl font-semibold text-center text-foreground mb-8 flex items-center justify-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </motion.div>
              Ucapan dari Tamu
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <Heart className="w-5 h-5 text-primary fill-primary" />
              </motion.div>
            </h3>
          
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground font-sans">Memuat ucapan...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {wishes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground font-sans">Belum ada ucapan. Jadilah yang pertama!</p>
              </div>
            ) : (
              wishes.map((wish, index) => (
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
              ))
            )}
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
