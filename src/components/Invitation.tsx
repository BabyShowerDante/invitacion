import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  babyFeet,
  floralCorner,
  heroDream,
  moonStars,
  stork,
  teddyBalloon,
} from "../assets/images";

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
    <div className="mx-auto max-w-lg">
      <p className="mb-4 text-center font-display text-base italic text-ink-soft sm:mb-5 sm:text-lg">
        {t.done
          ? "¡Hoy es el gran día! Dante ya está listo para los mimos."
          : "Dante cuenta las pataditas que faltan…"}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="paper-grain rounded-xl bg-ivory/90 px-1 py-3 text-center shadow-xs ring-1 ring-gold/25 sm:rounded-2xl sm:py-4 sm:shadow-sm"
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
          setTilt({ x: y * -7, y: x * 8 });
        }
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.25s ease-out",
      }}
    >
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute -left-5 -top-5 h-24 w-24 opacity-70 sm:-left-8 sm:-top-8 sm:h-36 sm:w-36"
      />
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute -bottom-6 -right-5 h-24 w-24 rotate-180 opacity-70 sm:-bottom-10 sm:-right-8 sm:h-36 sm:w-36"
      />

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

        <div className="mx-auto mt-6 space-y-3 rounded-xl bg-sand/50 px-4 py-5 text-center ring-1 ring-gold/20 sm:mt-8 sm:space-y-4 sm:rounded-2xl sm:px-5 sm:py-6">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-dark sm:text-[10px] sm:tracking-[0.28em]">
              Cuándo
            </p>
            <p className="mt-0.5 font-serif text-base text-ink sm:mt-1 sm:text-lg">Sábado 10 de octubre</p>
            <p className="font-display text-sm text-ink-soft sm:text-base">2026 · 1:00 PM</p>
          </div>
          <div className="gold-line" />
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-gold-dark sm:text-[10px] sm:tracking-[0.28em]">
              Dónde
            </p>
            <p className="mt-0.5 font-serif text-base text-ink sm:mt-1 sm:text-lg">Juan B. Justo 8917</p>
            <p className="font-display text-sm text-ink-soft sm:text-base">Traé el corazón (y ganas de celebrar)</p>
          </div>
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
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="paper-grain rounded-2xl bg-ivory/90 p-5 shadow-xs ring-1 ring-gold/15 sm:rounded-3xl sm:p-6 sm:shadow-sm">
      <div className="mb-2 text-2xl sm:mb-3">{icon}</div>
      <h3 className="font-serif text-lg text-ink sm:text-xl">{title}</h3>
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

export default function Invitation() {
  return (
    <div className="relative z-10 pb-14 sm:pb-24">
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
          <Detail icon="📅" title="El día">
            Sábado 10 de octubre de 2026. Un sábado de sol, torta y
            emoción. Llegá desde la 1:00 PM (13:00 hs)… o 13:15, somos argentinos.
          </Detail>
          <Detail icon="📍" title="El lugar">
            Juan B. Justo 8917. Si te perdés, preguntá por el baby shower de
            Giuliana: en el barrio ya todos saben.
          </Detail>
          <Detail icon="👗" title="Cómo venir">
            Vení cómoda, con ganas de mimar al príncipe y lista para una foto
            grupal que va a quedar para el álbum de Dante.
          </Detail>
          <Detail icon="🎁" title="Los regalitos">
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

      <section className="mx-auto mt-14 grid max-w-4xl items-center gap-6 px-4 sm:mt-20 sm:gap-8 md:grid-cols-2">
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

      <section className="mx-auto mt-14 max-w-3xl px-4 text-center sm:mt-20">
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

      <section className="mx-auto mt-14 max-w-3xl px-4 sm:mt-20">
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
        <div className="mt-5 flex flex-col sm:flex-row flex-wrap justify-center gap-2.5 sm:gap-3">
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

      <footer className="mx-auto mt-14 max-w-lg px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:mt-20">
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
    </div>
  );
}
