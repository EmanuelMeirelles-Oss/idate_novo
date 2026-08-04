import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export interface Porta {
  readonly rotulo: string;
  readonly titulo: string;
  readonly descricao: string;
  readonly cta: { readonly rotulo: string; readonly href: string };
}

/*
  As duas portas de entrada. Substitui o antigo fechamento de CTA único, que era
  um funil de venda com um só destino.

  A ordem é deliberada e não deve ser invertida: consultar vem antes de
  contribuir. Denúncia é insumo do trabalho do instituto; autoridade técnica é o
  produto. Um site que abre pela captação de denúncias inverte a tese.
*/
export function Portas({
  rotulo,
  titulo,
  lista,
}: {
  rotulo: string;
  titulo: string;
  lista: readonly Porta[];
}) {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {rotulo}
          </span>
          <h2 className="mt-4 max-w-[22ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {lista.map((porta, indice) => (
            <Reveal key={porta.rotulo} atraso={indice * 0.1}>
              <Link
                href={porta.cta.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-fio bg-gradient-to-b from-carvao/80 to-noite p-8 transition-all duration-300 hover:border-cobalto-claro/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro sm:p-10"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cobalto/10 blur-3xl transition-opacity duration-500 group-hover:opacity-180 pointer-events-none" />

                <span className="relative z-10 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-cobalto-claro">
                  {porta.rotulo}
                </span>

                <h3 className="relative z-10 mt-4 text-2xl font-bold leading-tight tracking-tight text-osso transition-colors group-hover:text-cobalto-claro md:text-3xl">
                  {porta.titulo}
                </h3>

                <p className="relative z-10 mt-5 max-w-[46ch] flex-1 text-base leading-relaxed text-fumaca">
                  {porta.descricao}
                </p>

                <span className="relative z-10 mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
                  {porta.cta.rotulo}
                  <ArrowRight
                    size={14}
                    weight="bold"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
