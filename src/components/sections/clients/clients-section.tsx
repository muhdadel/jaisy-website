import type { CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui/section";
import type { Client, SectionIntro } from "@/lib/content/types";
import { cn } from "@/lib/utils/cn";

function ClientChip({ name, logoUrl }: { name: string; logoUrl: string }) {
  return (
    <li className="shrink-0">
      <span
        className={cn(
          "group inline-flex h-20 w-[168px] items-center justify-center rounded-xl border border-white/[0.07] bg-ink-850/70 px-5",
          "transition-all duration-400",
          "hover:-translate-y-0.5 hover:border-brand-pink/40 hover:bg-ink-800 hover:shadow-[0_0_40px_-16px_var(--color-brand-pink)]",
        )}
      >
        {/* Artwork is already brand-pink on transparent, so no CSS filtering is needed. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className="max-h-12 w-auto max-w-full object-contain opacity-70 transition-opacity duration-400 group-hover:opacity-100"
        />
      </span>
    </li>
  );
}

type LogoClient = Client & { logoUrl: string };

function MarqueeRow({
  clients,
  reverse = false,
  duration,
}: {
  clients: LogoClient[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="mask-fade-x group relative overflow-hidden py-2">
      <ul
        className={cn(
          "flex w-max items-center gap-3",
          reverse
            ? "motion-safe:animate-[marquee-reverse_var(--marquee-duration)_linear_infinite]"
            : "motion-safe:animate-[marquee_var(--marquee-duration)_linear_infinite]",
          "group-hover:[animation-play-state:paused]",
        )}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {clients.map((client) => (
          <ClientChip key={client.id} name={client.name} logoUrl={client.logoUrl} />
        ))}
        {/* Duplicate track keeps the loop seamless at the -50% keyframe. */}
        {clients.map((client) => (
          <ClientChip key={`${client.id}-clone`} name={client.name} logoUrl={client.logoUrl} />
        ))}
      </ul>
    </div>
  );
}

interface ClientsSectionProps {
  copy: SectionIntro;
  clients: Client[];
}

export function ClientsSection({ copy, clients }: ClientsSectionProps) {
  // Logos only — a client without artwork is skipped rather than shown as text.
  const logoClients = clients.filter((client): client is LogoClient => Boolean(client.logoUrl));
  const half = Math.ceil(logoClients.length / 2);
  const rowOne = logoClients.slice(0, half);
  const rowTwo = logoClients.slice(half);

  return (
    <Section id="clients" labelledBy="clients-heading" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[28vmax] w-[28vmax] rounded-full bg-brand-blue/10 blur-[140px]"
      />

      <div className="container-page relative">
        <SectionHeading
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          intro={copy.intro}
          headingId="clients-heading"
          align="center"
        />
      </div>

      {logoClients.length === 0 ? (
        <div className="container-page mt-12">
          <p className="rounded-card surface-card p-8 text-center text-sm text-fg-subtle">
            Client list coming soon.
          </p>
        </div>
      ) : (
        <div className="relative mt-14 flex flex-col gap-3">
          <MarqueeRow clients={rowOne} duration="58s" />
          <MarqueeRow clients={rowTwo} duration="72s" reverse />
        </div>
      )}
    </Section>
  );
}
