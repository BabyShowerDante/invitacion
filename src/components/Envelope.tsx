type Props = {
  opening: boolean;
  onOpen: () => void;
};

export default function Envelope({ opening, onOpen }: Props) {
  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-10">
      <div className="mb-6 text-center sm:mb-8 animate-fade-up">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-gold-dark sm:text-[11px] sm:tracking-[0.38em]">
          Correo de cigüeña
        </p>
        <h1 className="font-script text-4xl text-ink sm:text-5xl md:text-6xl">Tenés una invitación</h1>
        <p className="mt-2 font-display text-base italic text-ink-soft sm:mt-3 sm:text-lg">
          De Giuliana, con el corazón a mil.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir la invitación"
        className={`group relative cursor-pointer border-0 bg-transparent p-0 active:scale-[0.98] transition-transform select-none ${opening ? "" : "animate-envelope"}`}
        style={{ perspective: 1400 }}
      >
        <div
          className="relative"
          style={{
            width: "min(92vw, 400px)",
            height: "min(58vw, 250px)",
            minHeight: "190px",
          }}
        >
          {/* back of envelope */}
          <div
            className="absolute inset-0 rounded-[6px]"
            style={{
              background: "linear-gradient(180deg, #f4e3c6 0%, #e7cfab 100%)",
              boxShadow:
                "0 30px 50px -18px rgba(90,70,56,0.45), 0 12px 20px -10px rgba(90,70,56,0.25)",
            }}
          />

          {/* letter peeking */}
          <div
            className="absolute overflow-hidden rounded-sm bg-ivory"
            style={{
              left: "5%",
              right: "5%",
              top: opening ? "-42%" : "14%",
              bottom: "18%",
              zIndex: opening ? 4 : 1,
              transition: "top 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.55s",
              boxShadow: "0 8px 18px rgba(90,70,56,0.18)",
            }}
          >
            <div className="gold-line mt-2 sm:mt-3" />
            <div className="px-3 pt-3 text-center sm:px-4 sm:pt-4">
              <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-gold-dark sm:text-[9px] sm:tracking-[0.35em]">
                Baby Shower
              </p>
              <p className="font-script text-3xl leading-none text-ink sm:text-4xl">Dante</p>
              <p className="mt-1 font-display text-xs italic text-ink-soft sm:text-sm">10 de octubre · 2026</p>
            </div>
          </div>

          {/* front pocket */}
          <div
            className="absolute inset-0 z-[2] rounded-[6px]"
            style={{
              background:
                "linear-gradient(180deg, #f0d9b4 0%, #e6c79a 48%, #ddba8a 100%)",
              clipPath: "polygon(0 36%, 50% 72%, 100% 36%, 100% 100%, 0 100%)",
              boxShadow: "inset 0 8px 16px rgba(90,70,56,0.08)",
            }}
          />

          {/* side folds shine */}
          <div
            className="absolute inset-0 z-[2] rounded-[6px] opacity-40"
            style={{
              background:
                "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.35) 50%, transparent 62%)",
              clipPath: "polygon(0 36%, 50% 72%, 100% 36%, 100% 100%, 0 100%)",
            }}
          />

          {/* flap */}
          <div
            className="absolute left-0 right-0 top-0 z-[3] origin-top rounded-t-[6px]"
            style={{
              height: "42%",
              background: opening
                ? "linear-gradient(180deg, #e0c196 0%, #f3e0c2 100%)"
                : "linear-gradient(180deg, #f8ead0 0%, #ebcfa8 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transform: opening ? "rotateX(180deg)" : "rotateX(0deg)",
              transformStyle: "preserve-3d",
              transition: "transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
              boxShadow: opening ? "none" : "0 6px 10px rgba(90,70,56,0.12)",
            }}
          />

          {/* postage stamp */}
          <div
            className={`absolute right-2 top-2 sm:right-3 sm:top-3 z-[6] rotate-6 border-2 border-dashed border-gold-dark/40 bg-ivory p-[2px] sm:p-[3px] shadow-sm ${opening ? "opacity-0" : "opacity-100"} transition-opacity`}
            style={{ width: "clamp(38px, 11vw, 46px)", height: "clamp(46px, 13vw, 54px)" }}
          >
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-sky/40 to-blush/30">
              <span className="text-[10px] text-gold-dark sm:text-[11px]">✦</span>
              <span className="text-[5px] font-bold tracking-wider text-ink sm:text-[6px]">ARG</span>
              <span className="text-[5px] text-ink-soft sm:text-[6px]">2026</span>
            </div>
          </div>

          {/* address lines */}
          <div
            className={`absolute bottom-3 left-4 sm:bottom-6 sm:left-8 z-[3] text-left transition-opacity max-w-[55%] ${opening ? "opacity-0" : "opacity-100"}`}
          >
            <p className="font-display text-[10px] uppercase tracking-[0.2em] text-ink-soft sm:text-[11px] sm:tracking-[0.22em]">
              Para
            </p>
            <p className="font-script text-xl leading-none text-ink sm:text-2xl">Vos, con amor</p>
            <p className="mt-0.5 font-display text-[11px] italic text-ink-soft sm:mt-1 sm:text-xs">De: Giuliana & Dante</p>
          </div>

          {/* wax seal */}
          <div
            className="absolute left-1/2 z-[7] -translate-x-1/2"
            style={{
              top: "30%",
              opacity: opening ? 0 : 1,
              transform: opening ? "translate(-50%, -10px) scale(1.4)" : "translateX(-50%) scale(1)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <div className="wax-seal relative flex h-[66px] w-[66px] sm:h-[74px] sm:w-[74px] items-center justify-center shadow-lg group-hover:scale-105 active:scale-95 transition-transform">
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" className="sm:w-[34px] sm:h-[34px]" aria-hidden>
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
        className={`mt-6 sm:mt-8 font-display text-base italic text-ink-soft transition-opacity text-center px-4 ${opening ? "opacity-0" : "opacity-100"}`}
      >
        Tocá el sello de lacre para abrirla
      </p>
      <div
        className={`mt-1 sm:mt-2 animate-bounce text-rose transition-opacity ${opening ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        ↓
      </div>
    </div>
  );
}
