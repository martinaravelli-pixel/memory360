# Memory360

Sito web di **Memory360**, il segretario virtuale a 360°: calendario, email, sessioni di studio,
viaggi, presentazioni, fogli di calcolo e trascrizioni.

## Struttura

```text
.
└── frontend/   # codice completo del sito web
```

Tutto il codice del sito sta nella cartella `frontend/`.

## Avviare il sito in locale

Serve Node.js (o Bun). Dalla cartella `frontend/`:

```sh
npm install
npm run dev
```

Il sito si apre all'indirizzo indicato nel terminale (di norma http://localhost:8080).

Altri comandi utili: `npm run build` (versione di produzione), `npm run preview`,
`npm run test`, `npm run lint`.

## Funzioni del sito

- **Demo interattiva**: si scrive un impegno e il sito ricava orario, luogo e promemoria.
- **Calendario dimostrativo**: gli impegni organizati per giorno e per ora.
- **Piano di studio con AI**: si inseriscono materia, argomenti, ore e giorni disponibili
  e viene generato un piano personalizzato con tappe, pause e promemoria.

## Nota sulla chiave AI

Il piano di studio usa un servizio AI esterno. Per farlo funzionare in un'installazione
propria serve la chiave corrispondente, da configurare nell'ambiente di esecuzione
(non è inclusa nel repository).
