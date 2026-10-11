import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const safeNext = (n: string | null) => (n && n.startsWith("/") && !n.startsWith("//") ? n : "/chat");

const Auth = () => {
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => { if (user) navigate(next, { replace: true }); }, [user, next, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin + next, data: { display_name: name || email.split("@")[0] } },
      });
      if (error) toast.error(error.message); else setSent(true);
    }
    setBusy(false);
  };

  const google = async () => {
    sessionStorage.setItem("auth-next", next);
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/auth?next=" + encodeURIComponent(next) });
    if (r.error) toast.error(String(r.error.message ?? r.error));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-md">
        <h1 className="text-4xl font-bold tracking-tight mb-2">{mode === "in" ? "Sign in" : "Join the chat"}</h1>
        <p className="text-muted-foreground mb-8">You need an account to chat with other Majestic Fyah listeners.</p>
        {sent ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="font-semibold mb-1">Check your email</p>
            <p className="text-sm text-muted-foreground">We sent a confirmation link to {email}. Click it to finish signing up.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
            <Button variant="outline" className="w-full" onClick={google}>Continue with Google</Button>
            <div className="text-center text-xs text-muted-foreground">or</div>
            <form onSubmit={submit} className="space-y-4">
              {mode === "up" && (
                <div className="space-y-2"><Label htmlFor="name">Display name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} /></div>
              )}
              <div className="space-y-2"><Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="space-y-2"><Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
              <Button type="submit" className="w-full" disabled={busy}>{mode === "in" ? "Sign in" : "Create account"}</Button>
            </form>
            <button className="text-sm text-primary w-full" onClick={() => setMode(mode === "in" ? "up" : "in")}>
              {mode === "in" ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Auth;
