type Props = {
  opening: boolean;
  onOpen: () => void;
};

export default function Envelope({ opening, onOpen }: Props) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="mb-8 text-center animate-fade-up">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-gold-dark">
          Correo de cigüeña
        </p>
        <h1 className="font-script text-5xl text-ink sm:text-6xl">Tenés una invitación</h1>
        <p className="mt-3 font-display text-lg italic text-ink-soft">
          De Giuliana, con el corazón a mil.
        </p>
      </div>

      <button
        type="button"
        onClick={onOpen}
        disabled={opening}
        aria-label="Abrir la invitación"
        className={`relative cursor-pointer border-0 bg-transparent p-0 ${opening ? "" : "animate-envelope"}`}
        style={{ perspective: 1400 }}
      >
        <div
          className="relative"
          style={{
            width: "min(92vw, 400px)",
            height: "min(58vw, 250px)",
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
              left: "6%",
              right: "6%",
              top: opening ? "-42%" : "14%",
              bottom: "18%",
              zIndex: opening ? 4 : 1,
              transition: "top 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.55s",
              boxShadow: "0 8px 18px rgba(90,70,56,0.18)",
            }}
          >
            <div className="gold-line mt-3" />
            <div className="px-4 pt-4 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.35em] text-gold-dark">
                Baby Shower
              </p>
              <p className="font-script text-4xl leading-none text-ink">Dante</p>
              <p className="mt-1 font-display text-sm italic text-ink-soft">10 de octubre · 2026</p>
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
            className={`absolute right-3 top-3 z-[6] rotate-6 border-2 border-dashed border-gold-dark/40 bg-ivory p-[3px] shadow-sm ${opening ? "opacity-0" : "opacity-100"} transition-opacity`}
            style={{ width: 46, height: 54 }}
          >
            <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-sky/40 to-blush/30">
              <span className="text-[11px] text-gold-dark">✦</span>
              <span className="text-[6px] font-bold tracking-wider text-ink">ARG</span>
              <span className="text-[6px] text-ink-soft">2026</span>
            </div>
          </div>

          {/* address lines */}
          <div
            className={`absolute bottom-6 left-8 z-[3] text-left transition-opacity ${opening ? "opacity-0" : "opacity-100"}`}
          >
            <p className="font-display text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Para
            </p>
            <p className="font-script text-2xl leading-none text-ink">Vos, con amor</p>
            <p className="mt-1 font-display text-xs italic text-ink-soft">De: Giuliana & Dante</p>
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
            <div className="wax-seal relative flex h-[74px] w-[74px] items-center justify-center">
              <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden>
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
        className={`mt-8 font-display text-base italic text-ink-soft transition-opacity ${opening ? "opacity-0" : "opacity-100"}`}
      >
        Tocá el sello de lacre para abrirla
      </p>
      <div
        className={`mt-2 animate-bounce text-rose transition-opacity ${opening ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        ↓
      </div>
    </div>
  );
}
