/* Muro compartido.
   El sitio vive en GitHub Pages (solo archivos estaticos), asi que los mensajes
   se guardan en una planilla de Google a traves de un Apps Script publicado
   como web app. El script esta en backend/guestbook.gs.

   Pegar aca la URL que entrega "Implementar > Nueva implementacion".
   Mientras quede vacia, el muro funciona solo en el navegador de cada persona. */
const DEPLOYED_URL =
  "https://script.google.com/macros/s/AKfycbypiPcZifkEraMeu-m6YKTVGXkehKb2_ba8tPvtEH8JQQF1AebzvsyT-Rn1vWgwje6v/exec";

export const GUESTBOOK_URL: string =
  (import.meta.env.VITE_GUESTBOOK_URL as string | undefined) || DEPLOYED_URL;

export type RemoteMessage = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

const CACHE_KEY = "dante_guestbook_cache";

/* Ultimo muro conocido. Permite pintar mensajes al instante en la proxima
   visita mientras el script de Google (lento: ~2 s, mas en frio) responde. */
export function readCachedWall(): RemoteMessage[] {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    const data: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? (data as RemoteMessage[]) : [];
  } catch {
    return [];
  }
}

function writeCachedWall(list: RemoteMessage[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
}

async function fetchOnce(timeoutMs: number): Promise<RemoteMessage[] | null> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(GUESTBOOK_URL, { redirect: "follow", signal: ctrl.signal });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return null;
    return data.filter(
      (m): m is RemoteMessage =>
        !!m && typeof m.id === "string" && typeof m.name === "string" && typeof m.message === "string",
    );
  } catch {
    return null;
  } finally {
    window.clearTimeout(timer);
  }
}

/* Hasta 3 intentos con espera creciente. Antes habia uno solo y un fallo
   puntual (red movil, arranque en frio) dejaba el muro vacio hasta refrescar. */
async function fetchWithRetry(): Promise<RemoteMessage[] | null> {
  const timeouts = [9000, 12000, 15000];
  for (let i = 0; i < timeouts.length; i++) {
    const out = await fetchOnce(timeouts[i]);
    if (out) {
      writeCachedWall(out);
      return out;
    }
    if (i < timeouts.length - 1) await new Promise((r) => window.setTimeout(r, 700 * (i + 1)));
  }
  return null;
}

let inflight: Promise<RemoteMessage[] | null> | null = null;

/* Una sola consulta compartida: la precarga de abajo y el componente usan la
   misma promesa en vez de pedir dos veces. */
export function fetchRemoteMessages(): Promise<RemoteMessage[] | null> {
  if (!GUESTBOOK_URL) return Promise.resolve(null);
  if (!inflight) {
    inflight = fetchWithRetry().finally(() => {
      inflight = null;
    });
  }
  return inflight;
}

/* Arranca la consulta apenas carga el sitio, mientras la visita todavia mira
   el sobre cerrado, asi el muro ya esta listo cuando se abre. */
if (typeof window !== "undefined" && GUESTBOOK_URL) void fetchRemoteMessages();

export async function pushMessage(msg: RemoteMessage): Promise<boolean> {
  if (!GUESTBOOK_URL) return false;
  try {
    const res = await fetch(GUESTBOOK_URL, {
      method: "POST",
      redirect: "follow",
      // text/plain a proposito: es una "simple request" y evita el preflight
      // CORS, que Apps Script no sabe responder.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(msg),
    });
    if (!res.ok) return false;
    const out: unknown = await res.json();
    return !!out && typeof out === "object" && (out as { ok?: boolean }).ok === true;
  } catch {
    return false;
  }
}

export function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const min = Math.floor((Date.now() - then) / 60_000);
  if (min < 2) return "Recién";
  if (min < 60) return `Hace ${min} min`;
  const hs = Math.floor(min / 60);
  if (hs < 24) return `Hace ${hs} h`;
  const days = Math.floor(hs / 24);
  return days === 1 ? "Ayer" : `Hace ${days} días`;
}
