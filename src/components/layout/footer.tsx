import { MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { PlatformIcon } from "@/components/ui/platform-icon";
import type { NavItem, PlatformLink, SiteSettings } from "@/lib/content/types";

interface FooterProps {
  settings: SiteSettings;
  navItems: NavItem[];
  platformLinks: PlatformLink[];
}

export function Footer({ settings, navItems, platformLinks }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.07] bg-ink-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-pink/50 to-transparent"
      />

      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.1fr]">
          <div className="flex flex-col gap-5">
            <Logo withTagline />
            <p className="max-w-sm text-sm leading-relaxed text-fg-muted">
              {settings.footerTagline}
            </p>

            {platformLinks.length > 0 && (
              <ul className="flex flex-wrap gap-2 pt-1">
                {platformLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Jaisy on ${link.label}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-fg-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-pink/50 hover:text-fg"
                    >
                      <PlatformIcon platform={link.platform} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-fg-subtle">
              Explore
            </h2>
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    <span
                      aria-hidden
                      className="h-px w-0 bg-brand-pink transition-all duration-300 group-hover:w-4"
                    />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-fg-subtle">
              Get in touch
            </h2>
            <ul className="flex flex-col gap-3 text-sm text-fg-muted">
              {settings.phones.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-3 transition-colors duration-300 hover:text-fg"
                  >
                    <Phone className="h-4 w-4 text-brand-blue" aria-hidden />
                    <span className="tabular-nums">{phone}</span>
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 pt-1">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow"
                  aria-hidden
                />
                <address className="not-italic leading-relaxed">
                  {settings.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 text-xs text-fg-subtle sm:flex-row">
          <p>
            © {year} {settings.name}. All rights reserved.
          </p>
          <p className="tracking-[0.14em] uppercase">{settings.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
