import { useState, useEffect } from "react";

const CosmicBlastIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"meteor" | "impact" | "reveal" | "done">("meteor");

  useEffect(() => {
    // Meteor flies down
    const meteorTimer = setTimeout(() => setPhase("impact"), 1500);
    // Impact flash
    const impactTimer = setTimeout(() => setPhase("reveal"), 1800);
    // Reveal message
    const revealTimer = setTimeout(() => setPhase("done"), 4000);
    // Complete
    const doneTimer = setTimeout(onComplete, 4500);

    return () => {
      clearTimeout(meteorTimer);
      clearTimeout(impactTimer);
      clearTimeout(revealTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Starfield Background */}
      <div className="absolute inset-0 bg-[#050510] overflow-hidden">
        {/* Stars */}
        <div className="stars-layer" />
        
        {/* Meteor */}
        <div
          className={`absolute w-4 h-4 transition-all duration-[1500ms] ease-in ${
            phase === "meteor" ? "meteor-flying" : "meteor-impact"
          }`}
          style={{
            top: phase === "meteor" ? "-10%" : "50%",
            left: phase === "meteor" ? "80%" : "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Meteor core */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-yellow-300 to-white rounded-full animate-pulse" />
          {/* Meteor glow */}
          <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/50 via-red-500/30 to-transparent rounded-full blur-xl" />
          {/* Meteor trail */}
          <div
            className={`absolute w-2 bg-gradient-to-t from-transparent via-orange-400/60 to-yellow-200 rounded-full blur-sm ${
              phase === "meteor" ? "h-[400px] -top-[400px]" : "h-0 top-0"
            }`}
            style={{ left: "50%", transform: "translateX(-50%) rotate(45deg)" }}
          />
          {/* Sparks */}
          {phase === "meteor" && (
            <>
              <div className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-ping -top-8 -left-2" />
              <div className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping -top-16 left-1" style={{ animationDelay: "0.1s" }} />
              <div className="absolute w-1 h-1 bg-yellow-200 rounded-full animate-ping -top-24 -left-1" style={{ animationDelay: "0.2s" }} />
            </>
          )}
        </div>

        {/* Impact Flash */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-300 ${
            phase === "impact" ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Shockwave rings */}
        {(phase === "impact" || phase === "reveal") && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="shockwave-ring shockwave-1" />
            <div className="shockwave-ring shockwave-2" />
            <div className="shockwave-ring shockwave-3" />
          </div>
        )}

        {/* Reveal Content */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
            phase === "reveal" ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="text-center relative">
            {/* Glowing backdrop */}
            <div className="absolute -inset-20 bg-gradient-radial from-cyan-500/20 via-purple-500/10 to-transparent blur-3xl" />
            
            {/* Main title */}
            <div className="relative">
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-wider mb-4 cosmic-blast-text">
                COSMIC BLAST
              </h1>
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <span className="text-2xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-pulse">
                  2026
                </span>
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </div>
              <p className="text-xl md:text-2xl font-display text-cyan-300/90 tracking-[0.3em] uppercase animate-pulse">
                Upcoming
              </p>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stars-layer {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 160px 120px, white, transparent),
            radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 250px 180px, white, transparent),
            radial-gradient(1px 1px at 300px 90px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 350px 150px, white, transparent);
          background-size: 400px 200px;
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .meteor-flying {
          animation: meteor-glow 0.3s ease-in-out infinite;
        }

        @keyframes meteor-glow {
          0%, 100% { filter: brightness(1) drop-shadow(0 0 20px orange); }
          50% { filter: brightness(1.3) drop-shadow(0 0 40px yellow); }
        }

        .shockwave-ring {
          position: absolute;
          border: 2px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          animation: shockwave 1.5s ease-out forwards;
        }

        .shockwave-1 { animation-delay: 0s; }
        .shockwave-2 { animation-delay: 0.2s; border-color: rgba(168, 85, 247, 0.5); }
        .shockwave-3 { animation-delay: 0.4s; border-color: rgba(251, 191, 36, 0.4); }

        @keyframes shockwave {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 800px;
            height: 800px;
            margin-left: -400px;
            margin-top: -400px;
            opacity: 0;
          }
        }

        .cosmic-blast-text {
          background: linear-gradient(
            135deg,
            #00ffff 0%,
            #00d4ff 20%,
            #a855f7 40%,
            #f472b6 60%,
            #fbbf24 80%,
            #00ffff 100%
          );
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
          text-shadow: 0 0 40px rgba(0, 255, 255, 0.5);
          filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.5));
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CosmicBlastIntro;
