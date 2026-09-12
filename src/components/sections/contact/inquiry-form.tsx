"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2, Send } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  contactMethods,
  inquiryDefaults,
  inquirySchema,
  serviceOptions,
  type InquiryInput,
} from "@/lib/validation/inquiry";
import { cn } from "@/lib/utils/cn";

type Status = "idle" | "submitting" | "success" | "error";

const fieldBase =
  "w-full rounded-xl border bg-ink-850/70 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle/60 " +
  "transition-colors duration-300 outline-none focus:border-brand-blue/70 focus:bg-ink-800";

function FieldLabel({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle"
    >
      {children}
      {optional && (
        <span className="font-normal normal-case tracking-normal text-fg-subtle/60">
          (optional)
        </span>
      )}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-1.5 flex items-center gap-1.5 overflow-hidden text-xs text-brand-pink"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function InquiryForm({
  submitLabel,
  successLine,
}: {
  submitLabel: string;
  successLine: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: inquiryDefaults,
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setServerMessage(null);

    try {
      const apiBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const response = await fetch(`${apiBase}/api/public/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json().catch(() => null)) as {
        success?: boolean;
        error?: { message: string; fields?: Record<string, string> };
      } | null;

      if (!response.ok || !payload?.success) {
        const fields = payload?.error?.fields;
        if (fields) {
          for (const [name, message] of Object.entries(fields)) {
            setError(name as keyof InquiryInput, { type: "server", message });
          }
        }
        setStatus("error");
        setServerMessage(
          payload?.error?.message ??
            "We couldn't send your message. Please try again or call us directly.",
        );
        return;
      }

      reset(inquiryDefaults);
      setStatus("success");
    } catch {
      setStatus("error");
      setServerMessage(
        "Network error — please check your connection and try again.",
      );
    }
  });

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-full min-h-[420px] flex-col items-center justify-center gap-4 rounded-card surface-card p-10 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="text-2xl font-bold tracking-tight">
          Your message is on its way
        </h3>
        <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
          A member of the Jaisy team will get back to you shortly with next
          steps. {successLine}
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="mt-2"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-card surface-card p-6 sm:p-8"
    >
      {/* Honeypot — visually and programmatically hidden from real users. */}
      <div
        className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
        aria-hidden
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="fullName">Full name</FieldLabel>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.fullName)}
            className={cn(
              fieldBase,
              errors.fullName ? "border-brand-pink/60" : "border-white/10",
            )}
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="companyName" optional>
            Company
          </FieldLabel>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            className={cn(fieldBase, "border-white/10")}
            {...register("companyName")}
          />
          <FieldError message={errors.companyName?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            className={cn(
              fieldBase,
              errors.email ? "border-brand-pink/60" : "border-white/10",
            )}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <FieldLabel htmlFor="phone">Phone number</FieldLabel>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="01xx xxx xxxx"
            aria-invalid={Boolean(errors.phone)}
            className={cn(
              fieldBase,
              errors.phone ? "border-brand-pink/60" : "border-white/10",
            )}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="service">Service interested in</FieldLabel>
          <div className="relative">
            <select
              id="service"
              aria-invalid={Boolean(errors.service)}
              className={cn(
                fieldBase,
                "appearance-none pr-11",
                errors.service ? "border-brand-pink/60" : "border-white/10",
              )}
              {...register("service")}
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-ink-850">
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle"
              aria-hidden
            />
          </div>
          <FieldError message={errors.service?.message} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="message">Project details</FieldLabel>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us about the project — scope, timeline, location, and anything else that helps."
            aria-invalid={Boolean(errors.message)}
            className={cn(
              fieldBase,
              "resize-y",
              errors.message ? "border-brand-pink/60" : "border-white/10",
            )}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-fg-subtle">
            Preferred contact method
          </legend>
          <div className="flex flex-wrap gap-2">
            {contactMethods.map((method) => (
              <label
                key={method}
                className="group relative cursor-pointer"
              >
                <input
                  type="radio"
                  value={method}
                  className="peer sr-only"
                  {...register("preferredContact")}
                />
                <span className="inline-flex items-center rounded-full border border-white/10 bg-ink-850/70 px-4 py-2 text-[0.8rem] text-fg-subtle transition-all duration-300 hover:border-white/25 peer-checked:border-brand-pink/60 peer-checked:bg-brand-pink/10 peer-checked:text-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-blue">
                  {method}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <AnimatePresence>
        {status === "error" && serverMessage && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-brand-pink/30 bg-brand-pink/[0.07] p-3 text-sm text-fg-muted"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink"
              aria-hidden
            />
            {serverMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <Send className="h-4 w-4" aria-hidden />
            </>
          )}
        </Button>
        <p className="text-xs leading-relaxed text-fg-subtle">
          We reply to every enquiry — usually within one business day.
        </p>
      </div>
    </form>
  );
}
