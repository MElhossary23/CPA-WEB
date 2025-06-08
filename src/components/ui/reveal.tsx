
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AnimationVariant = 
  | "fade-in" 
  | "fade-up" 
  | "fade-down" 
  | "fade-left" 
  | "fade-right" 
  | "scale-in" 
  | "blur-in";

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

export function Reveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  once = true,
  threshold = 0.1,
  ...props
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px",
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all will-change-transform",
        {
          "opacity-0": !isVisible,
          "opacity-100": isVisible,
          "translate-y-8": variant === "fade-up" && !isVisible,
          "-translate-y-8": variant === "fade-down" && !isVisible,
          "translate-x-8": variant === "fade-left" && !isVisible,
          "-translate-x-8": variant === "fade-right" && !isVisible,
          "scale-95": variant === "scale-in" && !isVisible,
          "blur-sm": variant === "blur-in" && !isVisible,
        },
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
