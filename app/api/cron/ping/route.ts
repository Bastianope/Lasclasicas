import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Toujours exécuté à la demande, jamais mis en cache.
export const dynamic = "force-dynamic";

// Ping régulier (vercel.json) pour que Supabase ne mette pas la base en pause.
export async function GET(request: Request) {
  // Vercel n'envoie l'en-tête "Authorization: Bearer <CRON_SECRET>" que si la variable
  // existe. Sans elle, l'ancien contrôle renvoyait 401 à chaque passage : la base n'était
  // jamais touchée et finissait en pause. Le secret reste vérifié quand il est défini ;
  // sinon on laisse passer, le ping ne faisant qu'une lecture publique.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient();
  const { error } = await supabase.from("marcas").select("id").limit(1);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, timestamp: new Date().toISOString() });
}
