import { useEffect, useState } from "react";
import { cloudStars } from "./assets/images";
import Confetti from "./components/Confetti";
import Envelope from "./components/Envelope";
import FloatingDecor from "./components/FloatingDecor";
import Invitation from "./components/Invitation";

type Stage = "sealed" | "opening" | "revealing" | "open";

export default function App() {
  const [stage, setStage] = useState<Stage>("sealed");
  const [confetti, setConfetti] = useState(false);

  const open = () => {
    if (stage !== "sealed") return;
    setStage("opening");

    // Phase 1: At 1150ms (flap has opened and letter has risen), start crossfade
    window.setTimeout(() => {
      setConfetti(true);
      setStage("revealing");
    }, 1150);

    // Phase 2: At 1650ms (after smooth crossfade completes), unmount envelope
    window.setTimeout(() => {
      setStage("open");
    }, 1650);
  };

  useEffect(() => {
    if (!confetti) return;
    const id = window.setTimeout(() => setConfetti(false), 4500);
    return () => window.clearTimeout(id);
  }, [confetti]);

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden font-sans text-ink">
      <div className="fixed inset-0 -z-10">
        <img
          src={cloudStars}
          alt=""
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fbf6ee]/85 via-[#f4ebe0]/78 to-[#e8f0f4]/88" />
      </div>

      <FloatingDecor />
      {confetti && <Confetti />}

      {/* Envelope view with smooth exit */}
      {stage !== "open" && (
        <div
          className={`transition-all duration-500 ease-out ${
            stage === "revealing"
              ? "pointer-events-none opacity-0 scale-105 -translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          <Envelope opening={stage === "opening" || stage === "revealing"} onOpen={open} />
        </div>
      )}

      {/* Invitation view: mounts during revealing for smooth seamless crossfade */}
      {stage === "revealing" || stage === "open" ? (
        <div
          className={
            stage === "revealing"
              ? "animate-fade-up pointer-events-none"
              : "animate-fade-up"
          }
        >
          <Invitation />
        </div>
      ) : null}
    </div>
  );
}
