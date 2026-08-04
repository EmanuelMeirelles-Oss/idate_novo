import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { CTALink } from "@/components/ui/cta-link";
import { PUBLICACOES, TIPOS_PUBLICACAO } from "@/content/publicacoes";
import { OBSERVATORIOS } from "@/content/observatorios";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "Acervo público do IDATE: notas técnicas, estudos, pareceres, jurisprudência comentada e linhas do tempo produzidos pelos observatórios.",
};

export default function Biblioteca() {
  return (
    <>
      <CabecalhoPagina
        titulo="Biblioteca"
        chamada="Toda a produção dos observatórios em acesso aberto, sem cadastro e sem restrição. Conhecimento técnico sobre recursos públicos que permanece restrito perde a maior parte de sua utilidade."
      />

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
              O que o acervo reúne
            </span>
            <h2 className="mt-4 max-w-[24ch] text-2xl font-bold leading-tight tracking-tighter md:text-4xl">
              Nove tipos de publicação.
            </h2>
          </Reveal>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-fio sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(TIPOS_PUBLICACAO).map(([chave, tipo]) => (
              <div key={chave} className="bg-carvao/30 p-6">
                <dt className="text-base font-bold tracking-tight text-osso">
                  {tipo.plural}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-fumaca">
                  {tipo.descricao}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          {PUBLICACOES.length === 0 ? (
            /*
              PENDENTE: acervo da IMEPPI ainda não incorporado. Ver
              content/PENDENCIAS.md. Enquanto não houver publicação real, a
              biblioteca declara a ausência em vez de simulá-la — e encaminha
              para a agenda de pesquisa, que é conteúdo verdadeiro.
            */
            <Reveal>
              <div className="rounded-lg border border-dashed border-fio bg-carvao/20 p-8 sm:p-12">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fumaca">
                  Acervo em formação
                </p>
                <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-osso">
                  A biblioteca ainda não possui publicações disponíveis para
                  consulta.
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-fumaca">
                  Os {OBSERVATORIOS.length} observatórios encontram-se em
                  constituição e suas agendas de pesquisa já são públicas. Cada
                  estudo, nota técnica ou parecer concluído entra aqui, com
                  autoria, data e fontes declaradas.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  <CTALink href="/observatorios">
                    Ver as agendas de pesquisa
                  </CTALink>
                  <CTALink href="/metodologia" variante="secundario">
                    Como investigamos
                  </CTALink>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {PUBLICACOES.map((publicacao) => (
                <li key={publicacao.slug}>
                  <article className="h-full rounded-lg border border-fio bg-carvao/30 p-6 sm:p-8">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalto-claro">
                      {TIPOS_PUBLICACAO[publicacao.tipo].rotulo}
                    </span>
                    <h3 className="mt-4 text-xl font-bold leading-tight tracking-tight text-osso">
                      {publicacao.titulo}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-fumaca">
                      {publicacao.resumo}
                    </p>
                    <Link
                      href={`/observatorios/${publicacao.observatorio}`}
                      className="mt-6 inline-block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalto-claro hover:text-osso"
                    >
                      {publicacao.observatorio}
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
