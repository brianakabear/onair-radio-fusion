import { useState } from "react";
import { Check, Copy, Mail, Send } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.49h-2.8V24C19.62 23.1 24 18.1 24 12.07Z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.11 3.22 5.1 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88Zm8.42-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.94L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.48-8.41Z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
    <path d="M24 12c0-1.1-.9-2-2-2-.54 0-1.03.22-1.39.57a9.8 9.8 0 0 0-5.39-1.7l.92-4.31 2.99.64a1.42 1.42 0 1 0 .14-.98l-3.34-.71a.5.5 0 0 0-.59.38l-1.02 4.78a9.82 9.82 0 0 0-5.44 1.7A2 2 0 1 0 6 13.9c-.08.39-.12.79-.12 1.2 0 3.26 3.8 5.9 8.49 5.9s8.49-2.64 8.49-5.9c0-.4-.04-.8-.12-1.19A2 2 0 0 0 24 12ZM8.2 13.4a1.42 1.42 0 1 1 2.84 0 1.42 1.42 0 0 1-2.84 0Zm7.92 3.94c-.97.97-2.83 1.04-3.37 1.04-.55 0-2.4-.07-3.37-1.04a.37.37 0 0 1 .53-.53c.61.62 1.92.83 2.84.83.93 0 2.23-.21 2.84-.83a.37.37 0 0 1 .53.53Zm-.27-2.52a1.42 1.42 0 1 1 0-2.84 1.42 1.42 0 0 1 0 2.84Z" />
  </svg>
);

const ShareButtons = ({ title, slug }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const pageUrl = `${window.location.origin}/news/${slug}`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedTitle = encodeURIComponent(title);

  const shares = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon />,
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon />,
    },
    {
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinIcon />,
    },
    {
      label: "Reddit",
      href: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      icon: <RedditIcon />,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Send className="h-4 w-4" />,
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">Share:</span>
      {shares.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label}`}
          title={`Share on ${s.label}`}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          {s.icon}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        aria-label="Copy link"
        title="Copy link"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
      {copied && <span className="text-xs text-primary">Link copied!</span>}
    </div>
  );
};

export default ShareButtons;
