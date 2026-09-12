import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-0 h-[40vmax] w-[40vmax] rounded-full bg-brand-blue/15 blur-[130px]" />
        <div className="absolute -right-[10%] bottom-0 h-[36vmax] w-[36vmax] rounded-full bg-brand-pink/18 blur-[130px]" />
      </div>

      <div className="container-page">
        <p className="eyebrow">
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-brand-pink to-transparent"
          />
          Error 404
        </p>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95]">
          This page didn&apos;t make it to production.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
          The link you followed doesn&apos;t exist. Head back to the homepage to
          explore our services and work.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to homepage
          </ButtonLink>
          <Link
            href="/#contact"
            className="inline-flex h-14 items-center rounded-full border border-white/15 px-9 text-[0.9375rem] font-semibold text-fg transition-colors duration-300 hover:border-brand-pink/60"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
