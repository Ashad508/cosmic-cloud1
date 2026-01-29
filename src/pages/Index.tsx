import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, 
  HardDrive, Gauge, Database, Clock, Lock, Check, ChevronRight,
  Users, Activity, Timer, Infinity, Bot, ArrowLeft
} from "lucide-react";
import Footer from "@/components/Footer";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

// VPS Plans - Intel Xeon
const vpsIntelPlans = [
  {
    name: "Stone",
    ram: "8 GB",
    cpu: "2 vCPU",
    storage: "100 GB NVMe",
    bandwidth: "8 TB",
    price: "1,600",
  },
  {
    name: "Diamond",
    ram: "16 GB",
    cpu: "4 vCPU",
    storage: "200 GB NVMe",
    bandwidth: "16 TB",
    price: "2,600",
    featured: true,
  },
  {
    name: "Netherite",
    ram: "32 GB",
    cpu: "8 vCPU",
    storage: "500 GB NVMe",
    bandwidth: "32 TB",
    price: "8,000",
  },
];

// Minecraft Plans
const minecraftPlans = [
  { name: "Stone", ram: "2 GB", disk: "6 GB", cores: "1", cpu: "110%", backups: "1", ports: "0", price: "170" },
  { name: "Copper", ram: "7 GB", disk: "9 GB", cores: "1", cpu: "150%", backups: "2", ports: "1", price: "520" },
  { name: "Iron", ram: "12 GB", disk: "23 GB", cores: "2", cpu: "300%", backups: "4", ports: "1", price: "800", featured: true },
  { name: "Obsidian", ram: "16 GB", disk: "29 GB", cores: "3", cpu: "400%", backups: "5", ports: "2", price: "1,100" },
  { name: "Bedrock", ram: "Unlimited", disk: "Unlimited", cores: "Unlimited", cpu: "Unlimited", backups: "Unlimited", ports: "Unlimited", price: "4,500" },
];

// Bot Hosting Plans
const botPlans = [
  { name: "Starter", ram: "512 MB", cpu: "50%", disk: "2 GB", price: "99" },
  { name: "Standard", ram: "1 GB", cpu: "100%", disk: "5 GB", price: "199", featured: true },
  { name: "Premium", ram: "2 GB", cpu: "150%", disk: "10 GB", price: "399" },
];

// Web Hosting Plans
const webPlans = [
  { name: "Starter", sites: "1", disk: "10 GB SSD", ssl: "Free", backup: "Weekly", price: "1,399" },
  { name: "Pro", sites: "10", disk: "80 GB SSD", ssl: "Free", backup: "Weekly", price: "3,000", featured: true },
  { name: "Cloud", sites: "100+", disk: "1 TB SSD", ssl: "Free", backup: "Daily", price: "9,000" },
];

type ViewType = "home" | "minecraft" | "vps" | "bot" | "web" | "contact";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("home");

  const navigateTo = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
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
            <button onClick={() => navigateTo("bot")} className="text-sm text-muted-foreground hover:text-foreground transition">Bot</button>
            <button onClick={() => navigateTo("web")} className="text-sm text-muted-foreground hover:text-foreground transition">Web</button>
            <button onClick={() => navigateTo("contact")} className="text-sm text-muted-foreground hover:text-foreground transition">Contact</button>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://discord.gg/qsptvww8xX" 
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
          <button onClick={() => navigateTo("bot")} className={`flex flex-col items-center gap-1 ${activeView === "bot" ? "text-primary" : "text-muted-foreground"}`}>
            <Bot className="w-5 h-5" />
            <span className="text-xs">Bot</span>
          </button>
          <button onClick={() => navigateTo("contact")} className={`flex flex-col items-center gap-1 ${activeView === "contact" ? "text-primary" : "text-muted-foreground"}`}>
            <Mail className="w-5 h-5" />
            <span className="text-xs">Contact</span>
          </button>
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
                      <p className="text-accent">→ Provisioning Intel Xeon server...</p>
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
                  { icon: Server, title: "Cloud VPS", desc: "AMD & Intel Compute", action: () => navigateTo("vps") },
                  { icon: Bot, title: "Bot Hosting", desc: "Node.js, Python", action: () => navigateTo("bot") },
                  { icon: Globe, title: "Web Hosting", desc: "cPanel, LiteSpeed", action: () => navigateTo("web") },
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
                    <div className="flex justify-between"><span className="text-muted-foreground">RAM</span><span>{plan.ram}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Disk</span><span>{plan.disk}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Cores</span><span>{plan.cores}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span>{plan.cpu}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Backups</span><span>{plan.backups}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Ports</span><span>{plan.ports}</span></div>
                  </div>
                  <div className="text-2xl font-bold mb-4">₹{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open("https://discord.gg/qsptvww8xX", "_blank")}
                  >
                    Order Now
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
              <h1 className="text-4xl font-bold mb-4">Enterprise Cloud Infrastructure</h1>
              <p className="text-muted-foreground mb-6">Choose between AMD EPYC™ or Intel® Xeon® processors for your VPS</p>
              
              <Tabs defaultValue="intel" className="max-w-4xl mx-auto">
                <TabsList className="mb-8">
                  <TabsTrigger value="intel" className="px-6">INTEL® XEON®</TabsTrigger>
                  <TabsTrigger value="amd" className="px-6">AMD EPYC™</TabsTrigger>
                </TabsList>
                
                <TabsContent value="intel">
                  <div className="grid md:grid-cols-3 gap-6">
                    {vpsIntelPlans.map((plan) => (
                      <div 
                        key={plan.name} 
                        className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                      >
                        {plan.featured && <span className="pro-badge mb-4 inline-block">RECOMMENDED</span>}
                        <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                        <div className="space-y-2 mb-6 text-sm">
                          <div className="flex justify-between"><span className="text-muted-foreground">RAM</span><span>{plan.ram}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span>{plan.cpu}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Storage</span><span>{plan.storage}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Bandwidth</span><span>{plan.bandwidth}</span></div>
                        </div>
                        <div className="text-2xl font-bold mb-4">₹{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                        <Button 
                          className="w-full" 
                          variant={plan.featured ? "default" : "outline"}
                          onClick={() => window.open("https://discord.gg/qsptvww8xX", "_blank")}
                        >
                          Configure
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="amd">
                  <div className="text-center py-16">
                    <Rocket className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse-slow" />
                    <h3 className="text-2xl font-bold mb-2">Coming Soon!</h3>
                    <p className="text-muted-foreground">AMD EPYC VPS plans are launching soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}

      {/* Bot Hosting View */}
      {activeView === "bot" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Bot Hosting Solutions</h1>
              <p className="text-muted-foreground">Reliable Discord bot hosting with Node.js and Python support</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {botPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                >
                  {plan.featured && <span className="pro-badge mb-4 inline-block">POPULAR</span>}
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">RAM</span><span>{plan.ram}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">CPU</span><span>{plan.cpu}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Disk</span><span>{plan.disk}</span></div>
                  </div>
                  <div className="text-2xl font-bold mb-4">₹{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open("https://discord.gg/qsptvww8xX", "_blank")}
                  >
                    Order Now
                  </Button>
                </div>
              ))}
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
              <p className="text-muted-foreground">Managed web hosting with cPanel and LiteSpeed optimization</p>
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
                    <div className="flex justify-between"><span className="text-muted-foreground">Sites</span><span>{plan.sites}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Storage</span><span>{plan.disk}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">SSL</span><span>{plan.ssl}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Backup</span><span>{plan.backup}</span></div>
                  </div>
                  <div className="text-2xl font-bold mb-4">₹{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
                  <Button 
                    className="w-full" 
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open("https://discord.gg/qsptvww8xX", "_blank")}
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
                href="https://discord.gg/qsptvww8xX" 
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
