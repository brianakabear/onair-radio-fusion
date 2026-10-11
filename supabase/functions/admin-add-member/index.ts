import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const url = Deno.env.get("SUPABASE_URL")!;
  const admin = createClient(url, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return json({ error: "Please sign in." }, 401);
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return json({ error: "Please sign in." }, 401);

  const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id);
  const mine = (roles ?? []).map((r) => r.role);
  const isSuper = mine.includes("super_admin");
  if (!isSuper && !mine.includes("admin")) return json({ error: "Only admins can add members." }, 403);

  const body = await req.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const role = body.role as string | undefined;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Enter a valid email." }, 400);
  if (role && !["admin", "editor"].includes(role)) return json({ error: "Unknown role." }, 400);
  if (role === "admin" && !isSuper) return json({ error: "Only the super admin can make admins." }, 403);

  const { data: existing } = await admin.from("profiles").select("id").eq("email", email).maybeSingle();
  let userId = existing?.id as string | undefined;
  if (!userId) {
    const origin = req.headers.get("origin") ?? undefined;
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, { redirectTo: origin ? `${origin}/chat` : undefined });
    if (error) return json({ error: error.message }, 400);
    userId = data.user.id;
  }
  if (role) await admin.from("user_roles").upsert({ user_id: userId, role }, { onConflict: "user_id,role", ignoreDuplicates: true });
  return json({ ok: true, invited: !existing });
});
