import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { CTALink } from "@/components/ui/cta-link";
import {
  EIXOS,
  OBSERVATORIOS,
  buscarObservatorio,
} from "@/content/observatorios";
import { publicacoesDoObservatorio } from "@/content/publicacoes";
import { CANAL } from "@/content/site";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

/*
  Em Next 16 `params` é uma Promise e precisa ser aguardada — tanto na página
  quanto em generateMetadata. Verificado em
  node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md
*/
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return OBSERVATORIOS.map((observatorio) => ({ slug: observatorio.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const observatorio = buscarObservatorio(slug);

  if (!observatorio) return {};

  return {
    title: observatorio.nome,
    description: observatorio.escopo,
  };
}

export default async function PaginaObservatorio({ params }: Props) {
  const { slug } = await params;
  const observatorio = buscarObservatorio(slug);

  if (!observatorio) notFound();

  const publicacoes = publicacoesDoObservatorio(observatorio.slug);

  return (
    <>
      <CabecalhoPagina
        kicker={`Observatório — ${EIXOS[observatorio.eixo].rotulo}`}
        titulo={observatorio.nome}
        chamada={observatorio.escopo}
      />

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
              Agenda de pesquisa
            </span>
            <h2 className="mt-4 max-w-[24ch] text-2xl font-bold leading-tight tracking-tighter md:text-4xl">
              Perguntas em aberto
            </h2>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-fumaca">
              O observatório declara publicamente o que investiga. Estas são as
              questões que orientam o trabalho e às quais as publicações do
              acervo respondem, parcial ou integralmente.
            </p>
          </Reveal>

          <ol className="mt-12 space-y-px overflow-hidden rounded-lg border border-fio">
            {observatorio.perguntas.map((pergunta, indice) => (
              <li
                key={pergunta}
                className="flex gap-5 bg-carvao/30 p-6 sm:gap-8 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-semibold text-cobalto-claro"
                >
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <p className="max-w-[62ch] text-base leading-relaxed text-osso md:text-lg">
                  {pergunta}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-fio py-20 md:py-28">
        <Container>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
              Acervo
            </span>
            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tighter md:text-4xl">
              Publicações
            </h2>
          </Reveal>

          {publicacoes.length === 0 ? (
            /*
              Estado vazio honesto. A alternativa — preencher com estudos
              fabricados — destruiria exatamente a autoridade técnica que
              justifica o instituto. Ver content/observatorios.ts.
            */
            <Reveal atraso={0.1}>
              <div className="mt-10 rounded-lg border border-dashed border-fio bg-carvao/20 p-8 sm:p-12">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fumaca">
                  Observatório em constituição
                </p>
                <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-osso">
                  Este observatório ainda não possui publicações no acervo. As
                  primeiras notas técnicas e estudos entram aqui à medida que a
                  pesquisa avança.
                </p>
                <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-fumaca">
                  O IDATE não publica material preliminar nem estimativas sem
                  fonte verificável. Um acervo vazio é preferível a um acervo que
                  não sustente a própria conclusão.
                </p>
                <div className="mt-8">
                  <CTALink href={CANAL.href} variante="secundario">
                    Contribuir com informação
                  </CTALink>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {publicacoes.map((publicacao) => (
                <li key={publicacao.slug}>
                  <article className="h-full rounded-lg border border-fio bg-carvao/30 p-6 sm:p-8">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-osso">
                      {publicacao.titulo}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-fumaca">
                      {publicacao.resumo}
                    </p>
                    <time
                      dateTime={publicacao.publicadoEm}
                      className="mt-6 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca"
                    >
                      {publicacao.publicadoEm}
                    </time>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-14">
            <Link
              href="/observatorios"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro transition-colors hover:text-osso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro"
            >
              <ArrowLeft size={14} weight="bold" />
              Todos os observatórios
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
