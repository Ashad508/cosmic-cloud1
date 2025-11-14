import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Zap, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={cosmicLogo} alt="Cosmic Cloud" className="w-12 h-12" />
            <div>
              <h1 className="text-2xl font-bold text-cosmic-gradient">Cosmic Cloud</h1>
              <p className="text-xs text-muted-foreground">Premium Hosting Solutions</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">About Cosmic Cloud</h1>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Your trusted partner for premium VPS and Minecraft server hosting solutions
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              At Cosmic Cloud, we are dedicated to providing high-performance, reliable, and affordable hosting solutions 
              for businesses and gaming communities. Our mission is to empower our customers with enterprise-grade 
              infrastructure, exceptional support, and transparent pricing.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">Why Choose Cosmic Cloud?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-border rounded-lg bg-card">
                <Shield className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Level 5 DDoS protection, secure infrastructure, and regular security updates to keep your data safe 
                  and your services online.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg bg-card">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast Performance</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Powered by Intel Xeon and AMD Ryzen processors with ultra-fast NVMe storage for exceptional 
                  performance and low latency.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg bg-card">
                <Clock className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">99.9% Uptime Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our redundant infrastructure and proactive monitoring ensure your services stay online when you 
                  need them most.
                </p>
              </div>

              <div className="p-6 border border-border rounded-lg bg-card">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated support team is available around the clock through Discord to assist you with any 
                  questions or issues.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">VPS Hosting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We offer both Intel Xeon and AMD Ryzen based VPS solutions with full root access, dedicated IPv4 
                  addresses, and flexible configurations to match your exact needs. Whether you're running a website, 
                  application, or development environment, we have the perfect plan for you.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Minecraft Hosting</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Specialized Minecraft server hosting optimized for performance with DDoS protection, automatic backups, 
                  and instant setup. Perfect for both small communities and large networks with support for all popular 
                  server types including Vanilla, Spigot, Paper, and modded servers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Infrastructure</h2>
            <p className="text-muted-foreground leading-relaxed text-lg mb-4">
              Cosmic Cloud operates on state-of-the-art data centers with:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span>Enterprise-grade Intel Xeon and AMD Ryzen processors for maximum performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span>Ultra-fast NVMe storage for lightning-quick data access</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span>Redundant network connectivity with high-bandwidth capacity</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span>Advanced DDoS mitigation and firewall protection</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-3 text-xl">•</span>
                <span>Regular automated backups and disaster recovery systems</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We are committed to transparency, reliability, and customer satisfaction. Every decision we make is driven 
              by our goal to provide the best possible hosting experience. We continuously invest in our infrastructure, 
              stay updated with the latest technologies, and listen to our customers' feedback to improve our services.
            </p>
          </section>

          <section className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Join hundreds of satisfied customers who trust Cosmic Cloud for their hosting needs
            </p>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => navigate('/')}
            >
              View Our Plans
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
