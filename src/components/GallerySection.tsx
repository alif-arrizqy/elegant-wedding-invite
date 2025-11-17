import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const galleryImages = [
  { src: gallery1, alt: "Romantic couple holding hands" },
  { src: gallery2, alt: "Wedding couple laughing together" },
  { src: gallery3, alt: "Bride's bouquet" },
  { src: gallery4, alt: "First dance" },
  { src: gallery5, alt: "Wedding rings" },
  { src: gallery6, alt: "Walking hand in hand" },
];

export const GallerySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 px-4 bg-gradient-romantic transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Galeri Kami
        </h2>
        <p className="text-center text-muted-foreground mb-16 font-sans">
          Momen indah perjalanan cinta kami
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div 
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elegant transition-all hover:scale-105 cursor-pointer group"
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
