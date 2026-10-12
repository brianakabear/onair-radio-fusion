import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type Profile as P } from "@/contexts/AuthContext";
import { UserAvatar, AVATAR_CHOICES, AVATAR_HUES } from "@/components/UserAvatar";
import { toast } from "sonner";

// Shrinks a picture to a small square JPEG so it can be saved with the profile.
const toAvatar = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const s = 160, c = document.createElement("canvas");
      c.width = c.height = s;
      const m = Math.min(img.width, img.height);
      c.getContext("2d")!.drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, s, s);
      resolve(c.toDataURL("image/jpeg", 0.82));
      URL.revokeObjectURL(img.src);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });

const Profile = () => {
  const { user, profile, loading, refresh, signOut } = useAuth();
  const [name, setName] = useState("");
  const [curPw, setCurPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (profile) setName(profile.display_name); }, [profile]);
  if (loading) return null;
  if (!user) return <Navigate to="/auth?next=/profile" replace />;

  const save = async (patch: Partial<P>, msg = "Profile saved") => {
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    if (error) return toast.error(error.message);
    await refresh(); toast.success(msg);
  };

  const upload = async (f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/")) return toast.error("Please choose a picture");
    if (f.size > 10 * 1024 * 1024) return toast.error("Picture must be under 10 MB");
    try { await save({ avatar_url: await toAvatar(f) }, "Photo updated"); } catch { toast.error("Couldn't read that picture"); }
  };

  const changePw = async () => {
    if (!curPw || newPw.length < 6) return toast.error("Enter your current password and a new one (6+ characters)");
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password: newPw, current_password: curPw });
    setBusy(false);
    if (error) return toast.error(error.message);
    setCurPw(""); setNewPw(""); toast.success("Password changed");
  };

  const resetEmail = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(user.email!, { redirectTo: `${window.location.origin}/reset-password` });
    if (error) return toast.error(error.message);
    toast.success(`Reset link sent to ${user.email}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 max-w-xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">My profile</h1>

        <section className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center gap-4">
            <UserAvatar avatar={profile?.avatar_url} name={profile?.display_name ?? "?"} className="h-20 w-20 text-3xl" />
            <div className="space-y-2">
              <Button variant="outline" className="gap-2" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> Upload photo</Button>
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }} />
              <p className="text-xs text-muted-foreground">Or pick an emoji below.</p>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {AVATAR_CHOICES.map((e, i) => {
              const v = `emoji:${e}:${AVATAR_HUES[i % AVATAR_HUES.length]}`;
              return (
                <button key={e} onClick={() => save({ avatar_url: v }, "Avatar updated")}
                  className={`rounded-full ring-offset-2 w-fit ${profile?.avatar_url === v ? "ring-2 ring-primary" : ""}`}>
                  <UserAvatar avatar={v} name={e} />
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <Label htmlFor="dn">Display name</Label>
            <div className="flex gap-2">
              <Input id="dn" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
              <Button onClick={() => name.trim() && save({ display_name: name.trim() })}>Save</Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Email: {user.email}</p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <h2 className="font-semibold text-lg">Password</h2>
          <Input type="password" placeholder="Current password" value={curPw} onChange={(e) => setCurPw(e.target.value)} />
          <Input type="password" placeholder="New password (6+ characters)" value={newPw} onChange={(e) => setNewPw(e.target.value)} />
          <div className="flex flex-wrap gap-2">
            <Button onClick={changePw} disabled={busy}>Change password</Button>
            <Button variant="outline" onClick={resetEmail}>Forgot it? Email me a reset link</Button>
          </div>
        </section>

        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </main>
    </div>
  );
};

export default Profile;
