import { createClient } from "npm:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors });
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return json({ error: "Please sign in." }, 401);
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return json({ error: "Please sign in." }, 401);

  const { data: mine } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "super_admin");
  if (!mine?.length) return json({ error: "Only the super admin can edit or delete users." }, 403);

  const body = await req.json().catch(() => ({}));
  const userId = String(body.userId ?? "");
  if (!userId) return json({ error: "Missing user." }, 400);
  if (userId === user.id && body.action === "delete") return json({ error: "You can't delete your own account." }, 400);

  if (body.action === "delete") {
    await admin.from("chat_messages").delete().eq("user_id", userId);
    const { error } = await admin.auth.admin.deleteUser(userId);
    if (error) return json({ error: error.message }, 400);
    await admin.from("moderation_log").insert({ actor_id: user.id, action: "deleted_user", details: String(body.label ?? userId).slice(0, 300) });
    return json({ ok: true });
  }

  if (body.action === "update") {
    const name = String(body.display_name ?? "").trim().slice(0, 40);
    const email = String(body.email ?? "").trim().toLowerCase();
    if (!name) return json({ error: "Name can't be empty." }, 400);
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "Enter a valid email." }, 400);
    if (email) {
      const { error } = await admin.auth.admin.updateUserById(userId, { email, email_confirm: true });
      if (error) return json({ error: error.message }, 400);
    }
    const { error } = await admin.from("profiles").update({ display_name: name, ...(email ? { email } : {}) }).eq("id", userId);
    if (error) return json({ error: error.message }, 400);
    await admin.from("moderation_log").insert({ actor_id: user.id, action: "edited_user", target_user_id: userId, details: name });
    return json({ ok: true });
  }
  return json({ error: "Unknown action." }, 400);
});
