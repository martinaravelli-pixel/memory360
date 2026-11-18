export type DemoEvent = { id: string; title: string; day: number; start: number; end: number; place: string; reminders: string[]; kind: "impegno" | "studio" | "pausa" };
export const DAYS = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];
const DAY_WORDS: [RegExp, number][] = [[/luned/i,0],[/marted/i,1],[/mercoled/i,2],[/gioved/i,3],[/venerd/i,4],[/sabato/i,5],[/domenica/i,6]];

export function fmt(h: number) { const m = Math.round((h % 1) * 60); return `${String(Math.floor(h)).padStart(2,"0")}:${String(m).padStart(2,"0")}`; }

/** Interpreta una frase libera ("Riunione con Marco giovedì alle 15 a Milano") in un impegno organizzato. */
export function parseCommitment(text: string): DemoEvent {
  let day = 0;
  for (const [re, d] of DAY_WORDS) if (re.test(text)) { day = d; break; }
  if (/domani/i.test(text)) day = 1;
  const t = text.match(/(?:alle|ore|h)\s*(\d{1,2})(?:[:.](\d{2}))?/i);
  const start = t ? Math.min(20, Math.max(8, Number(t[1]) + (t[2] ? Number(t[2]) / 60 : 0))) : 10;
  const dur = /esame|convegno/i.test(text) ? 3 : /riunione|meeting|lezione/i.test(text) ? 1.5 : 1;
  const p = text.match(/\b(?:a|in|presso|da)\s+([A-ZÀ-Ü][\wÀ-ü' ]+?)(?=\s+(?:alle|ore|lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica|domani)\b|[,.]|$)/);
  const place = p?.[1] ? p[1].trim() : "Online · link Meet generato";
  const title = text.replace(/\s*(?:alle|ore)\s*\d{1,2}([:.]\d{2})?/i, "").replace(/(lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica|domani)/gi, "").replace(p ? p[0] : "", "").replace(/\s+/g, " ").trim() || "Nuovo impegno";
  return {
    id: crypto.randomUUID(), title: title.charAt(0).toUpperCase() + title.slice(1), day, start, end: Math.min(21, start + dur), place, kind: "impegno",
    reminders: [`Il giorno prima alle 20:00 · riepilogo e materiali`, `${fmt(Math.max(0, start - 1))} · partenza consigliata verso ${place}`, `${fmt(Math.max(0, start - 0.25))} · avviso 15 minuti prima`],
  };
}
