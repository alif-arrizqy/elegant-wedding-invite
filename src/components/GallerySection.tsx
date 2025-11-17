import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GallerySectionData } from "@/constant/WeddingData";



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
          {GallerySectionData.map((image, index) => (
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
