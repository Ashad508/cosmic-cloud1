import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, 
  HardDrive, Gauge, Database, Clock, Lock, Check, ChevronRight,
  Users, Activity, Timer, Infinity, ArrowLeft, Search, Package,
  Star, Sparkles, AlertTriangle, Monitor, Wifi, Headphones
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import MaintenancePage from "@/components/MaintenancePage";
import { supabase } from "@/integrations/supabase/client";
import axoLogo from "@/assets/axo-nodes-logo.jpg";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";
const DISCORD_PURCHASE = "https://discord.com/channels/1463541808503062624/1463543201620037843";

// Minecraft Paid Plans (updated)
const minecraftPlans = [
  { name: "Stone", tier: "stone", ram: "2 GB", disk: "6 GB", cores: "1", cpu: "110%", backups: "1", ports: "0", price: "100" },
  { name: "Copper", tier: "copper", ram: "7 GB", disk: "9 GB", cores: "1", cpu: "150%", backups: "2", ports: "1", price: "340" },
  { name: "Iron", tier: "iron", ram: "12 GB", disk: "23 GB", cores: "2", cpu: "300%", backups: "4", ports: "1", price: "600", featured: true },
  { name: "Obsidian", tier: "obsidian", ram: "16 GB", disk: "29 GB", cores: "3", cpu: "400%", backups: "5", ports: "2", price: "1,000" },
  { name: "Bedrock", tier: "bedrock", ram: "Unlimited", disk: "Unlimited", cores: "Unlimited", cpu: "Unlimited", backups: "Unlimited", ports: "Unlimited", price: "4,000" },
];

// VPS Paid Plans (updated)
const vpsPlans = [
  { name: "Plan 1", tier: "Entry & Growth", ram: "8 GB", cpu: "2 vCPU", storage: "100 GB NVMe", bandwidth: "8 TB", price: "1,600" },
  { name: "Plan 2", tier: "Entry & Growth", ram: "16 GB", cpu: "4 vCPU", storage: "200 GB NVMe", bandwidth: "16 TB", price: "2,600", featured: true },
  { name: "Plan 3", tier: "Performance", ram: "32 GB", cpu: "8 vCPU", storage: "500 GB NVMe", bandwidth: "32 TB", price: "8,000" },
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

// Domain Plans (updated)
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

// Floating particles component
const FloatingParticles = ({ count = 12 }: { count?: number }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 3,
    })), [count]
  );

  return (
    <div className="mc-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `float-particle ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
};

// Spec row for plan cards
const SpecRow = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0">
    <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
      <Icon className="w-4 h-4 text-primary/60" />
      {label}
    </span>
    <span className="text-sm font-semibold">{value}</span>
  </div>
);

type ViewType = "home" | "minecraft" | "vps" | "domain" | "web" | "contact";

const Index = () => {
  const [activeView, setActiveView] = useState<ViewType>("home");
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [loadingMaintenance, setLoadingMaintenance] = useState(true);

  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "maintenance_mode")
          .maybeSingle();

        const value = data?.value as { enabled?: boolean } | null;
        if (!error && value?.enabled) {
          setIsMaintenanceMode(true);
        }
      } catch (error) {
        console.error("Error fetching maintenance mode:", error);
      } finally {
        setLoadingMaintenance(false);
      }
    };

    fetchMaintenanceMode();

    const channel = supabase
      .channel("maintenance_mode")
      .on("postgres_changes", { 
        event: "*", 
        schema: "public", 
        table: "site_settings",
        filter: "key=eq.maintenance_mode"
      }, (payload: { new?: { value?: { enabled?: boolean } } }) => {
        setIsMaintenanceMode(payload.new?.value?.enabled || false);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const navigateTo = (view: ViewType) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loadingMaintenance) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isMaintenanceMode) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBanner />

      
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl announcement-offset">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
            <img src={axoLogo} alt="Axo Nodes" className="w-9 h-9 rounded-lg" />
            <div>
              <h1 className="text-lg font-bold text-foreground">Axo Nodes</h1>
              <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Powering the Way</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Home", view: "home" as ViewType },
              { label: "Minecraft", view: "minecraft" as ViewType },
              { label: "VPS", view: "vps" as ViewType },
              { label: "Domains", view: "domain" as ViewType },
              { label: "Web Hosting", view: "web" as ViewType },
              { label: "Contact", view: "contact" as ViewType },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigateTo(item.view)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  activeView === item.view 
                    ? "text-foreground bg-muted" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link to="/status-checker" className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              Trial Status
            </Link>
            <a href="https://status.axonetwork.fun/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              Status
            </a>
            <Link to="/order-tracker" className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5" />
              Orders
            </Link>
          </nav>

          <a 
            href={DISCORD_SERVER} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
          >
            Discord
          </a>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/30 md:hidden">
        <div className="flex items-center justify-around py-2.5">
          {[
            { label: "Home", view: "home" as ViewType, icon: Server },
            { label: "MC", view: "minecraft" as ViewType, icon: Cpu },
            { label: "VPS", view: "vps" as ViewType, icon: HardDrive },
            { label: "Domain", view: "domain" as ViewType, icon: Globe },
          ].map((item) => (
            <button 
              key={item.label}
              onClick={() => navigateTo(item.view)} 
              className={`flex flex-col items-center gap-0.5 ${activeView === item.view ? "text-primary" : "text-muted-foreground"}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
          <Link to="/status-checker" className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <Search className="w-5 h-5" />
            <span className="text-[10px]">Trial</span>
          </Link>
          <Link to="/order-tracker" className="flex flex-col items-center gap-0.5 text-muted-foreground">
            <Package className="w-5 h-5" />
            <span className="text-[10px]">Order</span>
          </Link>
        </div>
      </nav>

      {/* ===================== HOME VIEW ===================== */}
      {activeView === "home" && (
        <div className="animate-fade-in">
          {/* Hero Section */}
          <section className="relative pt-40 pb-24 px-4 overflow-hidden">
            <div className="absolute inset-0 grid-bg"></div>
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px]"></div>
            <FloatingParticles count={6} />
            
            <div className="container mx-auto max-w-6xl relative">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <span className="text-xs text-muted-foreground font-medium tracking-wide">ALL SYSTEMS OPERATIONAL</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
                  Host your own<br />
                  <span className="text-gradient">Game Servers</span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                  Experience lightning-fast performance, unbeatable reliability, and 24/7 support for all your hosting needs.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 px-8 h-12 text-base"
                    onClick={() => navigateTo("minecraft")}
                  >
                    Get started <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-border/50 hover:bg-card h-12 text-base"
                    onClick={() => navigateTo("vps")}
                  >
                    Learn More
                  </Button>
                </div>

                {/* Feature pills */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {[
                    { icon: Zap, label: "Instant Setup", desc: "Under 60 seconds" },
                    { icon: Shield, label: "DDoS Protection", desc: "Enterprise-grade" },
                    { icon: Activity, label: "99.9% Uptime", desc: "Guaranteed" },
                    { icon: Headphones, label: "24/7 Support", desc: "Always available" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-border/30 bg-card/50 p-4 text-left">
                      <item.icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-sm font-semibold mb-0.5">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-14">
                <p className="text-sm text-primary font-medium tracking-wider uppercase mb-3">Our Services</p>
                <h2 className="text-3xl md:text-4xl font-bold">Powering the Way</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Cpu, title: "Minecraft Hosting", desc: "High-performance game servers with instant setup", action: () => navigateTo("minecraft") },
                  { icon: Server, title: "Cloud VPS", desc: "KVM VPS with NVMe storage, India location", action: () => navigateTo("vps") },
                  { icon: Globe, title: "Domain Names", desc: ".com, .fun, .net with free SSL included", action: () => navigateTo("domain") },
                  { icon: Monitor, title: "Web Hosting", desc: "cPanel hosting with WordPress support", action: () => navigateTo("web") },
                ].map((service) => (
                  <button 
                    key={service.title} 
                    onClick={service.action}
                    className="rounded-xl border border-border/30 bg-card/30 p-6 text-left transition-all duration-300 hover:border-primary/30 hover:bg-card/60 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
                    <span className="text-sm text-primary group-hover:underline flex items-center gap-1">
                      View Plans <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Cutting-Edge Features */}
          <section className="py-20 px-4 border-t border-border/10">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-14">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-border"></div>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    CUTTING-EDGE <span className="text-primary">FEATURES</span>
                  </h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-border"></div>
                </div>
                <p className="text-muted-foreground">Discover unparalleled server performance and security.</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: Zap, title: "Instant Setup", desc: "Deployment in under 60 seconds. Our automated systems provision your resources the moment your payment is confirmed." },
                  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade mitigation capable of filtering up to 17Tbps+. Stay online during the most intense volumetric attacks." },
                  { icon: Activity, title: "99.9% Uptime", desc: "Tier 3+ certified data centers with redundant power, cooling, and network links to ensure your services never go offline." },
                  { icon: Headphones, title: "24/7 Support", desc: "Real-world experts at your service. Our average response time is under 15 minutes, day or night." },
                  { icon: Cpu, title: "Powerful Hardware", desc: "Utilizing latest-gen AMD EPYC™ processors and enterprise NVMe Gen4 storage for maximum I/O performance." },
                  { icon: Globe, title: "India Location", desc: "Strategically located servers in India with premium peerage to ensure ultra-low latency for South Asian traffic." },
                ].map((feature, i) => (
                  <div 
                    key={feature.title} 
                    className="rounded-xl border border-border/30 bg-card/30 p-6 transition-all duration-300 hover:border-primary/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-3xl">
              <div className="rounded-xl border border-border/30 bg-card/30 p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {[
                    { value: "99.9%", label: "Uptime SLA" },
                    { value: "24/7", label: "Support" },
                    { value: "10ms", label: "Avg Latency" },
                    { value: "∞", label: "Scalability" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-20 px-4 border-t border-border/10">
            <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold mb-4">Leadership & Vision</h2>
                <p className="text-muted-foreground">Founded in 2025. Quality over Greed. Professionalism over everything.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-border/30 bg-card/30 p-8">
                  <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
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
                
                <div className="rounded-xl border border-border/30 bg-card/30 p-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">Founder</span>
                  <h3 className="text-xl font-semibold mb-1">Shadow Slayer</h3>
                  <p className="text-sm text-muted-foreground mb-4">Founder & CEO</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    With a vision to revolutionize cloud infrastructure, Shadow Slayer founded Axo Nodes to 
                    provide enterprise-grade hosting solutions without enterprise-grade complexity or pricing.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ===================== MINECRAFT VIEW ===================== */}
      {activeView === "minecraft" && (
        <div className="pt-32 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-6xl relative">
            <FloatingParticles count={8} />
            
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            
            {/* Hero */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Minecraft Hosting</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Minecraft Server Hosting
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                High-performance Minecraft server hosting with low latency, DDoS protection, and 24/7 support.
              </p>
              <p className="text-sm text-primary mt-3 font-medium">Starting at PKR 100/mo</p>
            </div>

            {/* Plan Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
              {minecraftPlans.map((plan, i) => (
                <div 
                  key={plan.name} 
                  className={`tier-card tier-${plan.tier} rounded-xl border bg-card/40 p-5 transition-all duration-300 hover:border-primary/30 ${
                    plan.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border/30"
                  } ${plan.name === "Bedrock" ? "border-primary/50 bg-gradient-to-b from-primary/5 to-card/40" : ""}`}
                >
                  {plan.featured && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <Star className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Popular</span>
                    </div>
                  )}
                  {plan.name === "Bedrock" && (
                    <div className="flex items-center gap-1.5 mb-3">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Ultimate</span>
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-4">Plan</p>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold">₨{plan.price}</span>
                    <span className="text-sm text-muted-foreground"> /mo</span>
                  </div>
                  
                  <div className="space-y-0 mb-5">
                    <SpecRow label="Memory" value={plan.ram} icon={Database} />
                    <SpecRow label="Disk" value={plan.disk} icon={HardDrive} />
                    <SpecRow label="Cores" value={plan.cores} icon={Cpu} />
                    <SpecRow label="CPU Load" value={plan.cpu} icon={Gauge} />
                    <SpecRow label="Backups" value={plan.backups} icon={Shield} />
                    <SpecRow label="Allocations" value={plan.ports} icon={Globe} />
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.featured || plan.name === "Bedrock" ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={plan.featured || plan.name === "Bedrock" ? "default" : "outline"}
                    size="sm"
                    onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                  >
                    Order Now
                  </Button>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div className="rounded-xl border border-border/30 bg-card/30 p-5">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                {["AMD EPYC™ Processors", "DDoS Protected", "99.9% Uptime", "Instant Setup"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VPS VIEW ===================== */}
      {activeView === "vps" && (
        <div className="pt-32 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-6xl relative">
            <FloatingParticles count={6} />
            
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            
            {/* Hero */}
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="text-sm font-medium">⭐ KVM VPS Plans (India 🇮🇳) 💎</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Enterprise Cloud VPS
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                High-performance KVM VPS with ultra-fast NVMe storage and rock-solid bandwidth.
              </p>
              <p className="text-sm text-accent mt-2">Perfect for Minecraft servers, bots, panels & web hosting ⚡</p>
            </div>

            {/* Tier I */}
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="text-primary">▸</span> Tier I — Entry & Growth
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {vpsPlans.filter(p => p.tier === "Entry & Growth").map((plan) => (
                <div 
                  key={plan.name} 
                  className={`rounded-xl border bg-card/40 p-6 transition-all duration-300 hover:border-primary/30 ${plan.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border/30"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      {plan.featured && <span className="text-[10px] font-bold text-primary tracking-wider uppercase">Recommended</span>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">₨{plan.price}</span>
                    <span className="text-sm text-muted-foreground"> /mo</span>
                  </div>
                  <div className="space-y-0 mb-5">
                    <SpecRow label="vCPU Cores" value={plan.cpu} icon={Cpu} />
                    <SpecRow label="RAM" value={plan.ram} icon={Database} />
                    <SpecRow label="NVMe Disk" value={plan.storage} icon={HardDrive} />
                    <SpecRow label="Bandwidth" value={plan.bandwidth} icon={Gauge} />
                  </div>
                  <Button 
                    className="w-full"
                    variant={plan.featured ? "default" : "outline"}
                    onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                  >
                    Order Now
                  </Button>
                </div>
              ))}
            </div>

            {/* Tier II */}
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="text-primary">▸</span> Tier II — Performance
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {vpsPlans.filter(p => p.tier === "Performance").map((plan) => (
                <div 
                  key={plan.name} 
                  className="rounded-xl border border-primary/30 bg-gradient-to-b from-primary/5 to-card/40 p-6 transition-all duration-300 hover:border-primary/40"
                >
                  <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase mb-3">Performance</span>
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold">₨{plan.price}</span>
                    <span className="text-sm text-muted-foreground"> /mo</span>
                  </div>
                  <div className="space-y-0 mb-5">
                    <SpecRow label="vCPU Cores" value={plan.cpu} icon={Cpu} />
                    <SpecRow label="RAM" value={plan.ram} icon={Database} />
                    <SpecRow label="NVMe Disk" value={plan.storage} icon={HardDrive} />
                    <SpecRow label="Bandwidth" value={plan.bandwidth} icon={Gauge} />
                  </div>
                  <Button className="w-full" onClick={() => window.open(DISCORD_PURCHASE, "_blank")}>
                    Order Now
                  </Button>
                </div>
              ))}
            </div>

            {/* Enterprise Tier */}
            <h3 className="text-lg font-semibold mb-5 flex items-center gap-2">
              <span className="text-accent">⭐</span> Tier III — Enterprise
            </h3>
            <div className="rounded-xl border border-border/30 bg-card/30 p-10 text-center mb-10">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Custom Enterprise Solutions</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                For Enterprise Plans, open a ticket at Axo Nodes Discord and let us build a custom solution for you.
              </p>
              <Button size="lg" onClick={() => window.open(DISCORD_SERVER, "_blank")}>
                Contact for Enterprise
              </Button>
            </div>

            {/* VPS Features */}
            <div className="rounded-xl border border-border/30 bg-card/30 p-6">
              <h3 className="text-base font-semibold mb-4 text-center">All VPS Servers Include</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {vpsFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== DOMAIN VIEW ===================== */}
      {activeView === "domain" && (
        <div className="pt-32 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">Domain Registration</h2>
              <p className="text-muted-foreground">Secure your perfect domain with Axo Nodes protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {domainPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`rounded-xl border bg-card/40 p-6 transition-all duration-300 hover:border-primary/30 ${plan.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border/30"}`}
                >
                  {plan.featured && <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase mb-3">Best Value</span>}
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{plan.desc}</p>
                  
                  <div className="flex items-center gap-2 text-sm text-accent mb-4">
                    <Check className="w-4 h-4" />
                    Free SSL certificate included
                  </div>
                  
                  <div className="text-2xl font-bold mb-5">₨{plan.price}<span className="text-sm text-muted-foreground font-normal">/{plan.period}</span></div>
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

            <div className="rounded-xl border border-border/30 bg-card/30 p-5 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                <span>All Domains are in secure protection from Axo Nodes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== WEB HOSTING VIEW ===================== */}
      {activeView === "web" && (
        <div className="pt-32 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition text-sm">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
            
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">Web Hosting Services</h2>
              <p className="text-muted-foreground">Managed web hosting with WordPress support and DDoS protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              {webPlans.map((plan) => (
                <div 
                  key={plan.name} 
                  className={`rounded-xl border bg-card/40 p-6 transition-all duration-300 hover:border-primary/30 ${plan.featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border/30"}`}
                >
                  {plan.featured && <span className="inline-block px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase mb-3">Best Value</span>}
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="space-y-0 mb-4">
                    <SpecRow label="Websites" value={plan.sites} icon={Globe} />
                    <SpecRow label="Storage" value={plan.disk} icon={HardDrive} />
                    <SpecRow label="DDoS" value={plan.ddos} icon={Shield} />
                    <SpecRow label="WordPress" value={plan.wordpress} icon={Check} />
                    <SpecRow label="Backup" value={plan.backup} icon={Database} />
                  </div>
                  <p className="text-xs text-accent mb-3">{plan.domain}</p>
                  <div className="text-2xl font-bold mb-5">₨{plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
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

      {/* ===================== CONTACT VIEW ===================== */}
      {activeView === "contact" && (
        <div className="pt-32 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold mb-4">Enterprise Support</h2>
              <p className="text-muted-foreground">24/7 professional support for all hosting services</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mb-10">
              <a 
                href={DISCORD_SERVER} 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-xl border border-border/30 bg-card/30 p-8 block transition-all duration-300 hover:border-primary/30"
              >
                <MessageSquare className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Discord Community</h3>
                <p className="text-muted-foreground mb-2 text-sm">Join for ticket support & community assistance</p>
                <p className="text-sm text-accent">Average response time: 5 minutes</p>
              </a>
              
              <a 
                href="mailto:ashad.umar355@gmail.com"
                className="rounded-xl border border-border/30 bg-card/30 p-8 block transition-all duration-300 hover:border-primary/30"
              >
                <Mail className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                <p className="text-muted-foreground mb-2 text-sm">ashad.umar355@gmail.com</p>
                <p className="text-sm text-accent">Business inquiries & partnerships</p>
              </a>
            </div>
            
            <div className="rounded-xl border border-border/30 bg-card/30 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Service Level Agreement</h3>
              <p className="text-muted-foreground mb-6 text-sm">
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
