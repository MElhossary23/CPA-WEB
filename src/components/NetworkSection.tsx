
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { NetworkCard } from "./NetworkCard";

export function NetworkSection() {
  const networks = [
    {
      name: "Monlix",
      description: "A global affiliate network with high-converting offers across multiple verticals.",
      logo: "https://offers.monlix.com/v1/icons/monlix-logo.svg"
    },
    {
      name: "Tyr Ads",
      description: "Premium advertising platform specializing in performance-based marketing solutions.",
      logo: "https://tyrads.com/wp-content/uploads/2022/07/Logo-1-e1682960338366.png"
    },
    {
      name: "AdGem",
      description: "Innovative offerwall provider with a focus on mobile app monetization strategies.",
      logo: "https://adgem.com/wp-content/uploads/2019/03/AdGem_Logo_Large.png"
    },
    {
      name: "AdGetMedia",
      description: "Extensive network offering diverse advertising opportunities and flexible payouts.",
      logo: "https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_4491937cbde9368aa6f1511c51415021/adgate-media.png"
    },
    {
      name: "Torox",
      description: "Specialized in video and interactive ad formats with high engagement rates.",
      logo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/6565ae1ff7fc2e73d9cd3925/0x0.png"
    }
  ];

  return (
    <section id="networks" className="section-padding relative overflow-hidden bg-secondary/50">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      </div>
      
      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              PREMIUM PARTNERS
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-balance">
              The Best <span className="text-gradient">Advertising Networks</span> in One Place
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground text-balance">
              Access multiple premium advertising networks through our unified platform, 
              simplifying your monetization strategy while maximizing revenue.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {networks.map((network, index) => (
            <NetworkCard
              key={index}
              name={network.name}
              description={network.description}
              imageUrl={network.logo}
              animationDelay={100 * index}
              showLoginRedirect={true}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
