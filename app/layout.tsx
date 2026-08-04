import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingCTA } from "@/components/ui/floating-cta";
import { SITE } from "@/content/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--fonte-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--fonte-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nome} | ${SITE.nomeCompleto}`,
    template: `%s | ${SITE.nome}`,
  },
  description: SITE.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    title: `${SITE.nome} | ${SITE.nomeCompleto}`,
    description: SITE.descricao,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cobalto focus:px-4 focus:py-2 focus:text-osso"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}

