import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type Profile, type Role } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/UserAvatar";
import { toast } from "sonner";

type News = { id: string; title: string; excerpt: string; category: string; source: string; image: string | null; published_at: string };
const CATEGORIES = ["Jamaica News", "Caribbean News", "International News", "Entertainment News", "Sports News"];

const Members = () => {
  const { roles: myRoles, isAdmin, user } = useAuth();
  const isSuper = myRoles.includes("super_admin");
  const [people, setPeople] = useState<Profile[]>([]);
  const [roleMap, setRoleMap] = useState<Record<string, Role[]>>({});
  const [email, setEmail] = useState("");
  const [newRole, setNewRole] = useState<string>("member");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at"),
      supabase.from("user_roles").select("user_id, role"),
    ]);
    setPeople((p ?? []) as Profile[]);
    const m: Record<string, Role[]> = {};
    (r ?? []).forEach((x) => { (m[x.user_id] ??= []).push(x.role as Role); });
    setRoleMap(m);
  };
  useEffect(() => { load(); }, []);

  const toggleRole = async (id: string, role: Role, on: boolean) => {
    const { error } = on
      ? await supabase.from("user_roles").insert({ user_id: id, role })
      : await supabase.from("user_roles").delete().eq("user_id", id).eq("role", role);
    if (error) toast.error(error.message); else load();
  };

  const toggleBan = async (p: Profile) => {
    const { error } = await supabase.from("profiles").update({ is_banned: !p.is_banned }).eq("id", p.id);
    if (error) toast.error(error.message); else load();
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.functions.invoke("admin-add-member", {
      body: { email, role: newRole === "member" ? undefined : newRole },
    });
    setBusy(false);
    if (error || data?.error) return toast.error(data?.error ?? "Couldn't add that member.");
    toast.success(data.invited ? `Invitation emailed to ${email}` : `${email} updated`);
    setEmail(""); load();
  };

  return (
    <div className="space-y-6">
      {isAdmin && (
        <form onSubmit={add} className="rounded-2xl border border-border bg-card p-5 flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[220px]">
            <p className="text-sm font-semibold mb-2">Add a member</p>
            <Input type="email" required placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <Select value={newRole} onValueChange={setNewRole}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              {isSuper && <SelectItem value="admin">Admin</SelectItem>}
            </SelectContent>
          </Select>
          <Button type="submit" disabled={busy}>Send invite</Button>
        </form>
      )}
      <div className="rounded-2xl border border-border bg-card divide-y divide-border">
        {people.map((p) => {
          const r = roleMap[p.id] ?? [];
          const isSuperRow = r.includes("super_admin");
          return (
            <div key={p.id} className="p-4 flex flex-wrap items-center gap-4">
              <UserAvatar avatar={p.avatar_url} name={p.display_name} />
              <div className="flex-1 min-w-[180px]">
                <p className="font-semibold">{p.display_name} {p.id === user?.id && <span className="text-xs text-muted-foreground">(you)</span>}</p>
                <p className="text-xs text-muted-foreground">{p.email}</p>
              </div>
              {isSuperRow ? <Badge>Super admin</Badge> : (
                <div className="flex items-center gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <Checkbox checked={r.includes("admin")} disabled={!isSuper} onCheckedChange={(v) => toggleRole(p.id, "admin", !!v)} /> Admin
                  </label>
                  <label className="flex items-center gap-2">
                    <Checkbox checked={r.includes("editor")} disabled={!isAdmin} onCheckedChange={(v) => toggleRole(p.id, "editor", !!v)} /> Editor
                  </label>
                  <Button size="sm" variant={p.is_banned ? "default" : "outline"} onClick={() => toggleBan(p)}>
                    {p.is_banned ? "Unblock chat" : "Block chat"}
                  </Button>
                </div>
              )}
            </div>
          );
        })}
        {people.length === 0 && <p className="p-6 text-muted-foreground">No members yet.</p>}
      </div>
    </div>
  );
};

const NewsEditor = () => {
  const qc = useQueryClient();
  const [items, setItems] = useState<News[]>([]);
  const [editing, setEditing] = useState<News | null>(null);

  const load = async () => {
    const { data } = await supabase.from("news_stories").select("id,title,excerpt,category,source,image,published_at").order("published_at", { ascending: false });
    setItems((data ?? []) as News[]);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!editing) return;
    const { id, title, excerpt, category, source, image } = editing;
    const { error } = await supabase.from("news_stories").update({ title, excerpt, category, source, image: image || null }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Story saved"); setEditing(null); load(); qc.invalidateQueries({ queryKey: ["news-stories"] });
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this story?")) return;
    const { error } = await supabase.from("news_stories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load(); qc.invalidateQueries({ queryKey: ["news-stories"] });
  };

  return (
    <div className="rounded-2xl border border-border bg-card divide-y divide-border">
      {items.map((n) => editing?.id === n.id ? (
        <div key={n.id} className="p-4 space-y-3">
          <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <Textarea rows={3} value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
          <div className="grid sm:grid-cols-3 gap-3">
            <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Source" value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} />
            <Input placeholder="Photo link" value={editing.image ?? ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} />
          </div>
          <div className="flex gap-2"><Button size="sm" onClick={save}>Save</Button><Button size="sm" variant="ghost" onClick={() => setEditing(null)}>Cancel</Button></div>
        </div>
      ) : (
        <div key={n.id} className="p-4 flex items-center gap-4">
          {n.image ? <img src={n.image} alt="" className="h-12 w-16 rounded object-cover" /> : <div className="h-12 w-16 rounded bg-muted" />}
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{n.title}</p>
            <p className="text-xs text-muted-foreground">{n.category} · {n.source} · {new Date(n.published_at).toLocaleDateString()}</p>
          </div>
          <Button size="sm" variant="outline" onClick={() => setEditing(n)}>Edit</Button>
          <Button size="sm" variant="ghost" onClick={() => remove(n.id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
};

type ChatMsg = { id: string; user_id: string; content: string; created_at: string };
const Moderation = () => {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [people, setPeople] = useState<Record<string, Profile>>({});
  const [superIds, setSuperIds] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  const load = async () => {
    const [{ data: m }, { data: p }, { data: r }] = await Promise.all([
      supabase.from("chat_messages").select("*").order("created_at", { ascending: false }).limit(300),
      supabase.from("profiles").select("*"),
      supabase.from("user_roles").select("user_id").eq("role", "super_admin"),
    ]);
    setMsgs((m ?? []) as ChatMsg[]);
    setPeople(Object.fromEntries((p ?? []).map((x) => [x.id, x as Profile])));
    setSuperIds((r ?? []).map((x) => x.user_id));
  };
  useEffect(() => {
    load();
    const ch = supabase.channel("mod-chat")
      .on("postgres_changes", { event: "*", schema: "public", table: "chat_messages" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const del = async (id: string) => {
    const { error } = await supabase.from("chat_messages").delete().eq("id", id);
    if (error) toast.error(error.message); else setMsgs((x) => x.filter((m) => m.id !== id));
  };
  const clearUser = async (uid: string) => {
    if (!confirm("Delete all chat messages from this person?")) return;
    const { error } = await supabase.from("chat_messages").delete().eq("user_id", uid);
    if (error) toast.error(error.message); else { toast.success("Messages deleted"); load(); }
  };
  const ban = async (p: Profile) => {
    const { error } = await supabase.from("profiles").update({ is_banned: !p.is_banned }).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(p.is_banned ? `${p.display_name} can chat again` : `${p.display_name} is blocked from chatting`);
    load();
  };

  const chatters = Object.values(people).filter((p) => msgs.some((m) => m.user_id === p.id) || p.is_banned);
  const shown = msgs.filter((m) => !filter || m.content.toLowerCase().includes(filter.toLowerCase()) || people[m.user_id]?.display_name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6">
      <div className="rounded-2xl border border-border bg-card">
        <div className="p-4 border-b border-border flex items-center justify-between gap-3">
          <p className="font-semibold">Recent messages</p>
          <Input className="max-w-xs" placeholder="Search messages or names" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="divide-y divide-border max-h-[65vh] overflow-y-auto">
          {shown.map((m) => {
            const p = people[m.user_id];
            return (
              <div key={m.id} className="p-4 flex gap-3 items-start">
                <UserAvatar avatar={p?.avatar_url} name={p?.display_name ?? "?"} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">{p?.display_name ?? "Listener"}</span> · {new Date(m.created_at).toLocaleString()}</p>
                  <p className="text-sm break-words">{m.content}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => del(m.id)}>Delete</Button>
              </div>
            );
          })}
          {shown.length === 0 && <p className="p-6 text-muted-foreground">No messages.</p>}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card">
        <p className="p-4 border-b border-border font-semibold">Chat users</p>
        <div className="divide-y divide-border">
          {chatters.map((p) => (
            <div key={p.id} className="p-4 space-y-2">
              <div className="flex items-center gap-3">
                <UserAvatar avatar={p.avatar_url} name={p.display_name} />
                <div className="min-w-0">
                  <p className="font-semibold truncate">{p.display_name}</p>
                  <p className="text-xs text-muted-foreground">{msgs.filter((m) => m.user_id === p.id).length} messages{p.is_banned ? " · blocked" : ""}</p>
                </div>
              </div>
              {!superIds.includes(p.id) && (
                <div className="flex gap-2">
                  <Button size="sm" variant={p.is_banned ? "default" : "outline"} onClick={() => ban(p)}>{p.is_banned ? "Unblock" : "Block"}</Button>
                  <Button size="sm" variant="ghost" onClick={() => clearUser(p.id)}>Delete all messages</Button>
                </div>
              )}
            </div>
          ))}
          {chatters.length === 0 && <p className="p-6 text-muted-foreground">No one has chatted yet.</p>}
        </div>
      </div>
    </div>
  );
};

const Admin = () => {
  const { user, loading, isStaff, isAdmin } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/auth?next=/admin" replace />;
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="text-5xl font-bold tracking-tight mb-8">Admin</h1>
        {!isStaff ? (
          <p className="text-muted-foreground">You don't have access to this page.</p>
        ) : (
          <Tabs defaultValue="members">
            <TabsList className="mb-6">
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="moderation">Chat moderation</TabsTrigger>
            </TabsList>
            <TabsContent value="members"><Members /></TabsContent>
            <TabsContent value="news"><NewsEditor /></TabsContent>
            <TabsContent value="moderation"><Moderation /></TabsContent>
          </Tabs>
        )}
        {isStaff && !isAdmin && <p className="text-xs text-muted-foreground mt-6">As an editor you can edit news and block chat users. Only admins can add members or change roles.</p>}
      </main>
    </div>
  );
};

export default Admin;
