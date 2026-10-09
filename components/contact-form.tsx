"use client";

import { AnimatePresence, motion } from "motion/react";
import { useActionState } from "react";

import { sendMessage, type ContactState, type FieldError } from "@/app/actions/contact";
import type { Dictionary } from "@/content/dictionaries";
import { duration, ease } from "@/lib/motion";
import { ArrowRight } from "./icons";

const initial: ContactState = { status: "idle" };

const field =
  "w-full border-0 border-b border-stroke bg-transparent px-1 py-4 text-bright placeholder:text-muted transition-colors duration-150 focus:border-bright focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-bright";

const appear = {
  initial: { opacity: 0, y: -6 },
  animate: { opacity: 1, y: 0, transition: { duration: duration.ui, ease: ease.out } },
  exit: { opacity: 0, transition: { duration: duration.micro } },
};

export function ContactForm({ email, lang, t }: { email: string; lang: string; t: Dictionary["contact"]["form"] }) {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const err = state.status === "error" ? state : null;
  const has = (f: FieldError) => !!err?.fields?.includes(f);

  const fieldMessage = (name: FieldError) => (
    <AnimatePresence initial={false}>
      {has(name) ? (
        <motion.p key={name} id={`${name}-error`} className="mt-2 text-sm text-bright" {...appear}>
          {t.errors[name]}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state.status === "sent" ? (
        <motion.div
          key="sent"
          role="status"
          className="rounded-card border border-stroke bg-base-tint p-8"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0, transition: { duration: duration.enter, ease: ease.out } }}
        >
          <p className="text-2xl text-bright">{t.sentTitle}</p>
          <p className="mt-2 text-medium">{t.sentText}</p>
        </motion.div>
      ) : (
        <motion.div key="form" exit={{ opacity: 0, transition: { duration: duration.ui } }}>
        <form action={action} noValidate className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          <input type="hidden" name="lang" value={lang} />
          <div>
            <label htmlFor="name" className="sr-only">{t.name}</label>
            <input id="name" name="name" autoComplete="name" required placeholder={t.name} defaultValue={err?.values?.name} aria-invalid={has("name")} aria-describedby={has("name") ? "name-error" : undefined} className={field} />
            {fieldMessage("name")}
          </div>
          <div>
            <label htmlFor="company" className="sr-only">{t.company}</label>
            <input id="company" name="company" autoComplete="organization" placeholder={t.company} defaultValue={err?.values?.company} className={field} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="sr-only">{t.email}</label>
            <input id="email" name="email" type="email" autoComplete="email" required placeholder={t.email} defaultValue={err?.values?.email} aria-invalid={has("email")} aria-describedby={has("email") ? "email-error" : undefined} className={field} />
            {fieldMessage("email")}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="sr-only">{t.message}</label>
            <textarea id="message" name="message" required rows={5} placeholder={t.message} defaultValue={err?.values?.message} aria-invalid={has("message")} aria-describedby={has("message") ? "message-error" : undefined} className={`${field} resize-y`} />
            {fieldMessage("message")}
          </div>
          {/* Honeypot: humans never see or fill this. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <div role="alert" className="min-h-6 text-sm text-medium">
              <AnimatePresence initial={false}>
                {err?.error ? (
                  <motion.p key={err.error} {...appear}>
                    {t.errors[err.error]}{" "}
                    <a href={`mailto:${email}`} className="text-bright underline underline-offset-4">{email}</a>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
            <button
              type="submit"
              disabled={pending}
              aria-busy={pending}
              className="group inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-control py-2 pr-2 pl-7 whitespace-nowrap text-on-control transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.97] disabled:opacity-70"
            >
              {pending ? t.sending : t.send}
              <span className="grid size-11 place-items-center rounded-full bg-on-control text-control transition-transform duration-150 ease-out-soft group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                {pending ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none" aria-hidden="true" />
                ) : (
                  <ArrowRight size={18} />
                )}
              </span>
            </button>
          </div>
        </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
