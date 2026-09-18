type Props = {
  opening: boolean;
  onOpen: () => void;
};

export default function Envelope({ opening, onOpen }: Props) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="mb-6 text-center sm:mb-8 animate-fade-up">
        <p className="mb-1.5 text-[13px] font-semibold uppercase tracking-[0.35em] text-gold-dark">
          Correo de cigüeña
        </p>
        <h1 className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">Tenés una invitación</h1>
        <p className="mt-2 font-display text-xl italic text-ink-soft sm:mt-2.5">
          De Giuliana, con el corazón a mil.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir la invitación"
        className="group relative cursor-pointer border-0 bg-transparent p-0 select-none animate-envelope"
        style={{
          animationPlayState: opening ? "paused" : "running",
        }}
      >
        <div
          className="relative"
          style={{
            width: "min(92vw, 420px)",
            height: "min(60vw, 260px)",
            minHeight: "200px",
            perspective: "1200px",
          }}
        >
          {/* 1. Back of envelope (base wall) */}
          <div
            className="absolute inset-0 rounded-[14px] bg-gradient-to-b from-[#f4e3c6] to-[#e7cfab] shadow-2xl shadow-ink/30"
          />

          {/* 2. Letter inside - slides up when opened */}
          <div
            className={`absolute overflow-hidden rounded-md bg-ivory shadow-md ${
              opening ? "env-letter-rise" : ""
            }`}
            style={{
              left: "6%",
              right: "6%",
              top: "10%",
              bottom: "8%",
              zIndex: 2,
            }}
          >
            <div className="gold-line mt-3" />
            <div className="px-4 pt-3.5 text-center">
              <p className="text-[13px] font-semibold uppercase tracking-[0.35em] text-gold-dark">
                Baby Shower
              </p>
              <p className="font-script text-4xl leading-none text-ink sm:text-5xl mt-1">Dante</p>
              <p className="mt-1.5 font-display text-lg italic text-ink-soft">10 de octubre · 2026</p>
            </div>
          </div>

          {/* 3. Top Flap: 3D swing open.
              Outer div only swaps z-index, inner div only rotates — keeping the two
              apart stops iOS Safari from de-compositing the flap mid-rotation. */}
          <div
            className={`absolute left-0 right-0 top-0 preserve-3d ${
              opening ? "env-flap-stack" : "z-[5]"
            }`}
            style={{ height: "56%" }}
          >
          <div
            className={`absolute inset-0 preserve-3d origin-top ${
              opening ? "env-flap-open" : ""
            }`}
            style={{
              transformOrigin: "top center",
            }}
          >
            {/* Front face of flap (visible when closed) */}
            <div className="absolute inset-0 backface-hidden">
              <svg
                viewBox="0 0 100 56"
                preserveAspectRatio="none"
                className="h-full w-full filter drop-shadow-[0_4px_8px_rgba(90,70,56,0.15)]"
              >
                <defs>
                  <linearGradient id="flapFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#faecd6" />
                    <stop offset="100%" stopColor="#e8cca6" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 100,0 50,56" fill="url(#flapFrontGrad)" />
              </svg>
            </div>

            {/* Back face of flap (visible when flipped open 180deg) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                transform: "rotateX(180deg)",
              }}
            >
              <svg
                viewBox="0 0 100 56"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="flapBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fdf5e8" />
                    <stop offset="100%" stopColor="#f0dac0" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 100,0 50,56" fill="url(#flapBackGrad)" />
              </svg>
            </div>
          </div>
          </div>

          {/* 4. Front pocket: covers bottom and sides with a crisp SVG V-shape */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-[4] h-full w-full rounded-[14px]"
          >
            <defs>
              <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f0d9b4" />
                <stop offset="48%" stopColor="#e6c79a" />
                <stop offset="100%" stopColor="#ddba8a" />
              </linearGradient>
            </defs>
            <polygon points="0,0 50,54 100,0 100,100 0,100" fill="url(#pocketGrad)" />
          </svg>

          {/* 5. Postage stamp */}
          <div
            className={`absolute right-3 top-3 z-[6] rotate-6 border-2 border-dashed border-gold-dark/40 bg-ivory p-[3px] shadow-sm ${
              opening ? "env-fade-out" : ""
            }`}
            style={{ width: "46px", height: "54px" }}
          >
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-sky/40 to-blush/30">
              <span className="text-[13px] font-bold text-gold-dark">✦</span>
              <span className="text-[10px] font-bold tracking-wider text-ink">ARG</span>
              <span className="text-[10px] text-ink-soft">2026</span>
            </div>
          </div>

          {/* 6. Address lines */}
          <div
            className={`absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-[6] text-left max-w-[55%] ${
              opening ? "env-fade-out" : ""
            }`}
          >
            <p className="font-display text-[13px] uppercase tracking-[0.22em] text-ink-soft">
              Para
            </p>
            <p className="font-script text-2xl leading-none text-ink sm:text-3xl">Vos, con amor</p>
            <p className="mt-1 font-display text-lg italic text-ink-soft">De: Giuliana & Dante</p>
          </div>

          {/* 7. Wax seal */}
          <div
            className={`absolute z-[12] pointer-events-none ${
              opening ? "env-seal-burst" : ""
            }`}
            style={{
              top: "56%",
              left: "50%",
              transform: "translate3d(-50%, -50%, 0)",
            }}
          >
            <div className="wax-seal relative flex h-[68px] w-[68px] sm:h-[76px] sm:w-[76px] items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <svg width="32" height="32" viewBox="0 0 48 48" fill="none" className="sm:w-[36px] sm:h-[36px]" aria-hidden>
                <path
                  d="M24 6l4.4 11.2L40 18l-9 7.4L34 38 24 31.2 14 38l3-12.6L8 18l11.6-.8L24 6z"
                  fill="#F6E2A8"
                  stroke="#E8C96A"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
        </div>
      </button>

      <p
        className={`mt-6 sm:mt-8 font-display text-xl italic text-ink-soft text-center px-4 ${
          opening ? "env-fade-out" : ""
        }`}
      >
        Tocá el sello de lacre para abrirla
      </p>
      <div
        className={`mt-1.5 animate-bounce text-rose ${
          opening ? "env-fade-out" : ""
        }`}
        aria-hidden
      >
        ↓
      </div>
    </div>
  );
}
