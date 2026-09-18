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
        className={`group relative cursor-pointer border-0 bg-transparent p-0 select-none active:scale-[0.99] transition-transform ${
          opening ? "" : "animate-envelope"
        }`}
        style={{ perspective: 1200 }}
      >
        <div
          className="relative"
          style={{
            width: "min(92vw, 420px)",
            height: "min(60vw, 260px)",
            minHeight: "200px",
          }}
        >
          {/* 1. Back of envelope */}
          <div
            className="absolute inset-0 rounded-[10px]"
            style={{
              background: "linear-gradient(180deg, #f4e3c6 0%, #e7cfab 100%)",
              boxShadow:
                "0 30px 50px -18px rgba(90,70,56,0.45), 0 12px 20px -10px rgba(90,70,56,0.25)",
            }}
          />

          {/* 2. Letter inside - completely tucked inside, slides out smoothly with transform */}
          <div
            className="absolute overflow-hidden rounded-md bg-ivory shadow-md"
            style={{
              left: "6%",
              right: "6%",
              top: "14%",
              bottom: "12%",
              zIndex: opening ? 5 : 1,
              transform: opening ? "translate3d(0, -68%, 0)" : "translate3d(0, 0, 0)",
              transition: "transform 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s",
              willChange: "transform",
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

          {/* 3. Front pocket (covers the letter completely when closed) */}
          <div
            className="absolute inset-0 z-[2] rounded-[10px]"
            style={{
              background:
                "linear-gradient(180deg, #f0d9b4 0%, #e6c79a 48%, #ddba8a 100%)",
              clipPath: "polygon(0 35%, 50% 50%, 100% 35%, 100% 100%, 0 100%)",
              boxShadow: "inset 0 8px 16px rgba(90,70,56,0.08)",
            }}
          />

          {/* 4. Side folds shine */}
          <div
            className="absolute inset-0 z-[2] rounded-[10px] opacity-40"
            style={{
              background:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.35) 50%, transparent 62%)",
              clipPath: "polygon(0 35%, 50% 50%, 100% 35%, 100% 100%, 0 100%)",
            }}
          />

          {/* 5. Top Flap: overlaps front pocket when closed, flips open 180deg */}
          <div
            className="absolute left-0 right-0 top-0 z-[3] rounded-t-[10px]"
            style={{
              height: "56%",
              transformOrigin: "top center",
              background: opening
                ? "linear-gradient(180deg, #e0c196 0%, #f3e0c2 100%)"
                : "linear-gradient(180deg, #f8ead0 0%, #ebcfa8 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
              transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1) 0.05s",
              boxShadow: opening ? "none" : "0 8px 14px rgba(90,70,56,0.14)",
              willChange: "transform",
            }}
          />

          {/* 6. Postage stamp */}
          <div
            className={`absolute right-3 top-3 z-[6] rotate-6 border-2 border-dashed border-gold-dark/40 bg-ivory p-[3px] shadow-sm transition-opacity duration-300 ${
              opening ? "opacity-0" : "opacity-100"
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
            className={`absolute bottom-4 left-6 sm:bottom-6 sm:left-8 z-[3] text-left transition-opacity duration-300 max-w-[55%] ${
              opening ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="font-display text-xs uppercase tracking-[0.22em] text-ink-soft">
              Para
            </p>
            <p className="font-script text-2xl leading-none text-ink sm:text-3xl">Vos, con amor</p>
            <p className="mt-1 font-display text-sm italic text-ink-soft">De: Giuliana & Dante</p>
          </div>

          {/* 8. Wax seal: centered right over the overlapping flap tip */}
          <div
            className="absolute z-[7]"
            style={{
              top: "54%",
              left: "50%",
              opacity: opening ? 0 : 1,
              transform: opening
                ? "translate3d(-50%, -65%, 0) scale(1.3)"
                : "translate3d(-50%, -50%, 0) scale(1)",
              transition: "opacity 0.28s ease, transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
              willChange: "transform, opacity",
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
        className={`mt-6 sm:mt-8 font-display text-lg italic text-ink-soft transition-opacity text-center px-4 duration-300 ${
          opening ? "opacity-0" : "opacity-100"
        }`}
      >
        Tocá el sello de lacre para abrirla
      </p>
      <div
        className={`mt-1.5 animate-bounce text-rose transition-opacity duration-300 ${
          opening ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        ↓
      </div>
    </div>
  );
}
