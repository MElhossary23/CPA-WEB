
import { Container } from "./ui/container";
import { Reveal } from "./ui/reveal";
import { CheckCircle2, Globe, BarChart3, Zap, Gift, Briefcase } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function Feature({ icon, title, description, delay = 0 }: FeatureProps) {
  return (
    <Reveal delay={delay} variant="fade-up">
      <div className="flex flex-col items-start p-6 h-full rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:shadow-md">
        <div className="p-2 mb-5 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Reveal>
  );
}

export function FeatureSection() {
  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Network Access",
      description: "Connect to multiple premium advertising networks like Monlix, AdGem, and more through a single integration."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Track performance with real-time analytics and insights to optimize your monetization strategy."
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: "Highest Payouts",
      description: "Enjoy industry-leading payouts with transparent revenue sharing and frequent payment options."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Integration",
      description: "Implement our solution in minutes with easy-to-use APIs, SDKs, and comprehensive documentation."
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: "Custom Rewards",
      description: "Create tailored reward structures that align with your audience's preferences and behaviors."
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: "Dedicated Support",
      description: "Get personalized assistance from our experienced team to maximize your monetization success."
    }
  ];

  return (
    <section id="features" className="section-padding relative overflow-hidden">
      {/* Background element */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
              POWERFUL FEATURES
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-balance">
              Everything You Need to <span className="text-gradient">Maximize Revenue</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg text-muted-foreground text-balance">
              Our platform provides all the tools you need to effectively monetize your audience through premium CPA offers and offerwalls.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={100 * index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
