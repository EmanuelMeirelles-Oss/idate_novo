import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { CTALink } from "@/components/ui/cta-link";
import { FiltroEixo, type OpcaoFiltro } from "@/components/ui/filtro-eixo";
import {
  PUBLICACOES,
  TIPOS_PUBLICACAO,
  publicacoesPorTipo,
  tiposComPublicacao,
  type TipoPublicacao,
} from "@/content/publicacoes";
import { OBSERVATORIOS } from "@/content/observatorios";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Biblioteca",
  description:
    "Acervo público do IDATE: notas técnicas, estudos, pareceres, jurisprudência comentada e linhas do tempo produzidos pelos observatórios.",
};

export default async function Biblioteca({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const tiposPresentes = tiposComPublicacao();

  const opcoesFiltro: readonly OpcaoFiltro[] = [
    { rotulo: "Todos os formatos" },
    ...tiposPresentes.map((t) => ({
      rotulo: TIPOS_PUBLICACAO[t].plural,
      valor: t,
    })),
  ];

  const tipoAtivo =
    tipo && Object.keys(TIPOS_PUBLICACAO).includes(tipo)
      ? (tipo as TipoPublicacao)
      : undefined;

  const listaPublicacoes = tipoAtivo
    ? publicacoesPorTipo(tipoAtivo)
    : PUBLICACOES;

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
            {Object.entries(TIPOS_PUBLICACAO).map(([chave, tipoItem]) => (
              <div key={chave} className="bg-carvao/30 p-6">
                <dt className="text-base font-bold tracking-tight text-osso">
                  {tipoItem.plural}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-fumaca">
                  {tipoItem.descricao}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                Acervo Disponível
              </span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-osso md:text-3xl">
                Publicações Técnicas ({listaPublicacoes.length})
              </h2>
            </div>
            {opcoesFiltro.length > 1 && (
              <FiltroEixo
                opcoes={opcoesFiltro}
                ativo={tipoAtivo}
                baseHref="/biblioteca"
                paramName="tipo"
                ariaLabel="Filtrar publicações por tipo"
              />
            )}
          </div>

          {listaPublicacoes.length === 0 ? (
            <Reveal>
              <div className="rounded-lg border border-dashed border-fio bg-carvao/20 p-8 sm:p-12">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fumaca">
                  Acervo em formação
                </p>
                <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-osso">
                  Nenhuma publicação deste tipo encontrada no momento.
                </p>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-fumaca">
                  Os {OBSERVATORIOS.length} observatórios mantêm suas agendas de
                  pesquisa abertas e novos estudos são indexados continuamente.
                </p>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                  <CTALink href="/biblioteca">Ver todas as publicações</CTALink>
                  <CTALink href="/observatorios" variante="secundario">
                    Ver observatórios
                  </CTALink>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2">
              {listaPublicacoes.map((publicacao, indice) => {
                const obs = OBSERVATORIOS.find(
                  (o) => o.slug === publicacao.observatorio,
                );
                return (
                  <li key={publicacao.slug}>
                    <Reveal atraso={indice * 0.06}>
                      <Link
                        href={`/biblioteca/${publicacao.slug}`}
                        className="group flex h-full flex-col justify-between rounded-lg border border-fio bg-carvao/30 p-6 sm:p-8 transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro"
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fio/60 pb-3">
                            <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cobalto-claro">
                              {TIPOS_PUBLICACAO[publicacao.tipo].rotulo}
                            </span>
                            <time
                              dateTime={publicacao.publicadoEm}
                              className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca"
                            >
                              {publicacao.publicadoEm
                                .split("-")
                                .reverse()
                                .join("/")}
                            </time>
                          </div>

                          <h3 className="mt-4 text-xl font-bold leading-tight tracking-tight text-osso transition-colors group-hover:text-cobalto-claro">
                            {publicacao.titulo}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-fumaca">
                            {publicacao.resumo}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-fio/60 pt-4">
                          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cobalto-claro">
                            {obs ? obs.nomeCurto : publicacao.observatorio}
                          </span>

                          <span className="inline-flex items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                            Ler documento
                            <ArrowUpRight
                              size={14}
                              weight="bold"
                              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
