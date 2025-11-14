import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";

const Contact = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
          Have questions? We're here to help! Reach out to our team through any of the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <MessageSquare className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Discord Support</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Join our Discord server for instant support, updates, and community discussions. Our support team is 
              available 24/7 to assist you.
            </p>
            <Button 
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              onClick={() => window.open('https://discord.com/channels/1413463825851875328/1413463826896126056', '_blank')}
            >
              Join Discord Server
            </Button>
          </div>

          <div className="p-8 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors">
            <Mail className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Email Support</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Prefer email? Send us your questions, concerns, or feedback and we'll get back to you as soon as possible.
            </p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.location.href = 'mailto:support@cosmiccloud.com'}
            >
              Send Email
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We accept various payment methods including UPI, credit/debit cards, net banking, and other popular 
                payment gateways in India.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How quickly can I get started?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Most servers are deployed within minutes of payment confirmation. You'll receive login credentials 
                and access information immediately after setup.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, we offer a refund policy for certain situations. Please refer to our Terms of Service for 
                detailed information or contact our support team.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! You can upgrade or downgrade your plan at any time. Contact our support team through 
                Discord and we'll assist you with the process.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What kind of technical support do you provide?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We provide 24/7 technical support for server issues, configuration assistance, and general questions. 
                Our team is always ready to help through our Discord server.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Are backups included?</h3>
              <p className="text-muted-foreground leading-relaxed">
                While we implement regular infrastructure backups, we recommend maintaining your own backups for 
                critical data. We can assist you with setting up automated backup solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Need more information about our services?
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/')}
          >
            View Our Plans
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
