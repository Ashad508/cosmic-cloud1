import { Server, MessageSquare, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";
import { useEffect, useState } from "react";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";

const MaintenancePage = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/95 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20"></div>
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-destructive/5 rounded-full blur-[150px] transition-opacity duration-1000" style={{ opacity: mounted ? 1 : 0 }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] transition-opacity duration-1000 delay-300" style={{ opacity: mounted ? 1 : 0 }}></div>

      <div className={`relative z-10 text-center max-w-2xl transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative group">
            <img 
              src={cosmicLogo} 
              alt="Slayer Nodes" 
              className="w-20 h-20 rounded-xl shadow-lg border border-border/30 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute -bottom-1.5 -right-1.5 bg-destructive rounded-full p-1.5 shadow-md">
              <Wrench className="w-3.5 h-3.5 text-destructive-foreground" />
            </div>
          </div>
        </div>

        {/* Maintenance Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-destructive/10 p-5 rounded-2xl border border-destructive/20 backdrop-blur-sm">
            <Server className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
          Under Maintenance
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          We're performing scheduled maintenance to improve our services. Thank you for your patience.
        </p>

        {/* Info Box */}
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-border/40 shadow-sm">
          <div className="flex items-center justify-center gap-2 mb-3 text-primary">
            <Clock className="w-5 h-5" />
            <span className="font-medium">We'll be back soon</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Our team is working to bring you an even better experience. 
            Check our Discord for live updates and estimated completion time.
          </p>
        </div>

        {/* Discord CTA */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Stay connected with us:
          </p>
          <a 
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 transition-colors duration-200 shadow-md">
              <MessageSquare className="w-5 h-5 mr-2" />
              Join Discord Server
            </Button>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-14 text-xs text-muted-foreground/70">
          <p>Slayer Nodes™ • Enterprise Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
