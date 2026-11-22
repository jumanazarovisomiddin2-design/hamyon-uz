"use client";

import { useState } from "react";

/** Telegram share + copy link. Works without any third-party script. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available — nothing to do */
    }
  }

  return (
    <span className="flex flex-wrap items-center gap-x-6 gap-y-1">
      <a
        href={tg}
        target="_blank"
        rel="noopener noreferrer"
        className="text-forest py-2 font-medium"
      >
        Telegram
      </a>
      <button
        type="button"
        onClick={copy}
        className="text-forest cursor-pointer border-0 bg-transparent p-0 py-2 font-medium hover:underline"
        aria-live="polite"
      >
        {copied ? "Nusxalandi ✓" : "Havolani nusxalash"}
      </button>
    </span>
  );
}
