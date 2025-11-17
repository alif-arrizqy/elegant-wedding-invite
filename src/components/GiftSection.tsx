import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Gift, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GiftSectionData } from "@/constant/WeddingData";

export const GiftSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyAccount = (accountNumber: string, accountHolder: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(accountNumber);
    toast.success(`Nomor rekening ${accountHolder} berhasil disalin!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCopyAddress = () => {
    const fullAddress = `${GiftSectionData.shippingAddress.address}`;
    navigator.clipboard.writeText(fullAddress);
    setCopied("address");
    toast.success("Alamat pengiriman berhasil disalin!");
    setTimeout(() => setCopied(null), 2000);
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
            Doa restu Anda adalah hadiah terindah bagi kami. Namun tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk mempelai dapat melalui:
          </p>
        </div>
        
        {/* Bank Cards - 2 Columns */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Bank 1 */}
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
                  {GiftSectionData.bank1.bankName}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1 font-sans">
                  Nomor Rekening
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {GiftSectionData.bank1.accountNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-sans">
                  a.n. {GiftSectionData.bank1.accountHolder}
                </p>
              </div>
              
              <Button 
                onClick={() => handleCopyAccount(GiftSectionData.bank1.accountNumber, GiftSectionData.bank1.accountHolder)}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied === GiftSectionData.bank1.accountNumber ? "Tersalin!" : "Salin Nomor Rekening"}
              </Button>
            </div>
          </Card>

          {/* Bank 2 */}
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
                  {GiftSectionData.bank2.bankName}
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1 font-sans">
                  Nomor Rekening
                </p>
                <p className="text-2xl font-bold text-foreground font-mono">
                  {GiftSectionData.bank2.accountNumber}
                </p>
                <p className="text-sm text-muted-foreground mt-1 font-sans">
                  a.n. {GiftSectionData.bank2.accountHolder}
                </p>
              </div>
              
              <Button 
                onClick={() => handleCopyAccount(GiftSectionData.bank2.accountNumber, GiftSectionData.bank2.accountHolder)}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied === GiftSectionData.bank2.accountNumber ? "Tersalin!" : "Salin Nomor Rekening"}
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Shipping Address - Full Width */}
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
            
            <div className="bg-muted p-6 rounded-lg text-left max-w-md mx-auto">
              <p className="font-semibold text-foreground mb-2 font-sans">
                {GiftSectionData.shippingAddress.recipientName}
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {GiftSectionData.shippingAddress.address}
              </p>
            </div>
            
            <Button 
              onClick={handleCopyAddress}
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <Copy className="w-4 h-4 mr-2" />
              {copied === "address" ? "Tersalin!" : "Salin Alamat"}
            </Button>
            
            <p className="text-sm text-muted-foreground italic font-sans">
              Mohon sertakan nama pengirim
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};
