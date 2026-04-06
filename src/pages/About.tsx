import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Zap, Clock, Users, Globe, Server, Cpu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axoLogo from "@/assets/axo-nodes-logo.jpg";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={axoLogo} alt="Axo Nodes" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Axo Nodes</h1>
              <p className="text-xs text-muted-foreground tracking-widest uppercase">Powering the Way</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 grid-bg"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/6 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">About Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-gradient">Axo Nodes</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Your trusted partner for enterprise-grade VPS, Minecraft, domain, and web hosting solutions — built for performance, reliability, and scale.
            </p>
          </div>

          <div className="space-y-8">
            {/* Mission */}
            <div className="rounded-xl border border-border/30 bg-card/30 p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Axo Nodes, we are dedicated to providing high-performance, reliable, and affordable hosting solutions 
                for businesses and gaming communities. Our mission is to empower our customers with enterprise-grade 
                infrastructure, exceptional support, and transparent pricing — quality over greed, professionalism over everything.
              </p>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Why Choose Axo Nodes?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Enterprise Security", desc: "Level 7 DDoS protection powered by OVH Cloud, secure infrastructure, and regular security updates." },
                  { icon: Zap, title: "Lightning Performance", desc: "AMD EPYC™ & Intel® Xeon® processors with enterprise NVMe Gen4 storage for maximum I/O." },
                  { icon: Clock, title: "99.9% Uptime Guarantee", desc: "Tier 3+ data centers with redundant power, cooling, and network links for maximum availability." },
                  { icon: Users, title: "24/7 Expert Support", desc: "Real-world experts on Discord with under 15-minute average response time, day or night." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-border/30 bg-card/30 p-6 transition-all duration-300 hover:border-primary/20">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="rounded-xl border border-border/30 bg-card/30 p-8">
              <h2 className="text-2xl font-bold mb-6">Our Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Server, title: "KVM VPS Hosting", desc: "Full root access, dedicated IPv4, NVMe storage, India location with OVH Cloud infrastructure." },
                  { icon: Cpu, title: "Minecraft Hosting", desc: "Optimized game servers with DDoS protection, automatic backups, and instant setup for all server types." },
                  { icon: Globe, title: "Domain & Web Hosting", desc: ".com, .fun, .net domains with free SSL. cPanel web hosting with WordPress support." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="rounded-xl border border-border/30 bg-card/30 p-8">
              <h2 className="text-2xl font-bold mb-4">Our Infrastructure</h2>
              <p className="text-muted-foreground mb-6">Axo Nodes operates on state-of-the-art data centers:</p>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "AMD EPYC™ & Intel® Xeon® processors",
                  "Enterprise NVMe Gen4 storage",
                  "Redundant high-bandwidth networking",
                  "Level 7 DDoS mitigation (17Tbps+)",
                  "Automated backup & disaster recovery",
                  "India-based with premium peerage",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
              <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-6">
                Join hundreds of satisfied customers who trust Axo Nodes for their hosting needs.
              </p>
              <Button size="lg" onClick={() => navigate('/')}>
                View Our Plans
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;