import { jetbrainsMono, urbanist } from "./fonts";
import "./globals.css";

/**
 * Single root layout for every locale, so switching language is a client-side navigation
 * (no full page reload). The inline script sets <html lang> and the theme before first paint;
 * app/[lang]/layout.tsx also marks its subtree with lang={locale}.
 */
const bootScript = `(function(){try{var d=document.documentElement,l=location.pathname.split("/")[1];if(l==="en"||l==="it"||l==="es")d.lang=l;var t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(localStorage.getItem("motion")==="paused")d.setAttribute("data-motion","paused")}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${urbanist.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body id="top" className="min-h-dvh bg-base">
        {children}
      </body>
    </html>
  );
}
