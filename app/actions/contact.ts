"use server";

import { headers } from "next/headers";

export type FieldError = "name" | "email" | "message";
export type FormError = "rate" | "notConfigured" | "failed";

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "error";
      error?: FormError;
      fields?: FieldError[];
      values?: { name: string; email: string; company: string; message: string };
    };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim().slice(0, 120),
    email: String(formData.get("email") ?? "").trim().slice(0, 200),
    company: String(formData.get("company") ?? "").trim().slice(0, 120),
    message: String(formData.get("message") ?? "").trim().slice(0, 5000),
  };
  const lang = String(formData.get("lang") ?? "en").slice(0, 5);

  // Honeypot filled → pretend success, drop silently.
  if (String(formData.get("website") ?? "") !== "") return { status: "sent" };

  const fields: FieldError[] = [];
  if (values.name.length < 2) fields.push("name");
  if (!EMAIL_RE.test(values.email)) fields.push("email");
  if (values.message.length < 10) fields.push("message");
  if (fields.length) return { status: "error", fields, values };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip, Date.now())) return { status: "error", error: "rate", values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  if (!apiKey || !to) return { status: "error", error: "notConfigured", values };

  try {
    const signature = `— ${values.name}${values.company ? ` (${values.company})` : ""} <${values.email}> · ${lang.toUpperCase()}`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Portfolio: message from ${values.name}`,
        text: `${values.message}\n\n${signature}`,
        html: `<p>${escapeHtml(values.message).replace(/\n/g, "<br>")}</p><p>${escapeHtml(signature)}</p>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] send failed", error);
    return { status: "error", error: "failed", values };
  }
}
