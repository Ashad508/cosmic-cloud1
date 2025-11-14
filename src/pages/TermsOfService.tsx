import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cosmicLogo from "@/assets/cosmic-cloud-logo.png";

const TermsOfService = () => {
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
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Cosmic Cloud's services, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to these terms, you should not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cosmic Cloud provides virtual private server (VPS) hosting and Minecraft server hosting services. Our services include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Intel Xeon and AMD Ryzen VPS hosting with various configurations</li>
              <li>Minecraft server hosting with different resource allocations</li>
              <li>DDoS protection and security features</li>
              <li>Full root access and dedicated IPv4 addresses</li>
              <li>Technical support through our Discord server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be at least 18 years of age or have parental consent</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use our services for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Illegal activities or violation of any laws</li>
              <li>Distributing malware, viruses, or harmful software</li>
              <li>Phishing, spamming, or unsolicited communications</li>
              <li>Cryptocurrency mining (unless explicitly allowed in your plan)</li>
              <li>Network scanning or security testing of third parties</li>
              <li>Hosting copyrighted content without authorization</li>
              <li>Activities that could harm our infrastructure or other users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All services are billed monthly in advance. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Pay all fees on time according to the pricing displayed</li>
              <li>Provide valid payment information</li>
              <li>Accept that prices are in Indian Rupees (Rs.)</li>
              <li>Understand that refunds are subject to our refund policy</li>
              <li>Acknowledge that failure to pay may result in service suspension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Service Level and Uptime</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain 99.9% uptime for all our services. However, scheduled maintenance, emergency repairs, 
              or circumstances beyond our control may result in temporary service interruptions. We are not liable for 
              losses resulting from service interruptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Backup and Loss</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we implement backup systems, you are solely responsible for maintaining your own backups of your data. 
              We are not liable for any data loss, regardless of the cause.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Suspension and Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to suspend or terminate your service if:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>You violate these Terms of Service</li>
              <li>Your account poses a security risk</li>
              <li>You fail to pay required fees</li>
              <li>We are required to do so by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cosmic Cloud shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
              resulting from your use or inability to use the service. Our total liability shall not exceed the amount 
              paid by you in the past 12 months.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Resource Usage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Each plan comes with allocated resources (CPU, RAM, storage, bandwidth). You must use resources within 
              the limits of your plan. Excessive resource usage may result in service limitations or termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. DDoS Protection</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we provide Level 5 DDoS protection, we cannot guarantee complete protection against all attacks. 
              In case of severe attacks, we may temporarily null-route your IP to protect our infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Modifications to Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time. We will 
              provide notice of significant changes when possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, trademarks, and intellectual property on our website and services remain the property of 
              Cosmic Cloud. You may not use our branding without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall 
              be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms of Service from time to time. Continued use of our services after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us through our Discord server at the link 
              provided on our website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
