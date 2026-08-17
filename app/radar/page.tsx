import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Reveal } from "@/components/ui/reveal";
import { CTALink } from "@/components/ui/cta-link";
import {
  HISTORICO_RADAR,
  RADAR_ATUAL,
  type StatusCriterio,
} from "@/content/radar";
import { OBSERVATORIOS, EIXOS, type IdObservatorio } from "@/content/observatorios";
import { CANAL } from "@/content/site";
import {
  ArrowUpRight,
  Broadcast,
  CheckCircle,
  Clock,
  ShieldWarning,
  Scales,
  Buildings,
  CurrencyCircleDollar,
  XCircle,
  FolderOpen,
  Info,
  SlidersHorizontal,
} from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Radar Regulatório Semanal",
  description:
    "Vigilância contínua sobre atos normativos, fiscalizações e contencioso nos setores de energia, mineração, águas e terras. Triagem metodológica de núcleos de pesquisa do IDATE.",
};

function BadgeStatusCriterio({ status }: { status: StatusCriterio }) {
  if (status === "atendido") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase text-emerald-300">
        <CheckCircle size={11} weight="bold" />
        Atendido
      </span>
    );
  }
  if (status === "em_maturacao") {
    return (
      <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase text-amber-300">
        <Clock size={11} weight="bold" />
        Em maturação
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded bg-rose-500/20 px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase text-rose-300">
      <XCircle size={11} weight="bold" />
      Insuficiente
    </span>
  );
}

export default async function PaginaRadar({
  searchParams,
}: {
  searchParams: Promise<{ ciclo?: string; obs?: string }>;
}) {
  const { ciclo: cicloParam, obs: obsParam } = await searchParams;

  const cicloAtivo =
    HISTORICO_RADAR.find((c) => c.id === cicloParam) ?? RADAR_ATUAL;

  const obsAtivo =
    obsParam && OBSERVATORIOS.some((o) => o.slug === obsParam)
      ? (obsParam as IdObservatorio)
      : undefined;

  const itensFiltrados = obsAtivo
    ? cicloAtivo.itens.filter((i) => i.observatorio === obsAtivo)
    : cicloAtivo.itens;

  const analisesFiltradas = obsAtivo
    ? cicloAtivo.analises.filter((a) => a.observatorio === obsAtivo)
    : cicloAtivo.analises;

  // Observatórios que possuem atos no ciclo ativo
  const observatoriosComAtos = Array.from(
    new Set(cicloAtivo.itens.map((i) => i.observatorio)),
  );

  return (
    <>
      <CabecalhoPagina
        kicker="Inteligência Regulatória & Triagem de Pesquisa"
        titulo="Radar Regulatório Semanal"
        chamada="Vigilância ativa sobre atos de regulação, fiscalização e contencioso expedidos por órgãos oficiais (DOU, ANM, ANEEL, ANA, STF e STJ). Cada ato é avaliado contra a agenda de pesquisa dos observatórios do IDATE e submetido aos critérios metodológicos de constituição de núcleos."
      />

      {/* Barra de Status do Ciclo & Navegação Temporal */}
      <section className="border-b border-fio bg-carvao/30 py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalto-claro opacity-75" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-cobalto" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro font-semibold">
                  Ciclo Vigente: {cicloAtivo.periodo.rotulo}
                </span>
              </div>

              <div className="h-4 w-px bg-fio hidden sm:block" />

              <span className="font-mono text-xs text-fumaca">
                Fontes ativas: {cicloAtivo.fontesVigiadas.join(", ")}
              </span>
            </div>

            {/* Seletor de Ciclos Históricos */}
            {HISTORICO_RADAR.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-fumaca">Outros ciclos:</span>
                <div className="flex flex-wrap gap-1.5">
                  {HISTORICO_RADAR.map((c) => {
                    const isSelected = c.id === cicloAtivo.id;
                    return (
                      <Link
                        key={c.id}
                        href={`/radar?ciclo=${c.id}${obsAtivo ? `&obs=${obsAtivo}` : ""}`}
                        className={`rounded-md px-3 py-1 font-mono text-xs transition ${
                          isSelected
                            ? "bg-cobalto text-osso font-semibold"
                            : "border border-fio bg-noite/50 text-fumaca hover:border-cobalto-claro hover:text-osso"
                        }`}
                      >
                        {c.periodo.rotulo}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Métricas e Resumo do Ciclo */}
      <section className="border-b border-fio py-12 md:py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-fio bg-carvao/30 p-6">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                Atos Catalogados
              </span>
              <p className="mt-3 text-3xl font-bold tracking-tight text-osso md:text-4xl">
                {cicloAtivo.itens.length}
              </p>
              <p className="mt-2 text-xs text-fumaca">
                Publicações oficiais apuradas no período
              </p>
            </div>

            <div className="rounded-xl border border-fio bg-carvao/30 p-6">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                Observatórios Impactados
              </span>
              <p className="mt-3 text-3xl font-bold tracking-tight text-osso md:text-4xl">
                {observatoriosComAtos.length}
              </p>
              <p className="mt-2 text-xs text-fumaca">
                Eixos temáticos com novas ocorrências
              </p>
            </div>

            <div className="rounded-xl border border-fio bg-carvao/30 p-6">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                Triagem Metodológica
              </span>
              <p className="mt-3 text-2xl font-bold tracking-tight text-amber-300 md:text-3xl">
                {cicloAtivo.analises.length} Leads
              </p>
              <p className="mt-2 text-xs text-fumaca">
                Em observação ativa (recorrência em maturação)
              </p>
            </div>

            <div className="rounded-xl border border-fio bg-carvao/30 p-6">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                Fontes com Descarte
              </span>
              <p className="mt-3 text-3xl font-bold tracking-tight text-osso md:text-4xl">
                {cicloAtivo.itensDescartados?.length ?? 0}
              </p>
              <p className="mt-2 text-xs text-fumaca">
                Itens omitidos por ausência de conexão técnica
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Filtros por Observatório e Lista de Atos */}
      <section className="border-b border-fio py-16 md:py-24">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-fio pb-6">
            <div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-cobalto-claro" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                  Filtrar por Observatório
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-osso md:text-3xl">
                Atos Oficiais em Vigilância ({itensFiltrados.length})
              </h2>
            </div>

            {/* Menu de Filtros Rápidos */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/radar?ciclo=${cicloAtivo.id}`}
                className={`rounded-md px-3.5 py-1.5 font-mono text-xs transition ${
                  !obsAtivo
                    ? "bg-cobalto text-osso font-semibold"
                    : "border border-fio bg-noite/60 text-fumaca hover:border-cobalto-claro hover:text-osso"
                }`}
              >
                Todos ({cicloAtivo.itens.length})
              </Link>
              {observatoriosComAtos.map((slug) => {
                const obs = OBSERVATORIOS.find((o) => o.slug === slug);
                const isAtivo = obsAtivo === slug;
                const count = cicloAtivo.itens.filter(
                  (i) => i.observatorio === slug,
                ).length;
                return (
                  <Link
                    key={slug}
                    href={`/radar?ciclo=${cicloAtivo.id}&obs=${slug}`}
                    className={`rounded-md px-3.5 py-1.5 font-mono text-xs transition ${
                      isAtivo
                        ? "bg-cobalto text-osso font-semibold"
                        : "border border-fio bg-noite/60 text-fumaca hover:border-cobalto-claro hover:text-osso"
                    }`}
                  >
                    {obs ? obs.nomeCurto : slug} ({count})
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Grid de Atos */}
          {itensFiltrados.length === 0 ? (
            <Reveal>
              <div className="mt-12 rounded-xl border border-dashed border-fio bg-carvao/20 p-10 text-center">
                <p className="text-base text-osso">
                  Nenhum ato encontrado para este filtro no ciclo selecionado.
                </p>
                <Link
                  href={`/radar?ciclo=${cicloAtivo.id}`}
                  className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro hover:text-osso"
                >
                  Ver todos os atos do ciclo
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-8">
              {itensFiltrados.map((item, index) => {
                const obs = OBSERVATORIOS.find(
                  (o) => o.slug === item.observatorio,
                );
                return (
                  <Reveal key={item.id} atraso={index * 0.06}>
                    <article className="group relative rounded-xl border border-fio bg-carvao/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/60">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fio/80 pb-4">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="inline-flex items-center gap-1.5 rounded-md bg-cobalto/20 px-2.5 py-1 font-mono text-[0.6875rem] font-bold text-cobalto-claro">
                            <Broadcast size={13} weight="bold" />
                            {item.orgao}
                          </span>
                          <span className="font-mono text-xs text-fumaca">
                            {item.fonte}
                          </span>
                          {obs && (
                            <Link
                              href={`/observatorios/${obs.slug}`}
                              className="rounded-md border border-fio bg-noite/50 px-2 py-0.5 font-mono text-[0.6875rem] text-cobalto-claro hover:border-cobalto-claro"
                            >
                              {obs.nome}
                            </Link>
                          )}
                        </div>

                        <time
                          dateTime={item.publicadoEm}
                          className="font-mono text-xs text-fumaca"
                        >
                          Publicado em{" "}
                          {item.publicadoEm.split("-").reverse().join("/")}
                        </time>
                      </div>

                      <h3 className="mt-5 text-xl font-bold leading-snug text-osso sm:text-2xl group-hover:text-cobalto-claro transition-colors">
                        {item.titulo}
                      </h3>

                      <p className="mt-3.5 text-sm leading-relaxed text-fumaca sm:text-base">
                        {item.resumo}
                      </p>

                      {/* Metadados Técnicos */}
                      <div className="mt-6 flex flex-wrap gap-2 pt-2">
                        {item.empresasCitadas && item.empresasCitadas.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-fio bg-noite/50 px-3 py-1 text-xs text-osso">
                            <Buildings size={14} className="text-cobalto-claro" />
                            <span className="text-fumaca">Citadas:</span>
                            <span className="font-medium">
                              {item.empresasCitadas.join(", ")}
                            </span>
                          </div>
                        )}

                        {item.estruturasCitadas &&
                          item.estruturasCitadas.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-fio bg-noite/50 px-3 py-1 text-xs text-osso">
                              <ShieldWarning
                                size={14}
                                className="text-amber-400"
                              />
                              <span className="text-fumaca">Estruturas:</span>
                              <span className="font-medium">
                                {item.estruturasCitadas.join(" • ")}
                              </span>
                            </div>
                          )}

                        {item.valorEnvolvido && (
                          <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
                            <CurrencyCircleDollar size={15} weight="bold" />
                            <span>{item.valorEnvolvido}</span>
                          </div>
                        )}
                      </div>

                      {/* Conexão com Agenda de Pesquisa e Link Externo */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-fio/60 pt-4">
                        <div className="flex items-start gap-2.5 text-xs text-fumaca max-w-[70ch]">
                          <Scales
                            size={16}
                            className="shrink-0 text-cobalto-claro mt-0.5"
                          />
                          <span>
                            <strong className="text-osso font-medium">
                              Pergunta de Pesquisa IDATE:
                            </strong>{" "}
                            &ldquo;{item.perguntaVinculada}&rdquo;
                          </span>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-cobalto-claro transition hover:text-osso"
                        >
                          Ver ato oficial na íntegra
                          <ArrowUpRight size={14} weight="bold" />
                        </a>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Seção de Triagem Metodológica de Núcleos */}
      <section className="border-b border-fio py-16 md:py-24 bg-noite/50">
        <Container>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
              Metodologia Institucional
            </span>
            <h2 className="mt-4 max-w-[28ch] text-2xl font-bold leading-tight tracking-tighter md:text-4xl text-osso">
              Avaliação de Triagem & Critérios de Núcleo
            </h2>
            <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-fumaca">
              O IDATE não abre pesquisas aleatórias. Para que um conjunto de atos
              regulatórios se torne um núcleo autônomo de investigação, é
              necessária a presença simultânea de três condições: recorrência
              documentada, relevância coletiva e viabilidade de apuração.
            </p>
          </Reveal>

          <div className="mt-12 space-y-8">
            {analisesFiltradas.map((analise) => {
              const obs = OBSERVATORIOS.find(
                (o) => o.slug === analise.observatorio,
              );
              return (
                <Reveal key={analise.tema}>
                  <div className="rounded-xl border border-cobalto-claro/30 bg-gradient-to-b from-carvao/80 to-noite/90 p-6 sm:p-8 backdrop-blur-md">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fio pb-4">
                      <div>
                        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                          {obs ? obs.nome : analise.observatorio}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-osso sm:text-xl">
                          {analise.tema}
                        </h3>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 font-mono text-xs font-medium text-amber-300">
                        <Clock size={14} weight="bold" />
                        {analise.statusRotulo}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-fumaca sm:text-base">
                      {analise.resumo}
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      {/* Critério 1 */}
                      <div className="rounded-lg border border-fio bg-noite/50 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-osso">
                            1. {analise.criterios.recorrencia.titulo}
                          </span>
                          <BadgeStatusCriterio
                            status={analise.criterios.recorrencia.status}
                          />
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                          {analise.criterios.recorrencia.detalhe}
                        </p>
                      </div>

                      {/* Critério 2 */}
                      <div className="rounded-lg border border-fio bg-noite/50 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-osso">
                            2. {analise.criterios.relevanciaColetiva.titulo}
                          </span>
                          <BadgeStatusCriterio
                            status={analise.criterios.relevanciaColetiva.status}
                          />
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                          {analise.criterios.relevanciaColetiva.detalhe}
                        </p>
                      </div>

                      {/* Critério 3 */}
                      <div className="rounded-lg border border-fio bg-noite/50 p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-osso">
                            3. {analise.criterios.viabilidadeApuracao.titulo}
                          </span>
                          <BadgeStatusCriterio
                            status={analise.criterios.viabilidadeApuracao.status}
                          />
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                          {analise.criterios.viabilidadeApuracao.detalhe}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-fio/60 pt-4">
                      <p className="text-xs leading-relaxed text-fumaca">
                        <strong className="text-osso font-medium">
                          Encaminhamento Técnico IDATE:
                        </strong>{" "}
                        {analise.parecerTecnico}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Transparência Institucional: Descarte & Fontes Sem Ocorrências */}
      {(cicloAtivo.itensDescartados || cicloAtivo.fontesSemOcorrencias) && (
        <section className="border-b border-fio py-16 md:py-20">
          <Container>
            <Reveal>
              <div className="flex items-center gap-2">
                <Info size={18} className="text-cobalto-claro" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                  Governança Editorial
                </span>
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-osso md:text-3xl">
                Transparência de Checagem & Descarte
              </h2>
            </Reveal>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {cicloAtivo.itensDescartados &&
                cicloAtivo.itensDescartados.length > 0 && (
                  <div className="rounded-xl border border-fio bg-carvao/20 p-6">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-rose-400">
                      Itens Avaliados e Descartados
                    </span>
                    <ul className="mt-4 space-y-4">
                      {cicloAtivo.itensDescartados.map((item) => (
                        <li key={item.titulo} className="text-xs">
                          <p className="font-semibold text-osso">
                            [{item.orgao}] {item.titulo}
                          </p>
                          <p className="mt-1 text-fumaca">
                            <strong className="text-rose-300/90">
                              Motivo do descarte:
                            </strong>{" "}
                            {item.motivoDescarte}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {cicloAtivo.fontesSemOcorrencias &&
                cicloAtivo.fontesSemOcorrencias.length > 0 && (
                  <div className="rounded-xl border border-fio bg-carvao/20 p-6">
                    <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-fumaca">
                      Fontes Consultadas sem Atos Relevantes na Semana
                    </span>
                    <ul className="mt-4 space-y-4">
                      {cicloAtivo.fontesSemOcorrencias.map((fonte) => (
                        <li key={fonte.orgao} className="text-xs">
                          <p className="font-semibold text-osso">{fonte.orgao}</p>
                          <p className="mt-1 text-fumaca">{fonte.observacao}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </Container>
        </section>
      )}

      {/* Seção CTA Final */}
      <section className="py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
              Contribuição de Informações
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-osso md:text-5xl">
              Identificou uma irregularidade ou padrão no seu setor?
            </h2>
            <p className="mx-auto mt-6 max-w-[62ch] text-base leading-relaxed text-fumaca">
              O IDATE analisa comunicações de empresas, técnicos e cidadãos. Casos
              com repercussão coletiva e documentação probatória integram a pauta
              de constituição dos núcleos de pesquisa.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <CTALink href={CANAL.href}>{CANAL.acao}</CTALink>
              <CTALink href="/observatorios" variante="secundario">
                Explorar todos os observatórios
              </CTALink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
