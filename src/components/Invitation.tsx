import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  babyFeet,
  heroDream,
  moonStars,
  stork,
  teddyBalloon,
} from "../assets/images";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.remove("highlight-action");
    void el.offsetWidth;
    el.classList.add("highlight-action");
  }
}

function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 28"
      fill="none"
      className={className}
      aria-hidden
    >
      <path d="M8 14h92" stroke="currentColor" strokeWidth="0.8" />
      <path d="M180 14h92" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M118 14 L140 6 L162 14 L140 22 Z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <circle cx="140" cy="14" r="2.2" fill="currentColor" />
    </svg>
  );
}

function CornerOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`pointer-events-none absolute ${className}`}
      aria-hidden
    >
      <path
        d="M8 92 C8 48 48 8 92 8"
        stroke="#C4A36A"
        strokeWidth="1.2"
        strokeDasharray="3 3"
        opacity="0.85"
      />
      <path
        d="M16 92 C16 54 54 16 92 16"
        stroke="#C4A36A"
        strokeWidth="0.8"
        opacity="0.5"
      />
      {/* Delicate leaves */}
      <path
        d="M28 28 C34 20 46 22 44 32 C40 38 30 34 28 28 Z"
        fill="#A8C5B4"
        opacity="0.65"
      />
      <path
        d="M22 44 C28 38 40 40 38 48 C34 54 24 50 22 44 Z"
        fill="#A8C5B4"
        opacity="0.65"
      />
      <path
        d="M44 22 C50 16 62 18 60 26 C56 32 46 28 44 22 Z"
        fill="#A8C5B4"
        opacity="0.65"
      />
      {/* Soft stars and buds */}
      <circle cx="16" cy="16" r="3" fill="#C4A36A" opacity="0.9" />
      <circle cx="70" cy="10" r="2" fill="#C4A36A" opacity="0.75" />
      <circle cx="10" cy="70" r="2" fill="#C4A36A" opacity="0.75" />
    </svg>
  );
}

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff / 3_600_000) % 24),
      minutes: Math.floor((diff / 60_000) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      done: diff <= 0,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = window.setInterval(() => setT(calc()), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  return t;
}

function Countdown() {
  const target = useMemo(() => new Date("2026-10-10T13:00:00-03:00"), []);
  const t = useCountdown(target);
  const units = [
    { label: "días", value: t.days },
    { label: "hs", value: t.hours },
    { label: "min", value: t.minutes },
    { label: "seg", value: t.seconds },
  ];

  return (
    <div
      onClick={() => scrollToSection("seccion-itinerario")}
      className="mx-auto max-w-lg cursor-pointer group transition-transform active:scale-[0.99]"
      title="Toca para ver el cronograma del día"
    >
      <p className="mb-4 text-center font-display text-base italic text-ink-soft sm:mb-5 sm:text-lg group-hover:text-ink transition-colors flex items-center justify-center gap-1.5">
        <span>
          {t.done
            ? "¡Hoy es el gran día! Dante ya está listo para los mimos."
            : "Dante cuenta las pataditas que faltan…"}
        </span>
        <span className="text-xs text-gold opacity-60 group-hover:opacity-100 transition-opacity">↓</span>
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="paper-grain rounded-xl bg-ivory/90 px-1 py-3 text-center shadow-xs ring-1 ring-gold/25 transition group-hover:ring-gold/50 sm:rounded-2xl sm:py-4 sm:shadow-sm"
          >
            <div className="font-serif text-2xl font-semibold text-ink sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-dark sm:mt-1 sm:text-[10px] sm:tracking-[0.22em]">
              {u.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InviteCard() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <article
      className="invite-shadow paper-grain relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[24px] bg-ivory sm:rounded-[28px]"
      onMouseMove={(e) => {
        if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
          const r = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          setTilt({ x: y * -6, y: x * 7 });
        }
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out",
      }}
    >
      <CornerOrnament className="-left-1 -top-1 h-24 w-24 sm:h-28 sm:w-28" />
      <CornerOrnament className="-bottom-1 -right-1 h-24 w-24 rotate-180 sm:h-28 sm:w-28" />

      <div className="relative px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-8">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.34em] text-gold-dark sm:text-[11px] sm:tracking-[0.42em]">
          Estás invitada · invitado
        </p>

        <h2 className="mt-2 text-center font-serif text-xs font-medium uppercase tracking-[0.38em] text-ink sm:mt-3 sm:text-[13px] sm:tracking-[0.45em]">
          Baby Shower
        </h2>

        <div className="relative mx-auto mt-5 overflow-hidden rounded-[18px] shadow-md sm:mt-6 sm:rounded-[22px]">
          <img
            src={heroDream}
            alt="Un bebé dormido entre nubes y un osito de peluche"
            className="h-44 w-full object-cover sm:h-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/70 via-transparent to-transparent" />
        </div>

        <p className="mt-6 text-center font-display text-lg italic text-ink-soft sm:mt-7 sm:text-xl">
          Giuliana celebra la llegada de su
        </p>

        <h1 className="foil-text mt-1 text-center font-script text-6xl leading-none sm:text-7xl md:text-8xl">
          Dante
        </h1>

        <Flourish className="mx-auto mt-3 h-6 w-40 text-gold sm:mt-4 sm:h-7 sm:w-48" />

        <p className="mx-auto mt-4 max-w-xs text-center font-display text-[15px] leading-relaxed text-ink sm:mt-5 sm:text-[17px]">
          Un principito de primavera que ya quiere conocerte, llenarte de babitas
          y robarte el corazón.
        </p>

        <div className="mx-auto mt-6 space-y-3 rounded-xl bg-sand/50 p-3 text-center ring-1 ring-gold/20 sm:mt-8 sm:space-y-4 sm:rounded-2xl sm:p-4">
          <button
            type="button"
            onClick={() => scrollToSection("seccion-calendario")}
            className="group block w-full rounded-xl p-2.5 transition hover:bg-ivory/80 active:scale-[0.98] cursor-pointer text-center"
            title="Toca para ir a agendar en tu calendario"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-dark flex items-center justify-center gap-1 sm:text-[10px] sm:tracking-[0.28em]">
              <span>Cuándo</span>
              <span className="text-[10px] text-gold opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
            </p>
            <p className="mt-0.5 font-serif text-base text-ink group-hover:text-gold-dark transition-colors sm:mt-1 sm:text-lg">
              Sábado 10 de octubre
            </p>
            <p className="font-display text-sm text-ink-soft sm:text-base">
              2026 · 1:00 PM <span className="ml-1 text-xs text-gold underline underline-offset-2 opacity-80 group-hover:opacity-100">Agendar</span>
            </p>
          </button>

          <div className="gold-line" />

          <button
            type="button"
            onClick={() => scrollToSection("seccion-mapa")}
            className="group block w-full rounded-xl p-2.5 transition hover:bg-ivory/80 active:scale-[0.98] cursor-pointer text-center"
            title="Toca para ir al mapa de ubicación"
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-dark flex items-center justify-center gap-1 sm:text-[10px] sm:tracking-[0.28em]">
              <span>Dónde</span>
              <span className="text-[10px] text-gold opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
            </p>
            <p className="mt-0.5 font-serif text-base text-ink group-hover:text-gold-dark transition-colors sm:mt-1 sm:text-lg">
              Juan B. Justo 8917
            </p>
            <p className="font-display text-sm text-ink-soft sm:text-base">
              Traé el corazón <span className="ml-1 text-xs text-sky-deep underline underline-offset-2 opacity-80 group-hover:opacity-100">Ver mapa</span>
            </p>
          </button>
        </div>

        <p className="mt-6 text-center font-display text-sm italic text-ink-soft sm:mt-7 sm:text-base">
          “Hay milagros que se celebran con globitos,
          <br />
          facturas y mucho, mucho amor.”
        </p>
      </div>
    </article>
  );
}

function Detail({
  icon,
  title,
  children,
  onClick,
}: {
  icon: string;
  title: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`paper-grain rounded-2xl bg-ivory/90 p-5 shadow-xs ring-1 ring-gold/15 transition sm:rounded-3xl sm:p-6 sm:shadow-sm ${
        onClick ? "cursor-pointer hover:ring-gold/45 active:scale-[0.99]" : ""
      }`}
    >
      <div className="mb-2 text-2xl sm:mb-3">{icon}</div>
      <h3 className="font-serif text-lg text-ink sm:text-xl flex items-center gap-1.5">
        <span>{title}</span>
        {onClick && <span className="text-xs text-gold opacity-60">↗</span>}
      </h3>
      <div className="mt-1.5 font-display text-[15px] leading-relaxed text-ink-soft sm:mt-2 sm:text-[16px]">
        {children}
      </div>
    </div>
  );
}

function calendarUrl() {
  const text = encodeURIComponent("Baby Shower de Dante");
  const details = encodeURIComponent(
    "Giuliana te invita a celebrar la llegada de Dante. ¡No faltes!",
  );
  const loc = encodeURIComponent("Juan B. Justo 8917");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20261010T130000/20261010T170000&ctz=America/Argentina/Buenos_Aires&details=${details}&location=${loc}`;
}

function mapsUrl() {
  return "https://www.google.com/maps/search/?api=1&query=Juan+B.+Justo+8917";
}

function whatsappUrl() {
  const t = encodeURIComponent(
    "¡Estoy invitada/o al Baby Shower de Dante! 💙\nSábado 10 de octubre 2026 · 1:00 PM\nJuan B. Justo 8917\nGiuliana te espera con el corazón lleno.",
  );
  return `https://wa.me/?text=${t}`;
}

const ITINERARY = [
  { time: "13:00", title: "Recibimiento", note: "Un brindis y mil abrazos." },
  { time: "13:30", title: "Juegos y risas", note: "Prepará el sentido del humor." },
  { time: "14:30", title: "Mesa dulce", note: "Facturas, cake y tentaciones." },
  { time: "15:30", title: "Mimos para Dante", note: "El momentito de los regalitos." },
];

export type GuestMessage = {
  id: string;
  name: string;
  attending: "si" | "talvez" | "no";
  guests: string;
  message: string;
  createdAt: string;
  relativeTime: string;
};

const SEED_MESSAGES: GuestMessage[] = [
  {
    id: "seed-1",
    name: "Abuela Mirta",
    attending: "si",
    guests: "2",
    message: "¡Esperándote con todo mi amor mi principito hermoso! La abuela ya tiene la mantita tejida lista.",
    createdAt: "2026-09-17T14:30:00Z",
    relativeTime: "Ayer",
  },
  {
    id: "seed-2",
    name: "Tía Vale y Primo Benja",
    attending: "si",
    guests: "2",
    message: "¡Contando los días para llenarte de mimos y besitos! Giuliana vas a ser la mamá más hermosa.",
    createdAt: "2026-09-17T18:15:00Z",
    relativeTime: "Ayer",
  },
  {
    id: "seed-3",
    name: "Sofi & Lucas",
    attending: "si",
    guests: "2",
    message: "¡Presentes de cabeza! No nos perdemos este fiestón por nada. ¡Los queremos infinito!",
    createdAt: "2026-09-18T09:20:00Z",
    relativeTime: "Hace unas horas",
  },
  {
    id: "seed-4",
    name: "Madrina Cami ♡",
    attending: "si",
    guests: "1",
    message: "Mi ahijado amado, ya te amo antes de conocerte. ¡Ahí estaré en primera fila para abrazar a mamá y celebrarte!",
    createdAt: "2026-09-18T10:45:00Z",
    relativeTime: "Hace un momento",
  },
];

const STORAGE_KEY = "dante_guestbook_messages";

function ConfirmAndGuestbookSection({
  messages,
  onAddMessage,
}: {
  messages: GuestMessage[];
  onAddMessage: (msg: GuestMessage) => void;
}) {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"si" | "talvez" | "no">("si");
  const [guests, setGuests] = useState("1");
  const [note, setNote] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<GuestMessage | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !note.trim()) return;

    const newMsg: GuestMessage = {
      id: "msg-" + Date.now(),
      name: name.trim(),
      attending,
      guests,
      message: note.trim(),
      createdAt: new Date().toISOString(),
      relativeTime: "Recién",
    };

    onAddMessage(newMsg);
    setSubmittedMessage(newMsg);
    setName("");
    setNote("");

    // Automatically scroll smoothly to love wall so they see their note!
    window.setTimeout(() => {
      scrollToSection("muro-de-amor");
    }, 400);
  };

  const getWhatsAppPersonalUrl = (msg: GuestMessage) => {
    const statusText =
      msg.attending === "si"
        ? "¡Confirmo que voy! 💙"
        : msg.attending === "talvez"
        ? "Voy a hacer todo lo posible por ir ✨"
        : "No voy a poder llegar, pero los acompaño con todo mi corazón 🤍";
    const text = encodeURIComponent(
      `¡Hola Giuliana! ${statusText}\nSoy ${msg.name} (${msg.guests} pers.)\n\nMi mensajito para Dante:\n"${msg.message}"\n\n¡Nos vemos el 10 de octubre a la 1:00 PM! 👶🍼`,
    );
    return `https://wa.me/?text=${text}`;
  };

  const confirmedCount = messages.filter((m) => m.attending === "si").length;

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* SECTION 1: Formulario de Confirmación y Mensaje */}
      <section id="confirmar-asistencia" className="mx-auto max-w-xl px-4 scroll-mt-6">
        <div className="paper-grain rounded-3xl bg-ivory p-6 shadow-md ring-1 ring-gold/25 sm:p-8">
          <div className="text-center">
            <span className="inline-block text-2xl">💌</span>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-dark sm:text-[11px] sm:tracking-[0.3em]">
              Confirmar asistencia
            </p>
            <h2 className="mt-1 font-script text-4xl text-ink sm:text-5xl">
              ¿Venís a celebrar?
            </h2>
            <p className="mx-auto mt-2 max-w-md font-display text-base italic text-ink-soft sm:text-lg">
              Dejanos tu nombre y unas palabritas de amor que Dante guardará para siempre en su libro de recuerdos.
            </p>
          </div>

          {submittedMessage && (
            <div className="mt-6 rounded-2xl bg-[#f2f8f5] p-4 text-center ring-1 ring-[#a8c5b4] animate-pop">
              <p className="font-serif text-lg font-semibold text-ink">
                ¡Gracias {submittedMessage.name}! ♡
              </p>
              <p className="mt-1 font-display text-sm text-ink-soft">
                Tu dedicatoria ya brilla en el Muro de Amor más abajo.
              </p>
              <a
                href={getWhatsAppPersonalUrl(submittedMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:brightness-105 active:scale-95 transition"
              >
                <span>💬</span> Avisar también a Giuliana por WhatsApp
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark sm:text-[11px]">
                Tu nombre y apellido *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Tía Marisa, Juan y Cami…"
                className="w-full rounded-2xl border border-gold/25 bg-cream/70 px-4 py-3 text-ink outline-none ring-gold/40 placeholder:text-ink-soft/50 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark sm:text-[11px]">
                ¿Venís a mimar al príncipe?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "si", label: "¡Obvio que sí! 💙" },
                  { id: "talvez", label: "Hago fuerza ✨" },
                  { id: "no", label: "De corazón 🤍" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAttending(opt.id as "si" | "talvez" | "no")}
                    className={`rounded-2xl px-2 py-3 text-xs sm:text-sm font-semibold transition cursor-pointer active:scale-95 text-center ${
                      attending === opt.id
                        ? "bg-sky text-white shadow-sm"
                        : "bg-cream text-ink-soft ring-1 ring-gold/20 hover:bg-sand"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark sm:text-[11px]">
                ¿Cuántos vienen?
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full rounded-2xl border border-gold/25 bg-cream/70 px-4 py-3 text-ink outline-none ring-gold/40 focus:ring-2 cursor-pointer"
              >
                <option value="1">1 personita (voy yo solo/a)</option>
                <option value="2">2 personitas (voy acompañado/a)</option>
                <option value="3">3 personitas</option>
                <option value="4">4 o más · ¡familia completa!</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark sm:text-[11px]">
                Un mensajito de amor para Dante *
              </label>
              <textarea
                required
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Bienvenido al mundo, principito… Te estamos esperando con muchas ganas."
                className="w-full resize-none rounded-2xl border border-gold/25 bg-cream/70 px-4 py-3 text-ink outline-none ring-gold/40 placeholder:text-ink-soft/50 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] rounded-full bg-gradient-to-r from-rose to-[#d4909b] py-3.5 px-6 font-semibold text-white shadow-md shadow-rose/25 transition hover:brightness-105 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>♡</span> Confirmar y publicar dedicatoria
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 2: Muro de Amor para Dante (Guestbook) */}
      <section id="muro-de-amor" className="mx-auto max-w-4xl px-4 scroll-mt-6">
        <div className="text-center">
          <span className="inline-block text-3xl animate-wiggle">✨</span>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-dark sm:text-[11px]">
            Libro de recuerdos
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:text-5xl">
            Muro de Amor para Dante
          </h2>
          <p className="mx-auto mt-2 max-w-lg font-display text-base text-ink-soft sm:text-lg">
            Dedicatorias que Dante leerá cuando sea grande para saber cuánto amor lo esperaba desde antes de nacer.
          </p>

          <div className="mt-4 inline-flex items-center gap-3 rounded-full bg-sand/60 px-4 py-1.5 text-xs font-semibold text-gold-dark ring-1 ring-gold/30">
            <span>🎉 {confirmedCount} confirmados</span>
            <span>·</span>
            <span>💌 {messages.length} mensajitos</span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {messages.map((item) => (
            <div
              key={item.id}
              className="paper-grain relative rounded-2xl sm:rounded-3xl bg-ivory/95 p-5 sm:p-6 shadow-sm ring-1 ring-gold/20 flex flex-col justify-between transition hover:shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-ink sm:text-xl">
                      {item.name}
                    </h3>
                    <span className="text-[11px] font-display italic text-ink-soft">
                      {item.relativeTime}
                    </span>
                  </div>

                  {item.attending === "si" ? (
                    <span className="rounded-full bg-sky/20 px-2.5 py-1 text-[11px] font-semibold text-sky-deep whitespace-nowrap">
                      💙 ¡Confirmado! ({item.guests})
                    </span>
                  ) : item.attending === "talvez" ? (
                    <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[11px] font-semibold text-gold-dark whitespace-nowrap">
                      ✨ Hace fuerza
                    </span>
                  ) : (
                    <span className="rounded-full bg-rose/20 px-2.5 py-1 text-[11px] font-semibold text-rose whitespace-nowrap">
                      🤍 De corazón
                    </span>
                  )}
                </div>

                <p className="mt-3.5 font-display text-base leading-relaxed text-ink italic">
                  “{item.message}”
                </p>
              </div>

              <div className="mt-4 flex items-center justify-end text-[10px] uppercase tracking-wider text-gold-dark/60">
                <span>Con todo el corazón</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FloatingActionBar({ totalMessages }: { totalMessages: number }) {
  return (
    <nav
      aria-label="Acciones rápidas del Baby Shower"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-gold/35 bg-ivory/95 px-2.5 py-2 shadow-xl shadow-ink/15 backdrop-blur-md max-w-[94vw] select-none animate-fade-up"
    >
      <button
        type="button"
        onClick={() => scrollToSection("confirmar-asistencia")}
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-rose to-[#d4909b] px-3.5 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <span>💌</span>
        <span>Confirmar asistencia</span>
      </button>

      <button
        type="button"
        onClick={() => scrollToSection("muro-de-amor")}
        className="flex items-center gap-1.5 rounded-full bg-sand/60 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold text-ink ring-1 ring-gold/25 transition hover:bg-sand active:scale-95 cursor-pointer whitespace-nowrap"
      >
        <span>✨</span>
        <span>Muro de amor</span>
        <span className="rounded-full bg-gold/25 px-1.5 py-0.5 text-[10px] font-bold text-gold-dark">
          {totalMessages}
        </span>
      </button>
    </nav>
  );
}

export default function Invitation() {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      /* ignore */
    }
    return SEED_MESSAGES;
  });

  const handleAddMessage = (newMsg: GuestMessage) => {
    setMessages((prev) => {
      const updated = [newMsg, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        /* ignore */
      }
      return updated;
    });
  };

  return (
    <div className="relative z-10 pb-28 sm:pb-32">
      <header className="px-4 pb-4 pt-8 text-center sm:pb-6 sm:pt-10 animate-fade-up">
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold-dark sm:text-[11px] sm:tracking-[0.4em]">
          Giuliana & Dante
        </p>
        <p className="mt-1 font-script text-2xl text-ink sm:mt-2 sm:text-3xl">Una celebración de amor</p>
      </header>

      <section className="px-3 sm:px-4 animate-pop">
        <InviteCard />
      </section>

      <div className="mt-6 flex justify-center sm:mt-10">
        <span className="animate-bounce text-gold">↓</span>
      </div>

      <section className="mx-auto mt-12 grid max-w-4xl items-center gap-6 px-4 sm:mt-16 sm:gap-8 md:grid-cols-2">
        <img
          src={stork}
          alt="Cigüeña llevando un paquetito celeste"
          className="h-56 w-full rounded-2xl object-cover shadow-lg ring-4 ring-ivory sm:h-72 sm:rounded-[28px]"
        />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-dark sm:text-[11px] sm:tracking-[0.3em]">
            La historia
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:mt-2 sm:text-5xl">Un principito llamado Dante</h2>
          <p className="mt-3 font-display text-base leading-relaxed text-ink-soft sm:mt-4 sm:text-lg">
            En plena primavera argentina, cuando todo empieza a florecer, Giuliana
            se prepara para el abrazo más grande de su vida. Dante ya eligió a su
            mamá… y ahora quiere conocerte a vos.
          </p>
          <p className="mt-2.5 font-display text-base leading-relaxed text-ink-soft sm:mt-3 sm:text-lg">
            Por eso armamos este festejo tierno, divertido y lleno de globitos:
            para celebrarlo entre las personas que más queremos.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-4xl px-4 sm:mt-20">
        <h2 className="text-center font-script text-4xl text-ink sm:text-5xl">Lo que tenés que saber</h2>
        <Flourish className="mx-auto mt-2 h-6 w-36 text-gold sm:h-7 sm:w-40" />
        <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 sm:grid-cols-2">
          <Detail
            icon="📅"
            title="El día"
            onClick={() => scrollToSection("seccion-calendario")}
          >
            Sábado 10 de octubre de 2026. Un sábado de sol, torta y
            emoción. Llegá desde la 1:00 PM (13:00 hs)… o 13:15, somos argentinos.
          </Detail>
          <Detail
            icon="📍"
            title="El lugar"
            onClick={() => scrollToSection("seccion-mapa")}
          >
            Juan B. Justo 8917. Si te perdés, preguntá por el baby shower de
            Giuliana: en el barrio ya todos saben.
          </Detail>
          <Detail icon="👗" title="Cómo venir">
            Vení cómoda, con ganas de mimar al príncipe y lista para una foto
            grupal que va a quedar para el álbum de Dante.
          </Detail>
          <Detail
            icon="🎁"
            title="Los regalitos"
            onClick={() => scrollToSection("seccion-deseos")}
          >
            Lo más importante es que estés. Si querés traer algo, Dante va a
            necesitar de todo… menos preocupaciones.
          </Detail>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-3xl px-4 sm:mt-20">
        <h2 className="text-center font-script text-4xl text-ink sm:text-5xl">La cuenta regresiva</h2>
        <div className="mt-6 sm:mt-8">
          <Countdown />
        </div>
      </section>

      <section id="seccion-itinerario" className="mx-auto mt-14 grid max-w-4xl items-center gap-6 px-4 sm:mt-20 sm:gap-8 md:grid-cols-2 scroll-mt-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-dark sm:text-[11px] sm:tracking-[0.3em]">
            El plan
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:mt-2 sm:text-5xl">Cómo va a ser el día</h2>
          <ul className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
            {ITINERARY.map((item) => (
              <li key={item.time} className="flex gap-3 sm:gap-4">
                <span className="w-14 shrink-0 pt-0.5 font-serif text-sm font-semibold text-gold-dark sm:w-16">
                  {item.time}
                </span>
                <span>
                  <span className="block font-serif text-base text-ink sm:text-lg">{item.title}</span>
                  <span className="font-display text-sm text-ink-soft sm:text-base">{item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <img
            src={babyFeet}
            alt="Patitas de bebé envueltas en una mantita"
            className="h-40 w-full rounded-2xl object-cover shadow-md ring-4 ring-ivory sm:h-52 sm:rounded-[24px]"
          />
          <img
            src={moonStars}
            alt="Lunita dormida entre estrellas"
            className="mt-5 h-40 w-full rounded-2xl object-cover shadow-md ring-4 ring-ivory sm:mt-8 sm:h-52 sm:rounded-[24px]"
          />
        </div>
      </section>

      <section id="seccion-deseos" className="mx-auto mt-14 max-w-3xl px-4 text-center sm:mt-20 scroll-mt-6">
        <h2 className="font-script text-4xl text-ink sm:text-5xl">Si querés mimar a Dante</h2>
        <p className="mx-auto mt-2 max-w-lg font-display text-base text-ink-soft sm:mt-3 sm:text-lg">
          Dante todavía no tiene Instagram, pero sí una mini lista de deseos.
          Cualquier cosa que elijas, va a usarse con mucho amor.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
          {[
            "Ropita 0 a 3 meses",
            "Pañales (¡siempre!)",
            "Mantitas suaves",
            "Juguetes para descubrir",
            "Libritos para soñar",
            "Tu presencia ♡",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ivory px-3.5 py-1.5 font-display text-xs text-ink ring-1 ring-gold/25 shadow-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section id="seccion-mapa" className="mx-auto mt-14 max-w-3xl px-4 sm:mt-20 scroll-mt-6">
        <h2 className="text-center font-script text-4xl text-ink sm:text-5xl">Cómo llegar</h2>
        <p className="mt-1 text-center font-display text-base text-ink-soft sm:mt-2 sm:text-lg">
          Juan B. Justo 8917
        </p>
        <div className="mt-5 overflow-hidden rounded-2xl shadow-lg ring-4 ring-ivory sm:mt-6 sm:rounded-[28px]">
          <iframe
            title="Mapa de Juan B. Justo 8917"
            src="https://maps.google.com/maps?q=Juan%20B%20Justo%208917&z=15&output=embed"
            className="h-52 w-full border-0 grayscale-[20%] sm:h-80"
            loading="lazy"
          />
        </div>
        <div id="seccion-calendario" className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3 scroll-mt-6">
          <a
            href={mapsUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <span>📍</span> Abrir en Google Maps
          </a>
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <span>📅</span> Agendar en el celu
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto sm:text-base"
          >
            <span>💬</span> Compartir por WhatsApp
          </a>
        </div>
      </section>

      {/* CONFIRMAR ASISTENCIA & MURO DE AMOR */}
      <div className="mt-16 sm:mt-24">
        <ConfirmAndGuestbookSection
          messages={messages}
          onAddMessage={handleAddMessage}
        />
      </div>

      <footer className="mx-auto mt-16 max-w-lg px-4 pb-[max(2rem,env(safe-area-inset-bottom))] text-center sm:mt-24">
        <img
          src={teddyBalloon}
          alt=""
          className="mx-auto h-16 w-16 rounded-full object-cover shadow animate-wiggle sm:h-20 sm:w-20"
        />
        <p className="mt-4 font-script text-3xl text-ink sm:mt-5 sm:text-4xl">Con amor, Giuliana</p>
        <p className="mt-1 font-display text-sm italic text-ink-soft sm:text-base">
          y un tal Dante que todavía no habla, pero ya manda besos.
        </p>
        <p className="mt-5 text-[10px] uppercase tracking-[0.3em] text-gold-dark sm:mt-6 sm:text-[11px]">
          10 · 10 · 2026
        </p>
      </footer>

      {/* FLOATING ACTION BAR */}
      <FloatingActionBar totalMessages={messages.length} />
    </div>
  );
}
