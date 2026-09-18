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
      <p className="mb-4 text-center font-display text-xl italic text-ink-soft sm:mb-5 sm:text-xl group-hover:text-ink transition-colors flex items-center justify-center gap-1.5">
        <span>
          {t.done
            ? "Es hoy. Te esperamos."
            : "Falta cada vez menos."}
        </span>
        <span className="text-[13px] text-gold opacity-60 group-hover:opacity-100 transition-opacity">↓</span>
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="paper-grain rounded-xl bg-ivory/90 px-1 py-3 text-center shadow-xs ring-1 ring-gold/25 transition group-hover:ring-gold/50 sm:rounded-2xl sm:py-4 sm:shadow-sm"
          >
            <div className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[13px] font-semibold uppercase tracking-wider text-gold-dark">
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
      style={
        tilt.x !== 0 || tilt.y !== 0
          ? {
              transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.25s ease-out",
            }
          : undefined
      }
    >
      <CornerOrnament className="-left-1 -top-1 h-24 w-24 sm:h-28 sm:w-28" />
      <CornerOrnament className="-bottom-1 -right-1 h-24 w-24 rotate-180 sm:h-28 sm:w-28" />

      <div className="relative px-5 pb-8 pt-7 sm:px-8 sm:pb-10 sm:pt-8">
        <p className="text-center text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
          Estás invitada · invitado
        </p>

        <h2 className="mt-2 text-center font-serif text-sm font-medium uppercase tracking-[0.35em] text-ink sm:mt-2.5">
          Baby Shower
        </h2>

        <div className="relative mx-auto mt-5 overflow-hidden rounded-[18px] shadow-md sm:mt-6 sm:rounded-[22px]">
          <img
            src={heroDream}
            alt="Un bebé dormido entre nubes y un osito de peluche"
            className="h-48 w-full object-cover sm:h-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/70 via-transparent to-transparent" />
        </div>

        <p className="mt-6 text-center font-display text-xl italic text-ink-soft">
          Giuliana espera a
        </p>

        <h1 className="foil-text mt-1 text-center font-script text-6xl leading-none sm:text-7xl md:text-8xl">
          Dante
        </h1>

        <Flourish className="mx-auto mt-3 h-6 w-40 text-gold sm:mt-4 sm:h-7 sm:w-48" />

        <p className="mx-auto mt-4 max-w-xs text-center font-display text-xl leading-relaxed text-ink sm:mt-5 sm:text-xl">
          Nace en primavera. Queremos festejarlo con vos.
        </p>

        <div className="mx-auto mt-6 space-y-3 rounded-xl bg-sand/50 p-3 text-center ring-1 ring-gold/20 sm:mt-8 sm:space-y-4 sm:rounded-2xl sm:p-4">
          <button
            type="button"
            onClick={() => scrollToSection("seccion-calendario")}
            className="group block w-full rounded-xl p-2.5 transition hover:bg-ivory/80 active:scale-[0.98] cursor-pointer text-center"
            title="Toca para ir a agendar en tu calendario"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-dark flex items-center justify-center gap-1">
              <span>Cuándo</span>
              <span className="text-[13px] text-gold opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
            </p>
            <p className="mt-0.5 font-serif text-base text-ink group-hover:text-gold-dark transition-colors sm:mt-1 sm:text-lg">
              Sábado 10 de octubre
            </p>
            <p className="font-display text-xl text-ink-soft">
              2026 · 13:00 <span className="ml-1 text-lg text-gold underline underline-offset-2 opacity-85 group-hover:opacity-100">Agendar</span>
            </p>
          </button>

          <div className="gold-line" />

          <button
            type="button"
            onClick={() => scrollToSection("seccion-mapa")}
            className="group block w-full rounded-xl p-2.5 transition hover:bg-ivory/80 active:scale-[0.98] cursor-pointer text-center"
            title="Toca para ir al mapa de ubicación"
          >
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-gold-dark flex items-center justify-center gap-1">
              <span>Dónde</span>
              <span className="text-[13px] text-gold opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
            </p>
            <p className="mt-0.5 font-serif text-base text-ink group-hover:text-gold-dark transition-colors sm:mt-1 sm:text-lg">
              Juan B. Justo 8917
            </p>
            <p className="font-display text-xl text-ink-soft">
              <span className="text-lg text-sky-deep underline underline-offset-2 opacity-85 group-hover:opacity-100">Ver mapa</span>
            </p>
          </button>
        </div>

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
        {onClick && <span className="text-[13px] text-gold opacity-60">↗</span>}
      </h3>
      <div className="mt-2 font-display text-xl leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}

function calendarUrl() {
  const text = encodeURIComponent("Baby Shower de Dante");
  const details = encodeURIComponent(
    "Baby shower de Dante. Juan B. Justo 8917.",
  );
  const loc = encodeURIComponent("Juan B. Justo 8917");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20261010T130000/20261010T170000&ctz=America/Argentina/Buenos_Aires&details=${details}&location=${loc}`;
}

function mapsUrl() {
  return "https://www.google.com/maps/search/?api=1&query=Juan+B.+Justo+8917";
}

function whatsappUrl() {
  const t = encodeURIComponent(
    "Baby shower de Dante\nSábado 10 de octubre de 2026, 13:00\nJuan B. Justo 8917\n\nInvitación: https://babyshowerdante.github.io/invitacion/",
  );
  return `https://wa.me/?text=${t}`;
}

const ITINERARY = [
  { time: "13:00", title: "Recibimiento", note: "Llegada y brindis." },
  { time: "13:30", title: "Juegos", note: "Un par, cortos." },
  { time: "14:30", title: "Mesa dulce", note: "Facturas y torta." },
  { time: "15:30", title: "Regalos", note: "Abrimos los regalos." },
];

export type GuestMessage = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
  relativeTime: string;
};

const STORAGE_KEY = "dante_guestbook_messages";

function ConfirmAndGuestbookSection({
  messages,
  onAddMessage,
}: {
  messages: GuestMessage[];
  onAddMessage: (msg: GuestMessage) => void;
}) {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState<GuestMessage | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !note.trim()) return;

    const newMsg: GuestMessage = {
      id: "msg-" + Date.now(),
      name: name.trim(),
      message: note.trim(),
      createdAt: new Date().toISOString(),
      relativeTime: "Recién",
    };

    onAddMessage(newMsg);
    setSubmittedMessage(newMsg);
    setName("");
    setNote("");

    window.setTimeout(() => {
      scrollToSection("muro-de-amor");
    }, 400);
  };

  const getWhatsAppPersonalUrl = (msg: GuestMessage) => {
    const text = encodeURIComponent(
      `Hola Giuliana, confirmo que voy al baby shower de Dante.\nSoy ${msg.name}.\n\nMi mensaje para Dante:\n"${msg.message}"\n\nNos vemos el 10 de octubre.`,
    );
    return `https://wa.me/?text=${text}`;
  };

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* SECTION 1: Formulario de Confirmación y Mensaje */}
      <section id="confirmar-asistencia" className="mx-auto max-w-xl px-4 scroll-mt-6">
        <div className="paper-grain rounded-3xl bg-ivory p-6 shadow-md ring-1 ring-gold/25 sm:p-8">
          <div className="text-center">
            <span className="inline-block text-2xl">💌</span>
            <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
              Confirmar asistencia
            </p>
            <h2 className="mt-1 font-script text-4xl text-ink sm:text-5xl">
              ¿Venís?
            </h2>
            <p className="mx-auto mt-2 max-w-md font-display text-xl italic text-ink-soft sm:text-xl">
              Dejanos tu nombre y un mensaje para Dante.
            </p>
          </div>

          {submittedMessage && (
            <div className="mt-6 rounded-2xl bg-[#f2f8f5] p-4 text-center ring-1 ring-[#a8c5b4] animate-pop">
              <p className="font-serif text-lg font-semibold text-ink">
                Gracias, {submittedMessage.name}.
              </p>
              <p className="mt-1 font-display text-xl text-ink-soft">
                Tu mensaje ya está en el muro.
              </p>
              <a
                href={getWhatsAppPersonalUrl(submittedMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105 active:scale-95 transition cursor-pointer"
              >
                <span>💬</span> Avisarle a Giuliana por WhatsApp
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Tu nombre *
              </label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Marisa, Juan y Cami"
                className="w-full rounded-2xl border border-gold/25 bg-cream/70 px-4 py-3 text-base text-ink outline-none ring-gold/40 placeholder:text-ink-soft/50 focus:ring-2"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold uppercase tracking-[0.2em] text-gold-dark">
                Tu mensaje para Dante *
              </label>
              <textarea
                required
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Te esperamos, Dante."
                className="w-full resize-none rounded-2xl border border-gold/25 bg-cream/70 px-4 py-3 text-base text-ink outline-none ring-gold/40 placeholder:text-ink-soft/50 focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] rounded-full bg-gradient-to-r from-rose to-[#d4909b] py-3.5 px-6 text-base font-semibold text-white shadow-md shadow-rose/25 transition hover:brightness-105 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>♡</span> Confirmar y dejar un mensaje en el muro
            </button>
          </form>
        </div>
      </section>

      {/* SECTION 2: Muro de amor (Guestbook) */}
      <section id="muro-de-amor" className="mx-auto max-w-4xl px-4 scroll-mt-6">
        <div className="text-center">
          <span className="inline-block text-3xl animate-wiggle">✨</span>
          <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
            Mensajes
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:text-5xl">
            Muro de amor
          </h2>
          <p className="mx-auto mt-2 max-w-lg font-display text-xl text-ink-soft sm:text-xl">
            Mensajes que Dante va a leer cuando sea grande.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-sand/60 px-4 py-1.5 text-[13px] sm:text-sm font-semibold text-gold-dark ring-1 ring-gold/30">
            <span>💌 {messages.length} {messages.length === 1 ? "mensaje" : "mensajes"}</span>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="paper-grain rounded-2xl sm:rounded-3xl border border-dashed border-gold/40 bg-ivory/80 p-8 text-center mt-8">
            <span className="text-3xl">💌</span>
            <p className="mt-2 font-serif text-lg text-ink">
              Todavía no hay mensajes
            </p>
            <p className="mt-1 font-display text-xl italic text-ink-soft max-w-sm mx-auto">
              Dejá el primero desde el formulario de arriba.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {messages.map((item) => (
              <div
                key={item.id}
                className="paper-grain relative rounded-2xl sm:rounded-3xl bg-ivory/95 p-5 sm:p-6 shadow-sm ring-1 ring-gold/20 flex flex-col justify-between transition-transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-ink sm:text-xl">
                        {item.name}
                      </h3>
                      <span className="text-[13px] font-display italic text-ink-soft">
                        {item.relativeTime}
                      </span>
                    </div>

                    <span className="rounded-full bg-sky/20 px-3 py-1 text-[13px] font-semibold text-sky-deep whitespace-nowrap">
                      Confirmó
                    </span>
                  </div>

                  <p className="mt-3.5 font-display text-xl leading-relaxed text-ink italic">
                    “{item.message}”
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FloatingActionBar({ totalMessages }: { totalMessages: number }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2">
      <nav
        aria-label="Acciones rápidas del Baby Shower"
        className="pointer-events-auto flex items-stretch gap-2 sm:gap-2.5 rounded-[28px] border border-gold/35 bg-ivory sm:bg-ivory/95 sm:backdrop-blur-md px-3 py-2 shadow-lg max-w-[96vw] select-none animate-fade-up"
      >
        <button
          type="button"
          onClick={() => scrollToSection("confirmar-asistencia")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-[20px] bg-gradient-to-r from-rose to-[#d4909b] px-3.5 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold leading-snug text-white shadow-sm transition hover:brightness-105 active:scale-95 cursor-pointer text-center"
        >
          <span className="shrink-0">💌</span>
          <span>Confirmar y dejar un mensaje en el muro</span>
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("muro-de-amor")}
          className="flex shrink-0 items-center justify-center gap-1.5 rounded-[20px] bg-sand/60 px-3 py-2 sm:px-5 sm:py-2.5 text-sm font-semibold leading-snug text-ink ring-1 ring-gold/25 transition hover:bg-sand active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <span>✨</span>
          <span>Muro de amor</span>
          {totalMessages > 0 && (
            <span className="rounded-full bg-gold/25 px-1.5 py-0.5 text-[11px] font-bold text-gold-dark">
              {totalMessages}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
}

export default function Invitation({ envelopeOpen = true }: { envelopeOpen?: boolean }) {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      /* ignore */
    }
    return [];
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
        <p className="text-[13px] font-semibold uppercase tracking-[0.35em] text-gold-dark">
          Giuliana & Dante
        </p>
        <p className="mt-1 font-script text-3xl text-ink sm:mt-2 sm:text-4xl">Te esperamos</p>
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
          <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
            La historia
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:mt-2 sm:text-5xl">Por qué nos juntamos</h2>
          <p className="mt-3 font-display text-xl leading-relaxed text-ink-soft sm:mt-4 sm:text-xl">
            Giuliana está por conocer a Dante. Antes de que llegue, quiere juntar
            a la gente que más quiere.
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
            Sábado 10 de octubre de 2026, desde las 13:00.
          </Detail>
          <Detail
            icon="📍"
            title="El lugar"
            onClick={() => scrollToSection("seccion-mapa")}
          >
            Juan B. Justo 8917. Si te perdés, escribile a Giuliana.
          </Detail>
          <Detail icon="👗" title="Cómo venir">
            Vení cómoda. En algún momento sacamos una foto de todos.
          </Detail>
          <Detail
            icon="🎁"
            title="Regalos"
            onClick={() => scrollToSection("seccion-deseos")}
          >
            Lo importante es que vengas. Si querés traer algo, abajo hay ideas.
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
          <p className="text-[13px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
            El plan
          </p>
          <h2 className="mt-1 font-script text-4xl text-ink sm:mt-2 sm:text-5xl">Cómo va a ser</h2>
          <ul className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
            {ITINERARY.map((item) => (
              <li key={item.time} className="flex gap-3 sm:gap-4">
                <span className="w-14 shrink-0 pt-0.5 font-serif text-base font-semibold text-gold-dark sm:w-16">
                  {item.time}
                </span>
                <span>
                  <span className="block font-serif text-base text-ink sm:text-lg">{item.title}</span>
                  <span className="font-display text-xl text-ink-soft">{item.note}</span>
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
        <h2 className="font-script text-4xl text-ink sm:text-5xl">Si querés traer algo</h2>
        <p className="mx-auto mt-2 max-w-lg font-display text-xl text-ink-soft sm:mt-3 sm:text-xl">
          Algunas ideas. Cualquier cosa sirve.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 sm:mt-8 sm:gap-3">
          {[
            "Ropa 0 a 3 meses",
            "Pañales",
            "Mantas",
            "Juguetes",
            "Libros",
            "Tu presencia",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-ivory px-4 py-2 font-display text-lg text-ink ring-1 ring-gold/25 shadow-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section id="seccion-mapa" className="mx-auto mt-14 max-w-3xl px-4 sm:mt-20 scroll-mt-6">
        <h2 className="text-center font-script text-4xl text-ink sm:text-5xl">Cómo llegar</h2>
        <p className="mt-1 text-center font-display text-xl text-ink-soft sm:mt-2 sm:text-xl">
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
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-sky px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto"
          >
            <span>📍</span> Abrir en Google Maps
          </a>
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto"
          >
            <span>📅</span> Agendar en el celu
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:brightness-105 active:scale-[0.98] sm:w-auto"
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
        <p className="mt-1 font-display text-xl italic text-ink-soft">
          y Dante, que todavía no habla.
        </p>
        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
          10 · 10 · 2026
        </p>
      </footer>

      {/* FLOATING ACTION BAR — only once the envelope is fully open */}
      {envelopeOpen && <FloatingActionBar totalMessages={messages.length} />}
    </div>
  );
}
