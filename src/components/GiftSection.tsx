import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Gift, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const GiftSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState(false);
  const accountNumber = "1234567890";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    toast.success("Nomor rekening berhasil disalin!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 bg-gradient-romantic transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-gold-light rounded-full mb-6">
            <Gift className="w-8 h-8 text-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hadiah Pernikahan
          </h2>
          <p className="text-muted-foreground font-sans">
            Doa restu Anda adalah hadiah terindah bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Transfer Bank */}
          <Card className="p-8 shadow-soft hover:shadow-elegant transition-all bg-card border-border/50">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-rose-light rounded-full">
                <svg 
                  className="w-6 h-6 text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Transfer Bank
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  Bank BCA
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1 font-sans">
                  Nomor Rekening
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {accountNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-sans">
                  a.n. Alexander Jonathan
                </p>
              </div>
              
              <Button 
                onClick={handleCopyAccount}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Tersalin!" : "Salin Nomor Rekening"}
              </Button>
            </div>
          </Card>
          
          {/* Alamat Kirim */}
          <Card className="p-8 shadow-soft hover:shadow-elegant transition-all bg-card border-border/50">
            <div className="text-center space-y-6">
              <div className="inline-block p-4 bg-sage-light rounded-full">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              
              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  Kirim Hadiah
                </h3>
                <p className="text-muted-foreground font-sans text-sm">
                  Alamat Pengiriman
                </p>
              </div>
              
              <div className="bg-muted p-6 rounded-lg text-left">
                <p className="font-semibold text-foreground mb-2 font-sans">
                  Alexander & Isabella
                </p>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  Jl. Sudirman No. 45<br />
                  RT 01 / RW 02<br />
                  Kelurahan Menteng<br />
                  Kecamatan Menteng<br />
                  Jakarta Pusat 10310<br />
                  DKI Jakarta
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground italic font-sans">
                Mohon sertakan nama pengirim
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
