import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/PricingCard";
import { Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, HardDrive, Gauge, Database, Clock, Lock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-cosmic-bg.jpg";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";
import Footer from "@/components/Footer";
import CosmicBlastIntro from "@/components/CosmicBlastIntro";
// Domain Plans
const domainPlans = [
  {
    extension: ".com",
    price: "2,699",
    description: "The classic, professional domain trusted worldwide.",
    popular: true,
  },
  {
    extension: ".fun",
    price: "400",
    description: "Perfect for memes, communities, and fun projects!",
    popular: false,
  },
  {
    extension: ".net",
    price: "5,000",
    description: "Reliable, fast, and trusted by tech-focused sites.",
    popular: false,
  },
];

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
      { label: "Disk", value: "6 GB" },
      { label: "Cores", value: "1" },
      { label: "CPU Load", value: "110%" },
      { label: "Backup", value: "1" },
      { label: "Allocations", value: "0" },
    ],
    price: "170",
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
    price: "520",
  },
  {
    title: "Iron Plan",
    specs: [
      { label: "Memory", value: "12 GB" },
      { label: "Disk", value: "23 GB" },
      { label: "Cores", value: "2" },
      { label: "CPU Load", value: "300%" },
      { label: "Backup", value: "4" },
      { label: "Allocations", value: "1" },
    ],
    price: "800",
  },
  {
    title: "Obsidian Plan",
    specs: [
      { label: "Memory", value: "16 GB" },
      { label: "Disk", value: "29 GB" },
      { label: "Cores", value: "3" },
      { label: "CPU Load", value: "400%" },
      { label: "Backup", value: "5" },
      { label: "Allocations", value: "2" },
    ],
    price: "1,100",
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
    price: "4,500",
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
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);
  
  return (
    <div className="min-h-screen bg-background bg-cosmic-mesh stars-bg">
      {/* Cosmic Blast Intro Animation */}
      {showIntro && <CosmicBlastIntro onComplete={handleIntroComplete} />}

      {/* Announcement Banner */}
      <div className="relative overflow-hidden border-b border-primary/40 meteor-trail">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/20 holographic"></div>
        <div className="absolute inset-0 diagonal-lines opacity-10"></div>
        <div className="container mx-auto px-4 py-4 text-center relative">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
            <p className="text-sm md:text-base font-bold font-display tracking-widest text-foreground">
              <span className="text-primary neon-text">COSMIC BLAST</span>
              <span className="mx-2 text-foreground/50">•</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-secondary to-primary animate-pulse">2026</span>
              <span className="mx-2 text-foreground/50">•</span>
              <span className="text-secondary">UPCOMING</span>
            </p>
            <Sparkles className="w-5 h-5 text-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-primary/20 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={cosmicLogo} alt="Cosmic Cloud" className="w-14 h-14 rounded-xl cosmic-glow" />
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-xl blur opacity-30 animate-pulse-slow"></div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-black text-cosmic-gradient tracking-widest">COSMIC CLOUD</h1>
              <p className="text-xs text-primary/70 font-display tracking-[0.2em]">BLAST INTO THE FUTURE</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#vps" className="text-foreground hover:text-primary transition-all font-display text-sm tracking-wider hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">VPS</a>
            <a href="#minecraft" className="text-foreground hover:text-primary transition-all font-display text-sm tracking-wider hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">MINECRAFT</a>
            <a href="#website" className="text-foreground hover:text-primary transition-all font-display text-sm tracking-wider hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">WEBSITE</a>
            <a href="#domains" className="text-foreground hover:text-primary transition-all font-display text-sm tracking-wider hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">DOMAINS</a>
            <a href="#boost" className="text-foreground hover:text-primary transition-all font-display text-sm tracking-wider hover:drop-shadow-[0_0_8px_hsl(var(--primary))]">BOOSTS</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 md:py-44 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background"></div>
        <div className="absolute inset-0 bg-cosmic-mesh"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-60" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-secondary rounded-full animate-float opacity-80" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-accent rounded-full animate-float opacity-70" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: "1.5s" }}></div>
        </div>

        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 border border-primary/50 rounded-full bg-primary/10 backdrop-blur-md animate-glow-pulse">
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary font-display text-sm tracking-[0.3em]">COSMIC BLAST 2026</span>
            <Rocket className="w-4 h-4 text-primary animate-pulse" />
          </div>
          <h2 className="text-6xl md:text-8xl font-display font-black mb-6 text-cosmic-gradient leading-none tracking-tight">
            WELCOME TO<br />
            <span className="relative">
              COSMIC CLOUD
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-2xl -z-10"></div>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/95 mb-4 max-w-3xl mx-auto leading-relaxed font-body font-semibold">
            Premium Minecraft, VPS & Web Hosting Solutions
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto font-body">
            Experience ultra-fast performance with enterprise-grade infrastructure, Layer 7 DDoS protection, and 99.9% uptime guarantee
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary cosmic-glow font-display tracking-widest px-10 py-6 text-base animate-glow-pulse"
              onClick={() => document.getElementById('vps')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Server className="mr-2 h-5 w-5" />
              EXPLORE VPS
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-secondary/60 text-secondary hover:bg-secondary/10 hover:border-secondary font-display tracking-widest px-10 py-6 text-base"
              onClick={() => document.getElementById('minecraft')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Cpu className="mr-2 h-5 w-5" />
              MINECRAFT HOSTING
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
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <h4 className="text-xl font-bold text-primary">All VPS servers include:</h4>
                  <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
                    <span className="text-sm font-display font-bold text-accent tracking-wide">Powered by OVH Cloud</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Layer 7 DDoS Protection</span>
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
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-primary" />
                    <span>Enterprise-Grade Security</span>
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
              Minecraft Server Plans
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Optimized game servers with instant deployment, automated backups, and dedicated support 🎮
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
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

      {/* Domain Plans Section */}
      <section id="domains" className="py-20 px-4 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 diagonal-lines opacity-5"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-4">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-display font-semibold text-accent uppercase tracking-widest">DOMAIN REGISTRATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-cosmic-gradient leading-tight tracking-tight">
              DOMAIN PLANS
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              Secure your perfect domain with Cosmic Cloud protection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {domainPlans.map((domain, index) => (
              <div 
                key={domain.extension}
                className={`relative p-8 rounded-lg transition-all duration-300 card-glow ${
                  domain.popular 
                    ? 'bg-gradient-to-b from-primary/20 to-card border-2 border-primary cosmic-glow' 
                    : 'bg-card border border-border hover:border-primary/50'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {domain.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-display font-bold tracking-wider">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-4xl font-display font-bold text-cosmic-gradient mb-2">{domain.extension}</h3>
                  <div className="flex items-baseline justify-center gap-1 mb-4">
                    <span className="text-3xl font-display font-bold text-foreground">{domain.price}</span>
                    <span className="text-muted-foreground font-body">PKR/year</span>
                  </div>
                  <p className="text-muted-foreground font-body mb-6">{domain.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-primary mb-6">
                    <Lock className="w-4 h-4" />
                    <span className="font-body">Free SSL Certificate Included</span>
                  </div>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-display tracking-wider"
                    onClick={() => window.open("https://discord.com/channels/1413463825851875328/1413463826896126056", "_blank")}
                  >
                    REGISTER NOW
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-card/50 border border-accent/30 rounded-lg max-w-3xl mx-auto text-center backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-accent font-display font-semibold">
              <Shield className="w-5 h-5" />
              <span>All Domains Are In Secure Protection From Cosmic Cloud</span>
            </div>
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
