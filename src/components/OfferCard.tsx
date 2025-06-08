
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  title: string;
  description: string;
  reward: string;
  image: string;
  network: string;
  category: string;
  className?: string;
}

export function OfferCard({
  title,
  description,
  reward,
  image,
  network,
  category,
  className,
}: OfferCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const onImageLoaded = () => {
      setImgLoaded(true);
    };

    const img = new Image();
    img.src = image;
    image.onload = onImageLoaded;

    return () => {
      image.onload = null;
    };
  }, [image]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const rotateX = (mouseY - centerY) / 20;
    const rotateY = (centerX - mouseX) / 20;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card rounded-xl overflow-hidden relative h-full cursor-pointer transition-all duration-300 will-change-transform",
        {
          "shadow-xl": isHovered,
          "shadow-md": !isHovered,
        },
        className
      )}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)"
          : "transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-0 bg-center bg-cover transition-all duration-700 filter",
            {
              "scale-105 blur-0": isHovered,
              "scale-100": !isHovered,
              "blur-sm": !imgLoaded,
            }
          )}
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white">
          {network}
        </div>
        
        <div className="absolute top-3 right-3 px-2 py-1 bg-primary/80 backdrop-blur-md rounded-full text-xs font-medium text-white">
          {category}
        </div>
        
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-md text-sm font-bold text-primary">
          {reward}
        </div>
      </div>
      
      <div className="p-4 relative z-10">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </div>
      
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-primary/70 transition-all duration-300",
          {
            "opacity-100": isHovered,
            "opacity-0": !isHovered,
          }
        )}
      />
    </div>
  );
}
