import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, 
  HardDrive, Gauge, Database, Clock, Lock, Check, ChevronRight,
  Users, Activity, Timer, Infinity, Bot, ArrowLeft, Search
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";
const DISCORD_PURCHASE = "https://discord.com/channels/1463541808503062624/1463543201620037843";

// VPS Plans - KVM India
const vpsPlans = [
  {
    name: "Plan 1",
    tier: "Entry & Growth",
    ram: "8 GB",
    cpu: "2 vCPU",
    storage: "100 GB NVMe",
    bandwidth: "8 TB",
    price: "1,600",
  },
  {
    name: "Plan 2",
    tier: "Entry & Growth",
    ram: "16 GB",
    cpu: "4 vCPU",
    storage: "200 GB NVMe",
    bandwidth: "16 TB",
    price: "2,600",
    featured: true,
  },
  {
    name: "Plan 3",
    tier: "Performance",
    ram: "32 GB",
    cpu: "8 vCPU",
    storage: "500 GB NVMe",
    bandwidth: "32 TB",
    price: "8,000",
  },
];

// VPS Features
const vpsFeatures = [
  "Level-7 DDoS Protection",
  "Full Root Access",
  "Dedicated IPv4 Address",
  "Instant Deployment (Within Minutes)",
  "99.9% Uptime Guarantee",
  "Ultra-Fast NVMe Storage",
  "India Location 🇮🇳",
];

// Minecraft Plans
const minecraftPlans = [
  { name: "Stone", ram: "2 GB", disk: "6 GB", cores: "1", cpu: "110%", backups: "1", ports: "0", price: "170" },
  { name: "Copper", ram: "7 GB", disk: "9 GB", cores: "1", cpu: "150%", backups: "2", ports: "1", price: "520" },
  { name: "Iron", ram: "12 GB", disk: "23 GB", cores: "2", cpu: "300%", backups: "4", ports: "1", price: "800", featured: true },
  { name: "Obsidian", ram: "16 GB", disk: "29 GB", cores: "3", cpu: "400%", backups: "5", ports: "2", price: "1,100" },
  { name: "Bedrock", ram: "Unlimited", disk: "Unlimited", cores: "Unlimited", cpu: "Unlimited", backups: "Unlimited", ports: "Unlimited", price: "4,500" },
];

// Domain Plans
const domainPlans = [
  { name: ".com", desc: "The classic, professional domain trusted worldwide.", price: "2,699", period: "year", ssl: true },
  { name: ".fun", desc: "Perfect for memes, communities, and fun projects!", price: "400", period: "year", ssl: true, featured: true },
  { name: ".net", desc: "Reliable, fast, and trusted by tech-focused sites.", price: "5,000", period: "year", ssl: true },
];

// Web Hosting Plans
const webPlans = [
  { name: "Starter", sites: "1", disk: "10 GB SSD", ddos: "Fully Protected", wordpress: "100%", backup: "Weekly", domain: "Free domain included", price: "1,399" },
  { name: "Pro", sites: "10", disk: "80 GB SSD", ddos: "Fully Protected", wordpress: "100%", backup: "Weekly", domain: "Free domain included", price: "3,000", featured: true },
  { name: "Cloud", sites: "100+", disk: "1 TB SSD", ddos: "Fully Protected", wordpress: "100%", backup: "Daily", domain: "Free .fun domain", price: "9,000" },
];

type ViewType = "home" | "minecraft" | "vps" | "domain" | "web" | "contact";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("home");

  const navigateTo = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement Banner */}
      <AnnouncementBanner />
      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 announcement-offset">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
            <img src={cosmicLogo} alt="Slayer Nodes" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Slayer Nodes</h1>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigateTo("home")} className="text-sm text-muted-foreground hover:text-foreground transition">Home</button>
            <button onClick={() => navigateTo("minecraft")} className="text-sm text-muted-foreground hover:text-foreground transition">Minecraft</button>
            <button onClick={() => navigateTo("vps")} className="text-sm text-muted-foreground hover:text-foreground transition">VPS</button>
            <button onClick={() => navigateTo("domain")} className="text-sm text-muted-foreground hover:text-foreground transition">Domains</button>
            <button onClick={() => navigateTo("web")} className="text-sm text-muted-foreground hover:text-foreground transition">Web</button>
            <button onClick={() => navigateTo("contact")} className="text-sm text-muted-foreground hover:text-foreground transition">Contact</button>
            <Link to="/status-checker" className="text-sm text-accent hover:text-accent/80 transition flex items-center gap-1">
              <Search className="w-4 h-4" />
              Trial Status
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href={DISCORD_SERVER} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 md:hidden">
        <div className="flex items-center justify-around py-3">
          <button onClick={() => navigateTo("home")} className={`flex flex-col items-center gap-1 ${activeView === "home" ? "text-primary" : "text-muted-foreground"}`}>
            <Server className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => navigateTo("minecraft")} className={`flex flex-col items-center gap-1 ${activeView === "minecraft" ? "text-primary" : "text-muted-foreground"}`}>
            <Cpu className="w-5 h-5" />
            <span className="text-xs">MC</span>
          </button>
          <button onClick={() => navigateTo("vps")} className={`flex flex-col items-center gap-1 ${activeView === "vps" ? "text-primary" : "text-muted-foreground"}`}>
            <HardDrive className="w-5 h-5" />
            <span className="text-xs">VPS</span>
          </button>
          <button onClick={() => navigateTo("domain")} className={`flex flex-col items-center gap-1 ${activeView === "domain" ? "text-primary" : "text-muted-foreground"}`}>
            <Globe className="w-5 h-5" />
            <span className="text-xs">Domain</span>
          </button>
          <Link to="/status-checker" className="flex flex-col items-center gap-1 text-accent">
            <Search className="w-5 h-5" />
            <span className="text-xs">Status</span>
          </Link>
        </div>
      </nav>

      {/* Home View */}
      {activeView === "home" && (
        <div className="animate-fade-in">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 grid-bg"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
            
            <div className="container mx-auto max-w-6xl relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
                    <div className="status-dot"></div>
                    <span className="text-sm text-accent font-medium">ENTERPRISE SYSTEMS OPERATIONAL</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Infrastructure<br />
                    <span className="text-gradient">Singularity.</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                    Deploy enterprise-grade VPS, Minecraft servers, and bot hosting in seconds. 
                    Powered by AMD EPYC™ & Intel® Xeon® with 99.9% uptime guarantee.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-10">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 glow-primary"
                      onClick={() => navigateTo("vps")}
                    >
                      Deploy Now <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-border hover:bg-card"
                      onClick={() => navigateTo("minecraft")}
                    >
                      Learn More
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-primary" />
                      DDoS Protected
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HardDrive className="w-4 h-4 text-primary" />
                      NVMe Storage
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      24/7 Support
                    </div>
                  </div>
                </div>
                
                <div className="relative hidden lg:block">
                  <div className="w-full h-80 rounded-2xl glass border border-border/50 p-6 animate-float">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-destructive"></div>
                      <div className="w-3 h-3 rounded-full bg-accent"></div>
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="font-mono text-sm text-muted-foreground space-y-2">
                      <p><span className="text-primary">$</span> slayer deploy --type vps</p>
                      <p className="text-accent">→ Provisioning KVM VPS India...</p>
                      <p className="text-accent">→ Allocating 8GB RAM...</p>
                      <p className="text-accent">→ Configuring NVMe storage...</p>
                      <p className="text-foreground">✓ Server deployed in 12s</p>
                      <p className="text-muted-foreground">IP: 185.xxx.xxx.xxx</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Advanced Features</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Everything you need for professional VPS hosting with enterprise-grade performance and reliability
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Zap, title: "High Performance", features: ["Latest-gen CPUs + NVMe", "Consistent IOPS", "Auto-throttling guard"] },
                  { icon: Gauge, title: "Low Latency", features: ["Tier-1 transit and peering", "Smart anycast routing", "99.9% network uptime SLA"] },
                  { icon: Shield, title: "Advanced Security", features: ["Real-time threat analytics", "DDoS blackhole + filtering", "Encrypted backups"] },
                  { icon: Server, title: "Full Control", features: ["Root access & one-click apps", "Granular firewall & rDNS", "API & CLI ready"] },
                ].map((feature) => (
                  <div key={feature.title} className="glass rounded-2xl p-6 card-hover">
                    <div className="feature-icon mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <ul className="space-y-2">
                      {feature.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 px-4 bg-card/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Enterprise Hosting Solutions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose from our portfolio of professional hosting services
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Cpu, title: "Minecraft Hosting", desc: "AMD EPYC™ Powered", action: () => navigateTo("minecraft") },
                  { icon: Server, title: "Cloud VPS", desc: "KVM India Location", action: () => navigateTo("vps") },
                  { icon: Globe, title: "Domain Names", desc: ".com, .fun, .net", action: () => navigateTo("domain") },
                  { icon: HardDrive, title: "Web Hosting", desc: "WordPress Ready", action: () => navigateTo("web") },
                ].map((service) => (
                  <button 
                    key={service.title} 
                    onClick={service.action}
                    className="glass rounded-2xl p-6 text-left card-hover group"
                  >
                    <service.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{service.desc}</p>
                    <span className="text-sm text-primary group-hover:underline flex items-center gap-1">
                      View Plans <ChevronRight className="w-4 h-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <div className="glass rounded-2xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "99.9%", label: "Uptime SLA", icon: Activity },
                    { value: "24/7", label: "Support", icon: Clock },
                    { value: "10ms", label: "Avg Latency", icon: Timer },
                    { value: "∞", label: "Scalability", icon: Infinity },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4 bg-card/30">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Leadership & Vision</h2>
                <p className="text-muted-foreground">Founded in 2025. Quality over Greed. Professionalism over everything.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass rounded-2xl p-8">
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-6">
                    To democratize enterprise-grade infrastructure, making professional hosting accessible to developers, 
                    gamers, and businesses of all sizes. We believe in transparent pricing, exceptional performance, 
                    and unwavering reliability.
                  </p>
                  <ul className="space-y-3">
                    {["Enterprise hardware at accessible prices", "No hidden fees, transparent billing", "Community-driven development"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <span className="pro-badge mb-4 inline-block">Founder</span>
                  <h3 className="text-xl font-semibold mb-2">Shadow Slayer</h3>
                  <p className="text-sm text-muted-foreground mb-4">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground">
                    With a vision to revolutionize cloud infrastructure, Shadow Slayer founded Slayer Nodes to 
                    provide enterprise-grade hosting solutions without enterprise-grade complexity or pricing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Minecraft View */}
      {activeView === "minecraft" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-6xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Minecraft Hosting Collection</h1>
              <p className="text-muted-foreground">Enterprise-grade Minecraft server hosting with AMD EPYC™ processors</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {minecraftPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                >
                  {plan.featured && <span className="pro-badge mb-4 inline-block">POPULAR</span>}
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Memory</span><span>{plan.ram}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Disk</span><span>{plan.disk}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Cores</span><span>{plan.cores}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">CPU Load</span><span>{plan.cpu}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Backups</span><span>{plan.backups}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Allocations</span><span>{plan.ports}</span></div>
                  </div>
                  <div className="text-2xl font-bold mb-4">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                  >
                    Purchase Now
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VPS View */}
      {activeView === "vps" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-6xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
                <span className="text-sm font-medium">⭐ Slayer Nodes™ – KVM VPS Plans (India 🇮🇳) 💎</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">Enterprise Cloud Infrastructure</h1>
              <p className="text-muted-foreground mb-2">High-performance KVM VPS with ultra-fast NVMe storage and rock-solid bandwidth.</p>
              <p className="text-sm text-accent">Perfect for Minecraft servers, bots, panels & web hosting ⚡</p>
            </div>
            
            {/* Tier I & II Plans */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-primary">🔹</span> Tier I — Entry & Growth
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {vpsPlans.filter(p => p.tier === "Entry & Growth").map((plan) => (
                  <div 
                    key={plan.name} 
                    className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                  >
                    {plan.featured && <span className="pro-badge mb-4 inline-block">RECOMMENDED</span>}
                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">vCPU Cores</span><span>{plan.cpu}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">RAM</span><span>{plan.ram}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">NVMe Disk</span><span>{plan.storage}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Bandwidth</span><span>{plan.bandwidth}</span></div>
                    </div>
                    <div className="text-2xl font-bold mb-4">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                    <Button 
                      className="w-full" 
                      variant={plan.featured ? "default" : "outline"}
                      onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                    >
                      Purchase Now
                    </Button>
                  </div>
                ))}
              </div>

              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-primary">🔹</span> Tier II — Performance
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {vpsPlans.filter(p => p.tier === "Performance").map((plan) => (
                  <div 
                    key={plan.name} 
                    className="glass rounded-2xl p-6 card-hover glow-netherite"
                  >
                    <span className="pro-badge mb-4 inline-block bg-gradient-to-r from-purple-500 to-pink-500">PERFORMANCE</span>
                    <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">vCPU Cores</span><span>{plan.cpu}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">RAM</span><span>{plan.ram}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">NVMe Disk</span><span>{plan.storage}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Bandwidth</span><span>{plan.bandwidth}</span></div>
                    </div>
                    <div className="text-2xl font-bold mb-4">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                    <Button 
                      className="w-full"
                      onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                    >
                      Purchase Now
                    </Button>
                  </div>
                ))}
              </div>

              {/* Enterprise Tier */}
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-accent">⭐</span> Tier III — Enterprise
              </h2>
              <div className="glass rounded-2xl p-8 text-center glow-netherite">
                <Rocket className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Custom Enterprise Solutions</h3>
                <p className="text-muted-foreground mb-6">
                  For Enterprise Plans, make a ticket at Slayer Nodes Discord and ask us for customized solutions.
                </p>
                <Button 
                  size="lg"
                  onClick={() => window.open(DISCORD_SERVER, "_blank")}
                >
                  Contact for Enterprise
                </Button>
              </div>
            </div>

            {/* VPS Features */}
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">All VPS Servers Include</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vpsFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Domain View */}
      {activeView === "domain" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Domain Registration</h1>
              <p className="text-muted-foreground">Secure your perfect domain with Slayer Nodes protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {domainPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                >
                  {plan.featured && <span className="pro-badge mb-4 inline-block">BEST VALUE</span>}
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{plan.desc}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-accent mb-4">
                    <Check className="w-4 h-4" />
                    Free SSL certificate included
                  </div>
                  
                  <div className="text-2xl font-bold mb-4">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/{plan.period}</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                  >
                    Register Now
                  </Button>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-accent" />
                <span>All Domains are in secure protection from Slayer Nodes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Web Hosting View */}
      {activeView === "web" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Web Hosting Services</h1>
              <p className="text-muted-foreground">Managed web hosting with WordPress support and DDoS protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {webPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                >
                  {plan.featured && <span className="pro-badge mb-4 inline-block">BEST VALUE</span>}
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Websites</span><span>{plan.sites}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Storage</span><span>{plan.disk}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">DDoS</span><span>{plan.ddos}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">WordPress</span><span>{plan.wordpress}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Backup</span><span>{plan.backup}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Domain</span><span className="text-accent text-xs">{plan.domain}</span></div>
                  </div>
                  <div className="text-2xl font-bold mb-4">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contact View */}
      {activeView === "contact" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Enterprise Support</h1>
              <p className="text-muted-foreground">24/7 professional support for all hosting services</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <a 
                href={DISCORD_SERVER} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-2xl p-8 card-hover block"
              >
                <MessageSquare className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Discord Community</h3>
                <p className="text-muted-foreground mb-2">Join for ticket support & community assistance</p>
                <p className="text-sm text-accent">Average response time: 5 minutes</p>
              </a>
              
              <a 
                href="mailto:ashad.umar355@gmail.com"
                className="glass rounded-2xl p-8 card-hover block"
              >
                <Mail className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-2">ashad.umar355@gmail.com</p>
                <p className="text-sm text-accent">Business inquiries & partnerships</p>
              </a>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Service Level Agreement</h3>
              <p className="text-muted-foreground mb-6">
                We guarantee 99.9% uptime, 24/7 monitoring, and professional support for all enterprise plans.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Enterprise-grade infrastructure", "Professional support team", "SLA-backed guarantees"].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
