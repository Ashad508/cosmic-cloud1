import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/PricingCard";
import { Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, HardDrive, Gauge, Database, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-cosmic-bg.jpg";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";
import Footer from "@/components/Footer";

// VPS Plans - Intel Xeon
const vpsIntelPlans = [
  {
    title: "Plan 1",
    specs: [
      { label: "vCPU Cores", value: "2" },
      { label: "RAM", value: "8 GB" },
      { label: "NVMe Disk", value: "100 GB" },
      { label: "Bandwidth", value: "8 TB" },
    ],
    price: "1,600",
  },
  {
    title: "Plan 2",
    specs: [
      { label: "vCPU Cores", value: "4" },
      { label: "RAM", value: "16 GB" },
      { label: "NVMe Disk", value: "200 GB" },
      { label: "Bandwidth", value: "16 TB" },
    ],
    price: "2,600",
  },
  {
    title: "Plan 3",
    specs: [
      { label: "vCPU Cores", value: "8" },
      { label: "RAM", value: "32 GB" },
      { label: "NVMe Disk", value: "500 GB" },
      { label: "Bandwidth", value: "32 TB" },
    ],
    price: "8,000",
  },
];

// Minecraft Plans
const minecraftPlans = [
  {
    title: "Stone Plan",
    specs: [
      { label: "Memory", value: "2 GB" },
      { label: "Disk", value: "2 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "100%" },
      { label: "Backup", value: "1" },
      { label: "Allocations", value: "0" },
    ],
    price: "200",
  },
  {
    title: "Copper Plan",
    specs: [
      { label: "Memory", value: "7 GB" },
      { label: "Disk", value: "9 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "150%" },
      { label: "Backup", value: "2" },
      { label: "Allocations", value: "1" },
    ],
    price: "600",
  },
  {
    title: "Iron Plan",
    specs: [
      { label: "Memory", value: "11 GB" },
      { label: "Disk", value: "12 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "300%" },
      { label: "Backup", value: "4" },
      { label: "Allocations", value: "1" },
    ],
    price: "1,000",
  },
  {
    title: "Obsidian Plan",
    specs: [
      { label: "Memory", value: "16 GB" },
      { label: "Disk", value: "17 GB" },
      { label: "Cores", value: "3" },
      { label: "CPU Load", value: "400%" },
      { label: "Backup", value: "5" },
      { label: "Allocations", value: "2" },
    ],
    price: "1,600",
  },
  {
    title: "Bedrock Plan",
    specs: [
      { label: "Memory", value: "Unlimited" },
      { label: "Disk", value: "Unlimited" },
      { label: "Cores", value: "Unlimited" },
      { label: "CPU Load", value: "Unlimited" },
      { label: "Backup", value: "Unlimited" },
      { label: "Allocations", value: "Unlimited" },
    ],
    price: "5,000",
  },
];

// MC Dedicated Plans
const mcDedicatedPlans = [
  {
    title: "Stone Plan",
    specs: [
      { label: "Memory", value: "2 GB" },
      { label: "Disk", value: "2 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "100%" },
      { label: "Backup", value: "1" },
      { label: "Allocations", value: "0" },
    ],
    price: "500",
  },
  {
    title: "Copper Plan",
    specs: [
      { label: "Memory", value: "7 GB" },
      { label: "Disk", value: "9 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "150%" },
      { label: "Backup", value: "2" },
      { label: "Allocations", value: "1" },
    ],
    price: "900",
  },
  {
    title: "Iron Plan",
    specs: [
      { label: "Memory", value: "11 GB" },
      { label: "Disk", value: "12 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "300%" },
      { label: "Backup", value: "4" },
      { label: "Allocations", value: "1" },
    ],
    price: "1,300",
  },
  {
    title: "Obsidian Plan",
    specs: [
      { label: "Memory", value: "16 GB" },
      { label: "Disk", value: "17 GB" },
      { label: "Cores", value: "3" },
      { label: "CPU Load", value: "400%" },
      { label: "Backup", value: "5" },
      { label: "Allocations", value: "2" },
    ],
    price: "1,900",
  },
  {
    title: "Bedrock Plan",
    specs: [
      { label: "Memory", value: "Unlimited" },
      { label: "Disk", value: "Unlimited" },
      { label: "Cores", value: "Unlimited" },
      { label: "CPU Load", value: "Unlimited" },
      { label: "Backup", value: "Unlimited" },
      { label: "Allocations", value: "Unlimited" },
    ],
    price: "5,300",
  },
];

// Website Plans
const websitePlans = [
  {
    title: "Starter Plan",
    specs: [
      { label: "Websites", value: "1" },
      { label: "Disk", value: "10 GB SSD" },
      { label: "DDoS", value: "Fully Protected" },
      { label: "WordPress", value: "100%" },
      { label: "Backup", value: "Weekly" },
      { label: "Domain", value: "Free Included" },
    ],
    price: "1,399",
  },
  {
    title: "Pro Plan",
    specs: [
      { label: "Websites", value: "10" },
      { label: "Disk", value: "80 GB SSD" },
      { label: "DDoS", value: "Fully Protected" },
      { label: "WordPress", value: "100%" },
      { label: "Backup", value: "Weekly" },
      { label: "Domain", value: "Free Included" },
    ],
    price: "3,000",
  },
  {
    title: "Cloud Plan",
    specs: [
      { label: "Websites", value: "100+" },
      { label: "Disk", value: "1 TB SSD" },
      { label: "DDoS", value: "Fully Protected" },
      { label: "WordPress", value: "100%" },
      { label: "Backup", value: "Daily" },
      { label: "Domain", value: "Free .fun Domain" },
    ],
    price: "9,000",
  },
];

// Discord Boost Plans
const boostPlans = [
  {
    title: "1X Boost",
    specs: [
      { label: "RAM", value: "2 GB" },
      { label: "CPU", value: "100%" },
      { label: "Disk", value: "10 GB" },
      { label: "Duration", value: "Lifetime*" },
    ],
    price: "1 Boost",
    isBoost: true,
  },
  {
    title: "2X Boost",
    specs: [
      { label: "RAM", value: "4 GB" },
      { label: "CPU", value: "150%" },
      { label: "Disk", value: "15 GB" },
      { label: "Duration", value: "Lifetime*" },
    ],
    price: "2 Boosts",
    isBoost: true,
  },
  {
    title: "4X Boost",
    specs: [
      { label: "RAM", value: "6 GB" },
      { label: "CPU", value: "200%" },
      { label: "Disk", value: "20 GB" },
      { label: "Duration", value: "Lifetime*" },
    ],
    price: "4 Boosts",
    isBoost: true,
  },
];

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 border-b border-primary/30">
        <div className="container mx-auto px-4 py-3 text-center">
          <p className="text-sm md:text-base font-semibold text-foreground">
            🚀 <span className="text-primary">New Year Update 2026</span> — Upcoming! Stay tuned for exciting new features! 🎉
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={cosmicLogo} alt="Cosmic Cloud" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-cosmic-gradient">Cosmic Cloud</h1>
              <p className="text-xs text-muted-foreground">Premium Hosting Solutions</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#vps" className="text-foreground hover:text-primary transition-colors">VPS</a>
            <a href="#minecraft" className="text-foreground hover:text-primary transition-colors">Minecraft</a>
            <a href="#website" className="text-foreground hover:text-primary transition-colors">Website</a>
            <a href="#boost" className="text-foreground hover:text-primary transition-colors">Boost Plans</a>
            <button onClick={() => navigate('/about')} className="text-foreground hover:text-primary transition-colors">About</button>
            <button onClick={() => navigate('/contact')} className="text-foreground hover:text-primary transition-colors">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 md:py-40 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic-gradient leading-tight">
            Welcome to Cosmic Cloud
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 mb-4 max-w-3xl mx-auto leading-relaxed">
            Premium Minecraft, VPS & Web Hosting Solutions
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Experience ultra-fast performance with enterprise-grade infrastructure, DDoS protection, and 99.9% uptime guarantee
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 cosmic-glow"
              onClick={() => document.getElementById('vps')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Server className="mr-2 h-5 w-5" />
              Explore VPS
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => document.getElementById('minecraft')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Cpu className="mr-2 h-5 w-5" />
              Minecraft Hosting
            </Button>
          </div>
        </div>
      </section>

      {/* VPS Section */}
      <section id="vps" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Server className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">KVM VPS Hosting</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              KVM VPS Plans
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              High-performance VPS hosting with ultra-fast NVMe storage and stable bandwidth. Perfect for Minecraft, bots, and web hosting!
            </p>
          </div>

          <Tabs defaultValue="intel" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger value="intel" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                Intel Xeon
              </TabsTrigger>
              <TabsTrigger value="amd" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                AMD EPYC
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intel" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-3 gap-6">
                {vpsIntelPlans.map((plan, index) => (
                  <PricingCard
                    key={plan.title}
                    title={plan.title}
                    specs={plan.specs}
                    price={plan.price}
                    currency="Rs."
                    featured={index === 1}
                    delay={index * 80}
                  />
                ))}
              </div>

              <div className="mt-12 p-6 bg-card border border-border rounded-lg">
                <h4 className="text-xl font-bold mb-4 text-primary">All VPS servers include:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Level 5 DDoS Protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Full Root Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-5 h-5 text-primary" />
                    <span>Deploy Within Minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Server className="w-5 h-5 text-primary" />
                    <span>IPv4 Dedicated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>99.9% Uptime Guarantee</span>
                  </div>
                </div>
                <p className="mt-6 text-sm text-muted-foreground">
                  ⚠️ Notice: Please follow our Rules to keep your service active.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="amd" className="space-y-8 animate-fade-in">
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <Rocket className="w-16 h-16 text-secondary mx-auto mb-4 animate-pulse" />
                  <h3 className="text-3xl font-bold mb-4 text-cosmic-gradient">Coming Soon!</h3>
                  <p className="text-lg text-muted-foreground max-w-md">
                    AMD EPYC VPS plans are launching soon! Stay tuned for next-gen performance.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Minecraft Section */}
      <section id="minecraft" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-4">
              <Cpu className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Minecraft Hosting</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              Minecraft Plans
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Optimized game servers with instant deployment, automated backups, and dedicated support 🎮
            </p>
          </div>

          <Tabs defaultValue="shared" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger value="shared" className="py-3 text-base font-semibold">
                <Database className="w-4 h-4 mr-2" />
                Shared Plans
              </TabsTrigger>
              <TabsTrigger value="dedicated" className="py-3 text-base font-semibold">
                <Server className="w-4 h-4 mr-2" />
                Dedicated Plans
              </TabsTrigger>
            </TabsList>

            <TabsContent value="shared" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {minecraftPlans.map((plan, index) => (
                  <PricingCard
                    key={plan.title}
                    title={plan.title}
                    specs={plan.specs}
                    price={plan.price}
                    currency="PKR"
                    featured={index === 2}
                    delay={index * 80}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="dedicated" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {mcDedicatedPlans.map((plan, index) => (
                  <PricingCard
                    key={plan.title + "-ded"}
                    title={plan.title}
                    specs={plan.specs}
                    price={plan.price}
                    currency="PKR"
                    featured={index === 2}
                    delay={index * 80}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Website Hosting Section */}
      <section id="website" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Web Hosting</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              Website Hosting Plans
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Professional web hosting with WordPress support, free domains, and enterprise security 🌐
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {websitePlans.map((plan, index) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                specs={plan.specs}
                price={plan.price}
                currency="PKR"
                featured={index === 1}
                delay={index * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Discord Boost Section */}
      <section id="boost" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-4">
              <Rocket className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Discord Boost Plans</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              Boost Plans
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              🚀 Boost = Permanent Server! Power up Cosmic Cloud with boosts & enjoy premium hosting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {boostPlans.map((plan, index) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                specs={plan.specs}
                price={plan.price}
                currency=""
                featured={index === 1}
                delay={index * 80}
              />
            ))}
          </div>

          <div className="mt-8 p-6 bg-card border border-border rounded-lg max-w-4xl mx-auto text-center">
            <p className="text-foreground mb-2">📌 All servers stay permanent while boosted</p>
            <p className="text-destructive font-semibold">⚠️ Remove your boost = server gone</p>
            <p className="text-muted-foreground text-sm mt-4">* Lifetime hosting as long as boost is active</p>
          </div>

          <div className="mt-8 p-4 bg-destructive/10 border border-destructive/30 rounded-lg max-w-4xl mx-auto text-center">
            <p className="text-destructive font-semibold">❌ Free Plan Not Available</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <MessageSquare className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              Get in Touch
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Need assistance? Our support team is ready to help you 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <a
              href="mailto:ashad.umar355@gmail.com"
              className="p-8 bg-card border border-border rounded-lg hover:border-primary transition-all cosmic-glow-hover"
            >
              <Mail className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2">ashad.umar355@gmail.com</p>
              <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
            </a>

            <a
              href="https://discord.gg/qsptvww8xX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 bg-card border border-border rounded-lg hover:border-primary transition-all cosmic-glow-hover"
            >
              <MessageSquare className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Join Our Discord</h3>
              <p className="text-muted-foreground mb-2">Connect with our community</p>
              <p className="text-sm text-muted-foreground">Get instant support and updates</p>
            </a>
          </div>

          <div className="text-center p-6 bg-card border border-border rounded-lg">
            <p className="text-sm text-muted-foreground">
              Founded by <span className="text-primary font-semibold">Shadow Slayer</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
