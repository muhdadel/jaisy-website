import { MapPin, Phone } from "lucide-react";
import { InquiryForm } from "@/components/sections/contact/inquiry-form";
import { CornerBrackets } from "@/components/ui/corner-brackets";
import { PlatformIcon } from "@/components/ui/platform-icon";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/ui/section";
import type {
  PlatformLink,
  SectionIntro,
  SiteSettings,
} from "@/lib/content/types";

interface ContactSectionProps {
  copy: SectionIntro;
  settings: SiteSettings;
  platformLinks: PlatformLink[];
  submitLabel: string;
}

export function ContactSection({
  copy,
  settings,
  platformLinks,
  submitLabel,
}: ContactSectionProps) {
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.mapQuery,
  )}`;

  return (
    <Section id="contact" labelledBy="contact-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[30vmax] w-[30vmax] rounded-full bg-brand-pink/12 blur-[150px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="contact-heading"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <InquiryForm
              submitLabel={submitLabel}
              successLine={settings.closingLine}
            />
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-card surface-card p-7">
              <CornerBrackets size={20} color="border-brand-blue/40" />
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                Talk to us
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {settings.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone}`}
                      className="group flex items-center gap-3 text-lg font-semibold tracking-tight text-fg transition-colors duration-300 hover:text-brand-blue"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue transition-transform duration-300 group-hover:scale-110">
                        <Phone className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="tabular-nums">{phone}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative overflow-hidden rounded-card surface-card p-7">
              <CornerBrackets size={20} color="border-brand-yellow/40" />
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                Visit the workshop
              </h3>
              <div className="mt-5 flex items-start gap-3">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <address className="not-italic text-sm leading-relaxed text-fg-muted">
                  {settings.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-yellow transition-opacity duration-300 hover:opacity-80"
              >
                View on map
              </a>
            </div>

            {platformLinks.length > 0 && (
              <div className="relative overflow-hidden rounded-card surface-card p-7">
                <CornerBrackets size={20} />
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-fg-subtle">
                  Jaisy Platform Links
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {platformLinks.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.8rem] text-fg-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/50 hover:text-fg"
                      >
                        <PlatformIcon
                          platform={link.platform}
                          className="h-4 w-4"
                        />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="px-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-fg-subtle">
              {settings.closingLine}
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
