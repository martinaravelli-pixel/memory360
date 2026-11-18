import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CalendarDays, Mail, BookOpen, FolderOpen, Map, Presentation, Sheet, Mic, Bell, MapPin, Clock, Loader2 } from "lucide-react";
import flower from "@/assets/memory-flower.jpg";
import { parseCommitment, DAYS, fmt, type DemoEvent } from "@/lib/demo-parse";
import { generateStudyPlan, type StudyPlan } from "@/lib/study.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Memory360 — Il tuo segretario AI a 360°" },
      { name: "description", content: "Memory360 pianifica eventi, email, sessioni di studio e viaggi in tempo reale. Prova la demo interattiva." },
      { property: "og:title", content: "Memory360 — Segretario virtuale AI" },
      { property: "og:description", content: "Calendario, email, studio e road trip organizzati a 360° dal tuo assistente AI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SEED: DemoEvent[] = [
  { id: "s1", title: "Studio: Diritto privato · Contratti", day: 1, start: 9, end: 10.5, place: "Biblioteca", reminders: [], kind: "studio" },
  { id: "s2", title: "Pausa attiva", day: 1, start: 10.5, end: 10.75, place: "—", reminders: [], kind: "pausa" },
  { id: "s3", title: "Studio: Obbligazioni", day: 1, start: 10.75, end: 12, place: "Biblioteca", reminders: [], kind: "studio" },
  { id: "s4", title: "Riunione di progetto", day: 3, start: 15, end: 16.5, place: "Milano", reminders: [], kind: "impegno" },
];

const FEATURES = [
  { n: "01", tag: "Agenda", icon: CalendarDays, t: "Eventi pianificati da solo", d: "Collegato al tuo calendario, fissa impegni con orari, posizioni, link e locandine." },
  { n: "02", tag: "Email", icon: Mail, t: "Posta sotto controllo", d: "Legge, riassume e invia email per te, aggiornandoti in tempo reale." },
  { n: "03", tag: "Studio", icon: BookOpen, t: "Sessioni di studio", d: "Accede al registro dei corsi e programma lo studio per arrivare pronto agli esami." },
  { n: "04", tag: "Archivio", icon: FolderOpen, t: "Tutto in cartelle", d: "Raccoglie documenti, appunti e allegati in cartelle ordinate per progetto." },
  { n: "05", tag: "Viaggi", icon: Map, t: "Road trip e trasferte", d: "Crea piani di viaggio con tappe, orari e indicazioni per ogni impegno." },
  { n: "06", tag: "Lavoro", icon: Presentation, t: "Presentazioni pronte", d: "Prepara slide per convegni e riunioni partendo dai tuoi materiali." },
  { n: "07", tag: "Dati", icon: Sheet, t: "Excel senza fatica", d: "Gestisce fogli di calcolo e automatizza le operazioni più macchinose." },
  { n: "08", tag: "Voce", icon: Mic, t: "Trascrizioni", d: "Trascrive lezioni e riunioni e ne estrae punti chiave e attività." },
];

function Index() {
  const [events, setEvents] = useState<DemoEvent[]>(SEED);
  return (
    <main className="relative overflow-hidden bg-void">
      <Hero />
      <Manifesto />
      <Features />
      <Demo onAdd={(e) => setEvents((x) => [...x, e])} />
      <StudyExample />
      <CalendarView events={events} />
      <StudyPlanner />
      <Vision />
      <footer className="border-t border-border px-6 py-10 text-center text-xs tracking-[0.3em] text-muted-foreground">MEMORY360 · CREATO CON CHATGPT · © 2026</footer>
    </main>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-primary">{children}</p>;
}

function Hero() {
  return (
    <section className="relative min-h-screen px-6 pt-6">
      <img src={flower} alt="Fiore luminoso, simbolo di Memory360" width={1600} height={1024} className="animate-float pointer-events-none absolute inset-0 m-auto h-full w-full object-cover opacity-60 md:object-contain md:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between text-xs uppercase tracking-[0.25em] text-muted-foreground">
        <div className="hidden gap-8 sm:flex"><a href="#funzioni" className="hover:text-foreground">Funzioni</a><a href="#demo" className="hover:text-foreground">Demo</a><a href="#piano" className="hover:text-foreground">Piano AI</a></div>
        <span className="ml-auto font-display text-base text-foreground">MEMORY360®</span>
      </nav>
      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="glass w-fit max-w-xs p-6 shadow-glow">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Memory360 / Assistente AI</p>
          <p className="my-4 text-5xl font-light">360 / ∞</p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Un segretario personale che non dimentica nulla.</p>
          <a href="#demo" className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:bg-secondary">Prova la demo <ArrowUpRight className="h-3 w-3" /></a>
        </div>
        <div className="text-right md:pt-10">
          <h1 className="font-display text-6xl leading-none text-glow md:text-8xl">OLTRE LA<br />MEMORIA</h1>
          <p className="ml-auto mt-6 max-w-sm text-xs uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">Il tuo segretario virtuale a 360°: calendario, email, studio, viaggi e documenti, in tempo reale.</p>
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-3xl font-light uppercase leading-snug md:text-5xl">
        Trasformo <span className="text-primary">impegni sparsi</span><br />
        <span className="md:pl-24">in giornate organizzate</span><br />
        e <span className="text-primary">studio pianificato</span> al minuto.
      </h2>
    </section>
  );
}

function Features() {
  return (
    <section id="funzioni" className="mx-auto max-w-6xl px-6 pb-24">
      <Label>Cosa fa Memory360</Label>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <article key={f.n} className="glass group flex min-h-56 flex-col p-5 transition hover:shadow-glow">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground"><span>{f.n}</span><span>{f.tag}</span></div>
            <h3 className="mt-6 text-lg font-medium uppercase leading-tight">{f.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{f.d}</p>
            <f.icon className="mt-auto h-7 w-7 self-end rounded-full border border-border p-1.5 text-primary" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Demo({ onAdd }: { onAdd: (e: DemoEvent) => void }) {
  const [text, setText] = useState("Riunione con Marco giovedì alle 15 a Milano");
  const [result, setResult] = useState<DemoEvent | null>(null);
  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 pb-24">
      <Label>Demo interattiva</Label>
      <h2 className="mb-8 text-3xl font-light uppercase">Scrivi un impegno, al resto penso io.</h2>
      <form onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; const ev = parseCommitment(text); setResult(ev); onAdd(ev); }} className="glass flex flex-col gap-3 p-3 sm:flex-row">
        <input value={text} onChange={(e) => setText(e.target.value)} maxLength={160} aria-label="Impegno" placeholder="Es. Esame di storia venerdì alle 9 in Università" className="flex-1 bg-transparent px-3 py-3 outline-none placeholder:text-muted-foreground" />
        <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-glow">Organizza</button>
      </form>
      {result && (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="glass p-5"><Clock className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Orario</p><p className="mt-1 text-lg">{DAYS[result.day]} · {fmt(result.start)}–{fmt(result.end)}</p><p className="mt-1 text-sm text-muted-foreground">{result.title}</p></div>
          <div className="glass p-5"><MapPin className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Luogo</p><p className="mt-1 text-lg">{result.place}</p><p className="mt-1 text-sm text-muted-foreground">Percorso e link mappa allegati all'evento</p></div>
          <div className="glass p-5"><Bell className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Promemoria</p><ul className="mt-1 space-y-1 text-sm">{result.reminders.map((r) => <li key={r}>· {r}</li>)}</ul></div>
          <p className="text-sm text-muted-foreground md:col-span-3">Aggiunto al calendario qui sotto ↓</p>
        </div>
      )}
    </section>
  );
}

const STUDY_STEPS = [
  { time: "09:00", t: "Ripasso flash", d: "15 min sugli appunti della lezione precedente", type: "ripasso" },
  { time: "09:15", t: "Tappa 1 · Contratti", d: "45 min di studio profondo + schema", type: "studio" },
  { time: "10:00", t: "Pausa", d: "10 min: acqua, stretching, niente telefono", type: "pausa" },
  { time: "10:10", t: "Tappa 2 · Obbligazioni", d: "50 min + 5 domande di autoverifica", type: "studio" },
  { time: "11:00", t: "Pausa lunga", d: "20 min all'aria aperta", type: "pausa" },
  { time: "11:20", t: "Tappa 3 · Simulazione d'esame", d: "40 min a tempo, correzione guidata", type: "studio" },
];

function StudyExample() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <Label>Esempio · Sessione di studio</Label>
      <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 className="text-3xl font-light uppercase">Diritto privato,<br />esame tra 12 giorni.</h2>
          <p className="mt-4 text-muted-foreground">Memory360 legge il registro del corso, divide il programma in tappe e inserisce pause e ripassi distribuiti.</p>
          <div className="glass mt-6 p-4 text-sm"><Bell className="mb-2 h-4 w-4 text-primary" />Promemoria: 08:45 “Si parte tra 15 minuti” · 12:00 “Sessione completata, domani ripasso alle 9”</div>
        </div>
        <ol className="relative space-y-3 border-l border-border pl-6">
          {STUDY_STEPS.map((s) => (
            <li key={s.time} className={`glass p-4 ${s.type === "pausa" ? "opacity-70" : ""}`}>
              <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-primary shadow-glow" />
              <p className="text-xs tracking-widest text-primary">{s.time}</p>
              <p className="font-medium uppercase">{s.t}</p>
              <p className="text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CalendarView({ events }: { events: DemoEvent[] }) {
  const H0 = 8, H1 = 21, ROW = 44;
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <Label>Calendario dimostrativo</Label>
      <h2 className="mb-8 text-3xl font-light uppercase">La tua settimana, organizzata.</h2>
      <div className="glass overflow-x-auto p-4">
        <div className="grid min-w-[760px] grid-cols-[48px_repeat(7,1fr)]">
          <div />
          {DAYS.map((d) => <div key={d} className="pb-3 text-center text-xs uppercase tracking-widest text-muted-foreground">{d}</div>)}
          <div className="relative" style={{ height: (H1 - H0) * ROW }}>
            {Array.from({ length: H1 - H0 }, (_, i) => <span key={i} className="absolute text-[10px] text-muted-foreground" style={{ top: i * ROW - 6 }}>{fmt(H0 + i)}</span>)}
          </div>
          {DAYS.map((_, d) => (
            <div key={d} className="relative border-l border-border" style={{ height: (H1 - H0) * ROW, backgroundImage: `repeating-linear-gradient(to bottom, var(--border) 0 1px, transparent 1px ${ROW}px)` }}>
              {events.filter((e) => e.day === d).map((e) => (
                <div key={e.id} title={`${e.title} · ${e.place}`} className={`absolute inset-x-1 overflow-hidden rounded-md border px-2 py-1 text-[11px] leading-tight ${e.kind === "pausa" ? "border-border bg-muted text-muted-foreground" : e.kind === "studio" ? "border-accent/50 bg-accent/20" : "border-primary/60 bg-primary/25 shadow-glow"}`} style={{ top: (e.start - H0) * ROW, height: Math.max(10, (e.end - e.start) * ROW - 2) }}>
                  <p className="font-medium">{e.title}</p>
                  {e.end - e.start > 0.5 && <p className="text-muted-foreground">{fmt(e.start)} · {e.place}</p>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StudyPlanner() {
  const gen = useServerFn(generateStudyPlan);
  const [form, setForm] = useState({ subject: "", topics: "", hours: 6, days: 3 });
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const field = "w-full rounded-lg border border-input bg-transparent px-3 py-2.5 outline-none focus:border-primary";
  return (
    <section id="piano" className="mx-auto max-w-6xl px-6 pb-24">
      <Label>Piano di studio con AI</Label>
      <h2 className="mb-8 text-3xl font-light uppercase">Crea il tuo piano personalizzato.</h2>
      <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
        <form className="glass space-y-4 p-6" onSubmit={async (e) => {
          e.preventDefault(); setErr(""); setLoading(true);
          try { const r = await gen({ data: form }); if (r.plan) setPlan(r.plan); else setErr(r.error ?? "Errore"); }
          catch { setErr("Controlla i campi e riprova."); } finally { setLoading(false); }
        }}>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Materia<input required maxLength={120} className={`${field} mt-2 text-sm normal-case tracking-normal text-foreground`} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Es. Biologia molecolare" /></label>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground">Argomenti<textarea required maxLength={1500} rows={4} className={`${field} mt-2 text-sm normal-case tracking-normal text-foreground`} value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} placeholder="DNA, trascrizione, traduzione, regolazione genica" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs uppercase tracking-widest text-muted-foreground">Ore totali<input type="number" min={0.5} max={80} step={0.5} className={`${field} mt-2 text-sm text-foreground`} value={form.hours} onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })} /></label>
            <label className="block text-xs uppercase tracking-widest text-muted-foreground">Giorni<input type="number" min={1} max={60} className={`${field} mt-2 text-sm text-foreground`} value={form.days} onChange={(e) => setForm({ ...form, days: Number(e.target.value) })} /></label>
          </div>
          <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground shadow-glow disabled:opacity-60">{loading && <Loader2 className="h-4 w-4 animate-spin" />}{loading ? "Memory360 sta pianificando…" : "Genera piano"}</button>
          {err && <p className="text-sm text-destructive">{err}</p>}
        </form>
        <div className="glass min-h-80 p-6">
          {!plan ? <p className="text-muted-foreground">Il tuo piano con tappe, pause e promemoria apparirà qui.</p> : (
            <div>
              <h3 className="text-xl font-medium uppercase">{plan.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{plan.summary}</p>
              <div className="mt-5 space-y-5">
                {plan.days?.map((d) => (
                  <div key={d.day}>
                    <p className="mb-2 text-xs uppercase tracking-[0.3em] text-primary">Giorno {d.day}</p>
                    <ul className="space-y-1.5">
                      {d.blocks?.map((b, i) => (
                        <li key={i} className={`flex gap-3 rounded-md border border-border px-3 py-2 text-sm ${b.type === "pausa" ? "opacity-60" : ""}`}>
                          <span className="w-24 shrink-0 text-xs text-primary">{b.time}</span>
                          <span><span className="font-medium">{b.title}</span> <span className="text-muted-foreground">— {b.detail}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {plan.reminders?.length > 0 && <div className="mt-5 border-t border-border pt-4"><p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Bell className="h-3 w-3" /> Promemoria</p><ul className="space-y-1 text-sm">{plan.reminders.map((r) => <li key={r}>· {r}</li>)}</ul></div>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-24 md:grid-cols-2">
      <img src={flower} alt="" loading="lazy" width={1600} height={1024} className="animate-float rounded-2xl" />
      <div className="glass p-8">
        <h2 className="text-4xl font-light">La nostra visione</h2>
        <p className="mt-16 text-[11px] uppercase tracking-[0.3em] text-primary">Nessun impegno dimenticato.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Un vero segretario personale, sempre attivo: pianifica per tempo, prepara presentazioni, trascrive, gestisce Excel e ti libera dalle attività macchinose di studio e ricerca. Così tu pensi solo a dare il meglio.</p>
      </div>
    </section>
  );
}
