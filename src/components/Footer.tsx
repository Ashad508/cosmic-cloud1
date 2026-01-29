import { useNavigate } from "react-router-dom";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-card border-t border-border mt-auto pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={cosmicLogo} alt="Slayer Nodes" className="w-10 h-10 rounded-lg" />
              <div>
                <h3 className="text-xl font-bold text-gradient">Slayer Nodes</h3>
                <p className="text-xs text-muted-foreground">Enterprise Hosting Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md text-sm">
              Enterprise-grade VPS, Minecraft, Bot, and Web hosting with DDoS protection, 99.9% uptime guarantee, 
              and 24/7 support. Powered by AMD EPYC™ & Intel® Xeon®.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <a 
                  href="https://discord.gg/qsptvww8xX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Keywords */}
        <div className="py-4 border-t border-border mb-4">
          <p className="text-xs text-muted-foreground text-center">
            Slayer Nodes • Enterprise Hosting • VPS Hosting • Minecraft Hosting • Bot Hosting • 
            Cloud Server Hosting • Game Server Hosting • Discord Bot Hosting • Web Hosting • Professional Hosting
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-muted-foreground text-sm">
          <p>© 2025 Slayer Nodes. All rights reserved.</p>
          <a 
            href="mailto:ashad.umar355@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            ashad.umar355@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
