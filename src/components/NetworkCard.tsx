
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockConversion } from "@/utils/apiService";
import { toast } from "sonner";

interface NetworkCardProps {
  name: string;
  description: string;
  imageUrl: string;
  offerUrl?: string;
  isComingSoon?: boolean;
  animationDelay?: number;
  showLoginRedirect?: boolean;
}

export function NetworkCard({
  name,
  description,
  imageUrl,
  offerUrl,
  isComingSoon = false,
  animationDelay = 0,
  showLoginRedirect = false
}: NetworkCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const handleButtonClick = () => {
    if (showLoginRedirect) {
      navigate("/auth");
    } else if (offerUrl) {
      // Get current user ID from localStorage
      const currentUser = localStorage.getItem("elhossary_currentUser");
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        // Log this event for development purposes
        console.log(`User ${userData.id} clicked on offer: ${name}`);
        
        // Send conversion data to API
        mockConversion(userData.id, name);
        
        // Notify user
        toast.success(`Opening ${name} offers`, {
          description: "Your activity will be tracked for rewards"
        });
      }
      
      // Open the offer URL in a new tab
      window.open(offerUrl, "_blank");
    }
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/60 h-full flex flex-col">
      <CardHeader className="pb-0">
        <div className="h-16 flex items-center justify-center mb-2">
          {imageLoaded ? (
            <img
              src={imageUrl}
              alt={name}
              className="h-full object-contain"
              style={{ 
                maxWidth: "140px",
                filter: isComingSoon ? "grayscale(100%)" : "none",
                opacity: isComingSoon ? 0.6 : 1
              }}
            />
          ) : (
            <div className="h-full w-32 bg-muted animate-pulse rounded" />
          )}
        </div>
        <h3 className="text-xl font-bold text-center">
          {name}
          {isComingSoon && (
            <span className="ml-2 text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
              Coming Soon
            </span>
          )}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-center">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        {isComingSoon ? (
          <Button variant="outline" className="w-full cursor-not-allowed opacity-70" disabled>
            Coming Soon
          </Button>
        ) : (
          <Button
            className="w-full bg-primary text-white hover:bg-primary/90"
            onClick={handleButtonClick}
          >
            View Offers
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
