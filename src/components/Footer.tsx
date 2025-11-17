import { Heart } from "lucide-react";
import { FooterSectionData } from "@/constant/WeddingData";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <p className="font-serif text-2xl font-bold text-foreground">
            {FooterSectionData.coupleNames}
          </p>
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        
        <p className="text-muted-foreground font-sans italic">
          "{FooterSectionData.quote}"
        </p>
        
        <p className="text-sm text-muted-foreground font-sans">
          {FooterSectionData.quoteSource}
        </p>
        
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-sans">
            © {new Date().getFullYear()} {FooterSectionData.coupleNames}. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
};
