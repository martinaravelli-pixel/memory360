import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  subject: z.string().trim().min(1).max(120),
  topics: z.string().trim().min(1).max(1500),
  hours: z.number().min(0.5).max(80),
  days: z.number().int().min(1).max(60),
});

export type StudyPlan = {
  title: string;
  summary: string;
  days: { day: number; blocks: { time: string; type: "studio" | "pausa" | "ripasso"; title: string; detail: string }[] }[];
  reminders: string[];
};

export const generateStudyPlan = createServerFn({ method: "POST" })
  .inputValidator((d) => Input.parse(d))
  .handler(async ({ data }): Promise<{ plan?: StudyPlan; error?: string }> => {
    const { generateResponse } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions:
          "Sei Memory360, un segretario virtuale esperto di metodo di studio. Rispondi SOLO con JSON valido in italiano, senza testo extra, con questa forma: {\"title\":string,\"summary\":string,\"days\":[{\"day\":number,\"blocks\":[{\"time\":\"HH:MM-HH:MM\",\"type\":\"studio\"|\"pausa\"|\"ripasso\",\"title\":string,\"detail\":string}]}],\"reminders\":[string]}. Usa tecnica pomodoro, pause regolari, ripassi distribuiti e un ripasso finale.",
        input: `Materia: ${data.subject}\nArgomenti: ${data.topics}\nOre totali disponibili: ${data.hours}\nGiorni: ${data.days}`,
      });
      const text = (res.output ?? [])
        .flatMap((o: any) => (o.type === "message" ? o.content : []))
        .filter((c: any) => c.type === "output_text")
        .map((c: any) => c.text)
        .join("");
      const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
      return { plan: JSON.parse(json) as StudyPlan };
    } catch (e) {
      console.error(e);
      return { error: "Non sono riuscito a generare il piano. Riprova tra poco." };
    }
  });
