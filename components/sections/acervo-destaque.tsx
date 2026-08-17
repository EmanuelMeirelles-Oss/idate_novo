import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CTALink } from "@/components/ui/cta-link";
import {
  publicacoesRecentes,
  TIPOS_PUBLICACAO,
} from "@/content/publicacoes";
import { OBSERVATORIOS } from "@/content/observatorios";
import { RADAR_ATUAL } from "@/content/radar";
import {
  ArrowUpRight,
  Radio,
  FileText,
  ClockCounterClockwise,
} from "@phosphor-icons/react/dist/ssr";

export function AcervoDestaque() {
  const publicacoes = publicacoesRecentes(2);

  return (
    <section className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                02 — Produção Técnica & Vigilância
              </span>
              <h2 className="mt-4 max-w-[24ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
                Evidências documentadas e acervo aberto.
              </h2>
            </div>
            <div className="hidden sm:block">
              <CTALink href="/biblioteca" variante="secundario">
                Consultar biblioteca
              </CTALink>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Card de Destaque: Radar Regulatório da Semana */}
          <div className="lg:col-span-5">
            <Reveal atraso={0.05}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-cobalto-claro/30 bg-carvao/40 p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-28 w-28 bg-cobalto/10 blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between border-b border-fio/60 pb-4">
                    <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-cobalto-claro">
                      <Radio size={16} className="text-cobalto-claro animate-pulse" />
                      Radar Regulatório Ativo
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-fumaca">
                      Ciclo: {RADAR_ATUAL.periodo.rotulo}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-tight tracking-tight text-osso md:text-2xl">
                    Vigilância contínua sobre atos normativos e fiscalizações
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-fumaca">
                    {RADAR_ATUAL.itens.length} atos oficiais catalogados no ciclo
                    atual, abrangendo repasses da CDE e tarifas pela ANEEL,
                    distribuição de CFEM via PGRM e consulta pública da ANM.
                  </p>

                  <ul className="mt-6 space-y-3">
                    {RADAR_ATUAL.itens.slice(0, 2).map((item) => (
                      <li
                        key={item.id}
                        className="rounded-lg border border-fio/80 bg-noite/40 p-3 text-xs leading-relaxed text-osso"
                      >
                        <span className="font-mono text-[0.625rem] text-cobalto-claro font-semibold mr-2">
                          [{item.orgao}]
                        </span>
                        {item.titulo}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-fio/60">
                  <Link
                    href="/radar"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro hover:text-osso transition-colors"
                  >
                    Acessar Radar Regulatório Completo
                    <ArrowUpRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Cards das Últimas Publicações */}
          <div className="space-y-6 lg:col-span-7">
            {publicacoes.map((publicacao, idx) => {
              const obs = OBSERVATORIOS.find(
                (o) => o.slug === publicacao.observatorio,
              );
              return (
                <Reveal key={publicacao.slug} atraso={0.1 + idx * 0.08}>
                  <Link
                    href={`/biblioteca/${publicacao.slug}`}
                    className="group flex flex-col justify-between rounded-xl border border-fio bg-carvao/25 p-6 sm:p-7 transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/60"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fio/60 pb-3">
                        <span className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cobalto-claro">
                          {TIPOS_PUBLICACAO[publicacao.tipo].rotulo} •{" "}
                          {obs ? obs.nomeCurto : publicacao.observatorio}
                        </span>
                        <time
                          dateTime={publicacao.publicadoEm}
                          className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca"
                        >
                          {publicacao.publicadoEm.split("-").reverse().join("/")}
                        </time>
                      </div>

                      <h4 className="mt-4 text-lg font-bold leading-tight tracking-tight text-osso transition-colors group-hover:text-cobalto-claro sm:text-xl">
                        {publicacao.titulo}
                      </h4>

                      <p className="mt-3 text-sm leading-relaxed text-fumaca">
                        {publicacao.resumo}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-fio/40">
                      <span className="text-xs text-osso font-medium">
                        {publicacao.autores.map((a) => a.nome).join(", ")}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                        Acessar publicação
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-10 sm:hidden">
          <CTALink href="/biblioteca" variante="secundario">
            Consultar toda a biblioteca
          </CTALink>
        </div>
      </Container>
    </section>
  );
}
