import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/PricingCard";
import { Server, Cpu, HardDrive, Gauge, Shield, Zap, Mail, MessageSquare } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-32 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-cosmic-gradient">
            Welcome to Cosmic Cloud
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Premium Minecraft & VPS Hosting with Ultra-Fast Performance
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
      <section id="vps" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient">VPS Hosting</h2>
            <p className="text-xl text-muted-foreground">High-performance virtual private servers</p>
          </div>

          <Tabs defaultValue="intel" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="intel">Intel Xeon Platinum</TabsTrigger>
              <TabsTrigger value="amd">AMD EPYC</TabsTrigger>
            </TabsList>

            <TabsContent value="intel" className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Intel Xeon Platinum VPS</h3>
                <p className="text-muted-foreground">
                  High-performance VPS hosting with ultra-fast NVMe storage and stable bandwidth. 
                  Perfect for Minecraft, bots, and web hosting! ⚡
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <PricingCard
                  title="Plan 1"
                  specs={[
                    { label: "vCPU Cores", value: "2" },
                    { label: "RAM", value: "8 GB" },
                    { label: "NVMe Disk", value: "100 GB" },
                    { label: "Bandwidth", value: "8 TB" },
                  ]}
                  price="1,600"
                />
                <PricingCard
                  title="Plan 2"
                  featured
                  specs={[
                    { label: "vCPU Cores", value: "4" },
                    { label: "RAM", value: "16 GB" },
                    { label: "NVMe Disk", value: "200 GB" },
                    { label: "Bandwidth", value: "16 TB" },
                  ]}
                  price="2,600"
                />
                <PricingCard
                  title="Plan 3"
                  specs={[
                    { label: "vCPU Cores", value: "8" },
                    { label: "RAM", value: "32 GB" },
                    { label: "NVMe Disk", value: "500 GB" },
                    { label: "Bandwidth", value: "32 TB" },
                  ]}
                  price="8,000"
                />
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

            <TabsContent value="amd">
              <div className="text-center py-20">
                <div className="max-w-md mx-auto p-8 bg-card border border-border rounded-lg cosmic-glow">
                  <Cpu className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">AMD EPYC Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're working hard to bring you powerful AMD EPYC VPS hosting. Stay tuned!
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
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient">Minecraft Hosting</h2>
            <p className="text-xl text-muted-foreground">Optimized servers for the ultimate Minecraft experience 🕸️</p>
          </div>

          <Tabs defaultValue="intel" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="intel">Intel Xeon Platinum (India)</TabsTrigger>
              <TabsTrigger value="amd">AMD EPYC Milan (India)</TabsTrigger>
            </TabsList>

            <TabsContent value="intel" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <PricingCard
                  title="Stone Plan 👋"
                  specs={[
                    { label: "Memory", value: "2 GB" },
                    { label: "Disk", value: "2 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "100%" },
                    { label: "Backup", value: "1" },
                    { label: "Allocations", value: "0" },
                  ]}
                  price="200"
                  currency="PKR"
                />
                <PricingCard
                  title="Copper Plan ⚔️"
                  specs={[
                    { label: "Memory", value: "7 GB" },
                    { label: "Disk", value: "9 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "150%" },
                    { label: "Backup", value: "2" },
                    { label: "Allocations", value: "1" },
                  ]}
                  price="600"
                  currency="PKR"
                />
                <PricingCard
                  title="Iron Plan 🔥"
                  featured
                  specs={[
                    { label: "Memory", value: "11 GB" },
                    { label: "Disk", value: "12 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "300%" },
                    { label: "Backup", value: "4" },
                    { label: "Allocations", value: "1" },
                  ]}
                  price="1000"
                  currency="PKR"
                />
                <PricingCard
                  title="Obsidian Plan 🥇"
                  specs={[
                    { label: "Memory", value: "16 GB" },
                    { label: "Disk", value: "17 GB" },
                    { label: "Cores", value: "3" },
                    { label: "CPU Load", value: "400%" },
                    { label: "Backup", value: "5" },
                    { label: "Allocations", value: "2" },
                  ]}
                  price="1600"
                  currency="PKR"
                />
                <PricingCard
                  title="Bedrock Plan 🎯"
                  specs={[
                    { label: "Memory", value: "Unlimited" },
                    { label: "Disk", value: "Unlimited" },
                    { label: "Cores", value: "Unlimited" },
                    { label: "CPU Load", value: "Unlimited" },
                    { label: "Backup", value: "Unlimited" },
                    { label: "Allocations", value: "Unlimited" },
                  ]}
                  price="5000"
                  currency="PKR"
                />
              </div>
            </TabsContent>

            <TabsContent value="amd" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                <PricingCard
                  title="Stone Plan 👋"
                  specs={[
                    { label: "Memory", value: "2 GB" },
                    { label: "Disk", value: "2 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "100%" },
                    { label: "Backup", value: "1" },
                    { label: "Allocations", value: "0" },
                  ]}
                  price="500"
                  currency="PKR"
                />
                <PricingCard
                  title="Copper Plan ⚔️"
                  specs={[
                    { label: "Memory", value: "7 GB" },
                    { label: "Disk", value: "9 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "150%" },
                    { label: "Backup", value: "2" },
                    { label: "Allocations", value: "1" },
                  ]}
                  price="900"
                  currency="PKR"
                />
                <PricingCard
                  title="Iron Plan 🔥"
                  featured
                  specs={[
                    { label: "Memory", value: "11 GB" },
                    { label: "Disk", value: "12 GB" },
                    { label: "Cores", value: "1" },
                    { label: "CPU Load", value: "300%" },
                    { label: "Backup", value: "4" },
                    { label: "Allocations", value: "1" },
                  ]}
                  price="1300"
                  currency="PKR"
                />
                <PricingCard
                  title="Obsidian Plan 🥇"
                  specs={[
                    { label: "Memory", value: "16 GB" },
                    { label: "Disk", value: "17 GB" },
                    { label: "Cores", value: "3" },
                    { label: "CPU Load", value: "400%" },
                    { label: "Backup", value: "5" },
                    { label: "Allocations", value: "2" },
                  ]}
                  price="1900"
                  currency="PKR"
                />
                <PricingCard
                  title="Bedrock Plan 🎯"
                  specs={[
                    { label: "Memory", value: "Unlimited" },
                    { label: "Disk", value: "Unlimited" },
                    { label: "Cores", value: "Unlimited" },
                    { label: "CPU Load", value: "Unlimited" },
                    { label: "Backup", value: "Unlimited" },
                    { label: "Allocations", value: "Unlimited" },
                  ]}
                  price="5300"
                  currency="PKR"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">Need help? We're here for you!</p>
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
              href="https://discord.gg/FYrKdkXYUK"
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
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={cosmicLogo} alt="Cosmic Cloud" className="w-8 h-8" />
            <span className="text-xl font-bold text-cosmic-gradient">Cosmic Cloud</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Cosmic Cloud. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
