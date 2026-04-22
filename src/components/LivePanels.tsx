import { useEffect, useRef, useState } from "react";
import {
  Server, Cpu, MemoryStick, Users, Play, Square, RotateCw,
  Activity, Terminal, HardDrive, Globe, ExternalLink,
  Gauge, Shield, Zap, Database, Box
} from "lucide-react";

/* ---------- scroll reveal ---------- */
const useReveal = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
};

/* ---------- shared progress bar with smooth animation ---------- */
const Bar = ({ value, gradient = "from-primary to-accent" }: { value: number; gradient?: string }) => (
  <div className="h-1.5 rounded-full bg-background/60 overflow-hidden">
    <div
      className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-[width] duration-[1500ms] ease-out`}
      style={{ width: `${value}%` }}
    />
  </div>
);

/* ---------- MC PANEL DEMO ---------- */
const McPanel = () => {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [players, setPlayers] = useState(0);
  const { ref, shown } = useReveal<HTMLDivElement>();

  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => {
      setCpu(42); setRam(60); setPlayers(60);
    }, 200);
    const interval = setInterval(() => {
      setCpu(38 + Math.random() * 14);
      setRam(55 + Math.random() * 15);
    }, 2200);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-primary/20 bg-card/60 backdrop-blur-xl p-1 shadow-[0_0_60px_-15px_hsl(var(--primary)/0.4)] transition-all duration-700 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-background/60 text-xs font-mono text-muted-foreground text-center">
          panel.axonodes.fun
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:flex flex-col gap-2 p-3 border-r border-border/30">
          {[Server, Activity, Terminal, HardDrive].map((Icon, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-background/60"
              }`}
            >
              <Icon className="w-4 h-4" />
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 p-4 sm:p-5 space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-2">
            <div>
              <p className="text-[10px] tracking-wider text-muted-foreground uppercase">Minecraft · Iron Plan</p>
              <h3 className="text-lg font-bold font-mono">survival.axonodes.fun</h3>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-semibold text-accent">Online</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Cpu, label: "CPU", value: `${Math.round(cpu)}%`, pct: cpu },
              { icon: MemoryStick, label: "RAM", value: `${(ram / 25).toFixed(1)}/4 GB`, pct: ram },
              { icon: Users, label: "Players", value: `${Math.round(players * 0.3)}/30`, pct: players },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border/30 bg-background/40 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <s.icon className="w-3 h-3" /> {s.label}
                  </span>
                  <span className="text-[11px] font-mono font-semibold">{s.value}</span>
                </div>
                <Bar value={s.pct} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent/15 text-accent text-xs font-semibold hover:bg-accent/25 transition">
              <Play className="w-3 h-3" /> Start
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background/60 text-muted-foreground text-xs font-semibold hover:bg-background transition">
              <Square className="w-3 h-3" /> Stop
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-background/60 text-muted-foreground text-xs font-semibold hover:bg-background transition">
              <RotateCw className="w-3 h-3" /> Restart
            </button>
          </div>

          {/* Console */}
          <div className="rounded-lg bg-background/80 border border-border/40 p-3 font-mono text-[11px] space-y-1 max-h-[120px] overflow-hidden">
            <div className="text-muted-foreground">[12:42:01] <span className="text-foreground">Server started on port 25565</span></div>
            <div className="text-muted-foreground">[12:42:03] Loaded 8 plugins</div>
            <div className="text-muted-foreground">[12:42:18] Player <span className="text-accent">Steve</span> joined the game</div>
            <div className="text-muted-foreground">[12:43:05] Player <span className="text-accent">Alex</span> joined the game</div>
            <div className="text-muted-foreground">[12:44:22] <span className="text-primary">World auto-saved</span></div>
            <div className="text-muted-foreground flex">[12:44:30] <span className="ml-1 inline-block w-2 h-3 bg-accent animate-pulse" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- VPS / cPanel DEMO ---------- */
const VpsPanel = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [load, setLoad] = useState(0);
  const [net, setNet] = useState(0);

  useEffect(() => {
    if (!shown) return;
    setLoad(72); setNet(58);
    const i = setInterval(() => {
      setLoad(60 + Math.random() * 25);
      setNet(40 + Math.random() * 35);
    }, 2000);
    return () => clearInterval(i);
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-secondary/20 bg-card/60 backdrop-blur-xl p-1 shadow-[0_0_60px_-15px_hsl(var(--secondary)/0.4)] transition-all duration-700 delay-150 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-background/60 text-xs font-mono text-muted-foreground text-center">
          cpanel.axonodes.fun
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">KVM VPS · Plan 2</p>
            <h3 className="text-lg font-bold font-mono">vps-04.axonodes.fun</h3>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/30">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-semibold text-accent">Running</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-border/30 bg-background/40 p-3">
            <div className="flex items-center justify-between mb-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><Gauge className="w-3 h-3" /> CPU LOAD</span>
              <span className="font-mono text-foreground">{Math.round(load)}%</span>
            </div>
            <Bar value={load} gradient="from-secondary to-primary" />
          </div>
          <div className="rounded-lg border border-border/30 bg-background/40 p-3">
            <div className="flex items-center justify-between mb-2 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> NETWORK</span>
              <span className="font-mono text-foreground">{(net * 12).toFixed(0)} Mbps</span>
            </div>
            <Bar value={net} gradient="from-secondary to-accent" />
          </div>
        </div>

        {/* Mini sparkline */}
        <div className="rounded-lg border border-border/30 bg-background/40 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">7-day uptime</span>
            <span className="text-[11px] font-mono text-accent">99.98%</span>
          </div>
          <svg viewBox="0 0 200 40" className="w-full h-10">
            <defs>
              <linearGradient id="vpsGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 L20,22 L40,26 L60,18 L80,20 L100,12 L120,16 L140,10 L160,14 L180,8 L200,12 L200,40 L0,40 Z"
              fill="url(#vpsGrad)"
            />
            <path
              d="M0,30 L20,22 L40,26 L60,18 L80,20 L100,12 L120,16 L140,10 L160,14 L180,8 L200,12"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[11px]">
          {[
            { icon: HardDrive, label: "200 GB NVMe" },
            { icon: MemoryStick, label: "16 GB RAM" },
            { icon: Shield, label: "L7 Protected" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-1.5 rounded-md bg-background/40 px-2 py-1.5 border border-border/30">
              <f.icon className="w-3 h-3 text-secondary" />
              <span className="font-medium truncate">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- CLIENT PANEL DEMO ---------- */
const ClientPanel = () => {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`rounded-2xl border border-accent/20 bg-card/60 backdrop-blur-xl p-1 shadow-[0_0_60px_-15px_hsl(var(--accent)/0.4)] transition-all duration-700 delay-300 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-background/60 text-xs font-mono text-muted-foreground text-center">
          client.axonodes.fun
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-wider text-muted-foreground uppercase">Welcome back</p>
            <h3 className="text-lg font-bold">Shadow_Slayer</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center font-bold text-sm">
            SS
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Active", value: "4", icon: Box },
            { label: "Invoices", value: "2", icon: Database },
            { label: "Tickets", value: "0", icon: Activity },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border/30 bg-background/40 p-3 text-center">
              <s.icon className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {[
            { name: "survival.axonodes.fun", type: "Minecraft · Iron", status: "Active" },
            { name: "vps-04.axonodes.fun", type: "VPS · Plan 2", status: "Active" },
            { name: "myshop.fun", type: "Domain · .fun", status: "Renews 14d" },
          ].map((srv, i) => (
            <div
              key={srv.name}
              className="flex items-center justify-between rounded-lg border border-border/30 bg-background/40 p-2.5 hover:border-accent/40 transition group"
              style={{ animation: shown ? `fade-in 0.5s ${0.4 + i * 0.1}s both` : undefined }}
            >
              <div className="min-w-0">
                <p className="text-xs font-mono font-semibold truncate">{srv.name}</p>
                <p className="text-[10px] text-muted-foreground">{srv.type}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 whitespace-nowrap">
                {srv.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- MAIN SECTION ---------- */
type PanelColor = "primary" | "secondary" | "accent";

const colorClasses: Record<PanelColor, { chip: string; btn: string }> = {
  primary: {
    chip: "border-primary/30 bg-primary/5 text-primary",
    btn: "bg-primary text-primary-foreground",
  },
  secondary: {
    chip: "border-secondary/30 bg-secondary/5 text-secondary",
    btn: "bg-secondary text-secondary-foreground",
  },
  accent: {
    chip: "border-accent/30 bg-accent/5 text-accent",
    btn: "bg-accent text-accent-foreground",
  },
};

const panels: { title: string; desc: string; url: string; color: PanelColor; Component: React.FC }[] = [
  {
    title: "Game Panel",
    desc: "Manage Minecraft servers — start, stop, restart, console & file editor.",
    url: "https://panel.axonodes.fun",
    color: "primary",
    Component: McPanel,
  },
  {
    title: "VPS Control Panel",
    desc: "Full root, live metrics, reinstall, console & network tools.",
    url: "https://cpanel.axonodes.fun",
    color: "secondary",
    Component: VpsPanel,
  },
  {
    title: "Client Area",
    desc: "Billing, invoices, tickets and your full service overview.",
    url: "https://client.axonodes.fun",
    color: "accent",
    Component: ClientPanel,
  },
];

const LivePanels = () => {
  return (
    <section className="py-24 px-4 border-t border-border/10 relative overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            LIVE PANEL DEMOS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Built by gamers, <span className="text-gradient">for gamers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three powerful panels working in harmony. Manage your servers, infrastructure, and billing —
            with intuitive interfaces designed for clarity and speed.
          </p>
        </div>

        <div className="space-y-20">
          {panels.map((p, i) => {
            const reverse = i % 2 === 1;
            const Demo = p.Component;
            return (
              <div
                key={p.title}
                className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <div className={`inline-flex items-center gap-2 mb-4 px-2.5 py-1 rounded-md border ${colorClasses[p.color].chip} text-[11px] font-semibold tracking-wider uppercase`}>
                    <Globe className="w-3 h-3" />
                    {new URL(p.url).hostname}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{p.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{p.desc}</p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg ${colorClasses[p.color].btn} text-sm font-semibold hover:opacity-90 transition group`}
                    >
                      Open panel
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </a>
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/40 bg-card/40 text-xs text-muted-foreground">
                      <Zap className="w-3.5 h-3.5 text-accent" />
                      Instant access
                    </div>
                  </div>
                </div>

                <Demo />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LivePanels;
