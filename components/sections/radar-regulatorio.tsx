import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  RADAR_ATUAL,
  obterItensRadar,
  obterAnaliseRadar,
  type StatusCriterio,
} from "@/content/radar";
import type { IdObservatorio } from "@/content/observatorios";
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
} from "@phosphor-icons/react/dist/ssr";

function BadgeCriterio({ status }: { status: StatusCriterio }) {
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

export function RadarRegulatorio({
  slugObservatorio,
  nomeObservatorio,
}: {
  slugObservatorio: IdObservatorio;
  nomeObservatorio: string;
}) {
  const itens = obterItensRadar(slugObservatorio);
  const analise = obterAnaliseRadar(slugObservatorio);
  const possuiItens = itens.length > 0;

  return (
    <section
      id="radar"
      className="border-b border-fio py-20 md:py-28 bg-noite/40 relative overflow-hidden"
    >
      {/* Luz ambiente sutil decorativa */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-cobalto/10 blur-[100px]"
      />

      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalto-claro opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-cobalto" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                Monitoramento Regulatório Contínuo
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-fio bg-carvao/60 px-3.5 py-1 text-xs font-mono text-fumaca">
              <Clock size={14} className="text-cobalto-claro" />
              <span>Ciclo vigente: {RADAR_ATUAL.periodo.rotulo}</span>
            </div>
          </div>

          <h2 className="mt-4 max-w-[28ch] text-2xl font-bold leading-tight tracking-tighter md:text-4xl text-osso">
            Radar Regulatório Semanal
          </h2>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-fumaca">
            Vigilância ativa sobre os atos de regulação, fiscalização e
            contencioso emitidos pelos órgãos de controle (
            {RADAR_ATUAL.fontesVigiadas.join(", ")}). Todos os atos são
            triados contra a agenda de pesquisa declarada do {nomeObservatorio}.
          </p>
        </Reveal>

        {possuiItens ? (
          <div className="mt-12 space-y-8">
            {/* Lista de Atos Regulatórios */}
            <div className="grid gap-6">
              {itens.map((item, index) => (
                <Reveal key={item.id} atraso={index * 0.08}>
                  <article className="group relative rounded-xl border border-fio bg-carvao/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:border-cobalto-claro/40 hover:bg-carvao/60">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fio/80 pb-4">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center gap-1.5 rounded-md bg-cobalto/20 px-2.5 py-1 font-mono text-[0.6875rem] font-bold text-cobalto-claro">
                          <Broadcast size={13} weight="bold" />
                          {item.orgao}
                        </span>
                        <span className="font-mono text-xs text-fumaca">
                          {item.fonte}
                        </span>
                      </div>

                      <time
                        dateTime={item.publicadoEm}
                        className="font-mono text-xs text-fumaca"
                      >
                        Publicado em {item.publicadoEm.split("-").reverse().join("/")}
                      </time>
                    </div>

                    <h3 className="mt-5 text-lg font-bold leading-snug text-osso sm:text-xl group-hover:text-cobalto-claro transition-colors">
                      {item.titulo}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-fumaca sm:text-base">
                      {item.resumo}
                    </p>

                    {/* Metadados: Empresas, Estruturas e Valores */}
                    <div className="mt-6 flex flex-wrap gap-2 pt-2">
                      {item.empresasCitadas && item.empresasCitadas.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-fio bg-noite/40 px-3 py-1 text-xs text-osso">
                          <Buildings size={14} className="text-cobalto-claro" />
                          <span className="text-fumaca">Empresas:</span>
                          <span className="font-medium">{item.empresasCitadas.join(", ")}</span>
                        </div>
                      )}

                      {item.estruturasCitadas && item.estruturasCitadas.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 rounded-md border border-fio bg-noite/40 px-3 py-1 text-xs text-osso">
                          <ShieldWarning size={14} className="text-amber-400" />
                          <span className="text-fumaca">Estruturas:</span>
                          <span className="font-medium">{item.estruturasCitadas.join(" • ")}</span>
                        </div>
                      )}

                      {item.valorEnvolvido && (
                        <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-950/20 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
                          <CurrencyCircleDollar size={15} weight="bold" />
                          <span>{item.valorEnvolvido}</span>
                        </div>
                      )}
                    </div>

                    {/* Vínculo à Pergunta de Pesquisa e Link Externo */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-fio/60 pt-4">
                      <div className="flex items-start gap-2 text-xs text-fumaca max-w-[65ch]">
                        <Scales size={16} className="shrink-0 text-cobalto-claro mt-0.5" />
                        <span>
                          <strong className="text-osso font-medium">
                            Conexão de pesquisa:
                          </strong>{" "}
                          &ldquo;{item.perguntaVinculada}&rdquo;
                        </span>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.12em] text-cobalto-claro transition hover:text-osso focus-visible:outline-cobalto-claro"
                      >
                        Ver ato na íntegra
                        <ArrowUpRight size={14} weight="bold" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* Caixa de Avaliação Metodológica de Núcleo */}
            {analise && (
              <Reveal atraso={0.25}>
                <div className="rounded-xl border border-cobalto-claro/30 bg-gradient-to-b from-carvao/80 to-noite/90 p-6 sm:p-8 backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fio pb-4">
                    <div>
                      <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                        Metodologia IDATE
                      </span>
                      <h4 className="mt-1 text-lg font-bold text-osso">
                        Avaliação de Triagem &amp; Critérios de Núcleo de Pesquisa
                      </h4>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-medium text-amber-300">
                      <Clock size={14} weight="bold" />
                      {analise.statusRotulo}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-fumaca">
                    {analise.resumo}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {/* Critério 1: Recorrência */}
                    <div className="rounded-lg border border-fio bg-noite/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-osso">
                          1. {analise.criterios.recorrencia.titulo}
                        </span>
                        <BadgeCriterio status={analise.criterios.recorrencia.status} />
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                        {analise.criterios.recorrencia.detalhe}
                      </p>
                    </div>

                    {/* Critério 2: Relevância Coletiva */}
                    <div className="rounded-lg border border-fio bg-noite/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-osso">
                          2. {analise.criterios.relevanciaColetiva.titulo}
                        </span>
                        <BadgeCriterio status={analise.criterios.relevanciaColetiva.status} />
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                        {analise.criterios.relevanciaColetiva.detalhe}
                      </p>
                    </div>

                    {/* Critério 3: Viabilidade */}
                    <div className="rounded-lg border border-fio bg-noite/50 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-osso">
                          3. {analise.criterios.viabilidadeApuracao.titulo}
                        </span>
                        <BadgeCriterio status={analise.criterios.viabilidadeApuracao.status} />
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-fumaca">
                        {analise.criterios.viabilidadeApuracao.detalhe}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-fio/60 pt-4">
                    <p className="text-xs leading-relaxed text-fumaca">
                      <strong className="text-osso font-medium">
                        Encaminhamento institucional:
                      </strong>{" "}
                      {analise.parecerTecnico}
                    </p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        ) : (
          <Reveal atraso={0.1}>
            <div className="mt-10 rounded-xl border border-dashed border-fio bg-carvao/20 p-8 sm:p-10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-fumaca">
                  Vigilância ativa — sem ocorrências críticas na semana
                </span>
              </div>
              <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-osso sm:text-base">
                O monitoramento automatizado do IDATE vigiou os diários oficiais e
                os atos normativos das agências setoriais durante o período de{" "}
                {RADAR_ATUAL.periodo.rotulo}.
              </p>
              <p className="mt-2 max-w-[62ch] text-xs leading-relaxed text-fumaca">
                Nenhum ato regulatório com aderência direta às perguntas em aberto
                deste observatório exigiu abertura de triagem técnica neste ciclo.
                O monitoramento prossegue continuamente.
              </p>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
