type Props = {
  opening: boolean;
  onOpen: () => void;
};

export default function Envelope({ opening, onOpen }: Props) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="mb-6 text-center sm:mb-8 animate-fade-up">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
          Correo de cigüeña
        </p>
        <h1 className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">Tenés una invitación</h1>
        <p className="mt-2 font-display text-lg italic text-ink-soft sm:mt-2.5">
          De Giuliana, con el corazón a mil.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir la invitación"
        className={`group relative cursor-pointer border-0 bg-transparent p-0 select-none ${
          opening ? "" : "animate-envelope"
        }`}
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
          {/* 1. Back of envelope */}
          <div
            className="absolute inset-0 rounded-[12px]"
            style={{
              background: "linear-gradient(180deg, #f4e3c6 0%, #e7cfab 100%)",
              boxShadow:
                "0 30px 50px -18px rgba(90,70,56,0.45), 0 12px 20px -10px rgba(90,70,56,0.25)",
            }}
          />

          {/* 2. Letter inside - slides up when opened */}
          <div
            className={`absolute overflow-hidden rounded-md bg-ivory shadow-md ${
              opening ? "env-letter-rise" : ""
            }`}
            style={{
              left: "6%",
              right: "6%",
              top: "14%",
              bottom: "12%",
              zIndex: opening ? 5 : 1,
              opacity: opening ? undefined : 0,
            }}
          >
            <div className="gold-line mt-3" />
            <div className="px-4 pt-3.5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-dark">
                Baby Shower
              </p>
              <p className="font-script text-4xl leading-none text-ink sm:text-5xl mt-1">Dante</p>
              <p className="mt-1.5 font-display text-sm italic text-ink-soft">10 de octubre · 2026</p>
            </div>
          </div>

          {/* 3. Front pocket (seamless craft paper covering bottom & sides) */}
          <div
            className="absolute inset-0 z-[2] rounded-[12px]"
            style={{
              background:
                "linear-gradient(180deg, #f0d9b4 0%, #e6c79a 48%, #ddba8a 100%)",
              clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
              boxShadow: "inset 0 8px 16px rgba(90,70,56,0.08)",
            }}
          />

          {/* 4. Side folds shine */}
          <div
            className="absolute inset-0 z-[2] rounded-[12px] opacity-40"
            style={{
              background:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.35) 50%, transparent 62%)",
              clipPath: "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)",
            }}
          />

          {/* 5. Top Flap: flips open 180deg via CSS animation class */}
          <div
            className={`absolute left-0 right-0 top-0 z-[3] rounded-t-[12px] ${
              opening ? "env-flap-open" : ""
            }`}
            style={{
              height: "64%",
              transformOrigin: "top center",
              background: "linear-gradient(180deg, #f8ead0 0%, #ebcfa8 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              boxShadow: opening ? "none" : "0 8px 16px rgba(90,70,56,0.16)",
            }}
          />

          {/* 6. Postage stamp */}
          <div
            className={`absolute right-3 top-3 z-[6] rotate-6 border-2 border-dashed border-gold-dark/40 bg-ivory p-[3px] shadow-sm ${
              opening ? "env-fade-out" : ""
            }`}
            style={{ width: "46px", height: "54px" }}
          >
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-sky/40 to-blush/30">
              <span className="text-xs font-bold text-gold-dark">✦</span>
              <span className="text-[10px] font-bold tracking-wider text-ink">ARG</span>
              <span className="text-[10px] text-ink-soft">2026</span>
            </div>
          </div>

          {/* 7. Address lines */}
          <div
            className={`absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-[3] text-left max-w-[55%] ${
              opening ? "env-fade-out" : ""
            }`}
          >
            <p className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft">
              Para
            </p>
            <p className="font-script text-2xl leading-none text-ink sm:text-3xl">Vos, con amor</p>
            <p className="mt-1 font-display text-sm italic text-ink-soft">De: Giuliana & Dante</p>
          </div>

          {/* 8. Wax seal */}
          <div
            className={`absolute z-[7] ${
              opening ? "env-seal-burst" : ""
            }`}
            style={{
              top: "60%",
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
        className={`mt-6 sm:mt-8 font-display text-lg italic text-ink-soft text-center px-4 ${
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
