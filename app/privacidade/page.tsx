import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { Rotulo } from "@/components/ui/rotulo";
import { PRIVACIDADE } from "@/content/privacidade";
import { ShieldCheck, ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacidade e LGPD",
  description: PRIVACIDADE.chamada,
};

export default function PaginaPrivacidade() {
  return (
    <>
      <CabecalhoPagina
        kicker="Governança Jurídica & LGPD"
        titulo={PRIVACIDADE.titulo}
        chamada={PRIVACIDADE.chamada}
      />

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          <div className="space-y-16 md:space-y-20">
            {PRIVACIDADE.blocos.map((bloco, idx) => (
              <Reveal key={bloco.titulo} atraso={idx * 0.04}>
                <article className="grid gap-6 lg:grid-cols-12 lg:gap-12 rounded-xl border border-fio/80 bg-carvao/25 p-6 sm:p-10">
                  <div className="lg:col-span-4">
                    <Rotulo rotulo={bloco.titulo} nivel="h2" />
                  </div>
                  <div className="space-y-4 lg:col-span-8">
                    {bloco.paragrafos.map((paragrafo, pIdx) => (
                      <p
                        key={pIdx}
                        className="max-w-[65ch] text-base leading-relaxed text-fumaca"
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border-t border-fio pt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro transition-colors hover:text-osso"
            >
              <ArrowLeft size={14} weight="bold" />
              Voltar ao início
            </Link>

            <span className="font-mono text-xs text-fumaca">
              Última atualização: {PRIVACIDADE.atualizadoEm}
            </span>
          </div>
        </Container>
      </section>
    </>
  );
}
