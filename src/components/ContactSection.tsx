
import { useState } from "react";
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                GET IN TOUCH
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-balance">
                Ready to <span className="text-gradient">Boost Your Revenue</span>?
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                Contact our team to learn more about how our platform can help you maximize 
                your earnings through premium CPA offers and offerwalls.
              </p>
            </Reveal>
            
            <Reveal delay={300}>
              <div className="bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl p-6 mb-6">
                <div className="flex items-center space-x-3 text-primary font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Phone Support</span>
                </div>
                <p className="text-muted-foreground pl-8">+201066703943</p>
              </div>
            </Reveal>
            
            <Reveal delay={400}>
              <div className="bg-white/80 backdrop-blur-sm border border-border/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 text-primary font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span>Email Support</span>
                </div>
                <p className="text-muted-foreground pl-8">mohamedelhosary256@gmail.com</p>
              </div>
            </Reveal>
          </div>
          
          <div>
            <Reveal variant="fade-left">
              <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-md border border-border/50 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
