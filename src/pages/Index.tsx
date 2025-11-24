import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingCard } from "@/components/PricingCard";
import { Server, Cpu, HardDrive, Gauge, Shield, Zap, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
  };

  const renderProductCards = (categoryProducts: any[], currency: string = "PKR") => {
    if (loading) {
      return <div className="text-center py-12">Loading products...</div>;
    }
    
    if (categoryProducts.length === 0) {
      return <div className="text-center py-12 text-muted-foreground">No products available</div>;
    }

    return categoryProducts.map((product, index) => {
      const specs = product.features?.map((feature: string) => {
        const [label, value] = feature.split(':').map((s: string) => s.trim());
        return { label: label || feature, value: value || '' };
      }) || [];

      return (
        <PricingCard
          key={product.id}
          title={product.name}
          delay={index * 80}
          specs={specs}
          price={product.price.toString()}
          currency={currency}
          featured={index === 1}
        />
      );
    });
  };
  
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
            <a href="https://panel.lazycloud.fun/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">cPanel</a>
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
            Premium Minecraft & VPS Hosting Solutions
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
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">VPS Hosting</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-cosmic-gradient leading-tight">
              Virtual Private Servers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              High-performance KVM VPS with dedicated resources, NVMe storage, and enterprise-grade security
            </p>
          </div>

          <Tabs defaultValue="intel" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger value="intel" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                Intel Xeon Platinum
              </TabsTrigger>
              <TabsTrigger value="amd" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                AMD Ryzen
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intel" className="space-y-8 animate-fade-in">
              <div className="text-center mb-8 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">Intel Xeon Platinum VPS</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Enterprise-grade performance with Intel Xeon Platinum processors, ultra-fast NVMe storage, 
                  and unlimited bandwidth. Perfect for Minecraft servers, Discord bots, and web applications ⚡
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {renderProductCards(getProductsByCategory('VPS Intel'))}
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
              <div className="text-center mb-8 max-w-2xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">AMD Ryzen VPS</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Superior performance with AMD Ryzen processors, ultra-fast NVMe storage, 
                  and unlimited bandwidth. Ideal for resource-intensive applications and high-traffic websites ⚡
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {renderProductCards(getProductsByCategory('VPS AMD'))}
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
              Minecraft Game Servers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Optimized game servers with instant deployment, automated backups, and dedicated support 🕸️
            </p>
          </div>

          <Tabs defaultValue="intel" className="max-w-7xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1">
              <TabsTrigger value="intel" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                Intel Xeon Platinum
                <span className="ml-2 text-xs text-muted-foreground">(India)</span>
              </TabsTrigger>
              <TabsTrigger value="amd" className="py-3 text-base font-semibold">
                <Cpu className="w-4 h-4 mr-2" />
                AMD EPYC Milan
                <span className="ml-2 text-xs text-muted-foreground">(India)</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intel" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {renderProductCards(getProductsByCategory('Minecraft Intel'), 'PKR')}
              </div>
            </TabsContent>

            <TabsContent value="amd" className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {renderProductCards(getProductsByCategory('Minecraft AMD'), 'PKR')}
              </div>
            </TabsContent>
          </Tabs>
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
      <Footer />
    </div>
  );
};

export default Index;
