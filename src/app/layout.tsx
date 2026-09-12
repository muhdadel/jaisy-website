import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Preloader } from "@/components/layout/preloader";
import { SiteReadyProvider } from "@/components/layout/site-ready-provider";
import { TaglineBar } from "@/components/layout/tagline-bar";
import { PRIMARY_CTA_LABEL } from "@/lib/content/site";
import {
  getHeroContent,
  getNavItems,
  getPlatformLinks,
  getSiteSettings,
} from "@/lib/data";
import { bodyFont, displayFont } from "@/lib/fonts";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? settings.url;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seo.title,
      template: settings.seo.titleTemplate,
    },
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    applicationName: settings.name,
    authors: [{ name: settings.name }],
    creator: settings.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: settings.name,
      title: settings.seo.title,
      description: settings.seo.description,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seo.title,
      description: settings.seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [settings, navItems, platformLinks, hero] = await Promise.all([
    getSiteSettings(),
    getNavItems(),
    getPlatformLinks(),
    getHeroContent(),
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    description: settings.description,
    url: settings.url,
    slogan: settings.footerTagline,
    telephone: settings.phones,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.addressLines[0],
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
  };

  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="pb-9 antialiased">
        <script
          type="application/ld+json"
          // Static, developer-authored JSON-LD — no user input is interpolated.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-fg focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink-950"
        >
          Skip to content
        </a>

        <SiteReadyProvider>
          <Preloader />
          <Navbar items={navItems} ctaLabel={PRIMARY_CTA_LABEL} />
          <main id="main">{children}</main>
          <Footer
            settings={settings}
            navItems={navItems}
            platformLinks={platformLinks}
          />
          <TaglineBar tagline={hero.eyebrow} />
        </SiteReadyProvider>
      </body>
    </html>
  );
}
