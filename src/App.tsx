import { useEffect, useState } from "react";
import { cloudStars } from "./assets/images";
import Confetti from "./components/Confetti";
import Envelope from "./components/Envelope";
import FloatingDecor from "./components/FloatingDecor";
import Invitation from "./components/Invitation";

type Stage = "sealed" | "opening" | "open";

export default function App() {
  const [stage, setStage] = useState<Stage>("sealed");
  const [confetti, setConfetti] = useState(false);

  const open = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    window.setTimeout(() => {
      setConfetti(true);
      setStage("open");
    }, 1650);
  };

  useEffect(() => {
    if (!confetti) return;
    const id = window.setTimeout(() => setConfetti(false), 4200);
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

      {stage !== "open" ? (
        <Envelope opening={stage === "opening"} onOpen={open} />
      ) : (
        <Invitation />
      )}
    </div>
  );
}
