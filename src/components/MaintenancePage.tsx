import { Server, MessageSquare, Wrench, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={cosmicLogo} 
              alt="Slayer Nodes" 
              className="w-24 h-24 rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-2 -right-2 bg-destructive/90 rounded-full p-2 animate-pulse">
              <Wrench className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Maintenance Icon */}
        <div className="mb-6 flex justify-center">
          <div className="glass p-4 rounded-full border border-destructive/30 animate-pulse">
            <Server className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Under Maintenance</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground mb-8">
          We're currently performing scheduled maintenance to improve our services.
        </p>

        {/* Info Box */}
        <div className="glass rounded-2xl p-6 mb-8 border border-border/50">
          <div className="flex items-center justify-center gap-2 mb-4 text-accent">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">We'll be back soon!</span>
          </div>
          <p className="text-muted-foreground">
            Our team is working hard to bring you an even better experience. 
            Please check our Discord server for live updates and estimated completion time.
          </p>
        </div>

        {/* Discord CTA */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Stay connected with us in the meantime:
          </p>
          <a 
            href={DISCORD_SERVER}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary">
              <MessageSquare className="w-5 h-5 mr-2" />
              Join our Discord Server
            </Button>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-12 text-xs text-muted-foreground">
          <p>Slayer Nodes™ • Enterprise Infrastructure</p>
          <p className="mt-1">Thank you for your patience!</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
