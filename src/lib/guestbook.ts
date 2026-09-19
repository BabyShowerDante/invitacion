/* Muro compartido.
   El sitio vive en GitHub Pages (solo archivos estaticos), asi que los mensajes
   se guardan en una planilla de Google a traves de un Apps Script publicado
   como web app. El script esta en backend/guestbook.gs.

   Pegar aca la URL que entrega "Implementar > Nueva implementacion".
   Mientras quede vacia, el muro funciona solo en el navegador de cada persona. */
const DEPLOYED_URL = "";

export const GUESTBOOK_URL: string =
  (import.meta.env.VITE_GUESTBOOK_URL as string | undefined) || DEPLOYED_URL;

export type RemoteMessage = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export async function fetchRemoteMessages(): Promise<RemoteMessage[] | null> {
  if (!GUESTBOOK_URL) return null;
  try {
    const res = await fetch(GUESTBOOK_URL, { redirect: "follow" });
    if (!res.ok) return null;
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return null;
    return data.filter(
      (m): m is RemoteMessage =>
        !!m && typeof m.id === "string" && typeof m.name === "string" && typeof m.message === "string",
    );
  } catch {
    return null;
  }
}

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
