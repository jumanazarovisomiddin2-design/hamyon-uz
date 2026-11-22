"use client";

import { useState } from "react";

/** Telegram share + copy link. Works without any third-party script. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const tg = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      // Older browsers / blocked permission: copy through a temporary text field.
      const field = document.createElement("textarea");
      field.value = url;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      }
      field.remove();
    }
    setState(ok ? "copied" : "failed");
    setTimeout(() => setState("idle"), 2500);
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
        {state === "copied"
          ? "Nusxalandi ✓"
          : state === "failed"
            ? "Nusxalab boʻlmadi — manzilni brauzerdan oling"
            : "Havolani nusxalash"}
      </button>
    </span>
  );
}
