import { useEffect, useState } from "react";
import { cloudStars } from "./assets/images";
import Confetti from "./components/Confetti";
import Envelope from "./components/Envelope";
import FloatingDecor from "./components/FloatingDecor";
import Invitation from "./components/Invitation";

type Stage = "sealed" | "opening" | "revealing" | "open";

/* The JS hand-off below has to land exactly when the CSS opening animation ends.
   Under `prefers-reduced-motion: reduce` the stylesheet plays a much shorter
   sequence (see the matching block in index.css), so the timeline has to shrink
   with it — otherwise the envelope sits frozen wide open for over a second and
   then jumps, which is what phones with Reduce Motion / Battery Saver were doing. */
const FULL_TIMELINE = { reveal: 1150, crossfade: 500 };
const REDUCED_TIMELINE = { reveal: 300, crossfade: 180 };

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function App() {
  const [stage, setStage] = useState<Stage>("sealed");
  const [confetti, setConfetti] = useState(false);
  const [timeline, setTimeline] = useState(FULL_TIMELINE);

  const open = () => {
    if (stage !== "sealed") return;

    // Read the preference at tap time so a mid-session change is respected.
    const t = prefersReducedMotion() ? REDUCED_TIMELINE : FULL_TIMELINE;
    setTimeline(t);
    setStage("opening");

    // Phase 1: flap has opened and the letter has risen — start the crossfade.
    window.setTimeout(() => {
      if (!prefersReducedMotion()) setConfetti(true);
      setStage("revealing");
    }, t.reveal);

    // Phase 2: crossfade is done — unmount the envelope.
    window.setTimeout(() => {
      setStage("open");
    }, t.reveal + t.crossfade);
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
          className={`transition-all ease-out ${
            stage === "revealing"
              ? "pointer-events-none opacity-0 scale-105 -translate-y-4"
              : "opacity-100 scale-100 translate-y-0"
          }`}
          style={{
            transitionDuration: `${timeline.crossfade}ms`,
            willChange: stage === "sealed" ? "auto" : "opacity, transform",
          }}
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
