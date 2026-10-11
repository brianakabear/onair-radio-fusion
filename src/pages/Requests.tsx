import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const empty = { name: "", email: "", song: "", artist: "", message: "" };

const Requests = () => {
  const [f, setF] = useState(empty);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("song_requests").insert({
      name: f.name.trim(), song: f.song.trim(),
      email: f.email.trim() || null, artist: f.artist.trim() || null, message: f.message.trim() || null,
    });
    setBusy(false);
    if (error) return toast.error("Couldn't send your request. Please try again.");
    toast.success("Request sent! Keep listening 🔥");
    setF(empty);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-14 max-w-2xl">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">Your music, on air</p>
        <h1 className="text-5xl font-bold tracking-tight mb-3">Requests</h1>
        <p className="text-muted-foreground mb-8">Ask for a tune or send a shout-out to someone special.</p>
        <form onSubmit={submit} className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label htmlFor="name">Your name *</Label><Input id="name" required maxLength={100} value={f.name} onChange={set("name")} /></div>
            <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" maxLength={255} value={f.email} onChange={set("email")} /></div>
            <div className="space-y-2"><Label htmlFor="song">Song *</Label><Input id="song" required maxLength={200} value={f.song} onChange={set("song")} /></div>
            <div className="space-y-2"><Label htmlFor="artist">Artist</Label><Input id="artist" maxLength={200} value={f.artist} onChange={set("artist")} /></div>
          </div>
          <div className="space-y-2"><Label htmlFor="message">Shout-out or message</Label><Textarea id="message" rows={4} maxLength={1000} value={f.message} onChange={set("message")} /></div>
          <Button type="submit" className="w-full" disabled={busy}>Send request</Button>
        </form>
      </main>
    </div>
  );
};

export default Requests;
