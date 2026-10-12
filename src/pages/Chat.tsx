import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile, Send, Trash2, Ban, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type Profile } from "@/contexts/AuthContext";
import { UserAvatar, AVATAR_CHOICES, AVATAR_HUES } from "@/components/UserAvatar";
import { toast } from "sonner";

const EMOJIS = ["😀","😂","😍","😎","🥳","🙌","👏","🔥","💯","❤️","💚","💛","🎶","🎵","🎧","🎤","🥁","🌴","🇯🇲","🙏","👍","✌️","😢","😮","🤔","😴","🎉","⭐","🌞","🍹"];

type Msg = { id: string; user_id: string; content: string; created_at: string };

const Chat = () => {
  const { user, profile, isStaff, loading, refresh, signOut } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [people, setPeople] = useState<Record<string, Profile>>({});
  const [text, setText] = useState("");
  const [nameDraft, setNameDraft] = useState("");
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwBusy, setPwBusy] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  const loadPeople = async () => {
    const { data } = await supabase.from("profiles").select("*");
    setPeople(Object.fromEntries((data ?? []).map((p) => [p.id, p as Profile])));
  };

  useEffect(() => {
    if (!user) return;
    supabase.from("chat_messages").select("*").order("created_at", { ascending: false }).limit(200)
      .then(({ data }) => setMessages((data ?? []).reverse()));
    loadPeople();
    const ch = supabase.channel("chat-room")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages" }, (p) => {
        const m = p.new as Msg;
        setMessages((prev) => (prev.some((x) => x.id === m.id) ? prev : [...prev, m]));
        setPeople((prev) => { if (!prev[m.user_id]) loadPeople(); return prev; });
      })
      .on("postgres_changes", { event: "DELETE", schema: "public", table: "chat_messages" }, (p) => {
        setMessages((prev) => prev.filter((x) => x.id !== (p.old as Msg).id));
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user]);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [messages.length]);
  useEffect(() => { if (profile) setNameDraft(profile.display_name); }, [profile]);

  if (loading) return null;
  if (!user) return <Navigate to="/auth?next=/chat" replace />;

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = text.trim();
    if (!content) return;
    setText("");
    const { error } = await supabase.from("chat_messages").insert({ user_id: user.id, content });
    if (error) toast.error(profile?.is_banned ? "You've been blocked from chatting by a moderator." : error.message);
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("chat_messages").delete().eq("id", id);
    if (error) toast.error(error.message); else setMessages((p) => p.filter((m) => m.id !== id));
  };

  const toggleBan = async (p: Profile) => {
    const { error } = await supabase.from("profiles").update({ is_banned: !p.is_banned }).eq("id", p.id);
    if (error) return toast.error(error.message);
    toast.success(p.is_banned ? `${p.display_name} can chat again` : `${p.display_name} is blocked from chatting`);
    loadPeople();
  };

  const saveProfile = async (patch: Partial<Profile>) => {
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    if (error) return toast.error(error.message);
    await refresh(); loadPeople();
  };

  const changePassword = async () => {
    if (!curPw || newPw.length < 6) return toast.error("Enter your current password and a new one (6+ characters)");
    setPwBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw, current_password: curPw });
    setPwBusy(false);
    if (error) return toast.error(error.message);
    setCurPw(""); setNewPw("");
    toast.success("Password changed");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">Live with the listeners</p>
            <h1 className="text-5xl font-bold tracking-tight">Chat Room</h1>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2"><UserAvatar avatar={profile?.avatar_url} name={profile?.display_name ?? "?"} className="h-6 w-6 text-sm" /> My profile</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-4" align="end">
              <div className="space-y-2">
                <p className="text-sm font-semibold">Display name</p>
                <div className="flex gap-2">
                  <Input value={nameDraft} maxLength={40} onChange={(e) => setNameDraft(e.target.value)} />
                  <Button size="sm" onClick={() => nameDraft.trim() && saveProfile({ display_name: nameDraft.trim() })}>Save</Button>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold">Avatar</p>
                <div className="grid grid-cols-6 gap-2">
                  {AVATAR_CHOICES.map((e, i) => {
                    const v = `emoji:${e}:${AVATAR_HUES[i % AVATAR_HUES.length]}`;
                    return (
                      <button key={e} onClick={() => saveProfile({ avatar_url: v })}
                        className={`rounded-full ring-offset-2 ${profile?.avatar_url === v ? "ring-2 ring-primary" : ""}`}>
                        <UserAvatar avatar={v} name={e} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full" onClick={signOut}>Sign out</Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="rounded-2xl border border-border bg-card flex flex-col h-[60vh]">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.length === 0 && <p className="text-center text-muted-foreground py-10">No messages yet — say hello! 👋</p>}
            {messages.map((m) => {
              const p = people[m.user_id];
              const mine = m.user_id === user.id;
              return (
                <div key={m.id} className={`group flex gap-3 ${mine ? "flex-row-reverse" : ""}`}>
                  <UserAvatar avatar={p?.avatar_url} name={p?.display_name ?? "?"} />
                  <div className={`max-w-[75%] ${mine ? "items-end text-right" : ""} flex flex-col`}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-foreground">{p?.display_name ?? "Listener"}</span>
                      {p?.is_banned && <span className="text-destructive">blocked</span>}
                      <span>{new Date(m.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
                    </div>
                    <div className={`rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap break-words ${mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>{m.content}</div>
                    {(mine || isStaff) && (
                      <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-7 w-7" title="Delete message" onClick={() => remove(m.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                        {isStaff && !mine && p && (
                          <Button size="icon" variant="ghost" className="h-7 w-7" title={p.is_banned ? "Allow chatting" : "Block from chatting"} onClick={() => toggleBan(p)}>
                            {p.is_banned ? <UserCog className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={bottom} />
          </div>
          <form onSubmit={send} className="border-t border-border p-3 flex gap-2">
            <Popover>
              <PopoverTrigger asChild><Button type="button" variant="ghost" size="icon" aria-label="Add emoji"><Smile className="h-5 w-5" /></Button></PopoverTrigger>
              <PopoverContent className="w-72 grid grid-cols-8 gap-1 p-2" align="start">
                {EMOJIS.map((e) => (
                  <button type="button" key={e} className="text-xl hover:bg-muted rounded p-1" onClick={() => setText((t) => t + e)}>{e}</button>
                ))}
              </PopoverContent>
            </Popover>
            <Input value={text} maxLength={1000} onChange={(e) => setText(e.target.value)}
              placeholder={profile?.is_banned ? "A moderator has blocked you from chatting" : "Type a message…"} disabled={profile?.is_banned} />
            <Button type="submit" size="icon" aria-label="Send" disabled={!text.trim() || profile?.is_banned}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chat;
