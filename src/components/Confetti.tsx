const COLORS = ["#8EBFDA", "#E8B4B8", "#C4A36A", "#A8C5B4", "#F3D1C0", "#fff4d6", "#d4909b"];
const TYPES = ["circle", "square", "heart", "star"] as const;

type Piece = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  color: string;
  type: (typeof TYPES)[number];
  size: number;
  drift: string;
};

const PIECES: Piece[] = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  left: `${(i * 13.7) % 100}%`,
  delay: `${(i % 18) * 0.08}s`,
  duration: `${2.6 + (i % 9) * 0.22}s`,
  color: COLORS[i % COLORS.length],
  type: TYPES[i % TYPES.length],
  size: 7 + (i % 6) * 2,
  drift: `${(i % 2 === 0 ? 1 : -1) * (18 + (i % 30))}px`,
}));

function Shape({ type, color, size }: { type: Piece["type"]; color: string; size: number }) {
  if (type === "heart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 21s-6.2-4.35-9.14-8.1C.7 10.3 1.1 6.8 3.8 5.2c2-1.2 4.5-.6 5.9 1.2 1.4-1.8 3.9-2.4 5.9-1.2 2.7 1.6 3.1 5.1.94 7.7C18.2 16.65 12 21 12 21z" />
      </svg>
    );
  }
  if (type === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2.4l2.5 6.4 6.9.6-5.2 4.5 1.6 6.7L12 16.8 6.2 20.6l1.6-6.7L2.6 9.4l6.9-.6L12 2.4z" />
      </svg>
    );
  }
  if (type === "square") {
    return (
      <span
        className="block rotate-12"
        style={{ width: size * 0.75, height: size * 0.75, background: color, borderRadius: 2 }}
      />
    );
  }
  return (
    <span
      className="block rounded-full"
      style={{ width: size, height: size, background: color }}
    />
  );
}

export default function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {PIECES.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-0"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            ["--drift" as string]: p.drift,
          }}
        >
          <Shape type={p.type} color={p.color} size={p.size} />
        </span>
      ))}
    </div>
  );
}
