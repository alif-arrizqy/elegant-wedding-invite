import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GallerySectionData } from "@/constant/WeddingData";

export const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  };
  
  return (
    <section className="py-20 px-4 bg-gradient-romantic">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Galeri Kami
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-center text-muted-foreground mb-16 font-sans">
            Momen indah perjalanan cinta kami
          </p>
        </ScrollReveal>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {GallerySectionData.slice(0, 9).map((image, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group cursor-pointer"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-soft hover:shadow-elegant transition-shadow">
                <motion.img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15, transition: { duration: 0.5 } }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Optional: Add image number or caption on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-white text-xs md:text-sm font-sans"
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center font-medium opacity-95">
                    {image.alt}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {GallerySectionData.length > 9 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm font-sans">
              Menampilkan 9 dari {GallerySectionData.length} foto
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
