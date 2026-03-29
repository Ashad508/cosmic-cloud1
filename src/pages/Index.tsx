import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  Server, Cpu, Shield, Zap, Mail, MessageSquare, Globe, Rocket, 
  HardDrive, Gauge, Database, Clock, Lock, Check, ChevronRight,
  Users, Activity, Timer, Infinity, Bot, ArrowLeft, Search, Package,
  Sword, Gem, Gift, Crown, Star, Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import MaintenancePage from "@/components/MaintenancePage";
import { supabase } from "@/integrations/supabase/client";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";
const DISCORD_PURCHASE = "https://discord.com/channels/1463541808503062624/1463543201620037843";

// Minecraft Paid Plans
const minecraftPlans = [
  { name: "Stone", tier: "stone", ram: "2 GB", disk: "6 GB", cores: "1", cpu: "110%", backups: "1", ports: "0", price: "170" },
  { name: "Copper", tier: "copper", ram: "7 GB", disk: "9 GB", cores: "1", cpu: "150%", backups: "2", ports: "1", price: "520" },
  { name: "Iron", tier: "iron", ram: "12 GB", disk: "23 GB", cores: "2", cpu: "300%", backups: "4", ports: "1", price: "800", featured: true },
  { name: "Obsidian", tier: "obsidian", ram: "16 GB", disk: "29 GB", cores: "3", cpu: "400%", backups: "5", ports: "2", price: "1,100" },
  { name: "Bedrock", tier: "bedrock", ram: "Unlimited", disk: "Unlimited", cores: "Unlimited", cpu: "Unlimited", backups: "Unlimited", ports: "Unlimited", price: "4,500" },
];

// Minecraft Free Invite Plans
const minecraftFreePlans = [
  { name: "4× Invite", ram: "5 GB", disk: "10 GB", cores: "1", cpu: "120%", backups: "1", ports: "0", invites: 4 },
  { name: "8× Invite", ram: "10 GB", disk: "15 GB", cores: "1", cpu: "150%", backups: "2", ports: "1", invites: 8 },
  { name: "12× Invite", ram: "12 GB", disk: "23 GB", cores: "2", cpu: "300%", backups: "4", ports: "1", invites: 12 },
  { name: "17× Invite", ram: "18 GB", disk: "29 GB", cores: "2", cpu: "340%", backups: "5", ports: "2", invites: 17 },
];

// VPS Paid Plans
const vpsPlans = [
  { name: "Plan 1", tier: "Entry & Growth", ram: "8 GB", cpu: "2 vCPU", storage: "100 GB NVMe", bandwidth: "8 TB", price: "1,600" },
  { name: "Plan 2", tier: "Entry & Growth", ram: "16 GB", cpu: "4 vCPU", storage: "200 GB NVMe", bandwidth: "16 TB", price: "2,600", featured: true },
  { name: "Plan 3", tier: "Performance", ram: "32 GB", cpu: "8 vCPU", storage: "500 GB NVMe", bandwidth: "32 TB", price: "8,000" },
];

// VPS Free Invite Plans
const vpsFreePlans = [
  { tier: "Entry & Growth", plans: [
    { name: "1× Invite", ram: "4 GB", disk: "50 GB NVMe", cpu: "1 Core", invites: 1 },
    { name: "2× Invites", ram: "8 GB", disk: "100 GB NVMe", cpu: "4 Cores", invites: 2 },
  ]},
  { tier: "Performance", plans: [
    { name: "4× Invites", ram: "12 GB", disk: "150 GB NVMe", cpu: "8 Cores", invites: 4 },
    { name: "8× Invites", ram: "24 GB", disk: "200 GB NVMe", cpu: "12 Cores", invites: 8 },
    { name: "12× Invites", ram: "28 GB", disk: "256 GB NVMe", cpu: "16 Cores", invites: 12 },
  ]},
  { tier: "Enterprise", plans: [
    { name: "16× Invites", ram: "32 GB", disk: "300 GB NVMe", cpu: "18 Cores", invites: 16 },
    { name: "18× Invites", ram: "64 GB", disk: "350 GB NVMe", cpu: "24 Cores", invites: 18 },
    { name: "32× Invites", ram: "96 GB", disk: "500 GB NVMe", cpu: "44 Cores", invites: 32 },
  ]},
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

// Floating particles component
const FloatingParticles = ({ count = 12, color = "primary" }: { count?: number; color?: string }) => {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      size: 2 + Math.random() * 4,
    })), [count]
  );

  return (
    <div className="mc-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute rounded-sm bg-${color} opacity-0`}
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

// Animated stat row for plan cards
const PlanStat = ({ label, value, icon: Icon, delay = 0 }: { label: string; value: string; icon: React.ElementType; delay?: number }) => (
  <div 
    className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0 opacity-0 animate-slide-up"
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    <span className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="w-3.5 h-3.5 text-primary/70" />
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
  const [mcTab, setMcTab] = useState<"paid" | "free">("paid");
  const [vpsTab, setVpsTab] = useState<"paid" | "free">("paid");

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
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 announcement-offset">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo("home")}>
            <img src={cosmicLogo} alt="Axo Nodes" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Axo Nodes</h1>
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
            <Link to="/order-tracker" className="text-sm text-accent hover:text-accent/80 transition flex items-center gap-1">
              <Package className="w-4 h-4" />
              Order Tracker
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
            <span className="text-xs">Trial</span>
          </Link>
          <Link to="/order-tracker" className="flex flex-col items-center gap-1 text-accent">
            <Package className="w-5 h-5" />
            <span className="text-xs">Order</span>
          </Link>
        </div>
      </nav>

      {/* ===================== HOME VIEW ===================== */}
      {activeView === "home" && (
        <div className="animate-fade-in">
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 grid-bg"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]"></div>
            <FloatingParticles count={8} />
            
            <div className="container mx-auto max-w-6xl relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 mb-6">
                    <div className="status-dot"></div>
                    <span className="text-sm text-accent font-medium">ENTERPRISE SYSTEMS OPERATIONAL</span>
                  </div>
                  
                  <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    Infrastructure<br />
                    <span className="text-shimmer">Singularity.</span>
                  </h2>
                  
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
                ].map((feature, i) => (
                  <div 
                    key={feature.title} 
                    className="glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                  >
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
                <h2 className="text-3xl font-bold mb-4">Powering the Way</h2>
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
                ].map((service, i) => (
                  <button 
                    key={service.title} 
                    onClick={service.action}
                    className="glass rounded-2xl p-6 text-left card-hover group opacity-0 animate-slide-up"
                    style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
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
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-7xl relative">
            <FloatingParticles count={15} />
            
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            {/* Hero Banner */}
            <div className="relative text-center mb-12 overflow-hidden rounded-2xl glass p-10 border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
                  <Sword className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">⚔️ Minecraft Server Hosting</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-shimmer">Minecraft Hosting Collection</span>
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Enterprise-grade Minecraft server hosting powered by AMD EPYC™ processors. 
                  From survival servers to massive networks.
                </p>
              </div>
            </div>

            {/* Paid / Free Toggle */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-xl border border-border/50 bg-card/50 p-1.5 gap-1">
                <button
                  onClick={() => setMcTab("paid")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mcTab === "paid" 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gem className="w-4 h-4 inline mr-2" />
                  Premium Plans
                </button>
                <button
                  onClick={() => setMcTab("free")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    mcTab === "free" 
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gift className="w-4 h-4 inline mr-2" />
                  Free Invite Plans
                </button>
              </div>
            </div>

            {/* Paid Plans */}
            {mcTab === "paid" && (
              <div className="animate-fade-in">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                  {minecraftPlans.map((plan, i) => (
                    <div 
                      key={plan.name} 
                      className={`tier-card tier-${plan.tier} glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up ${
                        plan.featured ? "ring-1 ring-secondary/50 glow-diamond" : ""
                      } ${plan.name === "Bedrock" ? "animate-border-glow glow-netherite" : ""}`}
                      style={{ animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
                    >
                      {plan.featured && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Star className="w-3.5 h-3.5 text-secondary" />
                          <span className="text-xs font-bold text-secondary tracking-wider">POPULAR</span>
                        </div>
                      )}
                      {plan.name === "Bedrock" && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Crown className="w-3.5 h-3.5 text-primary" />
                          <span className="text-xs font-bold text-primary tracking-wider">ULTIMATE</span>
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">Plan</p>
                      
                      <div className="space-y-0">
                        <PlanStat label="Memory" value={plan.ram} icon={Database} delay={i * 80 + 100} />
                        <PlanStat label="Disk" value={plan.disk} icon={HardDrive} delay={i * 80 + 150} />
                        <PlanStat label="Cores" value={plan.cores} icon={Cpu} delay={i * 80 + 200} />
                        <PlanStat label="CPU Load" value={plan.cpu} icon={Gauge} delay={i * 80 + 250} />
                        <PlanStat label="Backups" value={plan.backups} icon={Shield} delay={i * 80 + 300} />
                        <PlanStat label="Allocations" value={plan.ports} icon={Globe} delay={i * 80 + 350} />
                      </div>
                      
                      <div className="mt-5 mb-4 pt-4 border-t border-border/30">
                        <span className="text-2xl font-bold">PKR {plan.price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                      
                      <Button 
                        className={`w-full ${plan.featured ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : plan.name === "Bedrock" ? "bg-primary hover:bg-primary/90" : ""}`}
                        variant={plan.featured || plan.name === "Bedrock" ? "default" : "outline"}
                        onClick={() => window.open(DISCORD_PURCHASE, "_blank")}
                      >
                        Purchase Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Free Invite Plans */}
            {mcTab === "free" && (
              <div className="animate-fade-in">
                <div className="text-center mb-8">
                  <p className="text-muted-foreground">Invite friends to our Discord server and unlock free Minecraft hosting!</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {minecraftFreePlans.map((plan, i) => (
                    <div 
                      key={plan.name} 
                      className="tier-card tier-invite glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up"
                      style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                    >
                      <div className="flex items-center gap-1.5 mb-3">
                        <Gift className="w-3.5 h-3.5 text-accent" />
                        <span className="text-xs font-bold text-accent tracking-wider">FREE</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">Invite {plan.invites} friends</p>
                      
                      <div className="space-y-0">
                        <PlanStat label="Memory" value={plan.ram} icon={Database} delay={i * 100 + 100} />
                        <PlanStat label="Disk" value={plan.disk} icon={HardDrive} delay={i * 100 + 150} />
                        <PlanStat label="Cores" value={plan.cores} icon={Cpu} delay={i * 100 + 200} />
                        <PlanStat label="CPU Load" value={plan.cpu} icon={Gauge} delay={i * 100 + 250} />
                        <PlanStat label="Backups" value={plan.backups} icon={Shield} delay={i * 100 + 300} />
                        <PlanStat label="Allocations" value={plan.ports} icon={Globe} delay={i * 100 + 350} />
                      </div>
                      
                      <div className="mt-5 mb-4 pt-4 border-t border-border/30">
                        <span className="text-2xl font-bold text-accent">FREE</span>
                        <span className="text-sm text-muted-foreground ml-2">with invites</span>
                      </div>
                      
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => window.open(DISCORD_SERVER, "_blank")}
                      >
                        Join & Invite
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AMD EPYC Badge */}
            <div className="mt-12 glass rounded-2xl p-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>AMD EPYC™ Processors</span>
                </div>
                <div className="section-divider w-px h-4 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>DDoS Protected</span>
                </div>
                <div className="section-divider w-px h-4 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-secondary" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="section-divider w-px h-4 hidden md:block"></div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Instant Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== VPS VIEW ===================== */}
      {activeView === "vps" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-7xl relative">
            <FloatingParticles count={10} color="secondary" />
            
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            {/* Hero */}
            <div className="relative text-center mb-12 overflow-hidden rounded-2xl glass p-10 border border-border/50">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-primary/10"></div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-4">
                  <span className="text-sm font-medium">⭐ Axo Nodes™ – KVM VPS Plans (India 🇮🇳) 💎</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-shimmer">Enterprise Cloud Infrastructure</span>
                </h2>
                <p className="text-muted-foreground mb-2">High-performance KVM VPS with ultra-fast NVMe storage and rock-solid bandwidth.</p>
                <p className="text-sm text-accent">Perfect for Minecraft servers, bots, panels & web hosting ⚡</p>
              </div>
            </div>

            {/* Paid / Free Toggle */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-xl border border-border/50 bg-card/50 p-1.5 gap-1">
                <button
                  onClick={() => setVpsTab("paid")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    vpsTab === "paid" 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gem className="w-4 h-4 inline mr-2" />
                  Premium Plans
                </button>
                <button
                  onClick={() => setVpsTab("free")}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    vpsTab === "free" 
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gift className="w-4 h-4 inline mr-2" />
                  Free Invite Plans
                </button>
              </div>
            </div>

            {/* VPS Paid Plans */}
            {vpsTab === "paid" && (
              <div className="animate-fade-in">
                {/* Tier I */}
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-primary">🔹</span> Tier I — Entry & Growth
                </h3>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {vpsPlans.filter(p => p.tier === "Entry & Growth").map((plan, i) => (
                    <div 
                      key={plan.name} 
                      className={`glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up ${plan.featured ? "glow-diamond ring-1 ring-secondary/40" : ""}`}
                      style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                    >
                      {plan.featured && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Star className="w-3.5 h-3.5 text-secondary" />
                          <span className="text-xs font-bold text-secondary tracking-wider">RECOMMENDED</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                      <div className="space-y-0">
                        <PlanStat label="vCPU Cores" value={plan.cpu} icon={Cpu} delay={i * 100 + 100} />
                        <PlanStat label="RAM" value={plan.ram} icon={Database} delay={i * 100 + 150} />
                        <PlanStat label="NVMe Disk" value={plan.storage} icon={HardDrive} delay={i * 100 + 200} />
                        <PlanStat label="Bandwidth" value={plan.bandwidth} icon={Gauge} delay={i * 100 + 250} />
                      </div>
                      <div className="mt-5 mb-4 pt-4 border-t border-border/30">
                        <span className="text-2xl font-bold">PKR {plan.price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
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

                {/* Tier II */}
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-primary">🔹</span> Tier II — Performance
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                  {vpsPlans.filter(p => p.tier === "Performance").map((plan, i) => (
                    <div 
                      key={plan.name} 
                      className="glass rounded-2xl p-6 card-hover glow-netherite opacity-0 animate-slide-up"
                      style={{ animationDelay: `${i * 100 + 200}ms`, animationFillMode: "forwards" }}
                    >
                      <span className="pro-badge mb-4 inline-block">PERFORMANCE</span>
                      <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                      <div className="space-y-0">
                        <PlanStat label="vCPU Cores" value={plan.cpu} icon={Cpu} delay={i * 100 + 300} />
                        <PlanStat label="RAM" value={plan.ram} icon={Database} delay={i * 100 + 350} />
                        <PlanStat label="NVMe Disk" value={plan.storage} icon={HardDrive} delay={i * 100 + 400} />
                        <PlanStat label="Bandwidth" value={plan.bandwidth} icon={Gauge} delay={i * 100 + 450} />
                      </div>
                      <div className="mt-5 mb-4 pt-4 border-t border-border/30">
                        <span className="text-2xl font-bold">PKR {plan.price}</span>
                        <span className="text-sm text-muted-foreground">/mo</span>
                      </div>
                      <Button className="w-full" onClick={() => window.open(DISCORD_PURCHASE, "_blank")}>
                        Purchase Now
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Enterprise Tier */}
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-accent">⭐</span> Tier III — Enterprise
                </h3>
                <div className="glass rounded-2xl p-8 text-center glow-netherite mb-10">
                  <Rocket className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Custom Enterprise Solutions</h3>
                  <p className="text-muted-foreground mb-6">
                    For Enterprise Plans, make a ticket at Axo Nodes Discord and ask us for customized solutions.
                  </p>
                  <Button size="lg" onClick={() => window.open(DISCORD_SERVER, "_blank")}>
                    Contact for Enterprise
                  </Button>
                </div>
              </div>
            )}

            {/* VPS Free Invite Plans */}
            {vpsTab === "free" && (
              <div className="animate-fade-in space-y-10">
                <div className="text-center mb-4">
                  <p className="text-muted-foreground">Invite friends and get free VPS hosting with shared IPv4!</p>
                </div>
                
                {vpsFreePlans.map((tierGroup, ti) => (
                  <div key={tierGroup.tier}>
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <span className={tierGroup.tier === "Enterprise" ? "text-accent" : "text-primary"}>
                        {tierGroup.tier === "Enterprise" ? "⭐" : "🔹"}
                      </span>
                      {tierGroup.tier === "Entry & Growth" ? "Tier I — Entry & Growth" : 
                       tierGroup.tier === "Performance" ? "Tier II — Performance" : 
                       "Tier III — Enterprise"}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {tierGroup.plans.map((plan, i) => (
                        <div 
                          key={plan.name} 
                          className="tier-card tier-invite glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up"
                          style={{ animationDelay: `${(ti * 3 + i) * 80}ms`, animationFillMode: "forwards" }}
                        >
                          <div className="flex items-center gap-1.5 mb-3">
                            <Gift className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs font-bold text-accent tracking-wider">FREE — {plan.invites}× INVITE{plan.invites > 1 ? "S" : ""}</span>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                          <div className="space-y-0">
                            <PlanStat label="RAM" value={plan.ram} icon={Database} delay={(ti * 3 + i) * 80 + 100} />
                            <PlanStat label="NVMe Disk" value={plan.disk} icon={HardDrive} delay={(ti * 3 + i) * 80 + 150} />
                            <PlanStat label="CPU" value={plan.cpu} icon={Cpu} delay={(ti * 3 + i) * 80 + 200} />
                          </div>
                          
                          <div className="mt-5 mb-4 pt-4 border-t border-border/30 flex items-center gap-2">
                            <span className="text-2xl font-bold text-accent">FREE</span>
                            <span className="text-xs text-muted-foreground">Shared IPv4</span>
                          </div>
                          
                          <Button className="w-full" variant="outline" onClick={() => window.open(DISCORD_SERVER, "_blank")}>
                            Join & Invite
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VPS Features */}
            <div className="mt-12 glass rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">All VPS Servers Include</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {vpsFeatures.map((feature, i) => (
                  <div 
                    key={feature} 
                    className="flex items-center gap-2 text-sm opacity-0 animate-slide-up"
                    style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
                  >
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
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Domain Registration</h2>
              <p className="text-muted-foreground">Secure your perfect domain with Axo Nodes protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {domainPlans.map((plan, i) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
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
                <span>All Domains are in secure protection from Axo Nodes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== WEB HOSTING VIEW ===================== */}
      {activeView === "web" && (
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition">
              <ArrowLeft className="w-4 h-4" /> Return
            </button>
            
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Web Hosting Services</h2>
              <p className="text-muted-foreground">Managed web hosting with WordPress support and DDoS protection</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {webPlans.map((plan, i) => (
                <div 
                  key={plan.name} 
                  className={`glass rounded-2xl p-6 card-hover opacity-0 animate-slide-up ${plan.featured ? "glow-diamond border-secondary/40" : ""}`}
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  {plan.featured && <span className="pro-badge mb-4 inline-block">BEST VALUE</span>}
                  <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                  <div className="space-y-0">
                    <PlanStat label="Websites" value={plan.sites} icon={Globe} delay={i * 100 + 100} />
                    <PlanStat label="Storage" value={plan.disk} icon={HardDrive} delay={i * 100 + 150} />
                    <PlanStat label="DDoS" value={plan.ddos} icon={Shield} delay={i * 100 + 200} />
                    <PlanStat label="WordPress" value={plan.wordpress} icon={Check} delay={i * 100 + 250} />
                    <PlanStat label="Backup" value={plan.backup} icon={Database} delay={i * 100 + 300} />
                  </div>
                  <p className="text-xs text-accent mt-3 mb-1">{plan.domain}</p>
                  <div className="text-2xl font-bold mb-4 mt-3">PKR {plan.price}<span className="text-sm text-muted-foreground font-normal">/mo</span></div>
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
        <div className="pt-24 pb-20 px-4 animate-fade-in">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Enterprise Support</h2>
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
