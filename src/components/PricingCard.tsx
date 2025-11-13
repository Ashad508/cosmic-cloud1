import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  specs: {
    label: string;
    value: string;
  }[];
  price: string;
  currency?: string;
  featured?: boolean;
}

export const PricingCard = ({ title, specs, price, currency = "Rs.", featured = false }: PricingCardProps) => {
  const handlePurchase = () => {
    window.open("https://discord.com/channels/1413463825851875328/1413463826896126056", "_blank");
  };

  return (
    <Card 
      className={`relative p-6 transition-all duration-300 hover:scale-105 cosmic-glow-hover animate-scale-in ${
        featured ? "border-primary cosmic-glow" : "border-border"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
          POPULAR
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2 text-cosmic-gradient">{title}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {specs.map((spec, index) => (
          <div key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm">
              <span className="text-muted-foreground">{spec.label}:</span>{" "}
              <span className="text-foreground font-semibold">{spec.value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mb-4 pt-4 border-t border-border">
        <div className="text-center">
          <span className="text-3xl font-bold text-primary">{price}</span>
          <span className="text-muted-foreground ml-1">{currency} / month</span>
        </div>
      </div>

      <Button 
        onClick={handlePurchase}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
      >
        Purchase Now
      </Button>
    </Card>
  );
};
