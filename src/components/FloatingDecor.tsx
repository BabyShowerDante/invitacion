const STARS = [
  { left: "4%", top: "8%", size: 8, delay: "0s" },
  { left: "12%", top: "22%", size: 5, delay: "0.4s" },
  { left: "22%", top: "6%", size: 6, delay: "1.1s" },
  { left: "31%", top: "18%", size: 4, delay: "0.7s" },
  { left: "48%", top: "4%", size: 7, delay: "1.6s" },
  { left: "63%", top: "12%", size: 5, delay: "0.2s" },
  { left: "74%", top: "7%", size: 9, delay: "0.9s" },
  { left: "86%", top: "16%", size: 5, delay: "1.3s" },
  { left: "93%", top: "5%", size: 6, delay: "0.5s" },
  { left: "8%", top: "48%", size: 5, delay: "1.8s" },
  { left: "91%", top: "42%", size: 7, delay: "0.3s" },
  { left: "3%", top: "72%", size: 6, delay: "1.4s" },
  { left: "18%", top: "86%", size: 4, delay: "0.6s" },
  { left: "78%", top: "80%", size: 8, delay: "1.1s" },
  { left: "95%", top: "68%", size: 5, delay: "2s" },
  { left: "42%", top: "90%", size: 6, delay: "0.8s" },
  { left: "55%", top: "78%", size: 4, delay: "1.7s" },
  { left: "67%", top: "92%", size: 5, delay: "0.1s" },
];

const BALLOONS: {
  left: string;
  color: string;
  delay: string;
  size: number;
  duration: string;
  rotate: string;
}[] = [
  { left: "3%", color: "#8EBFDA", delay: "0s", size: 34, duration: "7s", rotate: "-8deg" },
  { left: "9%", color: "#E8B4B8", delay: "1.2s", size: 26, duration: "8s", rotate: "6deg" },
  { left: "88%", color: "#C4A36A", delay: "0.6s", size: 32, duration: "6.5s", rotate: "10deg" },
  { left: "94%", color: "#A8C5B4", delay: "1.8s", size: 24, duration: "9s", rotate: "-4deg" },
  { left: "1%", color: "#F3D1C0", delay: "2.4s", size: 22, duration: "7.5s", rotate: "5deg" },
  { left: "97%", color: "#8EBFDA", delay: "0.3s", size: 20, duration: "8.5s", rotate: "-12deg" },
];

function Balloon({
  color,
  size,
  rotate,
}: {
  color: string;
  size: number;
  rotate: string;
}) {
  return (
    <div style={{ transform: `rotate(${rotate})` }}>
      <div
        className="relative mx-auto"
        style={{
          width: size,
          height: size * 1.22,
          borderRadius: "50% 50% 50% 50% / 45% 45% 55% 55%",
          background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.72), transparent 42%), ${color}`,
          boxShadow: `inset -6px -8px 12px rgba(0,0,0,0.12), 0 8px 14px rgba(90,70,56,0.18)`,
        }}
      >
        <span
          className="absolute rounded-full bg-white/50"
          style={{ width: size * 0.22, height: size * 0.14, left: "22%", top: "18%" }}
        />
      </div>
      <div
        className="mx-auto h-0 w-0"
        style={{
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderTop: `8px solid ${color}`,
        }}
      />
      <div
        className="mx-auto w-px"
        style={{
          height: size * 1.6,
          background: "linear-gradient(to bottom, rgba(90,70,56,0.35), transparent)",
        }}
      />
    </div>
  );
}

export default function FloatingDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {STARS.map((star, i) => (
        <span
          key={`s-${i}`}
          className="absolute text-gold animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            fontSize: star.size,
            animationDelay: star.delay,
          }}
        >
          ✦
        </span>
      ))}

      {BALLOONS.map((b, i) => (
        <div
          key={`b-${i}`}
          className="absolute bottom-[8%] animate-float"
          style={{
            left: b.left,
            animationDelay: b.delay,
            animationDuration: b.duration,
            ["--r" as string]: b.rotate,
          }}
        >
          <Balloon color={b.color} size={b.size} rotate={b.rotate} />
        </div>
      ))}

      <div className="absolute left-[6%] top-[30%] hidden h-20 w-20 rounded-full bg-sky/20 blur-2xl sm:block" />
      <div className="absolute right-[8%] top-[40%] hidden h-28 w-28 rounded-full bg-blush/25 blur-3xl sm:block" />
      <div className="absolute bottom-[20%] left-[40%] hidden h-24 w-24 rounded-full bg-gold/15 blur-3xl sm:block" />
    </div>
  );
}
