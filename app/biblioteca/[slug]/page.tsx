import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { Rotulo } from "@/components/ui/rotulo";
import {
  PUBLICACOES,
  TIPOS_PUBLICACAO,
  buscarPublicacao,
} from "@/content/publicacoes";
import { OBSERVATORIOS, buscarObservatorio } from "@/content/observatorios";
import {
  ArrowLeft,
  ArrowSquareOut,
  BookOpen,
  Scales,
  Quotes,
  Buildings,
} from "@phosphor-icons/react/dist/ssr";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PUBLICACOES.map((publicacao) => ({ slug: publicacao.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publicacao = buscarPublicacao(slug);

  if (!publicacao) return {};

  return {
    title: `${publicacao.titulo} | Biblioteca`,
    description: publicacao.resumo,
    openGraph: {
      title: publicacao.titulo,
      description: publicacao.resumo,
      type: "article",
      publishedTime: publicacao.publicadoEm,
      tags: [...publicacao.tags],
    },
  };
}

export default async function PaginaPublicacao({ params }: Props) {
  const { slug } = await params;
  const publicacao = buscarPublicacao(slug);

  if (!publicacao) notFound();

  const observatorio = buscarObservatorio(publicacao.observatorio);
  const tipoInfo = TIPOS_PUBLICACAO[publicacao.tipo];
  const dataFormatada = publicacao.publicadoEm.split("-").reverse().join("/");

  // Citação bibliográfica no padrão ABNT
  const citacaoABNT = `IDATE. ${publicacao.titulo}. ${tipoInfo.rotulo}. Brasília: Instituto dos Direitos da Água, Terra e Energia, ${publicacao.publicadoEm.slice(0, 4)}. Disponível em: <https://idate.org.br/biblioteca/${publicacao.slug}>.`;

  return (
    <>
      <CabecalhoPagina
        kicker={`${tipoInfo.rotulo} • ${observatorio ? observatorio.nomeCurto : publicacao.observatorio}`}
        titulo={publicacao.titulo}
        chamada={publicacao.resumo}
      />

      <section className="border-b border-fio py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Coluna Principal: Texto e Seções Técnicas */}
            <article className="space-y-12 lg:col-span-8">
              {publicacao.secoes && publicacao.secoes.length > 0 ? (
                publicacao.secoes.map((secao, idx) => (
                  <Reveal key={secao.subtitulo} atraso={idx * 0.05}>
                    <div className="rounded-xl border border-fio bg-carvao/20 p-6 sm:p-8">
                      <h2 className="text-xl font-bold tracking-tight text-osso md:text-2xl">
                        {secao.subtitulo}
                      </h2>
                      <div className="mt-6 space-y-4 text-base leading-relaxed text-fumaca">
                        {secao.paragrafos.map((p, pIdx) => (
                          <p key={pIdx} className="max-w-[65ch]">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))
              ) : (
                <div className="rounded-xl border border-fio bg-carvao/20 p-8 text-fumaca">
                  <p>{publicacao.resumo}</p>
                </div>
              )}

              {/* Bloco de Citação ABNT */}
              <Reveal atraso={0.15}>
                <div className="rounded-xl border border-fio bg-carvao/30 p-6 sm:p-8">
                  <div className="flex items-center gap-2 text-cobalto-claro">
                    <Quotes size={20} weight="bold" />
                    <span className="font-mono text-xs uppercase tracking-[0.14em]">
                      Como citar este documento (ABNT)
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-xs leading-relaxed text-fumaca select-all">
                    {citacaoABNT}
                  </p>
                </div>
              </Reveal>
            </article>

            {/* Coluna Lateral: Ficha Técnica, Fundamentação e Fontes */}
            <aside className="space-y-8 lg:col-span-4">
              <Reveal atraso={0.1}>
                {/* Card de Ficha Técnica */}
                <div className="rounded-xl border border-fio bg-carvao/40 p-6">
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-cobalto-claro">
                    Ficha Técnica
                  </span>

                  <dl className="mt-6 space-y-4 text-sm">
                    <div>
                      <dt className="font-mono text-xs text-fumaca">Classificação</dt>
                      <dd className="mt-1 font-semibold text-osso">
                        {tipoInfo.rotulo}
                      </dd>
                    </div>

                    <div className="border-t border-fio/60 pt-3">
                      <dt className="font-mono text-xs text-fumaca">Publicação</dt>
                      <dd className="mt-1 font-mono text-xs text-osso">
                        <time dateTime={publicacao.publicadoEm}>{dataFormatada}</time>
                      </dd>
                    </div>

                    <div className="border-t border-fio/60 pt-3">
                      <dt className="font-mono text-xs text-fumaca">Autoria Técnica</dt>
                      <dd className="mt-1 text-xs text-osso">
                        {publicacao.autores.map((a) => (
                          <div key={a.nome}>
                            <span className="font-medium">{a.nome}</span>
                            {a.titulacao && (
                              <span className="block text-[0.6875rem] text-fumaca">
                                {a.titulacao}
                              </span>
                            )}
                          </div>
                        ))}
                      </dd>
                    </div>

                    {observatorio && (
                      <div className="border-t border-fio/60 pt-3">
                        <dt className="font-mono text-xs text-fumaca">Observatório Vinculado</dt>
                        <dd className="mt-1">
                          <Link
                            href={`/observatorios/${observatorio.slug}`}
                            className="text-xs text-cobalto-claro hover:text-osso transition-colors"
                          >
                            {observatorio.nome} →
                          </Link>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Reveal>

              {/* Fundamentação Legal Aplicável */}
              {publicacao.fundamentacaoLegal && publicacao.fundamentacaoLegal.length > 0 && (
                <Reveal atraso={0.15}>
                  <div className="rounded-xl border border-fio bg-carvao/30 p-6">
                    <div className="flex items-center gap-2 text-cobalto-claro">
                      <Scales size={18} weight="bold" />
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em]">
                        Fundamentação Legal
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2 text-xs leading-relaxed text-fumaca">
                      {publicacao.fundamentacaoLegal.map((lei) => (
                        <li key={lei} className="border-l-2 border-cobalto-claro/40 pl-3">
                          {lei}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Fontes Oficiais Auditadas */}
              {publicacao.fontesOficiais && publicacao.fontesOficiais.length > 0 && (
                <Reveal atraso={0.2}>
                  <div className="rounded-xl border border-fio bg-carvao/30 p-6">
                    <div className="flex items-center gap-2 text-cobalto-claro">
                      <Buildings size={18} weight="bold" />
                      <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em]">
                        Fontes Documentais Oficiais
                      </span>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {publicacao.fontesOficiais.map((fonte) => (
                        <li key={fonte.nome}>
                          <a
                            href={fonte.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-start justify-between gap-2 text-xs text-fumaca hover:text-osso transition-colors"
                          >
                            <span>{fonte.nome}</span>
                            <ArrowSquareOut
                              size={14}
                              className="shrink-0 text-cobalto-claro group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {/* Tags temáticas */}
              {publicacao.tags && publicacao.tags.length > 0 && (
                <Reveal atraso={0.25}>
                  <div className="rounded-xl border border-fio bg-carvao/20 p-6">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-fumaca">
                      Palavras-chave
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {publicacao.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-fio bg-noite/50 px-2 py-0.5 font-mono text-[0.625rem] text-fumaca"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </aside>
          </div>

          {/* Navegação inferior */}
          <div className="mt-16 border-t border-fio pt-8 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/biblioteca"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro transition-colors hover:text-osso"
            >
              <ArrowLeft size={14} weight="bold" />
              Voltar ao acervo
            </Link>

            {observatorio && (
              <Link
                href={`/observatorios/${observatorio.slug}`}
                className="font-mono text-xs uppercase tracking-[0.14em] text-fumaca hover:text-cobalto-claro transition-colors"
              >
                Observatório de {observatorio.nomeCurto} →
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
