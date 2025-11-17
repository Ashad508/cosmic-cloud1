import { useNavigate } from "react-router-dom";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={cosmicLogo} alt="Cosmic Cloud" className="w-10 h-10" />
              <div>
                <h3 className="text-xl font-bold text-cosmic-gradient">Cosmic Cloud</h3>
                <p className="text-xs text-muted-foreground">Premium Hosting Solutions</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Enterprise-grade VPS and Minecraft hosting with DDoS protection, 99.9% uptime guarantee, 
              and 24/7 support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
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
                  href="https://discord.com/channels/1413463825851875328/1413463826896126056"
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
            <ul className="space-y-2">
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
              <li>
                <button 
                  onClick={() => navigate('/admin')}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Admin Portal
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>© {currentYear} Cosmic Cloud. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
