import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axoLogo from "@/assets/axo-nodes-logo.jpg";
import Footer from "@/components/Footer";

const DISCORD_SERVER = "https://discord.gg/gTAVRXeFVa";

const Contact = () => {
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
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px]"></div>

        <div className="container mx-auto max-w-4xl relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
              <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact <span className="text-gradient">Us</span></h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Have questions? We're here to help! Reach out through any of the channels below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            <a 
              href={DISCORD_SERVER}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border/30 bg-card/30 p-8 block transition-all duration-300 hover:border-primary/30"
            >
              <MessageSquare className="w-10 h-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Discord Support</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Join our Discord for instant support, updates, and community discussions. Our team is available 24/7.
              </p>
              <Button className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                Join Discord Server
              </Button>
            </a>

            <a 
              href="mailto:ashad.umar355@gmail.com"
              className="rounded-xl border border-border/30 bg-card/30 p-8 block transition-all duration-300 hover:border-primary/30"
            >
              <Mail className="w-10 h-10 text-primary mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Support</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Prefer email? Send us your questions and we'll get back to you as soon as possible.
              </p>
              <Button variant="outline" className="w-full">
                Send Email
              </Button>
            </a>
          </div>

          {/* FAQ */}
          <div className="rounded-xl border border-border/30 bg-card/30 p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "What payment methods do you accept?", a: "We accept various payment methods including UPI, credit/debit cards, net banking, and other popular payment gateways in India." },
                { q: "How quickly can I get started?", a: "Most servers are deployed within minutes of payment confirmation. You'll receive login credentials and access information immediately after setup." },
                { q: "Do you offer refunds?", a: "Yes, we offer a refund policy for certain situations. Please refer to our Terms of Service for detailed information or contact our support team." },
                { q: "Can I upgrade or downgrade my plan?", a: "Absolutely! Contact our support team through Discord and we'll assist you with the process." },
                { q: "What kind of technical support do you provide?", a: "We provide 24/7 technical support for server issues, configuration assistance, and general questions through our Discord server." },
                { q: "Are backups included?", a: "We implement regular infrastructure backups, and we recommend maintaining your own backups for critical data. We can assist with automated backup solutions." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-border/20 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-muted-foreground mb-4 text-sm">Need more information about our services?</p>
            <Button size="lg" onClick={() => navigate('/')}>View Our Plans</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;