import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Terminal as TerminalIcon, X, Minus, Square, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

type Line = { type: "input" | "output" | "system"; content: string };

const HOST = "axo-vps-41762c47";
const PROMPT = `root@${HOST}:~#`;

const HELP_TEXT = `Axo Nodes — Interactive VPS Demo Console
─────────────────────────────────────────
Available commands:
  neofetch          Show system info
  apt update        Refresh package lists
  ping 8.8.8.8      Ping Google DNS
  ping google.com   Ping Google
  clear             Clear the terminal
  help              Show this menu
  exit              Close the console

Tip: This is a sandboxed demo. Try a real VPS at axonodes.fun`;

const NEOFETCH = `       _,met$$$$$gg.          root@${HOST}
    ,g$$$$$$$$$$$$$$$P.       -------------------------------------------
  ,g$$P"     """Y$$.".        OS: Debian GNU/Linux 12 (bookworm) x86_64
 ,$$P'              \`$$$.     Host: Axo Nodes KVM VPS
',$$P       ,ggs.     \`$$b:   Kernel: 6.1.0-44-cloud-amd64
\`d$$'     ,$P"'   .    $$$    Uptime: 2 days, 22 hours, 36 mins
 $$P      d$'     ,    $$P    Packages: 1142 (dpkg), 4 (snap)
 $$:      $$.   -    ,d$$'    Shell: bash 5.2.15
 $$;      Y$b._   _,d$P'      Terminal: /dev/pts/0
 Y$$.    \`.\`"Y$$$$P"'         CPU: AMD EPYC-Milan (80) @ 2.400GHz
 \`$$b      "-.__              GPU: 00:02.0 Cirrus Logic GD 5446
  \`Y$$                        Memory: 23822MiB / 31352MiB
   \`Y$$.                      Network: 10 Gbps · Mumbai 🇮🇳
     \`$$b.                    Provider: Axo Nodes (OVH Cloud)
       \`Y$$b.
          \`"Y$b._
              \`""\"`;

const APT_UPDATE = `Hit:1 http://deb.debian.org/debian bookworm InRelease
Hit:2 http://deb.debian.org/debian bookworm-updates InRelease
Hit:3 http://security.debian.org/debian-security bookworm-security InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`;

const pingLines = (host: string, ip: string) => {
  const seq = [0, 1, 2, 3];
  const times = [12.4, 11.9, 12.1, 12.3];
  const lines = [`PING ${host} (${ip}) 56(84) bytes of data.`];
  seq.forEach((s, i) => {
    lines.push(`64 bytes from ${ip}: icmp_seq=${s + 1} ttl=117 time=${times[i].toFixed(1)} ms`);
  });
  lines.push("");
  lines.push(`--- ${host} ping statistics ---`);
  lines.push("4 packets transmitted, 4 received, 0% packet loss, time 3005ms");
  lines.push("rtt min/avg/max/mdev = 11.900/12.175/12.400/0.187 ms");
  return lines.join("\n");
};

const BANNER = `\
   ___                     _   _           _           
  / _ \\__  _____    /\\ /\\ | \\ | |___    __| | ___  ___ 
 / /_)/\\ \\/ / _ \\  / //_/ |  \\| / _ \\  / _\` |/ _ \\/ __|
/ ___/  >  < (_) |/ __ \\  | |\\  | (_) || (_| |  __/\\__ \\
\\/     /_/\\_\\___/ \\/  \\/  |_| \\_|\\___/  \\__,_|\\___||___/

Welcome to Axo Nodes Live VPS Demo · Type 'help' to begin`;

interface VpsConsoleProps {
  open: boolean;
  onClose: () => void;
}

const VpsConsole = ({ open, onClose }: VpsConsoleProps) => {
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    if (!open || booted) return;
    const bootLines = [
      "[ OK ] Started Axo Nodes KVM Hypervisor",
      "[ OK ] Reached target Network is Online",
      "[ OK ] Started OpenSSH server daemon",
      "[ OK ] Mounted /dev/nvme0n1p1 (NVMe Gen4)",
      "[ OK ] DDoS Mitigation Layer 7 active",
      "",
    ];
    let i = 0;
    setLines([]);
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines((prev) => [...prev, { type: "system", content: bootLines[i] }]);
        i++;
      } else {
        clearInterval(interval);
        setLines((prev) => [
          ...prev,
          { type: "output", content: BANNER },
          { type: "output", content: HELP_TEXT },
        ]);
        setBooted(true);
      }
    }, 180);
    return () => clearInterval(interval);
  }, [open, booted]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input
  useEffect(() => {
    if (open && booted) inputRef.current?.focus();
  }, [open, booted]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const runCommand = (raw: string) => {
    const cmd = raw.trim();
    setLines((prev) => [...prev, { type: "input", content: `${PROMPT} ${cmd}` }]);
    if (!cmd) return;
    setHistory((h) => [...h, cmd]);
    setHistoryIdx(-1);

    const lower = cmd.toLowerCase();
    let output = "";
    if (lower === "help") output = HELP_TEXT;
    else if (lower === "neofetch") output = NEOFETCH;
    else if (lower === "apt update" || lower === "sudo apt update") output = APT_UPDATE;
    else if (lower === "ping 8.8.8.8") output = pingLines("8.8.8.8", "8.8.8.8");
    else if (lower === "ping google.com") output = pingLines("google.com", "142.250.190.46");
    else if (lower === "clear") {
      setLines([]);
      return;
    } else if (lower === "exit") {
      onClose();
      return;
    } else if (lower === "whoami") output = "root";
    else if (lower === "uname -a") output = `Linux ${HOST} 6.1.0-44-cloud-amd64 #1 SMP Debian x86_64 GNU/Linux`;
    else if (lower === "ls" || lower === "ls -la")
      output = "axo-config.yml  deploy.sh  README.md  snapshots/  ssl/";
    else output = `bash: ${cmd.split(" ")[0]}: command not found\nType 'help' for available commands.`;

    setLines((prev) => [...prev, { type: "output", content: output }]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx < 0 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx < 0) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[85vh] md:h-[640px] rounded-xl overflow-hidden border border-primary/30 shadow-2xl shadow-primary/20"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
        }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Title bar */}
        <div className="relative flex items-center justify-between px-4 h-10 bg-card/80 border-b border-border/40 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition flex items-center justify-center group"
              aria-label="Close"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <Rocket className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span>axo-vps · ssh root@{HOST}.axonodes.fun</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-green-500 font-mono">LIVE</span>
          </div>
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="relative h-[calc(100%-2.5rem)] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed cursor-text"
          style={{
            background:
              "radial-gradient(ellipse at top, hsl(var(--primary) / 0.05) 0%, transparent 50%), hsl(var(--background) / 0.95)",
          }}
        >
          {/* Scanline effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary)) 2px, hsl(var(--primary)) 3px)",
            }}
          />

          {lines.map((line, i) => (
            <pre
              key={i}
              className={`whitespace-pre-wrap break-words ${
                line.type === "input"
                  ? "text-primary"
                  : line.type === "system"
                    ? "text-accent/80"
                    : "text-foreground/90"
              }`}
            >
              {line.content}
            </pre>
          ))}

          {booted && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-primary whitespace-nowrap">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                spellCheck={false}
                autoComplete="off"
                className="flex-1 bg-transparent border-0 outline-none text-foreground font-mono text-[13px] caret-primary"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ConsoleLauncher = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all"
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          <Rocket className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
          <span className="absolute inset-0 rounded-full bg-primary/30 blur-md group-hover:blur-lg transition" />
        </span>
        <span className="text-sm font-medium text-foreground">Console</span>
        <span className="text-[10px] font-mono text-muted-foreground border border-border/50 rounded px-1.5 py-0.5">
          LIVE
        </span>
      </button>
      <VpsConsole open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default VpsConsole;
