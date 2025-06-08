
import { Button } from "@/components/ui/button";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 -right-64 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-2/3 -left-64 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container>
        <div className="max-w-screen-lg mx-auto text-center">
          <Reveal>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              MONETIZATION SIMPLIFIED
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
              The Ultimate <span className="text-gradient">CPA Offerwall</span> Platform
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Connect with premium advertising networks like Monlix, Tyr Ads, AdGem, 
              AdGetMedia, and Torox through one elegant platform.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Button 
                className="h-12 px-8 text-base bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/auth">Get Started Free</Link>
              </Button>
              <Button variant="outline" className="h-12 px-8 text-base rounded-full border-primary/20 text-foreground hover:text-primary hover:border-primary/30 transition-all duration-300">
                View Demo
              </Button>
            </div>
          </Reveal>

          <Reveal delay={400} variant="fade-up">
            <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
              {/* Enhanced dashboard preview with more visual appeal */}
              <div className="relative aspect-video w-full bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-md border border-white/40 rounded-2xl overflow-hidden shadow-xl">
                {/* Top bar with browser controls */}
                <div className="flex items-center h-8 px-4 bg-black/5 border-b border-white/20">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
                
                {/* Dashboard content - improved version */}
                <div className="p-8">
                  {/* Header with logo and navigation */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                      <div className="w-32 h-8 bg-primary/20 rounded-md"></div>
                      <div className="flex ml-8 space-x-4">
                        <div className="w-20 h-6 bg-black/5 rounded-md"></div>
                        <div className="w-20 h-6 bg-black/5 rounded-md"></div>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div className="w-24 h-8 bg-primary/30 rounded-md"></div>
                      <div className="w-24 h-8 bg-primary rounded-md"></div>
                    </div>
                  </div>
                  
                  {/* Stats cards */}
                  <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200/30 p-4 flex flex-col justify-between">
                      <div className="w-16 h-4 bg-blue-200/50 rounded"></div>
                      <div className="w-24 h-8 bg-blue-300/50 rounded-md"></div>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-sm border border-green-200/30 p-4 flex flex-col justify-between">
                      <div className="w-16 h-4 bg-green-200/50 rounded"></div>
                      <div className="w-24 h-8 bg-green-300/50 rounded-md"></div>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-sm border border-purple-200/30 p-4 flex flex-col justify-between">
                      <div className="w-16 h-4 bg-purple-200/50 rounded"></div>
                      <div className="w-24 h-8 bg-purple-300/50 rounded-md"></div>
                    </div>
                  </div>
                  
                  {/* Offer cards */}
                  <div className="mb-8">
                    <div className="w-48 h-6 bg-black/5 rounded mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-100 p-4 flex items-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full mr-4"></div>
                        <div className="space-y-2">
                          <div className="w-20 h-4 bg-black/10 rounded"></div>
                          <div className="w-32 h-3 bg-black/5 rounded"></div>
                          <div className="w-24 h-6 bg-primary/20 rounded-md"></div>
                        </div>
                      </div>
                      <div className="h-24 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-100 p-4 flex items-center">
                        <div className="w-16 h-16 bg-primary/10 rounded-full mr-4"></div>
                        <div className="space-y-2">
                          <div className="w-20 h-4 bg-black/10 rounded"></div>
                          <div className="w-32 h-3 bg-black/5 rounded"></div>
                          <div className="w-24 h-6 bg-primary/20 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Chart area */}
                  <div className="h-48 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm border border-gray-100 p-4">
                    <div className="w-32 h-5 bg-black/10 rounded mb-4"></div>
                    <div className="flex items-end h-24 pt-4 space-x-2">
                      <div className="w-8 h-12 bg-primary/20 rounded-t-md"></div>
                      <div className="w-8 h-16 bg-primary/30 rounded-t-md"></div>
                      <div className="w-8 h-8 bg-primary/20 rounded-t-md"></div>
                      <div className="w-8 h-20 bg-primary/40 rounded-t-md"></div>
                      <div className="w-8 h-14 bg-primary/30 rounded-t-md"></div>
                      <div className="w-8 h-10 bg-primary/20 rounded-t-md"></div>
                      <div className="w-8 h-18 bg-primary/30 rounded-t-md"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced reflection effect */}
              <div className="absolute -bottom-[25%] left-[10%] right-[10%] h-[40%] bg-gradient-to-b from-black/20 to-transparent blur-md rounded-[100%] opacity-70"></div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
