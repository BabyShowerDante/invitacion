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
      <p className="mb-5 text-center font-display text-lg italic text-ink-soft">
        {t.done
          ? "¡Hoy es el gran día! Dante ya está listo para los mimos."
          : "Dante cuenta las pataditas que faltan…"}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map((u) => (
          <div
            key={u.label}
            className="paper-grain rounded-2xl bg-ivory/90 px-1 py-4 text-center shadow-sm ring-1 ring-gold/25"
          >
            <div className="font-serif text-3xl font-semibold text-ink sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
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
      className="invite-shadow paper-grain relative mx-auto w-full max-w-[440px] overflow-hidden rounded-[28px] bg-ivory"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        setTilt({ x: y * -7, y: x * 8 });
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
        className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 opacity-70"
      />
      <img
        src={floralCorner}
        alt=""
        className="pointer-events-none absolute -bottom-10 -right-8 h-36 w-36 rotate-180 opacity-70"
      />

      <div className="relative px-6 pb-10 pt-8 sm:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-dark">
          Estás invitada · invitado
        </p>

        <h2 className="mt-3 text-center font-serif text-[13px] font-medium uppercase tracking-[0.45em] text-ink">
          Baby Shower
        </h2>

        <div className="relative mx-auto mt-6 overflow-hidden rounded-[22px] shadow-md">
          <img
            src={heroDream}
            alt="Un bebé dormido entre nubes y un osito de peluche"
            className="h-52 w-full object-cover sm:h-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ivory/70 via-transparent to-transparent" />
        </div>

        <p className="mt-7 text-center font-display text-xl italic text-ink-soft">
          Giuliana celebra la llegada de su
        </p>

        <h1 className="foil-text mt-1 text-center font-script text-7xl leading-none sm:text-8xl">
          Dante
        </h1>

        <Flourish className="mx-auto mt-4 h-7 w-48 text-gold" />

        <p className="mx-auto mt-5 max-w-xs text-center font-display text-[17px] leading-relaxed text-ink">
          Un principito de primavera que ya quiere conocerte, llenarte de babitas
          y robarte el corazón.
        </p>

        <div className="mx-auto mt-8 space-y-4 rounded-2xl bg-sand/50 px-5 py-6 text-center ring-1 ring-gold/20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
              Cuándo
            </p>
            <p className="mt-1 font-serif text-lg text-ink">Sábado 10 de octubre</p>
            <p className="font-display text-ink-soft">2026 · 1:00 PM</p>
          </div>
          <div className="gold-line" />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
              Dónde
            </p>
            <p className="mt-1 font-serif text-lg text-ink">Juan B. Justo 8917</p>
            <p className="font-display text-ink-soft">Traé el corazón (y ganas de celebrar)</p>
          </div>
        </div>

        <p className="mt-7 text-center font-display text-base italic text-ink-soft">
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
    <div className="paper-grain rounded-3xl bg-ivory/90 p-6 shadow-sm ring-1 ring-gold/15">
      <div className="mb-3 text-2xl">{icon}</div>
      <h3 className="font-serif text-xl text-ink">{title}</h3>
      <div className="mt-2 font-display text-[16px] leading-relaxed text-ink-soft">
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
    <div className="relative z-10 pb-24">
      <header className="px-4 pb-6 pt-10 text-center animate-fade-up">
        <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-dark">
          Giuliana & Dante
        </p>
        <p className="mt-2 font-script text-3xl text-ink">Una celebración de amor</p>
      </header>

      <section className="px-4 animate-pop">
        <InviteCard />
      </section>

      <div className="mt-10 flex justify-center">
        <span className="animate-bounce text-gold">↓</span>
      </div>

      <section className="mx-auto mt-16 grid max-w-4xl items-center gap-8 px-4 md:grid-cols-2">
        <img
          src={stork}
          alt="Cigüeña llevando un paquetito celeste"
          className="h-72 w-full rounded-[28px] object-cover shadow-lg ring-4 ring-ivory"
        />
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
            La historia
          </p>
          <h2 className="mt-2 font-script text-5xl text-ink">Un principito llamado Dante</h2>
          <p className="mt-4 font-display text-lg leading-relaxed text-ink-soft">
            En plena primavera argentina, cuando todo empieza a florecer, Giuliana
            se prepara para el abrazo más grande de su vida. Dante ya eligió a su
            mamá… y ahora quiere conocerte a vos.
          </p>
          <p className="mt-3 font-display text-lg leading-relaxed text-ink-soft">
            Por eso armamos este festejo tierno, divertido y lleno de globitos:
            para celebrarlo entre las personas que más queremos.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-4xl px-4">
        <h2 className="text-center font-script text-5xl text-ink">Lo que tenés que saber</h2>
        <Flourish className="mx-auto mt-2 h-7 w-40 text-gold" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
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

      <section className="mx-auto mt-20 max-w-3xl px-4">
        <h2 className="text-center font-script text-5xl text-ink">La cuenta regresiva</h2>
        <div className="mt-8">
          <Countdown />
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-4xl items-center gap-8 px-4 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-dark">
            El plan
          </p>
          <h2 className="mt-2 font-script text-5xl text-ink">Cómo va a ser el día</h2>
          <ul className="mt-6 space-y-4">
            {ITINERARY.map((item) => (
              <li key={item.time} className="flex gap-4">
                <span className="w-16 shrink-0 pt-1 font-serif text-sm text-gold-dark">
                  {item.time}
                </span>
                <span>
                  <span className="block font-serif text-lg text-ink">{item.title}</span>
                  <span className="font-display text-ink-soft">{item.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img
            src={babyFeet}
            alt="Patitas de bebé envueltas en una mantita"
            className="h-52 w-full rounded-[24px] object-cover shadow-md ring-4 ring-ivory"
          />
          <img
            src={moonStars}
            alt="Lunita dormida entre estrellas"
            className="mt-8 h-52 w-full rounded-[24px] object-cover shadow-md ring-4 ring-ivory"
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-4 text-center">
        <h2 className="font-script text-5xl text-ink">Si querés mimar a Dante</h2>
        <p className="mx-auto mt-3 max-w-lg font-display text-lg text-ink-soft">
          Dante todavía no tiene Instagram, pero sí una mini lista de deseos.
          Cualquier cosa que elijas, va a usarse con mucho amor.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
              className="rounded-full bg-ivory px-4 py-2 font-display text-sm text-ink ring-1 ring-gold/25"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-3xl px-4">
        <h2 className="text-center font-script text-5xl text-ink">Cómo llegar</h2>
        <p className="mt-2 text-center font-display text-lg text-ink-soft">
          Juan B. Justo 8917
        </p>
        <div className="mt-6 overflow-hidden rounded-[28px] shadow-lg ring-4 ring-ivory">
          <iframe
            title="Mapa de Juan B. Justo 8917"
            src="https://maps.google.com/maps?q=Juan%20B%20Justo%208917&z=15&output=embed"
            className="h-64 w-full border-0 grayscale-[20%] sm:h-80"
            loading="lazy"
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a
            href={mapsUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-sky px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          >
            Abrir en Maps
          </a>
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          >
            Agendar en el celu
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-105"
          >
            Compartir por WhatsApp
          </a>
        </div>
      </section>


      <footer className="mx-auto mt-20 max-w-lg px-4 text-center">
        <img
          src={teddyBalloon}
          alt=""
          className="mx-auto h-20 w-20 rounded-full object-cover shadow animate-wiggle"
        />
        <p className="mt-5 font-script text-4xl text-ink">Con amor, Giuliana</p>
        <p className="mt-1 font-display italic text-ink-soft">
          y un tal Dante que todavía no habla, pero ya manda besos.
        </p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-gold-dark">
          10 · 10 · 2026
        </p>
      </footer>
    </div>
  );
}
