import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { CoupleSection } from "@/components/CoupleSection";
import { EventSection } from "@/components/EventSection";
import { GallerySection } from "@/components/GallerySection";
import { RsvpSection } from "@/components/RsvpSection";
import { GiftSection } from "@/components/GiftSection";
import { Footer } from "@/components/Footer";
import { DecorativeDivider } from "@/components/DecorativeDivider";
import { AudioPlayer } from "@/components/AudioPlayer";
import audioSrc from "@/assets/akad-payung-teduh.mp3";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Smooth scroll to couple section
    setTimeout(() => {
      document.getElementById('couple-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen font-sans">
      <HeroSection onOpenInvitation={handleOpenInvitation} />
      
      {/* Audio Player - auto play when invitation is opened */}
      {isOpen && <AudioPlayer src={audioSrc} autoPlay={true} />}
      
      {isOpen && (
        <>
          <div id="couple-section">
            <CoupleSection />
          </div>
          <EventSection />
          {/* <GallerySection /> */}
          <RsvpSection />
          <GiftSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
