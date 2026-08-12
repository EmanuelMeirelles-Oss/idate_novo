import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CTALink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";
import { EIXOS, type Observatorio } from "@/content/observatorios";
import { contarItensRadar } from "@/content/radar";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function GradeObservatorios({
  rotulo,
  titulo,
  intro,
  lista,
  cta,
}: {
  rotulo: string;
  titulo: string;
  intro?: string;
  lista: readonly Observatorio[];
  cta?: { readonly rotulo: string; readonly href: string };
}) {
  return (
    <section className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {rotulo}
          </span>
          <h2 className="mt-4 max-w-[24ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
          {intro && (
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-fumaca">
              {intro}
            </p>
          )}
        </Reveal>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {lista.map((observatorio, indice) => (
            <li key={observatorio.slug}>
              <Reveal atraso={Math.min(indice, 5) * 0.06}>
                <Link
                  href={`/observatorios/${observatorio.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-fio bg-carvao/30 p-6 transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4 border-b border-fio pb-4">
                    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-cobalto-claro">
                      {EIXOS[observatorio.eixo].rotulo}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {contarItensRadar(observatorio.slug) > 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cobalto-claro/40 bg-cobalto/20 px-2.5 py-0.5 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-cobalto-claro">
                          <span className="h-1.5 w-1.5 rounded-full bg-cobalto-claro animate-pulse" />
                          Radar: {contarItensRadar(observatorio.slug)} atos
                        </span>
                      )}
                      {observatorio.estado === "constituicao" ? (
                        <span className="shrink-0 rounded-full border border-fio bg-noite/50 px-2.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-fumaca">
                          Em constituição
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full border border-cobalto-claro/40 bg-cobalto/25 px-2.5 py-0.5 font-mono text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-cobalto-claro">
                          Ativo
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold leading-tight tracking-tight text-osso transition-colors group-hover:text-cobalto-claro md:text-2xl">
                    {observatorio.nome}
                  </h3>

                  <p className="mt-4 max-w-[52ch] flex-1 text-sm leading-relaxed text-fumaca">
                    {observatorio.escopo}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                    {observatorio.perguntas.length} perguntas em aberto
                    <ArrowUpRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>

        {cta && (
          <Reveal atraso={0.2}>
            <div className="mt-16">
              <CTALink href={cta.href} variante="secundario">
                {cta.rotulo}
              </CTALink>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
