import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Send } from "lucide-react";

export const RsvpSection = () => {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !attendance) {
      toast.error("Mohon lengkapi semua field");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Konfirmasi kehadiran berhasil dikirim!");
    setName("");
    setAttendance("");
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Konfirmasi Kehadiran
        </h2>
        <p className="text-center text-muted-foreground mb-12 font-sans">
          Mohon konfirmasi kehadiran Anda
        </p>
        
        <Card className="p-8 shadow-elegant border-border/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-sans">
                Nama Lengkap
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-border focus:ring-primary"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label className="text-foreground font-sans">
                Konfirmasi Kehadiran
              </Label>
              <RadioGroup value={attendance} onValueChange={setAttendance}>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="hadir" id="hadir" />
                  <Label 
                    htmlFor="hadir" 
                    className="flex-1 cursor-pointer font-sans"
                  >
                    ✓ Saya Hadir
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="tidak-hadir" id="tidak-hadir" />
                  <Label 
                    htmlFor="tidak-hadir" 
                    className="flex-1 cursor-pointer font-sans"
                  >
                    ✗ Tidak Bisa Hadir
                  </Label>
                </div>
              </RadioGroup>
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
                  Kirim Konfirmasi
                </>
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
};
