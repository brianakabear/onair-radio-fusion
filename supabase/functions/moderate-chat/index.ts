import { createClient } from "npm:@supabase/supabase-js@2";
import { createLovableAiGatewayRunIdFetch, getLovableAiGatewayRunId } from "../_shared/run-id.ts";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

const GATEWAY = "https://ai.gateway.lovable.dev";
const MODEL = "openai/gpt-6-astra";

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["flagged"],
  properties: {
    flagged: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "label", "severity", "reason"],
        properties: {
          id: { type: "string" },
          label: { type: "string", enum: ["spam", "abuse", "harassment", "hate", "sexual", "threat", "other"] },
          severity: { type: "string", enum: ["low", "medium", "high"] },
          reason: { type: "string" },
        },
      },
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return json({ error: "AI is not configured." }, 500);
  const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  const { data: { user } } = token ? await db.auth.getUser(token) : { data: { user: null } };
  if (!user) return json({ error: "Please sign in." }, 401);
  const { data: staff } = await db.rpc("is_staff", { _user_id: user.id });
  if (!staff) return json({ error: "Only admins and editors can run this." }, 403);

  const body = await req.json().catch(() => ({}));
  const limit = Math.min(Math.max(Number(body.limit) || 100, 1), 200);
  let q = db.from("chat_messages").select("id,user_id,content,created_at").order("created_at", { ascending: false }).limit(limit);
  if (Array.isArray(body.ids) && body.ids.length) q = q.in("id", body.ids.slice(0, 200).map(String));
  const { data: msgs, error } = await q;
  if (error) return json({ error: error.message }, 500);
  if (!msgs?.length) return json({ flagged: [] });

  const transcript = msgs.reverse().map((m) => `[${m.id}] ${m.content.replace(/\s+/g, " ")}`).join("\n");
  const gw = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
  const res = await gw.fetch(`${GATEWAY}/v1/responses`, {
    method: "POST",
    signal: req.signal,
    headers: { "Content-Type": "application/json", "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      store: false,
      reasoning: { effort: "low", summary: "auto" },
      include: ["reasoning.encrypted_content"],
      text: { format: { type: "json_schema", name: "moderation", strict: true, schema } },
      input: [
        { role: "system", content: "You moderate a Caribbean reggae radio station's public chat room. Flag only messages that are likely spam (ads, scams, repeated links, flooding) or abusive (insults, harassment, hate, sexual content, threats). Friendly banter, patois, slang and music talk are fine. Return each flagged message's id exactly as given in brackets, a label, a severity and a one-sentence reason. Return an empty list if nothing needs review." },
        { role: "user", content: transcript },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    let msg = "The AI check failed.";
    try { msg = JSON.parse(text)?.error?.message ?? JSON.parse(text)?.message ?? msg; } catch { /* keep default */ }
    if (res.status === 402) msg = "Out of AI credits. Add credits in Settings → Plans & credits.";
    if (res.status === 429) msg = "Too many AI checks right now. Try again in a minute.";
    return json({ error: msg }, res.status);
  }

  // Read the streamed answer.
  const reader = res.body!.getReader();
  const dec = new TextDecoder();
  let buf = "", out = "", failure = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const d = line.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const ev = JSON.parse(d);
        if (ev.type === "response.output_text.delta") out += ev.delta;
        if (ev.type === "response.refusal.delta") failure = "The AI declined to review these messages.";
        if (ev.type === "error" || ev.type === "response.failed") failure = ev.error?.message ?? ev.response?.error?.message ?? "The AI check failed.";
      } catch { /* ignore partial */ }
    }
  }
  if (failure) return json({ error: failure }, 502);
  if (!out.trim()) return json({ error: "The AI returned no result." }, 502);
  try {
    const parsed = JSON.parse(out);
    const valid = new Set(msgs.map((m) => m.id));
    return json({ flagged: (parsed.flagged ?? []).filter((f: { id: string }) => valid.has(f.id)), checked: msgs.length });
  } catch {
    return json({ error: "Couldn't read the AI result." }, 502);
  }
});
