import { cn } from "@/lib/utils";

// Avatars are either a picture link (e.g. from Google) or "emoji:<emoji>:<hue>".
export const AVATAR_CHOICES = ["🦁", "🔥", "🎵", "🎧", "🌴", "🥁", "🎤", "🌞", "🐢", "🦜", "🍍", "⭐"];
export const AVATAR_HUES = [0, 45, 140, 200, 280, 330];

export const UserAvatar = ({ avatar, name, className }: { avatar: string | null | undefined; name: string; className?: string }) => {
  if (avatar?.startsWith("emoji:")) {
    const [, emoji, hue] = avatar.split(":");
    return (
      <div className={cn("h-9 w-9 rounded-full flex items-center justify-center text-lg shrink-0", className)}
        style={{ background: `hsl(${hue} 70% 85%)` }} aria-label={name}>{emoji}</div>
    );
  }
  if (avatar) return <img src={avatar} alt={name} className={cn("h-9 w-9 rounded-full object-cover shrink-0", className)} />;
  return (
    <div className={cn("h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0", className)}>
      {name.slice(0, 1).toUpperCase()}
    </div>
  );
};
