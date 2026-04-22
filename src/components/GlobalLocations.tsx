import { MapPin, Server } from "lucide-react";

const locations = [
  { code: "IN", city: "Mumbai", country: "India", ping: 8, flag: "🇮🇳" },
  { code: "DE", city: "Frankfurt", country: "Germany", ping: 112, flag: "🇩🇪" },
  { code: "US", city: "New York", country: "USA", ping: 190, flag: "🇺🇸" },
  { code: "SG", city: "Singapore", country: "Singapore", ping: 55, flag: "🇸🇬" },
  { code: "GB", city: "London", country: "UK", ping: 120, flag: "🇬🇧" },
  { code: "AU", city: "Sydney", country: "Australia", ping: 150, flag: "🇦🇺" },
];

const stats = [
  { value: "6", label: "Datacenters" },
  { value: "120+", label: "Bare-Metal Nodes" },
  { value: "5,800+", label: "CPU Cores" },
  { value: "48 TB", label: "Total RAM" },
];

const pingColor = (ping: number) => {
  if (ping < 50) return "text-green-400";
  if (ping < 130) return "text-primary";
  return "text-yellow-400";
};

const GlobalLocations = () => {
  return (
    <section className="py-20 px-4 border-t border-border/10">
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-2xl border border-primary/20 bg-card/30 p-6 md:p-10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Global Locations</h2>
                <p className="text-sm text-muted-foreground">
                  Worldwide network with low-latency edges
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {locations.map((loc) => (
                <div
                  key={loc.code}
                  className="group flex items-center justify-between rounded-xl border border-border/30 bg-background/40 p-4 hover:border-primary/40 hover:bg-background/70 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-card border border-border/50 flex items-center justify-center font-bold text-xs text-muted-foreground group-hover:text-primary transition">
                      {loc.code}
                    </div>
                    <div>
                      <div className="font-semibold flex items-center gap-1.5">
                        {loc.city} <span className="text-base">{loc.flag}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{loc.country}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Ping
                    </div>
                    <div className={`font-mono font-semibold text-sm ${pingColor(loc.ping)}`}>
                      {loc.ping} ms
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border/30 pt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <Server className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl md:text-3xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalLocations;
