import type { Metadata } from "next";

import { jetbrainsMono, urbanist } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404 · Max Perona", robots: { index: false } };

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function GlobalNotFound() {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${urbanist.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grid min-h-dvh place-items-center bg-base px-4 text-center">
        <div>
          <p className="font-mono text-sm text-muted">404</p>
          <h1 className="mt-4 text-[clamp(2.5rem,7vw,5rem)] leading-none">Nothing here.</h1>
          <p className="mt-6 text-lg text-medium">That page doesn&apos;t exist — or it moved.</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/en" className="mt-10 inline-flex items-center gap-2 rounded-full border border-stroke-strong px-6 py-3 text-bright hover:border-bright">
            ← Back home
          </a>
        </div>
      </body>
    </html>
  );
}
